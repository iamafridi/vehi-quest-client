import { useState, useEffect } from "react";
import "./Banner.css";
import video from "../../assets/Banner/videoplayback2.mp4";
import { Link } from "react-router-dom";

const BannerCarousel = () => {
    // Text content array
    const texts = [
        "Ride Beyond Boundaries with VehiQuest",
        "Your Journey, Your Vehicle, Your Way",
        "From Roads to Adventures — VehiQuest Has You Covered",
        "Where Vehicle Owners Meet Travel Dreamers",
        "Unlock Roads. Unlock Possibilities.",
        "Drive. Discover. Do More with VehiQuest",
        "Plan Your Next Escape with VehiQuest"
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
        <div className="video-container ">

            {/* Insert a video with reduced height */}
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
                <h2 className="animated-text italic text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                    {texts[currentText]}
                </h2>

                {/* Buttons */}
                <div className="button-container mt-6 mb-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* <Link to='/'>
                        <button className="animated-button bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Explore
                        </button>
                    </Link> */}
                    <Link to='/login'>
                        <button className="animated-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BannerCarousel;