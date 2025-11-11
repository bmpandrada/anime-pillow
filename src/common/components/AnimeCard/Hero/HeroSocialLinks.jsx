import { FaGithub, FaLinkedin } from "react-icons/fa";

const HeroSocialLinks = () => {
  return (
    <div className='flex items-center gap-2 text-warning'>
      <a
        href={`https://www.linkedin.com/in/bruce-michael-andrada-565b561a4/`}
        target='_blank'
      >
        <FaLinkedin className='text-2xl hover:text-blue-400 transition' />
      </a>
      <a href={`https://github.com/bmpandrada`} target='_blank'>
        <FaGithub className='text-2xl hover:text-blue-400 transition' />
      </a>
    </div>
  );
};

export default HeroSocialLinks;
