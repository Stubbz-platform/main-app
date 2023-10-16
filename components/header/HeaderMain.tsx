'use client'
import { NavBarLinks } from '@/constants/Navigations';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import HeaderButons from './HeaderButons';
import ThemeSwitch from './themeSwitch';
import darklogo from "/public/images/stubbz_logo.png";
import lightlogo from "/public/images/stubbz_logo_light.png";
import ProfileMenu from '../common/ProfileMenu';


const HeaderMain = () => {
  const [mobileMenuToggled, setMobileMenuToggled] = useState<boolean>(false);
  const { data: session } = useSession();
  const {theme} = useTheme();

  return (
    <header
      className={`${
        mobileMenuToggled &&
        "border-b-0 h-full fixed top-0 left-0 bottom-0 right-0 z-50 bg-background"
      } border-b-2 py-4 tracking-wider`}
    >
      <div className="hidden lg:flex justify-between items-center max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src={theme === "dark" ? lightlogo : darklogo}
            height={35}
            width={35}
            alt="stubbz_logo"
          />
          <h5 className="text-2xl">Stubbz</h5>
        </Link>
        <nav>
          <ul className="flex items-center justify-between gap-4">
            {NavBarLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="opacity-60 hover:opacity-100 hover:ease-in-out delay-100 transition-all duration-500"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {session ? (
            <ProfileMenu />
          ) : (
            <HeaderButons setMobileMenuToggled={setMobileMenuToggled} />
          )}
          <ThemeSwitch />
        </div>
      </div>

      {/* mobile menu */}
      <div className="flex flex-col gap-8 lg:hidden max-w-7xl mx-auto h-full px-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={theme === "dark" ? lightlogo : darklogo}
              height={30}
              width={30}
              alt="stubbz_logo"
            />
            <h5 className="text-xl">Stubbz</h5>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitch />
            {session && <ProfileMenu />}
            {mobileMenuToggled ? (
              <X
                className="opacity-60 hover:opacity-100 cursor-pointer hover:ease-in-out delay-100 transition-all duration-500 h-[30px]"
                onClick={() => setMobileMenuToggled(false)}
                size={30}
              />
            ) : (
              <Menu
                className="opacity-60 hover:opacity-100 cursor-pointer hover:ease-in-out delay-100 transition-all duration-500"
                onClick={() => setMobileMenuToggled(true)}
                size={30}
              />
            )}
          </div>
        </div>
        {mobileMenuToggled && (
          <>
            <div className="self-center flex items-center gap-2">
              {!session && (
                <HeaderButons setMobileMenuToggled={setMobileMenuToggled} />
              )}
            </div>
            <nav>
              <ul className="flex flex-col justify-between gap-4">
                {NavBarLinks.map((link, index) => (
                  <li key={index} className="border-b-2 py-6">
                    <Link
                      href={link.href}
                      className="opacity-60 hover:opacity-100 hover:ease-in delay-100 transition-opacity"
                      onClick={() => setMobileMenuToggled(false)}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
                {session && (
                  <li className="border-b-2 py-6">
                    <Link
                      href="/"
                      className="opacity-60 hover:opacity-100 hover:ease-in delay-100 transition-opacity"
                    >
                      User Profile
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

export default HeaderMain