import React from 'react'
// import arenaVideo from "/public/videos/arena.mp4";
import avi from "/public/images/host_circle.png";

const Video = () => {
  return (
    <div className="w-full mt-4">
      <video
        autoPlay
        muted={true}
        loop={true}
        // height="390"
        className="block border w-full object-cover h-[300px] lg:h-[526px] rounded-[32px]"
      >
        <source
          src="/videos/arena.mp4"
          type="video/mp4"
        />
        Sorry, your browser does not support this video
      </video>
    </div>
  );
}

export default Video