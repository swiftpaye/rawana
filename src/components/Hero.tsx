import { motion } from 'motion/react';
import { Play, Calendar, Eye, MapPin, ChevronLeft, Leaf, Clock, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export default function Hero({ onExploreMenu, onBookTable }: HeroProps) {
  // Beautiful non-living food art images and textures
  const foodImages = [
    {
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      title: 'ريش النعيمي الفاخرة المشوية بحصى البان',
      desc: 'جودة متميزة، متبلة ومطهوة ببطء على الفحم الصلب لأعالي المذاق.'
    },
    {
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      title: 'القهوة العربية العضوية بالهلال والزعفران الكشميري',
      desc: 'رمز الضيافة الأصيلة، تُقطر بتأنٍّ في دلالنا النحاسية لتصلكم دافئة ونقية.'
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 md:pt-36 flex items-center justify-center overflow-hidden bg-luxury-pattern px-4 py-16">
      {/* Abstract Glowing Accent Orbs in corners - no living vectors, purely ambient gold glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-burgundy/10 blur-[100px] pointer-events-none" />

      {/* Hero Container */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Poetic Typography Layout */}
        <div className="lg:col-span-7 flex flex-col justify-center text-right">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 shadow-inner"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>مطعم الروزنة: ضيافة ملوكية بمقاييس عالمية</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight"
          >
            عراقة الماضي.. <br />
            <span className="text-gold-gradient">بفلسفة مـعـاصرة</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sand/80 text-base md:text-lg leading-relaxed max-w-xl mb-10 font-light"
          >
            في قلب مطعم الروزنة الفاخر، نجمع بين فخامة الضيافة العربية وتراث الطهي العريق، ممزوجاً بلمسة ابتكار عصرية لتقديم أطباق استثنائية تأسر الحواس وتخلّد الذاكرة.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <button
              onClick={onExploreMenu}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-espresso font-bold text-sm md:text-base cursor-pointer hover:shadow-gold-glow-lg transition-all duration-300 transform active:scale-95 flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              استكشف قائمة الطعام
            </button>

            <button
              onClick={onBookTable}
              className="px-8 py-4 rounded-xl bg-[#14110f] text-primary hover:text-white border border-primary/30 hover:border-primary font-bold text-sm md:text-base cursor-pointer transition-all duration-300 transform active:scale-95 flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              احجز طاولتك الآن
            </button>
          </motion.div>

          {/* Fast Features list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-primary/10 max-w-xl text-right"
          >
            <div className="flex flex-col items-start pr-1">
              <div className="flex items-center gap-1.5 mb-1 justify-start">
                <Leaf className="w-4 h-4 text-primary shrink-0" />
                <span className="text-white font-bold text-sm">مكوّنات عضوية</span>
              </div>
              <div className="text-sand/60 text-xs">طبيعية وبلدية بالكامل</div>
            </div>
            <div className="border-r border-primary/10 pr-4 flex flex-col items-start">
              <div className="flex items-center gap-1.5 mb-1 justify-start">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="text-white font-bold text-sm">طهي بطيء أصيل</span>
              </div>
              <div className="text-sand/60 text-xs">تتبيل مستمر على الحطب</div>
            </div>
            <div className="border-r border-primary/10 pr-4 flex flex-col items-start">
              <div className="flex items-center gap-1.5 mb-1 justify-start">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span className="text-white font-bold text-sm">دواوين خصوصية</span>
              </div>
              <div className="text-sand/60 text-xs">جلسات هادئة للعائلات</div>
            </div>
          </motion.div>
        </div>

        {/* Breathtaking Split Gastronomy Presentation Card */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-square max-w-[450px]"
          >
            {/* Elegant outer geometric golden frame */}
            <div className="absolute -inset-4 rounded-3xl border border-primary/20 rotate-3 pointer-events-none" />
            <div className="absolute -inset-4 rounded-3xl border border-primary/10 -rotate-3 pointer-events-none" />

            {/* Glowing shadow base */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl -z-10" />

            {/* Main Interactive Dish Showcase Card */}
            <div className="w-full h-full rounded-3xl overflow-hidden border border-primary/30 relative group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="طبق مشاوي ملوكي فاخر"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Bottom Gastronomy Information Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="bg-espresso/80 backdrop-blur-md rounded-2xl p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-primary text-xs font-bold font-mono">الطبق الموصى به اليوم</span>
                    <span className="text-gold-gradient text-xs font-bold">١٤٥ ر.س</span>
                  </div>
                  <h3 className="text-white text-base font-bold mb-1">موزات النعيمي بكسرة الزعفران الملكية</h3>
                  <p className="text-sand/70 text-xs font-light leading-relaxed">
                    مطهوة بالفرن الطيني لمدة 6 ساعات متواصلة لتصلكم طرية كالحرير مع عبير السمن البري والهيل الأصيل.
                  </p>
                </div>
              </div>
            </div>

            {/* Micro Badge for Local Heritage Location */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-burgundy to-espresso text-sand border border-primary/30 rounded-xl px-4 py-3 shadow-xl flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-primary font-bold">الموقع والحجز</span>
                <span className="text-xs font-semibold whitespace-nowrap text-white">طريق الملك فهد، الرياض</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
