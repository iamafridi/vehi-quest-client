import { useState, useEffect } from "react";
import "./Banner.css";
import video from "../../assets/Banner/videoplayback3.mp4";
import { Link } from "react-router-dom";

const BannerCarousel = () => {
    // Text content array
    const texts = [
        "Ride Beyond Limits",
        "Your Journey, Your Way",
        "From Roads to Adventures",
        "Where Owners Meet Dreamers",
        "Unlock the Road",
        "vehi-quest",
        "Plan Your Escape"
    ];


    // State to hold the current text index
    const [currentText, setCurrentText] = useState(0);

    // Change the text every 5 seconds
    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % texts.length); // Loop through the texts array
        }, 5000);

        return () => clearInterval(textInterval); // Clean up the interval on component unmount
    }, []);

    return (
        <div className="video-container clip-v ">

            <video
                className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[40vh] opacity-90 object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Text Overlay */}
            <div className="text-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
                {/* <h2 className="animated-text italic backdrop-blur-sm text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                    {texts[currentText]}
                </h2> */}
                <div className='font-[font1] pt-8 sm:pt-12 md:pt-16 lg:pt-5 text-center flex-shrink-0'>
                    <div className='text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[9vw] md:leading-[8.5vw] lg:leading-[8vw]'>
                        VehiQuest
                    </div>
                    <div className='text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[9vw] md:leading-[8.5vw] lg:leading-[8vw] mb-1'>
                        buy
                        <div className='h-[12vw] border-2 clip-v animated-border w-[12vw] sm:h-[11vw] sm:w-[11vw] md:h-[10vw] md:w-[10vw] lg:h-[9.5vw] lg:w-[9.5vw] overflow-hidden mx-2 sm:mx-3 md:mx-4 flex items-center justify-center'>
                            <video
                                className='h-full w-full object-cover'
                                autoPlay
                                loop
                                muted
                                playsInline
                                playbackRate={0.8}
                                src={video}
                            />
                        </div>
                        rent
                    </div>
                    <div className='text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[9vw] md:leading-[8.5vw] lg:leading-[8vw]'>
                        ride anytime
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-container mt-6 mb-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* <Link to='/'>
                        <button className="animated-button bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Explore
                        </button>
                    </Link> */}
                    <Link to='/login'>
                        <button className="animated-button bg-transparent border-2  text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BannerCarousel;