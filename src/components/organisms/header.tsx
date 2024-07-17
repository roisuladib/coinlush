import NextLink from 'next/link';

import { Input } from '@nextui-org/input';
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
         position="sticky"
         isBordered
         classNames={{ wrapper: cn('px-10') }}>
         <NavbarContent
            className="basis-1/5 sm:basis-full"
            justify="start">
            <NavbarBrand
               as="li"
               className="max-w-fit gap-3">
               <NextLink
                  className="flex items-center justify-start gap-1"
                  href="/">
                  <p className="font-bold text-inherit">Coinlush</p>
               </NextLink>
            </NavbarBrand>
         </NavbarContent>

         <NavbarContent
            className="hidden basis-1/5 sm:flex sm:basis-full"
            justify="end">
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
            <NavbarItem>
               <ThemeSwitch />
            </NavbarItem>
         </NavbarContent>
      </Navbar>
   );
};
