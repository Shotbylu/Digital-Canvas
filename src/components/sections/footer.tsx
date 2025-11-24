import { bodyText, paddingX, paddingY } from '@/lib/responsive';

export function Footer() {
  return (
    <footer className={`bg-black text-white border-t border-zinc-800 ${paddingY}`}>
      <div className={`mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row ${paddingX} ${bodyText} text-gray-400`}>
        <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Lungelo Sibisi. All rights reserved.</p>
        <div className="flex gap-4 md:gap-6">
          <span className="flex items-center gap-2 text-xs uppercase tracking-wider">
            Made in South Africa 🇿🇦
          </span>
        </div>
      </div>
    </footer>
  );
}
