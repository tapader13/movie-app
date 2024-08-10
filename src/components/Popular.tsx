import { options, popular } from '@/lib/constant';
import Image from 'next/image';
import React from 'react';
import Carosol from './Carosol';

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
const getPopular = async () => {
  const data = await fetch(popular, options);
  const jsonData = await data.json();
  // console.log(jsonData.results, 'Popular');
  return jsonData.results;
};
const Popular = async () => {
  const data: Movie[] = await getPopular();

  return (
    <div className='  '>
      <h1 className='text-white text-left font-bold text-4xl py-12'>
        Popular Movies
      </h1>
      <div className=' w-screen  '>
        <Carosol data={data} />
      </div>
    </div>
  );
};

export default Popular;
