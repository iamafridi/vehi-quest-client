import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { imageUpload } from '../../api/utils'
import useAuth from '../../hooks/useAuth'
import { getToken, saveUser } from '../../api/auth'
import toast from 'react-hot-toast'
import { ImSpinner9 } from "react-icons/im"
import { useState, useEffect, useRef } from 'react'
import { MdOutlineArrowCircleRight } from "react-icons/md";

const SignUp = () => {
  const { createUser, signInWithGoogle, updateUserProfile, loading } = useAuth()
  const navigate = useNavigate()

  // Carousel state for rotating videos
  const [currentSlide, setCurrentSlide] = useState(0)
  const videoRefs = useRef([])

  const slides = [
    {
      video: "/src/assets/login/login3.mp4",
      title: "Join Our Community,",
      subtitle: "Start Your Journey"
    },
    {
      video: "/src/assets/login/login2.mp4",
      title: "Discover Adventures,",
      subtitle: "Make Connections"
    },
    {
      video: "/src/assets/login/login1.mp4",
      title: "Create Your Story,",
      subtitle: "Share Your Passion"
    },
    {
      video: "/src/assets/login/login1.mp4",
      title: "Create Your Story,",
      subtitle: "Share Your Passion"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // Increased duration for videos
    return () => clearInterval(timer)
  }, [])

  // Handle video playback when slide changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch(console.error)
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [currentSlide])

  // Submit Handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]

    try {
      // Uploading Image 
      const imageData = await imageUpload(image)

      // Registering User
      const result = await createUser(email, password)

      // Saving User name and Profile Photo
      await updateUserProfile(name, imageData?.data?.display_url)

      // Save User data in Database
      const dbResponse = await saveUser(result?.user)
      console.log(dbResponse)

      // Getting Token 
      await getToken(result?.user?.email)
      navigate('/')
      toast.success('Signup Successful')

    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Sign In 
  const handleGoogleSignIn = async () => {
    try {
      // Registering User
      const result = await signInWithGoogle()

      // Save User data in Database
      const dbResponse = await saveUser(result?.user)
      console.log(dbResponse)

      // Getting Token 
      await getToken(result?.user?.email)
      navigate('/')
      toast.success('Signup Successful')

    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Side - SignUp Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center bg-gray-900 p-8'>
        <div className='w-full max-w-md'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-white mb-2 font-[font2]'>Create an account</h1>
            <p className='text-gray-400 flex items-center text-sm font-[font1] tracking-wide'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='text-blue-400 underline underline-offset-4 ml-1'
              >
                Log in
              </Link>
              <MdOutlineArrowCircleRight className='text-xl ml-1' />
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name */}
            <div>
              <input
                type='text'
                name='name'
                placeholder='Enter Your Name Here'
                required
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
              />
            </div>

            {/* Profile Image Upload */}
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2 font-[font1]'>
                Profile Picture
              </label>
              <div className='relative'>
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  required
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type='email'
                name='email'
                placeholder='Enter Your Email Here'
                required
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
              />
            </div>

            {/* Password */}
            <div className='relative'>
              <input
                type='password'
                name='password'
                placeholder='*******'
                autoComplete='new-password'
                required
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-12'
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-purple-600/60 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center'
            >
              {loading ? (
                <ImSpinner9 className='animate-spin' />
              ) : (
                'Continue'
              )}
            </button>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-700' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-900 text-gray-400'>Signup with social accounts</span>
              </div>
            </div>

            {/* Google SignUp Button */}
            <div
              onClick={handleGoogleSignIn}
              className='flex justify-center items-center space-x-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-3 cursor-pointer'
            >
              <FcGoogle size={20} />
              <p className='text-white'>Continue with Google</p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Video Carousel */}
      <div className='hidden lg:flex lg:w-1/2 relative overflow-hidden'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Video Background */}
            <video
              ref={el => videoRefs.current[index] = el}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={slide.video} type="video/mp4" />
              <source src={slide.video} type="video/quicktime" />
              Your browser does not support the video tag.
            </video>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-12 text-white">
              {/* Logo */}
              <div className="mb-8">
                <div className="text-2xl font-bold tracking-wider uppercase">Vehi-quest</div>
              </div>

              {/* Text Content */}
              <div className="max-w-lg">
                <h1 className="text-4xl lg:text-5xl font-light leading-tight mb-2">
                  {slide.title}
                </h1>
                <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8">
                  {slide.subtitle}
                </h2>

                {/* Slide indicators */}
                <div className="flex space-x-2">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 transition-all duration-300 ${i === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white bg-opacity-50 w-2'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Back to website button */}
            <button className="absolute top-6 right-6 text-white text-sm hover:underline flex items-center underline underline-offset-2">
              <Link to='/'> Back to website</Link>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SignUp


// import { Link, useNavigate } from 'react-router-dom'
// import { FcGoogle } from 'react-icons/fc'
// import { imageUpload } from '../../api/utils'; import useAuth from '../../hooks/useAuth';
// import { getToken, saveUser } from '../../api/auth';
// import toast from 'react-hot-toast';
// import { ImSpinner9 } from "react-icons/im";


// const SignUp = () => {

//   const { createUser, signInWithGoogle, updateUserProfile, loading } = useAuth()
//   const navigate = useNavigate();

//   // Submit Handler
//   const handleSubmit = async event => {
//     event.preventDefault();
//     const form = event.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     const image = form.image.files[0]

//     try {
//       // Uploading Image
//       const imageData = await imageUpload(image)

//       // Registering User
//       const result = await createUser(email, password)

//       // Saving User name and Profile Photo
//       await updateUserProfile(name, imageData?.data?.display_url)

//       // Save User data in Database
//       const dbResponse = await saveUser(result?.user)
//       console.log(dbResponse);

//       // Getting Token
//       await getToken(result?.user?.email)
//       navigate('/')
//       toast.success('Signup Successful')

//     } catch (err) {
//       console.log(err);
//       toast.error(err?.message)
//     }
//   }

//   // Handle Google Sign In
//   const handleGoogleSignIn = async () => {
//     try {

//       // Registering User
//       const result = await signInWithGoogle()

//       // Save User data in Database
//       const dbResponse = await saveUser(result?.user)
//       console.log(dbResponse);

//       // Getting Token
//       await getToken(result?.user?.email)
//       navigate('/')
//       toast.success('Signup Successful')

//     } catch (err) {
//       console.log(err);
//       toast.error(err?.message)
//     }
//   }




// return (
//   <div className='flex justify-center items-center min-h-screen'>
//     <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
//       <div className='mb-8 text-center'>
//         <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
//         <p className='text-sm text-gray-400'>Welcome to VehiQuest</p>
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         noValidate=''
//         action=''
//         className='space-y-6 ng-untouched ng-pristine ng-valid'
//       >
//         <div className='space-y-4'>
//           <div>
//             <label htmlFor='email' className='block mb-2 text-sm'>
//               Name
//             </label>
//             <input
//               type='text'
//               name='name'
//               id='name'
//               placeholder='Enter Your Name Here'
//               className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
//               data-temp-mail-org='0'
//             />
//           </div>
//           <div>
//             <label htmlFor='image' className='block mb-2 text-sm'>
//               Select Image:
//             </label>
//             <input
//               required
//               type='file'
//               id='image'
//               name='image'
//               accept='image/*'
//             />
//           </div>
//           <div>
//             <label htmlFor='email' className='block mb-2 text-sm'>
//               Email address
//             </label>
//             <input
//               type='email'
//               name='email'
//               id='email'
//               required
//               placeholder='Enter Your Email Here'
//               className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
//               data-temp-mail-org='0'
//             />
//           </div>
//           <div>
//             <div className='flex justify-between'>
//               <label htmlFor='password' className='text-sm mb-2'>
//                 Password
//               </label>
//             </div>
//             <input
//               type='password'
//               name='password'
//               autoComplete='new-password'
//               id='password'
//               required
//               placeholder='*******'
//               className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
//             />
//           </div>
//         </div>

//         <div>
//           <button
//             type='submit'
//             className='bg-rose-500 w-full rounded-md py-3 text-white'
//           >
//             {
//               loading ? <ImSpinner9 className='animate-spin m-auto' /> : 'Continue'
//             }
//           </button>
//         </div>
//       </form>
//       <div className='flex items-center pt-4 space-x-1'>
//         <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//         <p className='px-3 text-sm dark:text-gray-400'>
//           Signup with social accounts
//         </p>
//         <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//       </div>
//       <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
//         <FcGoogle size={32} />

//         <p>Continue with Google</p>
//       </div>
//       <p className='px-6 text-sm text-center text-gray-400'>
//         Already have an account?{' '}
//         <Link
//           to='/login'
//           className='hover:underline hover:text-rose-500 text-gray-600'
//         >
//           Login
//         </Link>
//         .
//       </p>
//     </div>
//   </div>
// )
// }

// export default SignUp;
