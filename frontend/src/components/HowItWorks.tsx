import { Download, Link, ShieldCheck, Calendar, CheckCircle, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Download,
    title: 'Download & Install',
    description: 'Get the .apk file from the link above and allow installation from unknown sources in your Android settings.',
  },
  {
    icon: Link,
    title: 'Connect',
    description: 'Use your standard Odoo email and password to authenticate with your company instance.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure',
    description: 'Set up a 5-digit PIN and enable FaceID or Fingerprint authentication for quick and secure access.',
  },
  {
    icon: Calendar,
    title: 'Manage',
    description: 'View your balance, check the team calendar, book your holidays, and manage your time off requests.',
  },
];

export default function HowItWorks() {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="documentation" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 right-0 w-96 h-96 bg-[#E53935]/5 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-0 w-96 h-96 bg-red-100/5 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
            <CheckCircle className="w-4 h-4" />
            Simple Setup
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1E293B] mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-[#64748B]">
            Get started in just four simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E53935] via-[#E53935]/50 to-gray-200 hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ originY: 0 }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Icon Circle - Hidden on mobile */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="hidden md:flex flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#E53935] to-red-700 rounded-2xl items-center justify-center shadow-lg relative z-10 group cursor-pointer"
                >
                  <step.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" strokeWidth={2} />
                </motion.div>

                {/* Content Box */}
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-[#E53935]/30 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + index * 0.1 }}
                      className="text-sm font-bold text-white bg-gradient-to-r from-[#E53935] to-red-700 px-3 py-1 rounded-full"
                    >
                      Step {index + 1}
                    </motion.span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
                    {step.description}
                  </p>

                  {/* Accent line */}
                  <motion.div
                    className="mt-4 h-1 bg-gradient-to-r from-[#E53935] to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="relative bg-gradient-to-br from-[#E53935]/10 via-transparent to-transparent rounded-2xl p-8 md:p-12 border-2 border-[#E53935]/20 overflow-hidden group hover:border-[#E53935]/40 transition-all duration-300">
            {/* Background animated element */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#E53935]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />

            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-3 flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6 text-[#E53935]" />
                Need Help?
              </h3>
              <p className="text-[#64748B] mb-6 max-w-2xl mx-auto text-base sm:text-lg">
                Contact your IT support team for assistance with installation or connectivity issues.
              </p>
              <motion.a
                href="mailto:c.relais@atl.be"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-8 py-3 bg-white text-[#E53935] font-semibold rounded-lg border-2 border-[#E53935] hover:bg-[#E53935] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

