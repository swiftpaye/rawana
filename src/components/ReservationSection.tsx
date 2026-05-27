import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Award, Shield, Check, Printer, MapPin, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { Reservation, TableSeatType } from '../types';

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    email: '',
    guestsCount: 4,
    date: '2026-05-28',
    timeSlot: '٨:٣٠ مساءً - عشاء ملكي',
    seatType: 'indoor' as TableSeatType,
    occasion: 'عشاء حميمي هادئ',
    specialNotes: '',
  });

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [submittedReservation, setSubmittedReservation] = useState<Reservation | null>(null);
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);

  // Tables catalog for visual map representation
  const tables = [
    { num: 1, seats: 2, type: 'indoor', label: 'طاولة ثنائية هادئة', booked: false },
    { num: 2, seats: 4, type: 'indoor', label: 'طاولة عائلية فخمة', booked: false },
    { num: 3, seats: 2, type: 'terrace', label: 'طاولة بإطلالة شرفة باردة', booked: true },
    { num: 4, seats: 6, type: 'indoor', label: 'طاولة دائرية كبيرة', booked: false },
    { num: 5, seats: 4, type: 'terrace', label: 'شرفة بإطلالة الرياض النابضة', booked: false },
    { num: 6, seats: 8, type: 'vip', label: 'ديوان ملكي خصوصي مغلق', booked: false },
    { num: 7, seats: 2, type: 'chef_counter', label: 'طاولة لقاء الشيف المباشر', booked: false },
    { num: 8, seats: 12, type: 'vip', label: 'جناح الروزنة للاحتفالات الكبرى', booked: true },
  ];

  useEffect(() => {
    // Load existing local bookings if any
    const saved = localStorage.getItem('alrowzana_booking');
    if (saved) {
      try {
        setRecentReservations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleTableSelect = (tableNum: number, isBooked: boolean, type: string) => {
    if (isBooked) return;
    setSelectedTable(tableNum);
    setFormData((prev) => ({ ...prev, seatType: type as TableSeatType }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountChange = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      guestsCount: Math.min(Math.max(prev.guestsCount + amount, 1), 16),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName || !formData.phone) {
      alert('يرجى ملاءة المعلومات الأساسية للاتصال بك لتأكيد مائدتك.');
      return;
    }

    const newRes: Reservation = {
      id: `ALR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: formData.guestName,
      phone: formData.phone,
      email: formData.email || 'guest@alrowzana.com',
      guestsCount: formData.guestsCount,
      date: formData.date,
      timeSlot: formData.timeSlot,
      seatType: formData.seatType,
      tableNumber: selectedTable || 1,
      occasion: formData.occasion,
      specialNotes: formData.specialNotes,
      createdAt: new Date().toLocaleDateString('ar-SA'),
    };

    // Save configuration
    const updated = [newRes, ...recentReservations];
    setRecentReservations(updated);
    localStorage.setItem('alrowzana_booking', JSON.stringify(updated));
    setSubmittedReservation(newRes);
  };

  const deleteReservation = (id: string) => {
    const filtered = recentReservations.filter((r) => r.id !== id);
    setRecentReservations(filtered);
    localStorage.setItem('alrowzana_booking', JSON.stringify(filtered));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="reservations" className="py-24 bg-luxury-pattern relative px-4 sm:px-6">
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-burgundy/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">رحلة طهي رفيعة</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">ديوان الحجوزات وتنظيم طاولتك</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-sand/85 text-sm leading-relaxed">
            نحن نحجز الطاولة المناسبة لك مسبقاً، تفاديًا للانتظار وحرصاً على توفير أعلى مساحة من الخصوصية للضيوف الكرام في أروقتنا الفخمة.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submittedReservation ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Form Section (7 col) */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#12100e]/90 border border-primary/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-right">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="text-white text-lg font-bold">نموذج تنظيم الحجز الملكي</h3>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-sand/70 font-bold block">الاسم الكريم بالكامل</label>
                    <input
                      type="text"
                      name="guestName"
                      required
                      placeholder="عبد الله بن فهد"
                      value={formData.guestName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-espresso/80 border border-primary/15 text-white text-sm focus:border-primary focus:outline-none transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-sand/70 font-bold block">رقم الجوال لإرسال سند الحجز</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+966 50 000 0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-espresso/80 border border-primary/15 text-white text-sm focus:border-primary focus:outline-none transition-all text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-sand/70 font-bold block">البريد الإلكتروني (اختياري)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@alrowzana.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-espresso/80 border border-primary/15 text-white text-sm focus:border-primary focus:outline-none transition-all text-left"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-sand/70 font-bold block">تاريخ الحجز الكريم</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-espresso/80 border border-primary/15 text-white text-sm focus:border-primary focus:outline-none transition-all text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Time slot */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-sand/70 font-bold block">الفترة والتوقيت الزمني</label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-espresso/80 border border-primary/15 text-white text-sm focus:border-primary focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="١:٣٠ ظهراً - غداء الروزنة">١:٣٠ ظهراً - غداء الروزنة</option>
                      <option value="٤:٠٠ عصراً - شاي عصر ملكي">٤:٠٠ عصراً - شاي عصر ملكي</option>
                      <option value="٨:٣٠ مساءً - عشاء ملكي">٨:٣٠ مساءً - عشاء ملكي</option>
                      <option value="١٠:٣٠ مساءً - عشاء متأخر وسهر">١٠:٣٠ مساءً - عشاء متأخر وسهر</option>
                    </select>
                  </div>

                  {/* Occasion */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-sand/70 font-bold block">المناسبة السعيدة</label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-espresso/80 border border-primary/15 text-white text-sm focus:border-primary focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="عشاء حميمي هادئ">عشاء حميمي هادئ</option>
                      <option value="لقاء عمل رسمي مالي">لقاء عمل رسمي مالي</option>
                      <option value="احتفال سنوي عائلي">احتفال سنوي عائلي</option>
                      <option value="ذكرى زواج مبارك">ذكرى زواج مبارك</option>
                    </select>
                  </div>
                </div>

                {/* Guest counter */}
                <div className="bg-espresso/40 p-4 rounded-xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-white text-sm font-bold block">عدد الضيوف والمرافقين الكرام</span>
                    <span className="text-[10px] text-sand/50">تتسع طاولاتنا المشتركة والصالونات من ٢ إلى ١٦ ضيفاً</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleCountChange(-1)}
                      className="w-10 h-10 rounded-lg bg-espresso hover:bg-primary/20 border border-primary/25 text-primary flex items-center justify-center font-bold text-lg cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-white text-xl font-black font-sans w-8 text-center">{formData.guestsCount}</span>
                    <button
                      type="button"
                      onClick={() => handleCountChange(1)}
                      className="w-10 h-10 rounded-lg bg-espresso hover:bg-primary/20 border border-primary/25 text-primary flex items-center justify-center font-bold text-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Special Note */}
                <div className="space-y-1.5">
                  <label className="text-xs text-sand/70 font-bold block">طلبات غذائية أو تنظيمية خاصة</label>
                  <textarea
                    name="specialNotes"
                    rows={3}
                    placeholder="هل هناك حساسية معينة أو ترغب في تجهيز باقة ورد طبيعي طائفي لطاولتك قبل الحضور؟"
                    value={formData.specialNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-espresso/80 border border-primary/15 text-white text-sm focus:border-primary focus:outline-none transition-all text-right resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-[#0c0a09] font-black text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-gold-glow-lg border border-primary/10 transform active:scale-95"
                  >
                    <Check className="w-5 h-5" />
                    تأكيد حجز الطاولة والديوان الآن
                  </button>
                </div>
              </form>

              {/* Right Column: Seating visual selector map (5 col) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#12100e] border border-primary/20 rounded-2xl p-6 text-right">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary/10">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <h3 className="text-white text-sm font-bold">مخطط ديوان الروزنة التفاعلي</h3>
                    </div>
                    <span className="text-[10px] text-primary bg-primary/10 px-2.5 py-1 rounded-full font-bold">يرجى الاختيار بالنقرة</span>
                  </div>

                  <p className="text-sand/70 text-xs font-light leading-relaxed mb-6">
                    انقر على أي رقم طاولة باللون الذهبي لربط حجزك بها مباشرة. تم تمثيل كراسي الجلوس والتخطيط التقريبي لصالونات ديوان المطعم.
                  </p>

                  {/* Grid of Tables Visual layout */}
                  <div className="bg-[#090706] border border-primary/10 rounded-xl p-6 grid grid-cols-2 gap-4 relative">
                    {tables.map((t) => {
                      const isSelected = selectedTable === t.num;
                      return (
                        <div
                          key={t.num}
                          onClick={() => handleTableSelect(t.num, t.booked, t.type)}
                          className={`relative border rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                            t.booked
                              ? 'bg-[#150e0c]/50 border-red-950/40 text-sand/30 cursor-not-allowed opacity-50'
                              : isSelected
                              ? 'bg-primary border-primary text-[#0c0a09] shadow-gold-glow-lg scale-102 font-bold'
                              : 'bg-espresso/60 border-primary/15 text-sand hover:border-primary hover:bg-espresso/90'
                          }`}
                        >
                          <span className={`text-[9px] font-bold block mb-1 ${isSelected ? 'text-[#0c0a09]' : 'text-primary'}`}>
                            {t.booked ? 'محجوز مسبقاً' : t.type === 'vip' ? 'جناح VIP' : t.type === 'terrace' ? 'شرفة إطلالة' : 'طاولة داخلية'}
                          </span>
                          <span className="text-lg font-black font-sans leading-none block mb-1">
                            ط {t.num}
                          </span>
                          <span className="text-[10px] block opacity-80">
                            {t.seats} مقاعد كبرى
                          </span>

                          {/* Render visual seat circles */}
                          <div className="flex gap-1 mt-2.5">
                            {Array.from({ length: Math.min(t.seats, 5) }).map((_, seatIdx) => (
                              <span
                                key={seatIdx}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isSelected ? 'bg-espresso' : 'bg-primary/40'
                                }`}
                              />
                            ))}
                            {t.seats > 5 && <span className="text-[7px] font-bold">+</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Color tags */}
                  <div className="flex gap-4 items-center justify-center mt-6 text-[10px] border-t border-primary/5 pt-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sand/80">المختار حالياً</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#150e0c]/50 border border-red-950" />
                      <span className="text-sand/50">محجوز بالفعل</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-espresso/60 border border-primary/15" />
                      <span className="text-sand/80">متاح الحجز به</span>
                    </div>
                  </div>

                </div>

                {/* Active assurance badges */}
                <div className="bg-[#12100e]/40 border border-primary/10 rounded-2xl p-5 flex items-start gap-3.5 text-right text-xs">
                  <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">خصوصية بنسبة ١٠٠٪ وخدمة مخصصة</h4>
                    <p className="text-sand/70 leading-relaxed font-light">
                      تتضمن الدواوين المغلقة والأجنحة الخصوصية موظفي خدمة مكرسين متاحين برنين الجرس لتوفير وجبات طعامكم براحة مطلقة تليق بكم وبأسركم الفاضلة.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Majestic Royal VIP Confirmation receipt */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto bg-[#141210] border-4 border-double border-primary/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative text-right"
              id="printable-ticket"
            >
              {/* Gold corners */}
              <div className="absolute top-2 right-2 w-8 h-8 border-tr-2 border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-bl-2 border-primary/30 rounded-bl-lg" />
              <div className="absolute top-2 left-2 w-8 h-8 border-tl-2 border-primary/30 rounded-tl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-br-2 border-primary/30 rounded-br-lg" />

              {/* Watermark/Seal background in vector */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                <Award className="w-[300px] h-[300px] text-primary" />
              </div>

              {/* Title Header with insignia */}
              <div className="text-center mb-8 pb-6 border-b border-primary/20">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 mx-auto mb-4 flex items-center justify-center text-primary">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-primary font-black text-xl tracking-[0.1em] mb-1">سَــنَــد الـحَـجْـز الـمَـلَـكِـي الفاخر</h3>
                <p className="text-sand/60 text-xs tracking-widest uppercase">AL-ROWZANA ROYAL VIP RESERVATION VIP-PASS</p>
              </div>

              {/* Receipt details */}
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-b border-primary/10 pb-6">
                  <div>
                    <span className="text-sand/50 block text-xs">رقم الحجز المرجعي</span>
                    <span className="text-primary font-mono font-extrabold text-lg tracking-wider">
                      {submittedReservation.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-sand/50 block text-xs">اسم الضيف الكريم</span>
                    <span className="text-white font-extrabold">{submittedReservation.guestName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-b border-primary/10 pb-6">
                  <div>
                    <span className="text-sand/50 block text-xs">التاريخ والموعد المنسق</span>
                    <span className="text-white font-bold">{submittedReservation.date}</span>
                    <span className="text-primary block text-xs mt-1">{submittedReservation.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-sand/50 block text-xs">الصالون المخصص وطاولة الجلوس</span>
                    <span className="text-white font-bold">
                      {submittedReservation.seatType === 'vip'
                        ? 'الديوان الملكي الخاص (VIP)'
                        : submittedReservation.seatType === 'terrace'
                        ? 'شرفة الإطلالة الباردة'
                        : submittedReservation.seatType === 'chef_counter'
                        ? 'طاولة كبير الطهاة الحصرية'
                        : 'جلسة داخلية هادئة مرفهة'}
                    </span>
                    <span className="text-primary block text-xs mt-1">طاولة رقم {submittedReservation.tableNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-b border-primary/10 pb-6">
                  <div>
                    <span className="text-sand/50 block text-xs">عدد مرافقي الطاولة كلياً</span>
                    <span className="text-white font-bold font-sans">{submittedReservation.guestsCount} ضيوف كرام</span>
                  </div>
                  <div>
                    <span className="text-sand/50 block text-xs">المناسبة السعيدة لضيافتكم</span>
                    <span className="text-white font-bold">{submittedReservation.occasion}</span>
                  </div>
                </div>

                {submittedReservation.specialNotes && (
                  <div className="bg-espresso/85 border border-primary/15 rounded-xl p-4 text-xs leading-relaxed text-sand/85 font-light">
                    <span className="text-primary font-bold block mb-1">ملاحظات وطلبات مائدة الضيف المثبتة:</span>
                    {submittedReservation.specialNotes}
                  </div>
                )}

                {/* SVG Beautiful Barcode for authentication looks incredibly realistic! */}
                <div className="flex flex-col items-center justify-center py-4 bg-espresso/50 border border-primary/10 rounded-xl">
                  <span className="text-[10px] text-sand/50 mb-2">امسح الكود لتسجيل الدخول الفوري عند الوصول لطاقم الاستقبال</span>
                  <div className="p-3 bg-white rounded-lg inline-block">
                    {/* Unique SVG representation of digital code */}
                    <svg width="120" height="120" viewBox="0 0 100 100" className="mx-auto select-none">
                      {/* Corner anchor blocks mimicking authentic QR design elements with NO human features */}
                      <rect x="5" y="5" width="25" height="25" fill="#211510" rx="3" />
                      <rect x="10" y="10" width="15" height="15" fill="#fcf8f2" rx="2" />
                      <rect x="14" y="14" width="7" height="7" fill="#211510" />

                      <rect x="70" y="5" width="25" height="25" fill="#211510" rx="3" />
                      <rect x="75" y="10" width="15" height="15" fill="#fcf8f2" rx="2" />
                      <rect x="79" y="14" width="7" height="7" fill="#211510" />

                      <rect x="5" y="70" width="25" height="25" fill="#211510" rx="3" />
                      <rect x="10" y="75" width="15" height="15" fill="#fcf8f2" rx="2" />
                      <rect x="14" y="79" width="7" height="7" fill="#211510" />

                      {/* Random aesthetic QR-code like block alignments */}
                      <rect x="40" y="10" width="8" height="8" fill="#211510" />
                      <rect x="52" y="16" width="10" height="4" fill="#211510" />
                      <rect x="44" y="26" width="6" height="12" fill="#211510" />
                      
                      <rect x="70" y="40" width="12" height="6" fill="#211510" />
                      <rect x="85" y="50" width="8" height="8" fill="#211510" />
                      
                      <rect x="40" y="75" width="14" height="6" fill="#211510" />
                      <rect x="58" y="80" width="8" height="10" fill="#211510" />
                      <rect x="36" y="50" width="12" height="12" fill="#211510" />
                      <circle cx="50" cy="50" r="4" fill="#D4AF37" />
                    </svg>
                  </div>
                  <span className="text-[9.5px] font-mono text-sand/40 tracking-wider mt-2">ALR-VERIFICATION-2026-OK</span>
                </div>

                {/* Print/Dismiss buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-primary/10">
                  <button
                    onClick={handlePrint}
                    className="flex-1 py-3.5 rounded-xl bg-espresso border border-primary/30 hover:border-primary text-primary hover:text-white transition-all duration-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    طباعة وثيقة الحجز وحفظها PDF
                  </button>

                  <button
                    onClick={() => {
                      setSubmittedReservation(null);
                      setSelectedTable(null);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-[#0c0a09] font-black transition-all duration-300 text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    مفهوم، العودة لحجز آخر
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List of active stored bookings for confirmation & cancellation flexibility */}
        {recentReservations.length > 0 && !submittedReservation && (
          <div className="mt-16 bg-[#12100e]/75 border border-primary/10 rounded-2xl p-6 text-right max-w-4xl mx-auto">
            <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              حجوزاتكم النشطة لدى الروزنة ({recentReservations.length})
            </h4>

            <div className="space-y-3">
              {recentReservations.map((r) => (
                <div
                  key={r.id}
                  className="bg-espresso/40 border border-primary/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                      ط {r.tableNumber}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        {r.guestName}
                        <span className="text-primary font-mono text-[10px]">({r.id})</span>
                      </div>
                      <div className="text-sand/50 text-[11px] mt-1">
                        {r.date} - {r.timeSlot} • {r.guestsCount} مرافقين كرام
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[#0c0a09] bg-primary px-3 py-1 rounded-full font-bold text-[10px]">
                      حالة الحجز: مؤكد بمثالية
                    </span>
                    <button
                      onClick={() => deleteReservation(r.id)}
                      className="text-red-400 hover:text-red-300 hover:underline transition-all cursor-pointer"
                    >
                      إلغاء الحجز
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
