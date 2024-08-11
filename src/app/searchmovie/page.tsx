'use client';
import { useState, useEffect } from 'react';
import { Movie } from '@/components/AiringToday';
import { options, searchMovies } from '@/lib/constant';
import Image from 'next/image';

const SearchMovie = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    // Get query parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    setQuery(queryParam);

    if (queryParam) {
      const searchMovie = async () => {
        try {
          const response = await fetch(
            `${searchMovies}?query=${queryParam}`,
            options
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setData(jsonData.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };

      searchMovie();
    }
  }, []);

  return (
    <div className='p-24 bg-black text-white'>
      <h1 className='text-3xl font-bold mb-6'>
        {query ? `Search Results for: ${query}` : 'Search Results'}
      </h1>

      <div className='container'>
        {data?.map((movie) => (
          <div key={movie.id} className='flex bg-gray-800 my-5 p-4 rounded-lg'>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${
                movie.poster_path || movie.backdrop_path
              }`}
              alt={movie.title}
              height={200}
              width={200}
              className='object-cover rounded-lg'
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
