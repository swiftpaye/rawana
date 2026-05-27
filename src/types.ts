export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'grills' | 'desserts' | 'drinks';
  calories: number;
  image: string;
  tags: string[]; // e.g. "خالٍ من الغلوتين", "يحتوي مكسرات", "حار", "توصية الشيف"
  story?: string; // Deep culinary historical story
  hasNuts?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
}

export type TableSeatType = 'indoor' | 'terrace' | 'vip' | 'chef_counter';

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  seatType: TableSeatType;
  tableNumber: number;
  occasion: string;
  specialNotes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  role: string; // e.g. "ناقد طعام", "عضو ملكي", "زائر دائم"
}
