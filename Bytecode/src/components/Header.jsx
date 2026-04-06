import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/bytecode_learners_logo.jpeg';

const Header = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentHash = location.hash;
    const validHashes = ['#about', '#events', '#projects', '#team', '#contact'];

    if (currentHash && !validHashes.includes(currentHash)) {
      navigate('/404-not-found');
    }
  }, [location, navigate]);

  const navItems = [
    { name: 'About', href: '/#about' },
    { name: 'Events', href: '/#events' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Team', href: '/#team' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur-xl shadow-[0_0_40px_rgba(80,255,105,0.08)] border-b border-primary/5">
      <div className="flex justify-between items-center px-6 md:px-8 h-20 w-full">
        {/* Logo Section */}
        <NavHashLink smooth key="/" to="/">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Bytecode Learners Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-cover border border-primary/20"
            />
            <span className="text-2xl font-bold tracking-tighter text-primary font-headline uppercase">
              BYTECODE LEARNERS
            </span>
          </div>
        </NavHashLink>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden md:flex gap-8 items-center font-label font-medium uppercase tracking-widest text-xs">
          {navItems.map((item) => (
            <NavHashLink
              smooth
              key={item.name}
              to={item.href}
              onClick={() => {
                setActiveTab(item.name);
                setIsMenuOpen(false);
              }}
              className={`transition-all duration-200 pl-2 border-l-2 ${
                activeTab === item.name
                  ? 'text-primary border-primary'
                  : 'text-on-surface-variant border-transparent hover:text-on-surface'
              }`}
            >
              {item.name}
            </NavHashLink>
          ))}

          <Link
            to="/login"
            className="ml-4 px-5 py-1.5 border border-primary/50 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-primary hover:text-surface transition-all duration-300 neon-glow"
          >
            Login
          </Link>
        </nav>

        {/* --- MOBILE HAMBURGER --- */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-primary focus:outline-none hover:bg-primary/10 rounded-sm transition-colors"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN --- */}
      <div
        className={`md:hidden absolute w-full bg-zinc-950/95 backdrop-blur-2xl border-b border-primary/10 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-6 gap-5 font-label uppercase tracking-widest text-xs">
          {navItems.map((item) => (
            <NavHashLink
              smooth
              key={item.name}
              to={item.href}
              onClick={() => {
                setActiveTab(item.name);
                setIsMenuOpen(false);
              }}
              className={`${
                activeTab === item.name
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.name}
            </NavHashLink>
          ))}

          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 w-full py-3 border border-primary text-primary text-center font-bold uppercase tracking-widest text-[10px]"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
