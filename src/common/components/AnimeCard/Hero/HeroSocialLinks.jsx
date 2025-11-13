import React from "react";
import { FaSquareGithub, FaLinkedin } from "react-icons/fa6";

const HeroSocialLinks = () => {
  return (
    <div className='flex items-center gap-2 text-warning'>
      <a
        href={`https://www.linkedin.com/in/bruce-michael-andrada-565b561a4/`}
        target='_blank'
        aria-label='linkedin'
        rel='noopener noreferrer'
      >
        <FaLinkedin className='text-2xl hover:text-blue-400 transition' />
      </a>
      <a
        href={`https://github.com/bmpandrada`}
        target='_blank'
        aria-label='github'
        rel='noopener noreferrer'
      >
        <FaSquareGithub className='text-2xl hover:text-blue-400 transition' />
      </a>
    </div>
  );
};

export default React.memo(HeroSocialLinks);
