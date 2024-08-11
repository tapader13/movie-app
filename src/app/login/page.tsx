'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/action';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Call the server action
    const result = await login(formData);

    // Handle the result
    if (result.success) {
      localStorage.setItem('accountId', result.accountId);
      console.log('Logged in successfully and stored sessionId and accountId');
      router.push('/');
    } else {
      setError(result.error);
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-4 items-center'>
          <Label className='font-extrabold text-xl' htmlFor='username'>
            UserName
          </Label>
          <Input
            type='text'
            name='username'
            placeholder='Enter UserName.....'
          />
        </div>
        <div className='flex gap-4 items-center my-5'>
          <Label className='font-extrabold text-xl' htmlFor='password'>
            Password
          </Label>
          <Input
            type='password'
            name='password'
            placeholder='Enter Password.....'
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='text-center'>
          <Button type='submit'>Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
