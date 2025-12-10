import { Download, FileText, Lock, Apple, Loader2, ArrowRight, Zap, Shield, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

export default function Hero() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { isConnected } = useAuth();

  const scrollToDocumentation = () => {
    const element = document.getElementById('documentation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadClick = async () => {
    if (!isConnected) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      setIsDownloading(true);
      
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const authToken = localStorage.getItem('gravitime_auth_token');
      
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      // Request APK from backend with auth token
      const response = await fetch(`${BACKEND_URL}/download/apk`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Your session has expired. Please log in again.');
        }
        throw new Error('Download failed. Please try again.');
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'GraviTime_v1.0.apk');
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      const errorMessage = error instanceof Error ? error.message : 'Download failed. Please try again.';
      alert(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      y: -4,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  };

  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-white to-gray-50 pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-5 sm:top-20 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#E53935]/15 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -right-10 sm:bottom-10 sm:right-10 w-72 h-72 sm:w-[600px] sm:h-[600px] bg-red-200/10 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-[700px]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center lg:text-left flex flex-col justify-center"
          >
            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1E293B] leading-tight mb-6"
            >
              Manage your Time Off,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E53935] via-red-600 to-red-800">
                Anytime, Anywhere.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-[#64748B] mb-8 max-w-2xl leading-relaxed"
            >
              The official Odoo companion app for Atelier Grav. Offline support, biometric security, and real-time team calendar.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8"
            >
              {/* Primary Button */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full sm:w-auto"
              >
                <button
                  onClick={handleDownloadClick}
                  disabled={isDownloading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#E53935] to-red-700 text-white font-semibold rounded-xl hover:shadow-2xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <span className="relative flex items-center">
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Download APK v1.0
                      </>
                    )}
                  </span>
                </button>
              </motion.div>

              {/* Tertiary Button */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={scrollToDocumentation}
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#E53935] font-semibold rounded-xl border-2 border-[#E53935] hover:bg-[#E53935] hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
              >
                <FileText className="w-5 h-5" />
                <span>Documentation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Features List */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start text-sm text-[#64748B]"
            >
              {[
                { Icon: Wifi, label: 'Offline Ready' },
                { Icon: Shield, label: 'Secure' },
                { Icon: Zap, label: 'Fast' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.Icon className="w-4 h-4 text-[#E53935]" />
                  <span className="font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            variants={phoneVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            animate="animate"
            className="hidden lg:flex justify-center items-center"
          >
            {/* Samsung Phone Frame */}
            <div className="relative mx-auto">
              {/* Phone Body */}
              <div className="relative w-72 h-[600px] bg-black rounded-[2.5rem] border-8 border-black shadow-2xl overflow-hidden">
                {/* Notch/Status Bar */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>

                {/* Screen Content */}
                <div className="w-full h-full bg-white rounded-[2.3rem] overflow-hidden flex flex-col">
                  {/* Status Bar */}
                  <div className="h-8 bg-gray-900 flex items-center justify-between px-4 text-white text-xs">
                    <span>9:41</span>
                    <span>📶</span>
                  </div>

                  {/* Screen Image Content */}
                  <div className="flex-1 overflow-hidden">
                    <img
                      src="/example_screen.jpg"
                      alt="GraviTime App Screen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Phone Home Button Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute -z-10 inset-0 bg-gradient-to-r from-[#E53935]/30 to-red-700/30 rounded-[2.5rem] blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Secondary Glow */}
              <motion.div
                className="absolute -z-10 inset-0 w-[120%] h-[120%] -top-1/4 -left-1/4 bg-gradient-to-br from-[#E53935]/10 via-transparent to-transparent rounded-full blur-3xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </section>
  );
}
