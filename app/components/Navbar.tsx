import {Link, useNavigate} from "react-router";
import {useState, useEffect, useRef} from "react";
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {
  const {auth} = usePuterStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="w-full px-4 py-3 flex justify-center">
      <nav className="w-full max-w-[1200px] bg-[#111C32]/85 backdrop-blur-md border border-[#8B5CF6]/18 rounded-xl px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
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
      <div className="flex items-center gap-3">
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
          <span className="hidden sm:inline">Upload Resume</span>
        </Link>
        {auth.isAuthenticated && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#182238] border border-[#26334D] flex items-center justify-center hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:scale-110 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:ring-offset-2 focus:ring-offset-[#111C32] transition-all duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-[#94A3B8]"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#111C32] border border-[#26334D] shadow-[0_4px_24px_rgba(0,0,0,0.4)] py-1 z-50">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F8FAFC] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6] transition-colors duration-200"
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
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      </nav>
    </div>
  );
};

export default Navbar;