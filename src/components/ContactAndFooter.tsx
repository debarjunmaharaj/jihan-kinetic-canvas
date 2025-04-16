
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Globe, Map, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';

// Contact Section Component
export const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };
  
  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-teal-light" />,
      title: "Phone",
      details: ["+88 01860333642", "+88 01603333642"],
      action: {
        text: "Call Now",
        url: "tel:+8801860333642",
      },
    },
    {
      icon: <Mail className="h-8 w-8 text-teal-light" />,
      title: "Email",
      details: ["imrankjihan@gmail.com"],
      action: {
        text: "Send Email",
        url: "mailto:imrankjihan@gmail.com",
      },
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-light" />,
      title: "Social Media",
      details: ["Connect with me on social platforms"],
      action: {
        text: "YouTube Channel",
        url: "https://www.youtube.com/@ikpresenttv",
      },
    },
    {
      icon: <Map className="h-8 w-8 text-teal-light" />,
      title: "Address",
      details: ["Chander para, Cox's Bazar", "Bangladesh"],
      action: {
        text: "Get Directions",
        url: "https://maps.google.com",
      },
    },
  ];
  
  return (
    <section id="contact" className="py-20 relative bg-black">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute h-96 w-96 bg-teal-light rounded-full blur-3xl -top-48 -left-48"></div>
        <div className="absolute h-96 w-96 bg-teal-dark rounded-full blur-3xl -bottom-48 -right-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          >
            Contact <span className="text-teal-light">Me</span>
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {contactMethods.map((contact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-teal-light/20 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center mb-4">
                    {contact.icon}
                    <h3 className="ml-3 text-xl font-bold text-white">{contact.title}</h3>
                  </div>
                  
                  <div className="mb-6">
                    {contact.details.map((detail, i) => (
                      <p key={i} className="text-gray-300 mb-1">{detail}</p>
                    ))}
                  </div>
                </div>
                
                <a
                  href={contact.action.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center bg-teal-dark text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-teal-light group"
                >
                  <span>{contact.action.text}</span>
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="mt-16 glass-effect rounded-xl p-8 text-center"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send Me a Message</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-teal-light focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-teal-light focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-teal-light focus:outline-none"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-teal-light focus:outline-none"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="bg-teal-light text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-dark transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  const socialLinks = [
    { icon: <Facebook size={18} />, url: 'https://www.facebook.com/imrankjihan' },
    { icon: <Instagram size={18} />, url: 'https://www.instagram.com/imran_khan_jihan' },
    { icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/imran-khan-48080b2b6/' },
    { icon: <Youtube size={18} />, url: 'https://www.youtube.com/@ikpresenttv' },
    { icon: <ExternalLink size={18} />, url: 'https://www.behance.net/imrankhanjihan' },
  ];
  
  return (
    <footer className="py-8 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Imran Khan Jihan. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-teal-light transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="text-gray-400">
            <p>Developed by <a href="https://www.facebook.com/Debarjunmaharaj" target="_blank" rel="noreferrer" className="text-teal-light hover:underline">Debarjun Chakraborty</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};
