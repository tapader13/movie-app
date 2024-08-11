'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import moment from 'moment';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
interface AuthorDetails {
  name: string;
  username: string;
  avatar_path?: string;
  rating?: number;
}

interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface CarosolProps {
  data: Review[];
}
const ReviewCarosol = ({ data }: CarosolProps) => {
  console.log(data, 'cr');
  return (
    <div className=' w-full '>
      {data && data.length > 0 ? (
        <Carousel
          responsive={responsive}
          className='bg-[#1c0c0b] text-white mt-2 rounded-lg'
        >
          {data.map((movie: Review, i: number) => (
            <div
              key={i}
              className='w-full  p-5 flex-shrink-0 cursor-pointer mx-2'
            >
              <h1 className='text-xl'>Name: {movie.author_details.username}</h1>
              <p className='mt-2'>Rating: {movie.author_details.rating}</p>
              <p className=' mt-2'>
                {' '}
                {movie.content.slice(0, 400)}
                {movie.content.length > 400 && '...'}
              </p>
              <p className='mt-2'>
                {moment(movie.created_at).format('MMMM DD, YYYY, h:mm:ss A')}{' '}
              </p>
            </div>
          ))}
        </Carousel>
      ) : (
        'no reviews'
      )}
    </div>
  );
};

export default ReviewCarosol;
