import { ChevronDown } from "lucide-react";

interface NavbarProps {
  onGetStarted: () => void;
}

export default function Navbar({ onGetStarted }: NavbarProps) {
  return (
    <nav
      id="main-navbar"
      className="fixed top-0 left-0 right-0 w-full z-50 bg-transparent px-6 py-4 flex items-center justify-between"
    >
      {/* Left Section: Sunburst icon (24x24px SVG) */}
      <div id="navbar-brand" className="flex items-center gap-3">
        <a
          id="navbar-logo-link"
          href="#"
          aria-label="Home"
          className="inline-flex items-center transition-opacity duration-200 hover:opacity-80"
        >
          <svg
            id="sunburst-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
          >
            {/* Center Core */}
            <circle cx="12" cy="12" r="3.2" fill="currentColor" />
            {/* Cardinal and Diagonal Rays */}
            <path
              d="M12 2.5V6M12 18V21.5M2.5 12H6M18 12H21.5M5.28 5.28L7.75 7.75M16.25 16.25L18.72 18.72M5.28 18.72L7.75 16.25M16.25 7.75L18.72 5.28"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>

      {/* Center Section (hidden on mobile, visible md:flex) */}
      <div
        id="navbar-center-links"
        className="hidden md:flex items-center gap-8 font-['Instrument_Sans',sans-serif] text-sm font-medium"
      >
        <div id="nav-item-features" className="relative group">
          <button
            id="nav-features-btn"
            type="button"
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <span>Features</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
          </button>
        </div>

        <a
          id="nav-link-how-it-works"
          href="#how-it-works"
          className="text-white/80 hover:text-white transition-colors duration-200"
        >
          How It Works
        </a>

        <a
          id="nav-link-technology"
          href="#technology"
          className="text-white/80 hover:text-white transition-colors duration-200"
        >
          Technology
        </a>

        <a
          id="nav-link-about"
          href="#about"
          className="text-white/80 hover:text-white transition-colors duration-200"
        >
          About
        </a>
      </div>

      {/* Right Section */}
      <div id="navbar-right-actions" className="flex items-center gap-6">
        <a
          id="navbar-try-docinsight"
          href="#"
          onClick={(e) => { e.preventDefault(); onGetStarted(); }}
          className="hidden sm:block text-white/80 hover:text-white font-['Instrument_Sans',sans-serif] text-sm font-medium transition-colors duration-200"
        >
          Try DocInsight
        </a>

        <button
          onClick={onGetStarted}
          id="navbar-open-workspace"
          type="button"
          className="bg-white text-black rounded-full px-5 py-2.5 font-['Instrument_Sans',sans-serif] font-semibold text-sm transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          Open Workspace
        </button>
      </div>
    </nav>
  );
}
