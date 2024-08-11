'use client';

import ShowFavoriteMovies from '@/components/ShowFavoriteMovies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FavoriteMoviesList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accountId = localStorage.getItem('accountId');
    if (accountId) {
      setIsAuthenticated(accountId);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <div>
      <ShowFavoriteMovies id={isAuthenticated} />
    </div>
  );
};

export default FavoriteMoviesList;
