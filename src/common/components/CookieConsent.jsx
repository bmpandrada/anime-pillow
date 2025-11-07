import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 30 });
    setShowBanner(false);
  };

  const handleDecline = () => {
    Cookies.set("cookie_consent", "declined", { expires: 30 });
    Cookies.remove("theme");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className='fixed bottom-5 left-0 right-0 flex justify-center z-50'>
      <div className='bg-base-200 text-sm p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-3 w-[90%] sm:w-auto'>
        <p className='text-center text-xs sm:text-left sm:text-sm md:text-md text-lg:text-lg'>
          We use cookies to improve your experience. By continuing, you agree to
          our use of cookies.
        </p>
        <div className='flex gap-2'>
          <button
            onClick={handleAccept}
            className='btn btn-sm btn-primary rounded-lg text-xs sm:text-left sm:text-sm md:text-md text-lg:text-lg'
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className='btn btn-sm btn-ghost rounded-lg'
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
