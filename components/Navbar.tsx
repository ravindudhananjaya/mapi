
import React from 'react';
import { Menu, X, Globe, UserCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ContentData, Language, User } from '../types';

interface NavbarProps {
  content: ContentData;
  lang: Language;
  setLang: (lang: Language) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ content, lang, setLang, user, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLang = () => {
    setLang(lang === Language.EN ? Language.NP : Language.EN);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${isActive(path) ? 'text-brand-orange font-bold' : 'text-gray-600 hover:text-brand-orange'
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${isActive(path) ? 'text-brand-orange bg-orange-50' : 'text-gray-700 hover:text-brand-orange hover:bg-gray-50'
    }`;

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin-dashboard';
    if (user?.role === 'provider') return '/provider-dashboard';
    if (user?.role === 'driver') return '/driver-dashboard';
    return '/dashboard';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <img src="/logo.png" alt="MAPI Logo" className="h-10 w-auto" />
              <span className="text-2xl font-extrabold text-brand-teal tracking-tight">MAPI</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkClass('/')}>{content.nav.home}</Link>
            {user?.role !== 'admin' && user?.role !== 'provider' && user?.role !== 'driver' && (
              <Link to="/services" className={navLinkClass('/services')}>{content.nav.services}</Link>
            )}
            <Link to="/about" className={navLinkClass('/about')}>{content.nav.about}</Link>
            <Link to="/contact" className={navLinkClass('/contact')}>{content.nav.contact}</Link>

            <button
              onClick={toggleLang}
              className="flex items-center space-x-1 text-gray-700 hover:text-brand-teal border border-gray-300 rounded-full px-3 py-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-semibold">{lang === Language.EN ? 'EN' : 'नेपाली'}</span>
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-2 text-brand-teal hover:text-teal-800 font-medium"
                >
                  <UserCircle className="h-6 w-6" />
                  <span>{content.nav.dashboard}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  {content.nav.logout}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-brand-teal text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-teal-900 transition-colors shadow-md hover:shadow-lg"
              >
                {content.nav.login}
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden gap-4">
            <button
              onClick={toggleLang}
              className="flex items-center space-x-1 text-gray-700 border border-gray-300 rounded-full px-2 py-1"
            >
              <span className="text-xs font-bold">{lang === Language.EN ? 'EN' : 'ने'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/')}>{content.nav.home}</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/services')}>{content.nav.services}</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/about')}>{content.nav.about}</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/contact')}>{content.nav.contact}</Link>

            {user ? (
              <>
                <Link to={getDashboardPath()} onClick={() => setIsOpen(false)} className={mobileNavLinkClass(getDashboardPath())}>{content.nav.dashboard}</Link>
                <button onClick={() => { onLogout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-800">{content.nav.logout}</button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-brand-teal font-bold hover:bg-gray-50"
              >
                {content.nav.login}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
