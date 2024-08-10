'use client';
import React, { useState, useEffect } from 'react';
import Carosol from './Carosol';
import { options, trandingseries } from '@/lib/constant';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

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

const TrandingShows = () => {
  const [based, setBased] = useState<string>('day');
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${trandingseries}${based}`, options);
      const result = await response.json();
      setData(result.results);
    };

    fetchData();
  }, [based]);

  return (
    <>
      <div className='flex items-center justify-start gap-10 py-10'>
        <h1 className='text-white text-left font-bold text-4xl'>
          Trending TV Shows
        </h1>
        <Tabs value={based} onValueChange={(value) => setBased(value)}>
          <TabsList className='flex gap-5 justify-start'>
            <TabsTrigger
              value='day'
              className='text-black rounded-lg hover:bg-orange-200 '
            >
              Day
            </TabsTrigger>
            <TabsTrigger
              value='week'
              className='text-black rounded-lg hover:bg-orange-200 '
            >
              Week
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='w-screen'>
        <Carosol data={data} />
      </div>
    </>
  );
};

export default TrandingShows;
