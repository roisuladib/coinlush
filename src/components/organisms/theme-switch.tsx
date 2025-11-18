'use client';

import { type SwitchProps, useSwitch } from '@heroui/switch';
import { cn } from '@heroui/theme';

import { useIsSSR } from '@react-aria/ssr';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useTheme } from 'next-themes';
import { type FC, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import useSound from 'use-sound';

import { MoonFilledIcon, SunFilledIcon } from '^/components';

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps['classNames'];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const ref = useRef<HTMLDivElement>(null);
  const [playLight] = useSound('/sounds/switch-on.mp3');
  const [playNight] = useSound('/sounds/switch-off.mp3');

  const isLight = theme === 'light';
  const nextTheme = isLight ? 'dark' : 'light';

  const handleSetTheme = useCallback(() => {
    if (isLight) playNight();
    else playLight();

    setTheme(nextTheme);
  }, [isLight, nextTheme, playLight, playNight, setTheme]);

  const onChange = useCallback(async () => {
    const isAppearanceTransition =
      typeof document !== 'undefined' &&
      !!document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition || !ref.current) {
      handleSetTheme();

      return;
    }

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    await document.startViewTransition(() => {
      flushSync(() => {
        handleSetTheme();
      });
    }).ready;

    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`];

    document.documentElement.animate(
      {
        clipPath: theme === 'light' ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement:
          theme === 'light' ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    );
  }, [handleSetTheme, theme]);

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: theme === 'light' || isSSR,
    'aria-label': `Switch to ${nextTheme} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: cn(
          'cursor-pointer px-px transition-opacity hover:opacity-80',
          className,
          classNames?.base,
        ),
      })}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        ref={ref}
        className={slots.wrapper({
          class: cn(
            [
              'h-auto w-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'px-0',
              'mx-0',
            ],
            classNames?.wrapper,
          ),
        })}>
        {!isSelected || isSSR ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
      </div>
    </Component>
  );
};
