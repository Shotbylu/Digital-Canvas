'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'About', href: '#background' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="site-nav">
      <div className="site-nav__inner">
        <Link href="/" className="site-mark" aria-label="Lungelo Sibisi home">
          LUNGELO<span>.</span>
        </Link>
        <div className="site-nav__links">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
        <a className="site-nav__contact" href="#contact">
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
        <button className="site-nav__toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="site-nav__mobile">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</a>)}
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Let&apos;s talk <ArrowUpRight size={16} /></a>
        </div>
      )}
    </nav>
  );
}
