import { motion } from 'motion/react';
import { Utensils, Heart, Shield, Award, Calendar, Compass, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links = [
    { id: 'hero', label: 'الرئيسية والترحاب' },
    { id: 'menu', label: 'قائمة ومخطط مائدتك' },
    { id: 'about', label: 'الرمز والتراث والتكامل' },
    { id: 'reservations', label: 'مخطط صالة الحجوزات' },
    { id: 'contact', label: 'تواصل بديوان الروزنة' },
  ];

  return (
    <footer className="bg-[#070505] text-sand border-t border-primary/25 relative overflow-hidden font-sans">
      {/* Absolute design accents - no living elements */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-primary/2.5 blur-3xl pointer-events-none" />

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 text-right">
        
        {/* Brand/Insignia column (5 col) */}
        <div className="md:col-span-5 space-y-6">
          <div
            className="flex items-center gap-3 cursor-pointer group justify-start md:justify-start"
            onClick={() => onNavigate('hero')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-burgundy/40 border border-primary/40 flex items-center justify-center text-primary group-hover:border-primary transition-all duration-300">
              <Utensils className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white group-hover:text-primary transition-color">
                الـرَّوزَنَـة الفاخر
              </span>
              <span className="text-[10px] text-primary/60 font-light -mt-1 tracking-wider uppercase">
                AL-ROWZANA PREMIUM GASTRONOMY
              </span>
            </div>
          </div>

          <p className="text-sand/70 text-xs leading-relaxed font-light max-w-sm">
            نحن نقدم في مطعم الروزنة تجربة طهي ملكية فاخرة تُصاغ بكل فخر بالمملكة العربية السعودية، ونعيد إحياء الوصفات العتيقة بأساليب طهي متقدمة وخدمة مخصصة تنبض بجوهر الكرم والترحيب.
          </p>

          <div className="flex items-center gap-2 pt-2 text-[10.5px] text-emerald-400 font-bold bg-emerald-950/25 border border-emerald-900/30 px-3 py-2 rounded-xl w-fit">
            <Shield className="w-4 h-4" />
            <span>مطعم مرخص ومعتمد ١٠٠٪ من الهيئات الغذائية المحلية والمقاييس الفاخرة</span>
          </div>
        </div>

        {/* Directory/Links column (3 col) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-primary/10">
            <Compass className="w-4 h-4 text-primary" />
            خريطة التصفح السريع
          </h4>
          <ul className="space-y-2.5 text-xs text-right">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => onNavigate(link.id)}
                  className="text-sand/70 hover:text-primary transition-all duration-300 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info column (4 col) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-primary/10">
            <Award className="w-4 h-4 text-primary" />
            سند وميثاق كرم وضيافة الضيوف
          </h4>
          
          <div className="space-y-3 text-xs text-sand/80 font-light leading-relaxed">
            <p>
              بصفتنا علامة نجاح وطنية مسجلة، نعدكم بالحفاظ التام على خصوصية العائلات، وتقديم لحوم طازجة وبلدية تُذبح وتُراقب يومياً، خالية تماماً من زيوت القلي المهدرجة والتطعيمات الضارة.
            </p>

            <div className="pt-2">
              <span className="text-primary font-bold block mb-1">الرقم الموحد للدعم الملكي:</span>
              <span className="text-white font-extrabold text-sm font-sans tracking-wide">920000123</span>
              <span className="text-[10px] text-sand/40 block">الرياض - طريق الملك فهد الفخم</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright with no living icons */}
      <div className="bg-[#040303] border-t border-primary/5 py-6 text-center text-[10.5px] text-sand/40 font-light px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            © {new Date().getFullYear()} مطعم الروزنة الفاخر. جميع الحقوق المعنوية، التجارية، والفكرية محفوظة بموجب القوانين والأنظمة بالمملكة والخليج.
          </div>
          <div className="flex items-center gap-1">
            صنع بكل حب وكرم مستدام لدعم رفاهية الضيف والذوق العربي الفخم
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
