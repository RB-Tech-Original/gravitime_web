import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function MVPBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 right-0 z-50 p-2 sm:p-4"
      >
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-lg shadow-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 max-w-xs sm:max-w-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-amber-900 text-sm">MVP/Demo Version</h3>
            <p className="text-amber-800 text-xs mt-1">
              This is an MVP demonstration of the GraviTime Android application. For development and testing purposes only.
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-amber-600 hover:text-amber-700 hover:bg-amber-100 rounded-md p-1 transition-colors duration-200"
            aria-label="Close banner"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
