import { motion } from 'motion/react';
import { Sparkles, UtensilsCrossed } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0a0807] relative overflow-hidden px-4 sm:px-6">
      {/* Visual abstract ornaments - no living souls */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-primary/2.5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-burgundy/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* About Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Text block (7 columns) */}
          <div className="lg:col-span-7 text-right space-y-6">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase block">أصالة المعنى والمبنى</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-snug">
              ما هي <span className="text-gold-gradient">الـرَّوزَنَـة</span>؟
            </h2>
            <div className="w-20 h-[1.5px] bg-primary" />
            
            <p className="text-sand/90 text-sm leading-relaxed font-light">
              في الهندسة المعمارية النجدية والعربية العريقة، تُعرف <span className="text-primary font-semibold">«الرَّوزَنَة»</span> بأنها تلك الكوة الجدارية أو الرف الطيني المنحوت بعناية داخل جدران المجالس وغرف الضيافة الدافئة. كانت الجدات والآباء يودعون فيها أثمن ما يملكون؛ من حبات الهيل النادرة، أعواد القرفة، بتلات الزعفران الملكية، وقوارير العطور الفاخرة التي يرحبون بها بزوّارهم الكرام.
            </p>

            <p className="text-sand/80 text-sm leading-relaxed font-light">
              نحن في مطعم الروزنة الفاخر، أردنا إحياء هذا المفهوم الجمالي الفريد لتكون مائدتنا هي "الروزنة" الخاصة بكم. حيث نودع في أطباقنا أثمن بهارات الشرق، وأجود قطع اللحم البلدي الطازجة، ليتذوق ضيوفنا عراقة الماضي بتفسير طهوي راقٍ ومعاصر بالكامل.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-right">
              <div className="bg-espresso/30 border border-primary/10 rounded-xl p-4 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <h4 className="text-white text-sm font-bold">طهي الحطب والفخار</h4>
                <p className="text-sand/65 text-xs leading-relaxed font-light">نستخدم خشب السمر والزيتون الطبيعي بنسب دقيقة للحصول على طعم أصيل مدخن بلطف بعيداً عن الغاز الصناعي.</p>
              </div>

              <div className="bg-espresso/30 border border-primary/10 rounded-xl p-4 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-white text-sm font-bold">زيرو إضافات صناعية</h4>
                <p className="text-sand/65 text-xs leading-relaxed font-light">جميع نكهاتنا وألوان أطباقنا الحمراء أو الصفراء مستخلصة طازجاً من الثمار العضوية وبودرة الزعفران والطماطم الطبيعية.</p>
              </div>
            </div>
          </div>

          {/* Graphical block of architectural luxury (5 columns) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-w-[360px] rounded-3xl overflow-hidden border border-primary/30 shadow-2xl group bg-espresso/40">
              
              {/* Outer decorative golden circles - abstract and elegant */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              
              <img
                src="https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=800&q=80"
                alt="زعفران وبهارات وقرفة أصيلة في كوة طينية"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <div className="border-r-4 border-primary pr-4">
                  <span className="text-primary text-[10px] uppercase font-bold tracking-widest block">الفلسفة الجمالية للشرق</span>
                  <span className="text-white text-base font-bold">حيث تلتقي التفاصيل</span>
                  <span className="text-sand/70 text-xs block font-light mt-1">توليفات زعفران وبهارات معتقة</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Spacing bottom */}
        <div className="pb-12" />

      </div>
    </section>
  );
}
