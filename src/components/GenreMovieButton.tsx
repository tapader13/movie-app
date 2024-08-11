'use client';

import { useEffect, useState } from 'react';
import { genremovie, options } from '@/lib/constant';
import { Button } from './ui/button';
import { typeGenre } from '@/app/genre/page';
import Image from 'next/image';

const getGenreMovie = async (genre: string) => {
  const response = await fetch(`${genremovie}?&with_genres=${genre}`, options);
  const data = await response.json();
  return data;
};

const GenreMovieButton = ({ data }: { data: typeGenre[] }) => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedGenre) {
        const data = await getGenreMovie(selectedGenre);
        setMovies(data.results);
        console.log(data.results, 'movies');
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  const handleButtonClick = (id: string) => {
    setSelectedGenre(id);
  };

  return (
    <div>
      {data &&
        data.map((gen) => (
          <Button
            key={gen.id}
            onClick={() => handleButtonClick(String(gen.id))}
            className='mr-5 mb-5'
          >
            {gen.name}
          </Button>
        ))}
      <div>
        {movies &&
          movies.map((movie: any) => (
            <div
              key={movie.id}
              className='flex p-5 border-b-[1px] border-slate-300/35 bg-black text-white mb-5'
            >
              <div className='relative w-[250px] h-[259px]'>
                {movie.backdrop_path || movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${
                      movie.poster_path || movie.backdrop_path
                    }`}
                    alt={movie.title}
                    layout='fill'
                    objectFit='cover'
                    className=' w-full h-full'
                  />
                ) : (
                  'No image found'
                )}
              </div>
              <div className='ml-5 w-2/3'>
                <h2 className='text-xl font-bold'>{movie.title}</h2>
                <p className='mt-3'>{movie.overview}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GenreMovieButton;
