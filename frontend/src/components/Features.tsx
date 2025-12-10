import { WifiOff, Fingerprint, Users, Bell, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: WifiOff,
    title: 'Offline First',
    description: 'Create requests even without internet. Syncs automatically when you reconnect.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Fingerprint,
    title: 'Secure Access',
    description: 'Login once, then access quickly with PIN or Biometrics.',
    color: 'from-[#E53935] to-red-700',
    bgColor: 'bg-red-50',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Managers can approve or refuse requests directly from the app.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    description: 'Stay updated on your request status instantly.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
  },
];

export default function Features() {
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

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-[#E53935]/5 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/10 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            className="inline-block px-4 py-2 bg-[#E53935]/10 text-[#E53935] rounded-full text-sm font-semibold mb-4 border border-[#E53935]/20 flex items-center gap-2 w-fit mx-auto"
          >
            <Zap className="w-4 h-4" />
            Key Features
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1E293B] mb-4">
            What is GraviTime?
          </h2>
          <p className="text-lg sm:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            A powerful, secure, and user-friendly solution designed specifically for your team's needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {/* Icon with gradient */}
              <div className={`relative mb-5 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>

              <div className="relative">
                <h3 className="text-xl font-semibold text-[#1E293B] mb-3 group-hover:text-[#E53935] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent line */}
                <motion.div
                  className="mt-4 h-1 bg-gradient-to-r from-transparent via-[#E53935] to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

