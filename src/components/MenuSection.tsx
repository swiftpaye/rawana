import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, SlidersHorizontal, BookOpen, Sparkles, Check, Trash2, ShieldAlert, X, Leaf, Flame } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isChefOnly, setIsChefOnly] = useState<boolean>(false);
  const [activeStoryItem, setActiveStoryItem] = useState<MenuItem | null>(null);

  // Proposed Order Planner State (Shopping Cart / Meal planner)
  const [proposalMeal, setProposalMeal] = useState<MenuItem[]>([]);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'starters', label: 'الشوربات والمقبلات' },
    { id: 'mains', label: 'الأطباق الرئيسية' },
    { id: 'grills', label: 'المشويات الراقية' },
    { id: 'desserts', label: 'الحلويات الفاخرة' },
    { id: 'drinks', label: 'المشروبات النادرة' },
  ];

  // Filtered menu list
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchChef = !isChefOnly || item.isChefSpecial === true;

      return matchCategory && matchSearch && matchChef;
    });
  }, [selectedCategory, searchQuery, isChefOnly]);

  // Handle adding/removing from proposal meal planner
  const toggleMealProposal = (item: MenuItem) => {
    const exists = proposalMeal.some((m) => m.id === item.id);
    if (exists) {
      setProposalMeal(proposalMeal.filter((m) => m.id !== item.id));
    } else {
      setProposalMeal([...proposalMeal, item]);
    }
  };

  const clearProposal = () => {
    setProposalMeal([]);
  };

  // Real-time calculations for proposal meal
  const totalCost = useMemo(() => {
    return proposalMeal.reduce((sum, item) => sum + item.price, 0);
  }, [proposalMeal]);

  const totalCalories = useMemo(() => {
    return proposalMeal.reduce((sum, item) => sum + item.calories, 0);
  }, [proposalMeal]);

  const allergenWarning = useMemo(() => {
    return proposalMeal.some((item) => item.hasNuts);
  }, [proposalMeal]);

  const glutenFreeCount = useMemo(() => {
    return proposalMeal.filter((item) => item.isGlutenFree).length;
  }, [proposalMeal]);

  return (
    <section id="menu" className="py-24 bg-[#0a0807] relative px-4 sm:px-6">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/2.5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 block">مذاقات أصيلة ممتدة</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">ديوان النكهات وقائمة المأكولات</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-sand/70 text-sm leading-relaxed">
            تم انتقاؤها وطهيها باتباع تقاليد أجدادنا مع لمسات من المذاقات المعاصرة، لتمنحكم تجربة طهي رفيعة المستوى وخالية تماماً من الإضافات الصناعية.
          </p>
        </div>

        {/* Central Layout containing Menu Filters on the right, list in middle, and Meal Planner on the left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List and Controls Column (9 Columns on Medium, 12 on Mobile) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Search and Filters controls panel */}
            <div className="bg-espresso/50 border border-primary/15 rounded-2xl p-4 sm:p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                
                {/* Search input with golden border focus */}
                <div className="relative w-full sm:max-w-xs">
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sand/40">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="ابحث عن طبقك المفضّل..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-espresso/80 border border-primary/20 text-white text-sm focus:border-primary focus:outline-none transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-sand/40 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter buttons & Toggles */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setIsChefOnly(!isChefOnly)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                      isChefOnly
                        ? 'bg-primary/20 border-primary text-primary shadow-inner'
                        : 'bg-espresso/40 border-primary/10 text-sand/70 hover:border-primary/40'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    توصية الشيف فقط
                  </button>

                  <div className="text-sand/40 text-xs hidden sm:block">
                    العثور على {filteredItems.length} أطباق
                  </div>
                </div>

              </div>

              {/* Category selector row */}
              <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-primary/10 scrollbar-none pb-2">
                <SlidersHorizontal className="w-4 h-4 text-primary shrink-0 hidden sm:block" />
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all duration-300 whitespace-nowrap shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-espresso font-bold shadow-md shadow-gold-glow/20'
                        : 'bg-espresso/40 text-sand/70 border border-primary/5 hover:bg-espresso/80 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => {
                  const isChecked = proposalMeal.some((m) => m.id === item.id);
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#14110f] border border-primary/15 hover:border-primary/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-gold-glow group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        {/* Tags over image */}
                        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 direction-rtl">
                          {item.isChefSpecial && (
                            <span className="bg-primary hover:bg-primary-hover text-espresso text-[9.5px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                              <Sparkles className="w-2.5 h-2.5 fill-espresso" />
                              موصى به
                            </span>
                          )}
                          {item.isGlutenFree && (
                            <span className="bg-emerald-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-0.5 shadow">
                              <Leaf className="w-2.5 h-2.5" />
                              خالٍ من الغلوتين
                            </span>
                          )}
                          {item.hasNuts && (
                            <span className="bg-amber-700 text-white text-[9px] font-semibold px-2 py-0.5 rounded-lg shadow">
                              يحتوي مكسرات
                            </span>
                          )}
                        </div>

                        {/* Calories Badge */}
                        <div className="absolute bottom-3 left-3 bg-espresso/80 backdrop-blur-md border border-primary/10 text-sand/80 text-[10px] px-2 py-1 rounded-lg">
                          {item.calories} سعرة حرارية
                        </div>
                      </div>

                      {/* Content & Details */}
                      <div className="p-5 flex flex-col flex-grow justify-between text-right">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-white font-bold text-base group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <span className="text-primary font-extrabold text-sm whitespace-nowrap pt-0.5">
                              {item.price} ر.س
                            </span>
                          </div>
                          
                          <p className="text-sand/65 text-xs font-light leading-relaxed mb-4 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Card bottom actions */}
                        <div className="flex items-center gap-3 pt-4 border-t border-primary/10 mt-2">
                          
                          {/* Add to current Proposed meal plan */}
                          <button
                            onClick={() => toggleMealProposal(item)}
                            className={`flex-1 transition-all duration-300 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold cursor-pointer border ${
                              isChecked
                                ? 'bg-primary border-primary text-[#0a0807]'
                                : 'bg-espresso/50 border-primary/10 text-primary hover:bg-primary/15'
                            }`}
                          >
                            {isChecked ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                تمت الإضافة لطلبك المقترح
                              </>
                            ) : (
                              <>
                                <Heart className="w-3.5 h-3.5" />
                                أضف لطلبي المقترح
                              </>
                            )}
                          </button>

                          {/* Read story button */}
                          {item.story && (
                            <button
                              onClick={() => setActiveStoryItem(item)}
                              className="p-2 rounded-xl bg-espresso/50 hover:bg-primary/10 text-sand/60 hover:text-primary border border-primary/10 transition-all cursor-pointer"
                              title="تاريخ القصة الغذائية للطبق"
                            >
                              <BookOpen className="w-4 h-4" />
                            </button>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {filteredItems.length === 0 && (
                  <div className="col-span-1 sm:col-span-2 bg-[#120f0d] border border-primary/20 rounded-2xl p-12 text-center text-sand/80">
                    <p className="text-base font-medium mb-2">لم نجد أي طبق يطابق خياراتك حالياً.</p>
                    <p className="text-xs text-sand/50">يرجى تعديل خيارات البحث أو الفئة لاستعراض باقي أطباق الروزنة المدهشة.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Interactive Dynamic Proposed Order planner (4 Columns) */}
          <div className="lg:col-span-4 sticky top-28 bg-[#12100e] border border-primary/20 rounded-2xl p-6 shadow-2xl relative">
            <div className="absolute -top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary/10 text-right">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <h3 className="text-white text-base font-extrabold">مُخطط الطلب المفضّل</h3>
              </div>
              {proposalMeal.length > 0 && (
                <button
                  onClick={clearProposal}
                  className="text-red-400 hover:text-red-300 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  حذف الكل
                </button>
              )}
            </div>

            {proposalMeal.length === 0 ? (
              <div className="py-12 px-2 text-center text-right">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-white mb-2">طلبك المقترح فارغ</p>
                <p className="text-xs text-sand/50 leading-relaxed">
                  تصفح قائمة الطعام الرائعة، وانقر على زر <span className="text-primary font-bold">"أضف لطلبي المقترح"</span> لتنسيق مائدتك المفضلة، احتساب السعرات، تقدير السعر الإجمالي، والتأكد من الحساسيات الصحية فوراً!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Scrollable planned items list */}
                <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                  {proposalMeal.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 bg-espresso/60 border border-primary/10 rounded-xl p-3 text-right text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-primary/10"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-white line-clamp-1">{item.name}</p>
                          <p className="text-sand/50 font-mono text-[10px]">{item.calories} سعرة</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-bold whitespace-nowrap">{item.price} ر.س</span>
                        <button
                          onClick={() => toggleMealProposal(item)}
                          className="text-sand/40 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal and Summary stats with dynamic bars */}
                <div className="space-y-3.5 pt-4 border-t border-primary/10 text-right">
                  
                  {/* Expense sum */}
                  <div className="flex justify-between text-sm">
                    <span className="text-sand/70">تكلفة الوجبة المقترحة:</span>
                    <span className="text-white font-black">{totalCost} ر.س</span>
                  </div>

                  {/* Calories calculated inside state indicator */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-sand/70">مجموع السعرات الحرارية:</span>
                      <span className="text-primary font-bold">{totalCalories} سعرة</span>
                    </div>
                    {/* Visual bar */}
                    <div className="w-full bg-espresso h-1.5 rounded-full overflow-hidden border border-primary/5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          totalCalories > 1500 ? 'bg-red-500' : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min((totalCalories / 2400) * 100, 100)}%` }}
                      />
                    </div>
                    {totalCalories > 1500 && (
                      <p className="text-[10px] text-amber-500 mt-1">إنها وجبة غنية جداً، توصياتنا بموازنتها مع عصير رمان منعش!</p>
                    )}
                  </div>

                  {/* Allergen notices */}
                  {allergenWarning && (
                    <div className="bg-amber-950/40 border border-amber-900/40 rounded-xl p-3 flex items-start gap-2 text-[10.5px] text-amber-300 leading-relaxed">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <span className="font-bold">تنبيه مسببات الحساسية:</span> تشمل مائدتك المختارة أطباقاً تحتوي على مكسرات طازجة.
                      </div>
                    </div>
                  )}

                  {/* Gluten status stats */}
                  {glutenFreeCount > 0 && (
                    <div className="bg-emerald-950/40 border border-emerald-900/40 rounded-xl p-3 flex items-start gap-2 text-[10.5px] text-emerald-300">
                      <Leaf className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        لديك <span className="font-bold">{glutenFreeCount} أطباق</span> خالية من الغلوتين، اختيار صحي رائع ومستدام.
                      </div>
                    </div>
                  )}

                  {/* Proposed receipt sharing card */}
                  <div className="pt-2">
                    <button
                      onClick={() => alert(`تم توليف خطة الوجبة بنجاح! السعر: ${totalCost} ر.س. يرجى إبرازها للنادل عند تشريفكم لتسهيل تزويدكم بها بمثالية.`)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-espresso font-extrabold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      تثبيت هذه الوجبات لمائدتي
                    </button>
                    <p className="text-[10px] text-center text-sand/40 mt-2">
                      ملاحظة: تتيح لك هذه الأداة تخطيط مائدتك قبل الحضور لتجربة فائقة التنظيم.
                    </p>
                  </div>

                </div>

              </div>
            )}
          </div>

        </div>

      </div>

      {/* Historical Culinary Story Modal Panel */}
      <AnimatePresence>
        {activeStoryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 text-right"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#141210] border border-primary/30 max-w-lg w-full rounded-2xl p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveStoryItem(null)}
                className="absolute top-4 left-4 p-2 rounded-xl bg-espresso hover:bg-primary/20 text-sand/60 hover:text-primary border border-primary/10 transition-all cursor-pointer"
                aria-label="Close stories modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">القصة الغذائية والتاريخية</h3>
                  <p className="text-xs text-primary font-mono">{activeStoryItem.name}</p>
                </div>
              </div>

              {/* Dish story picture details */}
              <div className="h-44 rounded-xl overflow-hidden mb-5 border border-primary/10">
                <img
                  src={activeStoryItem.image}
                  alt={activeStoryItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <p className="text-sand/90 text-sm leading-relaxed font-light">
                  {activeStoryItem.story}
                </p>

                <div className="bg-espresso/80 border border-primary/15 rounded-xl p-4 mt-6">
                  <h4 className="text-xs text-primary font-bold mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    توصية الثقافة والذوق من الشيف:
                  </h4>
                  <p className="text-sand/70 text-xs leading-relaxed font-light">
                    {activeStoryItem.category === 'mains' || activeStoryItem.category === 'grills'
                      ? 'للحصول على ذروة النكهة، يُنصح بتناول لقمات ممتدة باليد والتمهل برشفة من دلة شاي الروزنة الساخن المعتق بالمرمر لتطهير الحنك.'
                      : activeStoryItem.category === 'desserts'
                      ? 'تمتاز حلوياتنا بمستوى سكر معتدل، مما يجعل فنجاناً من قهوتنا العربية الخولانية الشقراء برحيق الزعفران رفيقها المثالي المتمم للحلاوة.'
                      : 'ابدأ بالاستمتاع برائحة الحساء الساخنة الصاعدة أولاً لتهيئة غدد التذوق، تليها لقمات متدرجة من مقبلات الشمندر اللذيذة.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-primary/10">
                  <div>
                    <span className="text-sand/50 block">تقدير مدة التحضير</span>
                    <span className="text-white font-bold font-sans">
                      {activeStoryItem.category === 'grills' ? '١٥-٢٠ دقيقة' : '١٠-١٥ دقيقة'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sand/50 block">السعر شامل الضريبة</span>
                    <span className="text-primary font-bold font-sans">{activeStoryItem.price} ريال سعودي</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
