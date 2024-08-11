'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import Link from 'next/link';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface CarosolProps {
  data: Movie[];
}
const Carosol = ({ data }: CarosolProps) => {
  return (
    <div className=' w-full'>
      <Carousel responsive={responsive}>
        {data &&
          data.map((movie: Movie) => (
            <Link href={`/moviedetails/${movie.id}`} key={movie.id}>
              <div className='w-56 flex-shrink-0 cursor-pointer mx-2'>
                {movie.poster_path ? (
                  <Image
                    alt={movie.title}
                    width={400}
                    height={200}
                    src={`https://image.tmdb.org/t/p/w500${
                      movie.poster_path || movie.backdrop_path
                    }`}
                    className='w-full h-64 object-cover rounded-md'
                  />
                ) : (
                  <div className='w-full h-full  flex items-center justify-center text-white'>
                    No Image Available
                  </div>
                )}

                <h2 className='text-white  text-xl font-bold my-2'>
                  {movie.title}
                </h2>
                <p className='text-white/50 text-sm'>{movie.release_date}</p>
              </div>
            </Link>
          ))}
      </Carousel>
    </div>
  );
};

export default Carosol;
