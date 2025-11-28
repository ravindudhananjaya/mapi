
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
    `px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg ${isActive(path)
      ? 'text-brand-teal bg-teal-50 font-bold'
      : 'text-gray-600 hover:text-brand-teal hover:bg-gray-50'
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block px-4 py-3 rounded-xl text-base font-medium cursor-pointer transition-all duration-200 ${isActive(path)
      ? 'text-brand-teal bg-teal-50 shadow-sm'
      : 'text-gray-700 hover:text-brand-teal hover:bg-gray-50'
    }`;

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin-dashboard';
    if (user?.role === 'provider') return '/provider-dashboard';
    if (user?.role === 'driver') return '/driver-dashboard';
    return '/dashboard';
  };

  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="bg-brand-teal/10 p-2 rounded-xl">
                <img src="/logo.png" alt="MAPI Logo" className="h-8 w-auto" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">MAPI<span className="text-brand-teal">CARE</span></span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={navLinkClass('/')}>{content.nav.home}</Link>
            {user?.role !== 'admin' && user?.role !== 'provider' && user?.role !== 'driver' && (
              <Link to="/services" className={navLinkClass('/services')}>{content.nav.services}</Link>
            )}
            <Link to="/about" className={navLinkClass('/about')}>{content.nav.about}</Link>
            <Link to="/contact" className={navLinkClass('/contact')}>{content.nav.contact}</Link>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <button
              onClick={toggleLang}
              className="flex items-center space-x-2 text-gray-600 hover:text-brand-teal px-3 py-1.5 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-semibold">{lang === Language.EN ? 'EN' : 'नेपाली'}</span>
            </button>

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-2 text-brand-teal hover:text-teal-800 font-medium px-4 py-2 bg-teal-50 rounded-full hover:bg-teal-100 transition-all"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>{content.nav.dashboard}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  {content.nav.logout}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary ml-4 !px-6 !py-2 !text-sm"
              >
                {content.nav.login}
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden gap-4">
            <button
              onClick={toggleLang}
              className="flex items-center space-x-1 text-gray-700 border border-gray-200 rounded-full px-3 py-1.5 bg-gray-50"
            >
              <span className="text-xs font-bold">{lang === Language.EN ? 'EN' : 'ने'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-brand-teal hover:bg-teal-50 focus:outline-none transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/')}>{content.nav.home}</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/services')}>{content.nav.services}</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/about')}>{content.nav.about}</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/contact')}>{content.nav.contact}</Link>

            <div className="border-t border-gray-100 my-4 pt-4">
              {user ? (
                <>
                  <Link to={getDashboardPath()} onClick={() => setIsOpen(false)} className={mobileNavLinkClass(getDashboardPath())}>
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5" />
                      {content.nav.dashboard}
                    </div>
                  </Link>
                  <button onClick={() => { onLogout(); setIsOpen(false); }} className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-2">
                    {content.nav.logout}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center block px-4 py-3 rounded-xl text-base font-bold text-white bg-brand-teal shadow-lg shadow-brand-teal/20 mt-4"
                >
                  {content.nav.login}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
