import { Mail, Shield, ArrowRight, ExternalLink, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const linkHoverVariants = {
    hover: {
      x: 4,
      transition: { duration: 0.2 },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#1E293B] to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#E53935] rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="flex items-center space-x-3 mb-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src="/logo.png" alt="GraviTime Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold">GraviTime</span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted companion for efficient time-off management, powered by Odoo.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-[#E53935]" /> Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Features', id: 'features', Icon: ArrowRight },
                { label: 'Documentation', id: 'documentation', Icon: ArrowRight },
                { label: 'Odoo Portal', href: 'https://ipl-pfe-2025-groupe03.odoo.com/web/login', Icon: ExternalLink, external: true },
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  variants={linkHoverVariants}
                  whileHover="hover"
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#E53935] transition-colors flex items-center gap-2"
                    >
                      <link.Icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        const element = document.getElementById(link.id);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-400 hover:text-[#E53935] transition-colors flex items-center gap-2"
                    >
                      <link.Icon className="w-4 h-4" />
                      {link.label}
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#E53935]" /> Support
            </h3>
            <ul className="space-y-3">
              <motion.li variants={linkHoverVariants} whileHover="hover">
                <a
                  href="mailto:c.relais@atl.be"
                  className="flex items-center text-gray-400 hover:text-[#E53935] transition-colors gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>c.relais@atl.be</span>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-gray-700 pt-8 origin-left"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <span>©</span>
            <span>2025 Londer. Internal Use Only. All rights reserved.</span>
            <Zap className="w-4 h-4 text-[#E53935]" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

