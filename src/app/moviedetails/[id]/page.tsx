import AddFavoriteButton from '@/components/AddFavoriteButton';
import Carosol from '@/components/Carosol';
import ReviewCarosol from '@/components/ReviewCarosol';
import {
  addFavorite,
  images,
  movieDetails,
  options,
  recomandations,
  Review,
  similar,
} from '@/lib/constant';
import Image from 'next/image';
import React from 'react';

const getMovieDetails = async (id: number) => {
  const data = await fetch(`${movieDetails}${id}`, options);
  const jsonData = await data.json();
  return jsonData;
};

const getImages = async (id: number) => {
  const data = await fetch(`${images}${id}/images`, options);
  const jsonData = await data.json();
  return jsonData;
};

const getReview = async (id: number) => {
  const data = await fetch(`${Review}${id}/reviews`, {
    ...options,
    cache: 'no-store',
  });
  const jsonData = await data.json();
  return jsonData;
};

const getSimilar = async (id: number) => {
  const data = await fetch(`${similar}${id}/similar`, options);
  const jsonData = await data.json();
  return jsonData.results;
};

const getRecomandations = async (id: number) => {
  const data = await fetch(`${recomandations}${id}/recommendations`, options);
  const jsonData = await data.json();
  return jsonData.results;
};

const MovieDetails = async ({ params }: any) => {
  const data = await getMovieDetails(params.id);
  const images = await getImages(params.id);
  const reviews = await getReview(params.id);
  const similar = await getSimilar(params.id);
  const recomandations = await getRecomandations(params.id);

  return (
    <div className='bg-black text-white'>
      <div className='flex flex-row items-start pt-28 container'>
        <div className='w-1/2'>
          {data.poster_path || data.backdrop_path ? (
            <Image
              alt={data.title}
              width={400}
              height={200}
              src={`https://image.tmdb.org/t/p/w500${
                data.poster_path || data.backdrop_path
              }`}
              className='rounded-lg'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-white'>
              No Image Available
            </div>
          )}
        </div>
        <div className='w-1/2 flex flex-col justify-center'>
          <h1 className='text-4xl font-bold mb-4'>{data.original_title}</h1>
          <p className='text-lg mb-4'>{data.overview}</p>
          <p className='text-md mb-2'>
            <strong>Release Date:</strong> {data.release_date}
          </p>
          <p className='text-md mb-2'>
            <strong>Vote Count:</strong> {data.vote_count}
          </p>
          <p className='text-md mb-2'>
            <strong>Rating:</strong> {data.vote_average}
          </p>
          <AddFavoriteButton movieId={params.id} movieDetails={data} />
          <p className='text-md mb-2'>
            <strong>Genres:</strong>{' '}
            {data.genres && data.genres.length > 0
              ? data.genres.map((genre: any) => genre.name).join(', ')
              : 'N/A'}
          </p>
          <p className='text-md mb-2'>
            <strong>Budget:</strong> $
            {data.budget ? data.budget.toLocaleString() : 'N/A'}
          </p>
          <p className='text-md'>
            <strong>Revenue:</strong> $
            {data.revenue ? data.revenue.toLocaleString() : 'N/A'}
          </p>
          <span className='mt-2 font-extrabold'>Reviews:</span>
          <ReviewCarosol data={reviews.results} />
        </div>
      </div>
      <div className='ml-5'>
        <h1 className='text-2xl font-bold py-3'>Images</h1>
        <div className='flex flex-wrap gap-3'>
          {images.backdrops && images.backdrops.length > 0
            ? images.backdrops
                .slice(0, 10)
                .map((image: any, index: number) => (
                  <Image
                    key={index}
                    alt={data.title}
                    width={200}
                    height={200}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    className='rounded-lg'
                  />
                ))
            : 'No image available'}
        </div>
      </div>
      <div className=' bg-black mt-3'>
        <h1 className='text-white text-left font-bold text-4xl py-12'>
          Similar
        </h1>
        <Carosol data={similar} />
      </div>
      <div className=' bg-black'>
        <h1 className='text-white text-left font-bold text-4xl pb-12'>
          Recomandations
        </h1>
        <Carosol data={recomandations} />
      </div>
    </div>
  );
};

export default MovieDetails;
