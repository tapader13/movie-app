'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
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
        {data.map((movie: Movie) => (
          <div key={movie.id} className='w-56 flex-shrink-0 mx-2'>
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movie.poster_path || movie.backdrop_path
              }`}
              alt={movie.title}
              width={100}
              height={100}
              className='w-full h-64 object-cover rounded-md'
            />
            <h2 className='text-white  text-xl font-bold my-2'>
              {movie.title}
            </h2>
            <p className='text-white/50 text-sm'>{movie.release_date}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carosol;
