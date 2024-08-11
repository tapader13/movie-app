'use client';

import { useEffect, useState } from 'react';
import { getFavoriteMovies, options } from '@/lib/constant';
import Image from 'next/image';

const ShowFavoriteMovies = ({ id }: { id: string }) => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetch(
        `${getFavoriteMovies}${id}/favorite/movies`,
        options
      );
      const jsonData = await data.json();
      setMovies(jsonData.results);
    };

    fetchMovies();
  }, [id]);

  return (
    <div className='bg-black text-white p-4 pt-24'>
      <h2 className='text-2xl font-bold mb-4'>Favorite Movies</h2>
      <div className='flex flex-wrap justify-around gap-4'>
        {movies.map((movie: any) => (
          <div
            key={movie.id}
            className='flex bg-gray-800 gap-3 p-5 rounded-lg overflow-hidden mb-4'
            style={{ maxWidth: '700px' }}
          >
            <div className='w-[300px] h-[300px] relative '>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
              />
            </div>
            <div className='flex-1'>
              <h3 className='text-2xl font-bold mb-2 '>{movie.title}</h3>
              <p className='text-md mb-2 text-slate-400'>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p className='text-sx '>
                <strong>Overview:</strong> {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowFavoriteMovies;
