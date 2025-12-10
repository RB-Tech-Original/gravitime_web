import { useState } from 'react';
import { X, Loader, AlertCircle, User, Lock as LockIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading, error } = useAuth();

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 3) {
      errors.password = 'Password must be at least 3 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
      setEmail('');
      setPassword('');
      setValidationErrors({});
      onClose();
    } catch {
      // Error is handled by the context and displayed via the error state
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#E53935]/5 to-transparent">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B]">Login to GraviTime</h2>
                <p className="text-sm text-[#64748B] mt-1">Enter your Odoo credentials</p>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#64748B] hover:text-[#1E293B]" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3"
                >
                  <motion.div className="flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-red-700">Login Failed</p>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1E293B] mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E53935]" />
                  Email Address
                </label>
                <motion.input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationErrors.email) {
                      setValidationErrors({ ...validationErrors, email: undefined });
                    }
                  }}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    validationErrors.email
                      ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-300'
                      : 'border-gray-300 bg-white hover:border-gray-400 focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/20'
                  }`}
                  placeholder="your.email@company.com"
                  disabled={isLoading}
                />
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: validationErrors.email ? 1 : 0,
                    height: validationErrors.email ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {validationErrors.email && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>✕</span> {validationErrors.email}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <label htmlFor="password" className="block text-sm font-semibold text-[#1E293B] mb-2 flex items-center gap-2">
                  <LockIcon className="w-4 h-4 text-[#E53935]" />
                  Password
                </label>
                <motion.input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationErrors.password) {
                      setValidationErrors({ ...validationErrors, password: undefined });
                    }
                  }}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                    validationErrors.password
                      ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-300'
                      : 'border-gray-300 bg-white hover:border-gray-400 focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/20'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: validationErrors.password ? 1 : 0,
                    height: validationErrors.password ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {validationErrors.password && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>✕</span> {validationErrors.password}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-[#E53935] to-red-700 text-white font-semibold rounded-lg hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                      <Loader className="w-5 h-5" />
                    </motion.div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <LockIcon className="w-5 h-5" />
                    <span>Login</span>
                  </>
                )}
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-[#64748B] mt-4"
              >
                Use your Odoo account credentials to connect.
              </motion.p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
