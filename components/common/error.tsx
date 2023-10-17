'use client'
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

const ErrorMessage = () => {
  return (
    <>
      <h2>Page Not Found</h2>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </>
  );
};

export default ErrorMessage