import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll to activate header links
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button
      setShowBackToTop(window.scrollY > 500);

      // Section tracker
      const sections = ['hero', 'menu', 'about', 'reservations', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for header trigger height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Navigation Handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 110; // Floating navbar offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen text-sand font-sans text-right relative select-none">
      
      {/* Floating Header */}
      <Header onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Hero presentation Section */}
      <Hero
        onExploreMenu={() => scrollToSection('menu')}
        onBookTable={() => scrollToSection('reservations')}
      />

      {/* Menu & Meal Proposal Section */}
      <MenuSection />

      {/* About Us & Name Story Section */}
      <AboutSection />

      {/* Seating Map & Table Reservation System */}
      <ReservationSection />

      {/* Contact information, Working Hours & Maps */}
      <ContactSection />

      {/* Elegant Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Back to Top floating button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 p-3 rounded-xl bg-primary text-espresso hover:bg-primary-hover border border-primary/20 shadow-gold-glow cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95"
          aria-label="Back to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
