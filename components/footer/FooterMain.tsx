'use client'
import React from 'react'
import darklogo from "/public/images/stubbz_logo.png";
import lightlogo from "/public/images/stubbz_logo_light.png";
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FooterLinks } from '@/constants/Navigations';
import { Github, Instagram, Twitter } from 'lucide-react';

const FooterMain = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center md:items-stretch gap-16 max-w-7xl mx-auto px-4">
      <div className="md:self-start flex flex-col gap-8">
        <Link href="/" className="flex justify-center md:justify-start items-center gap-4">
          <Image
            src={ lightlogo }
            height={30}
            width={30}
            alt="stubbz_logo"
          />
          <h5 className="text-xl">Stubbz</h5>
        </Link>
        <span>Event management and tickting platform</span>
        <nav>
          <ul className="flex flex-col md:flex-row items-center gap-8">
            {FooterLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="opacity-60 hover:opacity-100 cursor-pointer hover:ease-in-out delay-100 transition-all duration-500"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border pt-8 flex flex-col gap-8 md:flex-row justify-between items-center">
        <div className="space-x-2">
          <span>&copy; {new Date().getFullYear()} Stubbz.</span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-primary opacity-70 hover:opacity-100 hover:ease-in-out delay-100 transition-all duration-500"
          >
            <Twitter />
          </Link>
          <Link href="/" className="text-primary opacity-70 hover:opacity-100 hover:ease-in-out delay-100 transition-all duration-500">
            <Instagram />
          </Link>
          <Link href="/" className="text-primary opacity-70 hover:opacity-100 hover:ease-in-out delay-100 transition-all duration-500">
            <Github />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FooterMain