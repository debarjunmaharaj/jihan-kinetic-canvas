
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import { AboutSection, SkillsSection, EducationSection } from '@/components/MainSections';
import { ContactSection, Footer } from '@/components/ContactAndFooter';

const Index = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading state for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Loader animation
  const loaderVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 } 
    },
    exit: { 
      scale: 1.2, 
      opacity: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            variants={loaderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="text-center">
              <motion.div
                className="w-20 h-20 rounded-full border-4 border-teal-light border-t-transparent animate-spin mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <motion.h1 
                className="text-3xl font-bold text-teal-light"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                Imran Khan Jihan
              </motion.h1>
              <p className="text-gray-400 mt-2">Portfolio Loading...</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Background */}
            <AnimatedBackground />
            
            {/* Navigation */}
            <NavBar />
            
            {/* Main Content */}
            <main>
              {/* Hero Section */}
              <HeroSection />
              
              {/* About Section */}
              <AboutSection />
              
              {/* Skills Section */}
              <SkillsSection />
              
              {/* Education Section */}
              <EducationSection />
              
              {/* Contact Section */}
              <ContactSection />
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* Scroll to top button */}
            <ScrollToTopButton />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Scroll to top button component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-teal-dark text-white shadow-lg z-50 hover:bg-teal-light transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Index;
