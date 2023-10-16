import React from 'react'

const Heading = () => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl leading-[46px] md:text-6xl lg:text-7xl lg:leading-[86px] font-bold">
        Event Management and <span className="text-primary">Ticketing</span>{" "}
        done right
      </h1>
      <p className="max-w-[722px] mx-auto">
        We take care of the whole event management and ticketing process,
        increasing revenue for event organisers, improving security and
        identification, and increasing attendance.
      </p>
    </div>
  );
}

export default Heading