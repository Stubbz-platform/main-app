'use client'
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

const ErrorMessage = () => {
  return (
    <div className="space-y-6">
      <h2>Page Not Found</h2>
      <Link href="/">
        <Button variant="link">Please Return Home!</Button>
      </Link>
    </div>
  );
};

export default ErrorMessage