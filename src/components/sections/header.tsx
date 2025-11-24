'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { paddingX, paddingY } from '@/lib/responsive';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Background', href: '#background' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed w-full z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-100'
            : 'bg-transparent py-6'
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-6xl items-center justify-between',
            paddingX
          )}
        >
          <Link
            href="/"
            className={cn(
              'text-2xl font-bold tracking-tighter flex items-center gap-2',
              scrolled ? 'text-black' : 'text-white'
            )}
          >
            LUNGELO<span className="text-primary">.</span>
          </Link>

          <div
            className={cn(
              'hidden sm:flex items-center space-x-6 text-sm font-medium tracking-wide',
              scrolled ? 'text-black' : 'text-white'
            )}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              asChild
              variant={scrolled ? 'default' : 'outline'}
              className={cn(
                'font-semibold px-6 py-2 min-h-[44px]',
                scrolled
                  ? 'border-black hover:bg-black hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-black',
                !scrolled && 'text-white'
              )}
            >
              <a href="#contact">Let&apos;s Talk</a>
            </Button>
          </div>

          <button
            className="sm:hidden rounded-full border border-white/40 bg-black/30 p-3 backdrop-blur-sm transition-colors hover:border-white/80"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className={cn('h-6 w-6', scrolled ? 'text-black' : 'text-white')} />
            ) : (
              <Menu className={cn('h-6 w-6', scrolled ? 'text-black' : 'text-white')} />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden',
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-72 max-w-[80%] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out',
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className={cn('flex items-center justify-between border-b border-gray-100', paddingX, paddingY)}>
            <span className="text-lg font-semibold text-black">Navigation</span>
            <button
              className="rounded-full border border-gray-200 p-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-black" />
            </button>
          </div>
          <div className="flex flex-col space-y-4 px-6 py-6 text-base text-gray-800">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-2 py-2 transition-colors hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-4 w-full bg-black text-white hover:bg-primary hover:text-primary-foreground"
              size="lg"
            >
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                Let&apos;s Talk
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
