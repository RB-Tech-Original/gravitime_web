import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isConnected, userData, logout } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="/logo.png"
                alt="GraviTime Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-[#1E293B]">
                GraviTime
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-[#64748B] hover:text-[#E53935] transition-colors font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("documentation")}
                className="text-[#64748B] hover:text-[#E53935] transition-colors font-medium"
              >
                Documentation
              </button>
              {isConnected && userData ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#E53935]/10 rounded-lg">
                    <User className="w-4 h-4 text-[#E53935]" />
                    <span className="text-sm text-[#64748B]">
                      Welcome,{" "}
                      <span className="font-semibold text-[#1E293B]">
                        {userData.name}
                      </span>
                    </span>
                  </div>
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 border-2 border-[#E53935] text-[#E53935] rounded-lg font-medium hover:bg-[#E53935] hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={() => setIsLoginModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 border-2 border-[#E53935] text-[#E53935] rounded-lg font-medium hover:bg-[#E53935] hover:text-white transition-all duration-300"
                >
                  Login
                </motion.button>
              )}
            </div>

            <button
              className="md:hidden text-[#1E293B]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                <button
                  onClick={() => scrollToSection("features")}
                  className="block w-full text-left px-4 py-2 text-[#64748B] hover:text-[#E53935] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("documentation")}
                  className="block w-full text-left px-4 py-2 text-[#64748B] hover:text-[#E53935] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Documentation
                </button>
                {isConnected && userData ? (
                  <>
                    <div className="px-4 py-2 text-sm text-[#64748B] flex items-center gap-2">
                      <User className="w-4 h-4 text-[#E53935]" />
                      <span>
                        Welcome,{" "}
                        <span className="font-semibold text-[#1E293B]">
                          {userData.name}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-center px-4 py-2 border-2 border-[#E53935] text-[#E53935] rounded-lg font-medium hover:bg-[#E53935] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 border-2 border-[#E53935] text-[#E53935] rounded-lg font-medium hover:bg-[#E53935] hover:text-white transition-all duration-300"
                  >
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
