import {Link} from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between max-w-[1200px] mx-auto">
      <Link to="/" className="flex items-center gap-2 group">
        {/* Document/Resume icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-[#8B5CF6] group-hover:text-[#3B82F6] transition-colors duration-200"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span className="text-xl font-bold text-gradient">ResumeIQ</span>
      </Link>
      <Link
        to="/upload"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white primary-gradient hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;