import GenreMovieButton from '@/components/GenreMovieButton';
import { Button } from '@/components/ui/button';
import { genre, options } from '@/lib/constant';
import React from 'react';
const getGenre = async () => {
  const response = await fetch(`${genre}`, options);
  const data = await response.json();
  return data.genres;
};
export interface typeGenre {
  id: number;
  name: string;
}
const Genre = async () => {
  const data: typeGenre[] = await getGenre();
  return (
    <div className='pt-24 bg-black text-white min-h-screen'>
      <h1 className=' text-center font-bold text-4xl my-4'>
        Click any tab for serching related movies
      </h1>
      <div className='container flex flex-wrap '>
        <GenreMovieButton data={data} />
      </div>
    </div>
  );
};

export default Genre;
