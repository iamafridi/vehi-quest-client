import HomeBottomText from "./HeroBottomText"
import HomeHeroText from "./HomeHeroText"
import videoSrc from '/src/assets/Banner/videoplayback.mp4'

const HomePart2 = () => {
    return (
        <div className='text-white relative my-3 xs:my-4 sm:my-5 md:my-6 lg:my-5 rounded-s-full rounded-e-full px-1 xs:px-2 sm:px-3 md:px-2 lg:px-2 overflow-hidden min-h-[60vh] xs:min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] transform-gpu'>
            {/* Background Video */}
            <div className='absolute inset-0 z-0 transform translate3d-0'>
                <video
                    className='h-full w-full object-cover '
                    style={{
                        transform: 'translate3d(0,0,0)',
                        backfaceVisibility: 'hidden',
                        perspective: 1000
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    src={videoSrc}
                />
            </div>

            {/* Content Layer */}
            <div className='relative z-10 h-full flex flex-col justify-between p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10'>
                <HomeHeroText />
                <HomeBottomText />
            </div>
        </div>
    )
}

export default HomePart2