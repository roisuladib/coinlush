'use clien';

import NextLink from 'next/link';

import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';

import { cn } from '@/utils';

import { ThemeSwitch } from './theme-switch';

export const Header = () => {
   const searchInput = (
      <Input
         aria-label="Search"
         classNames={{
            inputWrapper: 'bg-default-100',
            input: 'text-sm',
         }}
         // endContent={
         //    <Kbd
         //       className="hidden lg:inline-block"
         //       keys={['command']}>
         //       K
         //    </Kbd>
         // }
         labelPlacement="outside"
         placeholder="Search..."
         // startContent={
         //    <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
         // }
         type="search"
      />
   );

   return (
      <Navbar
         maxWidth="xl"
         shouldHideOnScroll
         isBordered
         classNames={{ wrapper: cn('px-10') }}>
         <NavbarBrand className="max-w-fit gap-3">
            <NextLink
               className="flex items-center justify-start gap-1 font-bold"
               href="/">
               <p className="text-2xl text-primary">CL</p>
               <p> Coinlush</p>
            </NextLink>
         </NavbarBrand>
         <NavbarContent justify="end">
            <NavbarItem isActive>
               <Link href="/">Coins</Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
            <NavbarItem>
               <ThemeSwitch />
            </NavbarItem>
         </NavbarContent>
      </Navbar>
   );
};
