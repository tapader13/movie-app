'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { addFavorite } from '@/lib/constant';

const AddFavoriteButton = ({
  movieId,
  movieDetails,
}: {
  movieId: number;
  movieDetails: any;
}) => {
  const handleAddFavorite = async () => {
    const accountId = localStorage.getItem('accountId');

    if (!accountId) {
      alert('need to login');
      return;
    }

    try {
      const response = await fetch(`${addFavorite}${accountId}/favorite`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTJhMTljYTc0Y2JkMDA5MDFmNGVlM2RkZjM0Nzc1NCIsIm5iZiI6MTcyMzIxMjI4MC42Mzg0MDYsInN1YiI6IjY2YjYyMDA2ZDM1OTNhODJkYzI3MDU2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5KvH9hQ5ma03_Uz5k8sNvmLIm-aEULp-cdbhJu_bOQY',
        },
        body: JSON.stringify({
          media_type: 'movie',
          media_id: movieId,
          favorite: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Movie added to favorites:', data);
      } else {
        const errorData = await response.json();
        console.error('Failed to add movie to favorites:', errorData);
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  return (
    <Button className='w-1/4 my-3' onClick={handleAddFavorite}>
      Add Favorite
    </Button>
  );
};

export default AddFavoriteButton;
