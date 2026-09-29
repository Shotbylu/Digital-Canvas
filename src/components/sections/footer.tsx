import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top"><a className="site-mark site-mark--footer" href="#top">LUNGELO<span>.</span></a><p>Thoughtful marketing.<br />Work that moves people.</p><a href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div>
      <div className="site-footer__bottom"><span>© {new Date().getFullYear()} Lungelo Sibisi</span><span>Johannesburg, South Africa <span aria-hidden="true">·</span> Made with intention</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
