'use client';
import { useState } from 'react';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
const SearchBar = () => {
  const router = useRouter();
  const [srcData, setSrcData] = useState<string>('');
  const handleSrc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (srcData.trim()) {
      router.push(`/searchmovie?q=${srcData}`);
    }
    setSrcData('');
  };
  return (
    <div>
      <form action='' onSubmit={handleSrc}>
        <Input
          value={srcData}
          onChange={(e) => setSrcData(e.target.value)}
          type='text'
          placeholder='Search any movie.....'
        />
      </form>
    </div>
  );
};

export default SearchBar;
