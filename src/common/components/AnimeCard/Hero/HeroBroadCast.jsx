import React from "react";
import HeroSocialLinks from "./HeroSocialLinks";

const HeroBroadCast = ({ broadCast }) => {
  const isUnknown =
    !broadCast?.day ||
    !broadCast?.string ||
    broadCast.day.includes("unknown") ||
    broadCast.string.includes("unknown");
  return (
    <div className='text-sm sm:text-md text-warning'>
      {isUnknown ? (
        <p className='text-lg sm:text-3xl font-bold'>Upcoming</p>
      ) : (
        <>
          <p>
            {broadCast?.day} {broadCast?.string}
            <br />
            {broadCast?.timezone && (
              <span>Timezone: {broadCast?.timezone}</span>
            )}
          </p>
        </>
      )}
      <br /> <br />
      <HeroSocialLinks />
    </div>
  );
};

export default React.memo(HeroBroadCast);
