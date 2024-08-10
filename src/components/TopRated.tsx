import { options, toprated } from '@/lib/constant';
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
const getToprated = async () => {
  const data = await fetch(toprated, options);
  const jsonData = await data.json();
  return jsonData.results;
};
const TopRated = async () => {
  const data: Movie[] = await getToprated();

  return (
    <>
      <h1 className='text-white text-left font-bold text-4xl pb-12'>
        Top Rated Movies
      </h1>
      <div className=' w-screen  '>
        <Carosol data={data} />
      </div>
    </>
  );
};

export default TopRated;
