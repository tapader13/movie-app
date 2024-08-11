'use client';

import { useEffect, useState } from 'react';
import { getFavoriteMovies, options } from '@/lib/constant';
import Image from 'next/image';
import { Button } from './ui/button';
import { addFavorite } from './../lib/constant';

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
  const handleDaleteFavorite = async (movieId: string) => {
    if (id) {
      try {
        const response = await fetch(`${addFavorite}${id}/favorite`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTJhMTljYTc0Y2JkMDA5MDFmNGVlM2RkZjM0Nzc1NCIsIm5iZiI6MTcyMzIxMjI4MC42Mzg0MDYsInN1YiI6IjY2YjYyMDA2ZDM1OTNhODJkYzI3MDU2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5KvH9hQ5ma03_Uz5k8sNvmLIm-aEULp-cdbhJu_bOQY',
          },
          body: JSON.stringify({
            media_type: 'movie',
            media_id: Number(movieId),
            favorite: false,
          }),
        });
        if (!response.ok) {
          throw new Error(
            `Failed to delete favorite movie: ${response.statusText}`
          );
        }
        if (response.ok) {
          setMovies((prevMovies) =>
            prevMovies.filter((movie) => movie.id !== movieId)
          );
          console.log('Movie removed from favorites');
        }
      } catch (error) {
        console.error('Error deleting favorite movie:', error);
      }
    }
  };
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
                <strong>Overview:</strong> {movie.overview.slice(0, 200)}
                {movie.overview.length > 200 && '...'}
              </p>
              <Button
                onClick={() => handleDaleteFavorite(movie.id)}
                className=' mt-5 bg-slate-500'
              >
                Remove from Favorite
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowFavoriteMovies;
