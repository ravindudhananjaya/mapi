
import React from 'react';
import { ContentData, UserRole } from '../types';
import { Lock, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AuthProps {
  content: ContentData;
  initialMode: 'login' | 'register';
  onAuthSuccess: (role: UserRole) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const Auth: React.FC<AuthProps> = ({ content, initialMode, onAuthSuccess }) => {
  const isLogin = initialMode === 'login';

  const handleSubmit = (e: React.FormEvent, role: UserRole = 'family') => {
    e.preventDefault();
    onAuthSuccess(role);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-brand-orange/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10"
      >
        <div>
          <motion.h2
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          >
            {isLogin ? content.auth.loginTitle : content.auth.registerTitle}
          </motion.h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Welcome back! Please enter your details." : "Create an account to get started."}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {content.auth.nameLabel}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="name" name="name" type="text" required className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white transition-all" placeholder="Your Full Name" />
                </div>
              </motion.div>
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
                  className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white transition-all"
                  placeholder="you@example.com"
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
                  className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {content.auth.confirmPasswordLabel}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="confirmPassword" name="confirmPassword" type="password" required className="focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border bg-white transition-all" placeholder="••••••••" />
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-orange hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all shadow-md hover:shadow-lg"
            >
              {isLogin ? content.auth.loginButton : content.auth.registerButton}
            </motion.button>
          </div>

          {/* Demo Login Buttons */}
          {isLogin && (
            <div className="mt-6">
              <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">Demo Login As</p>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={(e) => handleSubmit(e, 'admin')} className="text-xs bg-gray-100 hover:bg-gray-200 py-2 rounded text-gray-600 font-medium transition-colors">Admin</button>
                <button type="button" onClick={(e) => handleSubmit(e, 'provider')} className="text-xs bg-gray-100 hover:bg-gray-200 py-2 rounded text-gray-600 font-medium transition-colors">Care Provider</button>
                <button type="button" onClick={(e) => handleSubmit(e, 'driver')} className="text-xs bg-gray-100 hover:bg-gray-200 py-2 rounded text-gray-600 font-medium transition-colors">Grocery Driver</button>
              </div>
            </div>
          )}
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? content.auth.noAccount : content.auth.haveAccount}{' '}
            <Link
              to={isLogin ? '/register' : '/login'}
              className="font-medium text-brand-teal hover:text-teal-700 underline transition-colors"
            >
              {isLogin ? content.auth.registerLink : content.auth.loginLink}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
