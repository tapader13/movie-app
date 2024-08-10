import Link from 'next/link';

const Nav = () => {
  return (
    <div className=' fixed left-0 right-0 z-20  py-5 bg-[#032541]/75'>
      <div className='flex max-w-[1200px] justify-between mx-auto'>
        <div>
          <Link href={'/'}>
            <h1 className=' text-3xl text-primary '>TMDB</h1>
          </Link>
        </div>
        <div className='flex items-center justify-between gap-10'>
          <Link className=' text-xl text-primary ' href={'/movies'}>
            Movies
          </Link>
          <Link className=' text-xl text-primary ' href={'/tvshows'}>
            TV Shows
          </Link>
          <Link className=' text-xl text-primary ' href={'/people'}>
            People
          </Link>
          <Link className=' text-xl text-primary ' href={'/more'}>
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
