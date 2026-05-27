import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, Check, AlertCircle, Share2, Compass } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'حجز حفل عائلي خاص',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert('يرجى ملاءة حقل الاسم ونص موضوع تواصلكم.');
      return;
    }
    setIsSent(true);
    // Simulate API delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: 'حجز حفل عائلي خاص', message: '' });
    }, 1000);
  };

  const contactOptions = [
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      title: 'أرقام الاتصال المباشر وديوان الروزنة',
      desc: '920000123 (الرقم الموحد لحجز الطاولات)',
      detail: 'متاح للاتصال طوال أوقات العمل الرسمية لتنظيم ولائم كبرى وباقات الكوشة والمناسبات.',
    },
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      title: 'الاستفسارات الإلكترونية والبريد الفخم',
      desc: 'vip@alrowzana-restaurant.com',
      detail: 'لدينا قسم مكرس للرد على طلبات الشركات والمؤتمرات وعقود التمويل الخارجية الفاخرة.',
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      title: 'العنوان الجغرافي للتشريف بالحضور',
      desc: 'المملكة العربية السعودية، الرياض، طريق الملك فهد، حي الياسمين الفخم',
      detail: 'يتوفر مواقف سيارات خاصة ومجانية مع ميزة الفالية (حمل المفتّح وإيقاف السيارات الملكي والودي).',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-luxury-pattern relative px-4 sm:px-6">
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-primary/2.5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">شرفونا بتواصلكم الكريم</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">أوقات العمل وخرائط الوصول وديوان التواصل</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-sand/85 text-sm leading-relaxed">
            نحن بانتظار اتصالاتكم الهاتفية، رسائلكم البريدية، أو تشريفكم المباشر في أروقة الروزنة بالرياض، لخدمتكم بمقاييس تتخطى آمالكم.
          </p>
        </div>

        {/* Dynamic Split view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Right Column: Contact Cards and Working Hours (7 col) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Working Hours Sub-panel */}
            <div className="bg-gradient-to-r from-[#12100e] to-espresso/90 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-br-full border-b border-r border-primary/5 flex items-center justify-center text-primary/30">
                <Clock className="w-8 h-8" />
              </div>
              
              <h3 className="text-white text-base font-extrabold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                أوقات استقبال الضيوف والخدمة الرسمية
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
                <div className="bg-espresso/50 border border-primary/5 rounded-xl p-3.5">
                  <span className="text-primary font-bold block mb-1">السبت إلى الخميس</span>
                  <span className="text-white font-extrabold text-sm font-sans">من ١:٠٠ ظهراً حتى ١٢:٠٠ منتصف الليل</span>
                  <p className="text-sand/55 text-[10px] mt-1">تستمر المطابخ باستقبال الطلبات حتى ١١:١٥ مساءً.</p>
                </div>

                <div className="bg-espresso/50 border border-primary/5 rounded-xl p-3.5">
                  <span className="text-primary font-bold block mb-1">يوم الجمعة المبارك</span>
                  <span className="text-white font-extrabold text-sm font-sans">من ١:٣٠ ظهراً حتى ٢:٠٠ صباحاً</span>
                  <p className="text-sand/55 text-[10px] mt-1">ساعات ممتدة وسهرات عائلية دافئة مع بخور العود الطائفي.</p>
                </div>
              </div>
            </div>

            {/* Direct Information details cards list */}
            <div className="space-y-4">
              {contactOptions.map((opt, idx) => (
                <div
                  key={idx}
                  className="bg-[#12100e]/95 border border-primary/15 rounded-2xl p-5 flex items-start gap-4 hover:border-primary/40 transition-all duration-300 shadow-md"
                >
                  <div className="p-3 bg-primary/15 border border-primary/20 rounded-xl text-primary shrink-0">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold mb-1">{opt.title}</h4>
                    <p className="text-primary text-sm font-extrabold font-sans leading-none">{opt.desc}</p>
                    <p className="text-sand/60 text-[11px] leading-relaxed font-light mt-1.5">{opt.detail}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Left Column: Interactive Contact form and map mockup (5 col) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Custom vector Map presentation to avoid heavy dynamic Google API iframe maps */}
            <div className="bg-[#12100e] border border-primary/20 rounded-2xl p-5 text-right relative overflow-hidden group shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-primary/10">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-primary" />
                  <span className="text-white text-xs font-bold">موقع ديوان الروزنة جغرافياً</span>
                </div>
                {/* Visual compass details */}
                <span className="text-[10px] text-primary font-mono tracking-widest font-black">24.81 ~ 46.63</span>
              </div>

              {/* Styled Abstract Map Background (Pure SVGs and nodes - no living items) */}
              <div className="h-44 bg-[#0a0807] border border-primary/15 rounded-xl relative overflow-hidden flex items-center justify-center p-4">
                
                {/* Background grid lines */}
                <div className="absolute inset-0 opacity-[0.04]">
                  <div className="w-full h-full bg-luxury-pattern" />
                </div>

                {/* Simulated luxury road layouts */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 200">
                  <path d="M 0 50 L 400 50" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 0 150 L 400 150" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M 120 0 L 120 200" stroke="#D4AF37" strokeWidth="3" />
                  <path d="M 280 0 L 280 200" stroke="#D4AF37" strokeWidth="1.5" />
                  {/* Outer circle layout */}
                  <circle cx="280" cy="50" r="30" fill="none" stroke="#D4AF37" strokeWidth="1" />
                </svg>

                {/* Ripple glowing center locating Al-Rowzana Restaurant */}
                <div className="relative z-10 text-center flex flex-col items-center">
                  <span className="absolute -top-1 right-2 w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-burgundy to-espresso border-2 border-primary flex items-center justify-center text-primary shadow-gold-glow animate-bounce">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-white bg-espresso/95 border border-primary/25 px-3 py-1.5 rounded-lg mt-2 tracking-wide font-sans shadow-xl">
                    مطعم الروزنة الفاخر
                  </span>
                </div>

                {/* North arrow widget */}
                <div className="absolute bottom-2 left-2 text-[9px] text-primary/60 font-mono flex items-center gap-1 bg-[#12100e] px-2 py-1 rounded border border-primary/5">
                  <Compass className="w-3 h-3 text-primary" />
                  <span>الشمال الجغرافي</span>
                </div>
              </div>

              {/* Static Map bottom CTA */}
              <div className="mt-3.5 flex justify-between items-center text-xs">
                <span className="text-sand/50">تفتح الشُّعب لتوصيل الضيف لمقعده</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:text-white hover:underline transition-all flex items-center gap-1 cursor-pointer"
                >
                  فتح عبر خرائط جوجل ↗
                </a>
              </div>
            </div>

            {/* Direct Feedback / Suggestions Form with interactive responses */}
            <div className="bg-[#12100e]/95 border border-primary/20 rounded-2xl p-6 text-right shadow-2xl relative">
              <h3 className="text-white text-xs font-bold mb-4 flex items-center gap-1.5 pb-3 border-b border-primary/10">
                <Send className="w-4 h-4 text-primary" />
                تواصل مخصص / تقديم المقترحات والولائم
              </h3>

              <AnimatePresence mode="wait">
                {!isSent ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-sand/60 font-bold block">الاسم الكريم</label>
                      <input
                        type="text"
                        required
                        placeholder="فهد عبد العزيز"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-espresso/80 border border-primary/15 text-white text-xs focus:border-primary focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-sand/60 font-bold block">البريد الإلكتروني للرد</label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-espresso/80 border border-primary/15 text-white text-xs focus:border-primary focus:outline-none transition-all text-left"
                      />
                    </div>

                    {/* Topic subject Select */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-sand/60 font-bold block">موضوع التواصل والغرض</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-espresso/80 border border-primary/15 text-white text-xs focus:border-primary focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="حجز حفل عائلي خاص">حجز حفل عائلي خاص</option>
                        <option value="الرغبة في طلب منيو خاص بالشركات">تموين خارجي فاخر وعقود شركات</option>
                        <option value="ملاحظات أو شكاوى أو مقترحات">ملاحظات واقتراحات جودة الطعام</option>
                      </select>
                    </div>

                    {/* Comment Area */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-sand/60 font-bold block">نص الرسالة أو المقترح بالتفصيل</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="اكتب رسالتك ببراعة هنا لتصل إلى ديوان الإدارة..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-espresso/80 border border-primary/15 text-white text-xs focus:border-primary focus:outline-none transition-all text-right resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-[#0c0a09] font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow transform active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      إرسال الرسالة للديوان العام
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-white text-sm font-bold mb-2">تم تلقي طلب تواصلكم ببالغ الترحيب</h4>
                    <p className="text-sand/70 text-xs leading-relaxed font-light max-w-xs mx-auto">
                      وصلت رسالتكم لديوان إدارة مطعم الروزنة. سيقوم مسؤول علاقات الضيوف بالإجابة والتواصل معكم هاتفياً أو بريدياً في أقل من ساعتين عمل لتنفيذ ما يلائم رغبتكم الفاضلة.
                    </p>
                    <button
                      onClick={() => setIsSent(false)}
                      className="mt-6 px-4 py-2 bg-espresso border border-primary/20 text-primary text-[11px] rounded-lg hover:text-white transition-all cursor-pointer"
                    >
                      إرسال رسالة تواصل أخرى
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
