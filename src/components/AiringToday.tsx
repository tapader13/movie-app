import { options, airingToday } from '@/lib/constant';
import React from 'react';
import Carosol from './Carosol';

export interface Movie {
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
const getToprated = async () => {
  const data = await fetch(airingToday, options);
  const jsonData = await data.json();
  // console.log(jsonData.results, 'ar');
  return jsonData.results;
};
const AiringToday = async () => {
  const data: Movie[] = await getToprated();

  return (
    <>
      <h1 className='text-white text-left font-bold text-4xl py-12'>
        Airing Today Shows
      </h1>
      <div className=' w-screen  '>
        <Carosol data={data} />
      </div>
    </>
  );
};

export default AiringToday;
