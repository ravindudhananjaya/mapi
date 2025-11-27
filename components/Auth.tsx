
import React from 'react';
import { ContentData, UserRole } from '../types';
import { Lock, Mail, User, Phone, MapPin, FileText } from 'lucide-react';

interface AuthProps {
  content: ContentData;
  initialMode: 'login' | 'register';
  onAuthSuccess: (role: UserRole) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const Auth: React.FC<AuthProps> = ({ content, initialMode, onAuthSuccess, onSwitchMode }) => {
  const isLogin = initialMode === 'login';

  const handleSubmit = (e: React.FormEvent, role: UserRole = 'family') => {
    e.preventDefault();
    onAuthSuccess(role);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? content.auth.loginTitle : content.auth.registerTitle}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                     {content.auth.nameLabel}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="name" name="name" type="text" required className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                     {content.auth.phoneLabel}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="phone" name="phone" type="tel" required className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white" />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                     {content.auth.addressLabel}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="address" name="address" type="text" required className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white" />
                  </div>
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {content.auth.emailLabel}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {content.auth.passwordLabel}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white"
                />
              </div>
            </div>

             {!isLogin && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                     {content.auth.confirmPasswordLabel}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="confirmPassword" name="confirmPassword" type="password" required className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white" />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                     {content.auth.notesLabel}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea id="notes" name="notes" rows={3} className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white" />
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-orange hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-colors"
            >
              {isLogin ? content.auth.loginButton : content.auth.registerButton}
            </button>
          </div>

          {/* Demo Login Buttons */}
          {isLogin && (
             <div className="mt-6">
                <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">Demo Login As</p>
                <div className="grid grid-cols-2 gap-3">
                   <button type="button" onClick={(e) => handleSubmit(e, 'admin')} className="text-xs bg-gray-200 hover:bg-gray-300 py-2 rounded text-gray-700 font-medium">Admin</button>
                   <button type="button" onClick={(e) => handleSubmit(e, 'provider')} className="text-xs bg-gray-200 hover:bg-gray-300 py-2 rounded text-gray-700 font-medium">Care Provider</button>
                   <button type="button" onClick={(e) => handleSubmit(e, 'driver')} className="text-xs bg-gray-200 hover:bg-gray-300 py-2 rounded text-gray-700 font-medium">Grocery Driver</button>
                </div>
             </div>
          )}
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? content.auth.noAccount : content.auth.haveAccount}{' '}
            <button
              onClick={() => onSwitchMode(isLogin ? 'register' : 'login')}
              className="font-medium text-brand-teal hover:text-teal-700 underline"
            >
              {isLogin ? content.auth.registerLink : content.auth.loginLink}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
