import { ExternalLink, Shield, Zap, RefreshCw, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OdooIntegration() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1E293B] via-slate-900 to-[#334155] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#E53935] rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-72 h-72 sm:w-[600px] sm:h-[600px] bg-red-600 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 bg-[#E53935]/30 text-red-300 rounded-full text-sm font-semibold mb-4 border border-red-500/50 flex items-center gap-2 w-fit mx-auto"
          >
            <Lightbulb className="w-4 h-4" />
            Enterprise Integration
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Seamless Odoo Integration
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            GraviTime connects directly to your company's Odoo instance, ensuring real-time synchronization and data consistency.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: Shield, title: 'Secure Connection', description: 'Enterprise-grade encryption', color: 'from-green-400 to-green-600' },
            { icon: Zap, title: 'Real-time Sync', description: 'Instant data updates', color: 'from-yellow-400 to-yellow-600' },
            { icon: RefreshCw, title: 'Automatic Backup', description: 'Never lose your data', color: 'from-cyan-400 to-cyan-600' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              <div className={`relative mb-4 w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 relative">
                {item.title}
              </h3>
              <p className="text-gray-300 relative">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl text-center overflow-hidden relative"
        >
          {/* Background accent */}
          <motion.div
            className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#E53935]/5 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-4">
              Access Your Odoo Portal
            </h3>
            <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto leading-relaxed">
              Manage your time off requests, view your team's schedule, and access all HR features through the full Odoo web portal.
            </p>

            <motion.a
              href="https://ipl-pfe-2025-groupe03.odoo.com/web/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#E53935] to-red-700 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              Go to Odoo Web Portal
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="w-5 h-5 ml-2" />
              </motion.div>
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm text-[#64748B]"
            >
              Use the same credentials as your GraviTime app
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

