import PropTypes from "prop-types";
import Link from "next/link";

const TopBanner = ({ title, links }) => {
  return (
    <div className='mb-4 py-2 '>
      <div className='container mx-auto flex items-center justify-between py-2'>
        <h1 className='font-mono text-lg font-bold text-black'>{title}</h1>
        <button
          className='block font-semibold text-black lg:hidden'
          id='menu-toggle'>
          <svg
            className='h-6 w-6 fill-current'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <title>{title}</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
        <nav className='hidden lg:flex lg:items-center'>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={
                link.actived
                  ? "block font-medium text-gray-400 hover:text-gray-500 lg:ml-4 lg:inline-block underline underline-offset-4"
                  : "block font-medium text-gray-400 hover:text-gray-500 lg:ml-4 lg:inline-block"
              }>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

TopBanner.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
};

export default TopBanner;
