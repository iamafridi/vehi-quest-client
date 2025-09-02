import videoSrc from '/src/assets/Banner/videoplayback.mp4'

const Video = () => {
    return (
        <div className='h-full w-full'>
            <video
                className='h-full w-full object-cover'
                autoPlay
                loop
                muted
                playsInline
                playbackRate={0.8}
                src={videoSrc}
            />
        </div>
    )
}

export default Video