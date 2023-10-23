'use client'
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

const ErrorMessage = () => {
  return (
    <>
      <h2>An Error occurred.</h2>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </>
  );
};

export default ErrorMessage