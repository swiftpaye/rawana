import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Clock, Calendar, Utensils } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'menu', label: 'قائمة الطعام' },
    { id: 'about', label: 'قصتنا' },
    { id: 'reservations', label: 'حجز طاولة' },
    { id: 'contact', label: 'اتصل بنا' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Banner with minimal elegant details */}
      <div className="bg-espresso/90 border-b border-gold/10 text-sand/80 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary" />
              أوقات العمل: ١ ظهراً - ١٢ منتصف الليل
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-primary" />
              للاستفسار: 920000123
            </span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>نستقبل طلباتكم والترحيب بالحجوزات الفاخرة</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed top-0 md:top-8 left-0 right-0 z-50 transition-all duration-300 px-4 ${
          isScrolled
            ? 'md:top-2'
            : 'md:top-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`backdrop-blur-md border transition-all duration-500 rounded-2xl flex items-center justify-between px-6 py-4 md:py-3.5 ${
              isScrolled
                ? 'bg-[#0f0c0a]/90 border-primary/20 shadow-gold-glow'
                : 'bg-espresso/40 border-primary/10'
            }`}
          >
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleLinkClick('hero')}
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-burgundy/40 border border-primary/40 flex items-center justify-center shadow-inner group-hover:border-primary transition-all duration-300">
                <Utensils className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-[2px] -right-[2px] w-[6px] h-[6px] rounded-full bg-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wide text-white group-hover:text-primary transition-colors duration-300">
                  الـرَّوزَنَـة
                </span>
                <span className="text-[9px] text-primary tracking-[0.2em] font-light -mt-1 uppercase hidden sm:block">
                  AL-ROWZANA RESTAURANT
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative font-sans text-sm font-medium tracking-wide transition-all duration-300 py-1 cursor-pointer ${
                    activeSection === link.id
                      ? 'text-primary'
                      : 'text-sand/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button and Hamburger */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLinkClick('reservations')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-espresso font-semibold text-xs transition-all duration-300 shadow-md cursor-pointer hover:shadow-gold-glow-lg border border-primary/20 transform active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                احجز طاولتك
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-espresso/60 border border-primary/20 text-primary hover:text-white hover:border-primary transition-all cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 right-4 top-20 z-40 md:hidden bg-[#0f0c0a]/95 backdrop-blur-lg border border-primary/20 rounded-2xl p-6 shadow-2xl shadow-gold-glow flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full py-3 px-4 rounded-xl text-right font-sans text-base transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-primary/10 text-primary font-bold border-r-4 border-primary'
                        : 'text-sand/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="h-[1px] bg-primary/10 my-1" />

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleLinkClick('reservations')}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-[#0f0c0a] font-bold text-center text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  حجز طاولة ملكية الآن
                </button>
                <div className="text-center text-xs text-sand/50 mt-2">
                  للاتصال المباشر: 920000123
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
