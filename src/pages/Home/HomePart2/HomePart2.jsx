import HomeBottomText from "./HeroBottomText"
import HomeHeroText from "./HomeHeroText"
import videoSrc from '/src/assets/Banner/videoplayback.mp4'

const HomePart2 = () => {
    return (
        <div className='text-white relative min-h-screen my-5 rounded overflow-hidden'>
            {/* Background Video */}
            <div className='absolute inset-0 z-0'>
                <video
                    className='h-full w-full object-fill'
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={videoSrc}
                />
            </div>

            {/* Content Layer */}
            <div className='relative z-10 min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10'>
                <HomeHeroText />
                <HomeBottomText />
            </div>
        </div>
    )
}

export default HomePart2