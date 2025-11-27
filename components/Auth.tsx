
import React, { useState } from 'react';
import { ContentData, UserRole } from '../types';
import { Lock, Mail, User, Eye, EyeOff, Shield, Heart, Truck } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);

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
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-gray-100"
      >
        <div>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-brand-teal/10 rounded-full">
              <User className="h-8 w-8 text-brand-teal" />
            </div>
          </div>
          <motion.h2
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-2 text-center text-3xl font-extrabold text-gray-900"
          >
            {isLogin ? content.auth.loginTitle : content.auth.registerTitle}
          </motion.h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Welcome back! Please enter your details." : "Create an account to get started."}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-5">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.auth.nameLabel}
                </label>
                <div className="relative rounded-md shadow-sm group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-brand-teal transition-colors" />
                  </div>
                  <input id="name" name="name" type="text" required className="focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3 border bg-gray-50 focus:bg-white transition-all outline-none" placeholder="Your Full Name" />
                </div>
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {content.auth.emailLabel}
              </label>
              <div className="relative rounded-md shadow-sm group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-brand-teal transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3 border bg-gray-50 focus:bg-white transition-all outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {content.auth.passwordLabel}
              </label>
              <div className="relative rounded-md shadow-sm group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-brand-teal transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className="focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-lg p-3 border bg-gray-50 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.auth.confirmPasswordLabel}
                </label>
                <div className="relative rounded-md shadow-sm group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-brand-teal transition-colors" />
                  </div>
                  <input id="confirmPassword" name="confirmPassword" type="password" required className="focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3 border bg-gray-50 focus:bg-white transition-all outline-none" placeholder="••••••••" />
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-brand-orange hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all shadow-lg hover:shadow-xl"
            >
              {isLogin ? content.auth.loginButton : content.auth.registerButton}
            </motion.button>
          </div>

          {/* Demo Login Buttons */}
          {isLogin && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">Quick Demo Access</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'admin')}
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all hover:shadow-md group"
                >
                  <Shield className="h-5 w-5 text-gray-500 group-hover:text-brand-teal mb-1" />
                  <span className="text-xs font-medium text-gray-600">Admin</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'provider')}
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all hover:shadow-md group"
                >
                  <Heart className="h-5 w-5 text-gray-500 group-hover:text-brand-orange mb-1" />
                  <span className="text-xs font-medium text-gray-600">Provider</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'driver')}
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all hover:shadow-md group"
                >
                  <Truck className="h-5 w-5 text-gray-500 group-hover:text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-gray-600">Driver</span>
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? content.auth.noAccount : content.auth.haveAccount}{' '}
            <Link
              to={isLogin ? '/register' : '/login'}
              className="font-bold text-brand-teal hover:text-teal-700 hover:underline transition-colors"
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
