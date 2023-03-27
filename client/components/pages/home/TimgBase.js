import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const TimgBase = ({ imagSrc, title, subtitle, user = undefined }) => {
  return (
    <div className='container mx-auto mt-4 md:mt-2 '>
      <div className='grid transform grid-cols-6 gap-4'>
        <div className='group relative col-span-6  h-[400px] rounded-md bg-black md:h-[600px] lg:col-span-4'>
          <Image
            className='rounded-md object-cover'
            src={imagSrc}
            fill
            alt='Picture of the author'
          />
          <div className='absolute bottom-[40px] left-[40px] border-l-2 border-white pl-4 transition-all duration-300 group-hover:left-[80px] group-hover:pl-6 '>
            <h2 className='font-sans text-2xl font-bold tracking-tight text-gray-100 drop-shadow-lg'>
              {subtitle}
            </h2>
            <h1 className=' font-sans text-4xl font-bold tracking-tight text-gray-50 drop-shadow-lg'>
              {title}
            </h1>
          </div>
        </div>
        <div className='relative col-span-6 h-[400px]  lg:col-span-2 '>
          <div className='group flex h-[280px] items-center rounded-t-md border-b-2 border-gray-50 bg-primary-200'>
            <Link href={user?.name ? "/dashboard" : "/user/signin"}>
              <p className='font-mono ml-8 text-4xl font-bold tracking-wider drop-shadow-md '>
                {user?.name ? `参加考试` : "快速登录"}
                <span className='ml-4 transition-all duration-300 group-hover:ml-8'>
                  ➡️
                </span>
              </p>
            </Link>
          </div>
          <div className='flex h-[120px] items-center rounded-b-md bg-primary-200 hover:bg-primary-100'>
            <p className='font-mono ml-8 text-lg tracking-wide drop-shadow-md'>
              {user?.name ? (
                <>
                  <span className='underline before:content-["“"] after:content-["”"]'>
                    {user?.name}
                  </span>
                  ,你好!
                </>
              ) : (
                "前往登录 ⬆️"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

TimgBase.propTypes = {
  imagSrc: PropTypes.object.isRequired,
  user: PropTypes.object,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default TimgBase;
