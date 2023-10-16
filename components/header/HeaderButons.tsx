'use client'
import Link from 'next/link';
import React from 'react'
import { Button, buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';
import { MenuToggleProps } from '@/types/componentTypes';

const HeaderButons = ({ setMobileMenuToggled}: MenuToggleProps) => {
  const pathname = usePathname();
  return (
    <>
      <Button
        asChild
        disabled={pathname === "/login"}
        onClick={() => setMobileMenuToggled(false)}
      >
        <Link href="/login">Login</Link>
      </Button>
      <Button
        variant="outline"
        asChild
        disabled={pathname === "/sign-up"}
        onClick={() => setMobileMenuToggled(false)}
      >
        <Link href="/sign-up">SignUp</Link>
      </Button>
    </>
  );
};

export default HeaderButons