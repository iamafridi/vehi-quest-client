import Video from "./Video"

const HomeHeroText = () => {
    return (
        <div className='font-[font1] pt-8 sm:pt-12 md:pt-16 lg:pt-5 text-center flex-shrink-0'>
            <div className='text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[9vw] md:leading-[8.5vw] lg:leading-[8vw]'>
                VehiQuest
            </div>
            <div className='text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[9vw] md:leading-[8.5vw] lg:leading-[8vw] mb-1'>
                where
                <div className="h-[12vw]  w-[12vw] sm:h-[11vw] sm:w-[11vw] clip-v md:h-[10vw] md:w-[10vw] lg:h-[9.5vw] lg:w-[9.5vw] border-2 animated-border rounded mx-2 sm:mx-3 md:mx-4 flex items-center justify-center">
                    <Video />
                </div>


                every
            </div>
            <div className='text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[9vw] md:leading-[8.5vw] lg:leading-[8vw]'>
                ride matters
            </div>
        </div>
    )
}

export default HomeHeroText