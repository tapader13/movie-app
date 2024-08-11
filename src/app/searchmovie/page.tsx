'use client';
import { Movie } from '@/components/AiringToday';
import { options, searchMovies } from '@/lib/constant';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SearchMovie = () => {
  const params = useSearchParams().get('q');
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    const searchMovie = async () => {
      if (!params) return;

      const response = await fetch(`${searchMovies}?query=${params}`, options);
      const jsonData = await response.json();
      setData(jsonData.results);
    };

    searchMovie();
  }, [params]);

  return (
    <div className='p-24 bg-black text-white'>
      <h1 className='text-3xl font-bold  mb-6'>
        {params ? `Search Results for: ${params}` : 'Search Results'}
      </h1>

      <div className='container'>
        {data?.map((movie) => (
          <div key={movie.id} className='flex bg-gray-800  my-5 p-4 rounded-lg'>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${
                movie.poster_path || movie.backdrop_path
              }`}
              alt={movie.title}
              height={200}
              width={200}
              className=' object-cover rounded-lg'
            />
            <div className='ml-6 flex flex-col justify-center'>
              <h2 className='text-3xl font-bold mb-2'>{movie.title}</h2>
              <p className='text-xl text-gray-300'>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovie;
