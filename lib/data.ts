// Dummy data for Phase 1 UI. Replaced by API calls once the backend exists.

export type EventStatus = "upcoming" | "live" | "ended";

export type WeddingEvent = {
  id: string;
  name: string;
  nameHi: string;
  emoji: string;
  start: string; // ISO
  venue: string;
  address: string;
  dressCode?: string;
  description: string;
  status: EventStatus;
  viewers?: number;
};

export type MediaItem = {
  id: string;
  type: "photo" | "video";
  eventId: string;
  caption: string;
  by: string;
  src: string;
  width: number;
  height: number;
  status: "approved" | "pending";
};

export type Blessing = {
  id: string;
  name: string;
  relation: string;
  city: string;
  message: string;
};

export type Wedding = {
  slug: string;
  groom: string;
  bride: string;
  tagline: string;
  story: string;
  city: string;
  weddingDate: string;
  hostPhone: string;
  heroImage: string;
  parents: {
    groom: string;
    bride: string;
  };
  events: WeddingEvent[];
};

export type GuestRsvp = {
  id: string;
  name: string;
  phone: string;
  attending: boolean;
  adultsCount: number;
  kidsCount: number;
  attendingEvents: string[]; // event IDs
  diet: "veg" | "jain" | "all";
  note?: string;
  submittedAt: string;
};

const img = (seed: string, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const wedding: Wedding = {
  slug: "rahul-weds-priya",
  groom: "Rahul",
  bride: "Priya",
  tagline: "Do dil, ek safar — aap sab ke aashirwad ke saath",
  story:
    "College ke ek chhote se project se shuru hui hamari kahani aaj saat pheron tak aa pahunchi hai. Jo log hamare saath is khushi mein shamil nahi ho paa rahe, unke liye hum har pal yahin live dikhayenge.",
  city: "Jaipur, Rajasthan",
  weddingDate: "2026-11-08T20:00:00+05:30",
  hostPhone: "+91 98XXXXXX10",
  heroImage: img("shadi-hero", 1600, 900),
  parents: {
    groom: "Smt. Sharda & Shri Kailash Sharma",
    bride: "Smt. Nirmala & Shri Mahesh Joshi",
  },
  events: [
    {
      id: "haldi",
      name: "Haldi",
      nameHi: "हल्दी",
      emoji: "💛",
      start: "2026-11-05T11:00:00+05:30",
      venue: "Sharma Niwas, Malviya Nagar",
      address: "Malviya Nagar, Jaipur",
      dressCode: "Peela / Yellow",
      description: "Ghar ke aangan mein haldi ki rasam, dhol aur masti ke saath.",
      status: "ended",
    },
    {
      id: "mehndi",
      name: "Mehndi",
      nameHi: "मेहंदी",
      emoji: "🌿",
      start: "2026-11-06T16:00:00+05:30",
      venue: "Rang Mahal Banquet",
      address: "Tonk Road, Jaipur",
      dressCode: "Green / Hara",
      description: "Mehndi artists, live music aur family games.",
      status: "live",
      viewers: 184,
    },
    {
      id: "sangeet",
      name: "Sangeet",
      nameHi: "संगीत",
      emoji: "🎶",
      start: "2026-11-07T19:30:00+05:30",
      venue: "The Royal Lawns",
      address: "Ajmer Road, Jaipur",
      dressCode: "Indo-western",
      description: "Family performances, DJ night aur dher saara dance.",
      status: "upcoming",
    },
    {
      id: "pheras",
      name: "Shaadi / Pheras",
      nameHi: "विवाह",
      emoji: "🔥",
      start: "2026-11-08T20:00:00+05:30",
      venue: "Royal Lawns Mandap",
      address: "Ajmer Road, Jaipur",
      dressCode: "Traditional",
      description: "Jaimala, saat phere aur vidaai — poora live.",
      status: "upcoming",
    },
    {
      id: "reception",
      name: "Reception",
      nameHi: "रिसेप्शन",
      emoji: "✨",
      start: "2026-11-09T19:00:00+05:30",
      venue: "Hotel Grand Pearl",
      address: "C-Scheme, Jaipur",
      dressCode: "Formal / Black-tie",
      description: "Aashirwad samaroh aur dinner.",
      status: "upcoming",
    },
  ],
};

const captions = [
  "Haldi ki masti",
  "Bua ji ka dance",
  "Dulhan ki mehndi",
  "Family photo",
  "Dhol wale bhaiya",
  "Jeeja ji ki entry",
  "Dulha ki ghodi",
  "Pehli jhalak",
  "Bachchon ki toli",
  "Rangoli",
  "Phoolon ka gate",
  "Dadi ka aashirwad",
];

const by = ["Couple", "Couple", "Neha (cousin)", "Couple", "Amit Uncle", "Couple", "Sunita Bua", "Couple", "Rohan", "Couple", "Pooja", "Couple"];
const evs = ["haldi", "haldi", "mehndi", "mehndi", "haldi", "mehndi", "mehndi", "haldi", "mehndi", "mehndi", "haldi", "mehndi"];

export const media: MediaItem[] = captions.map((caption, i) => ({
  id: `m${i + 1}`,
  type: i === 2 || i === 7 ? "video" : "photo",
  eventId: evs[i],
  caption,
  by: by[i],
  src: img(`wedding-${i + 1}`, 800, i % 3 === 0 ? 1000 : 640),
  width: 800,
  height: i % 3 === 0 ? 1000 : 640,
  status: i === 4 || i === 8 || i === 10 ? "pending" : "approved",
}));

export const blessings: Blessing[] = [
  {
    id: "b1",
    name: "Dadi Maa",
    relation: "Dulha ki dadi",
    city: "Jodhpur",
    message: "Jodi salamat rahe, khush raho bete. Bhagwan tumhe har khushi de.",
  },
  {
    id: "b2",
    name: "Karan & Meera",
    relation: "Dost",
    city: "Toronto, Canada",
    message: "Wish we could be there! Watching the sangeet live from Toronto at 7 AM. Congratulations you two!",
  },
  {
    id: "b3",
    name: "Suresh Mama",
    relation: "Mama ji",
    city: "Mumbai",
    message: "Tabiyat ki wajah se aa nahi paaya, par live dekh ke aankhein bhar aayi. Khush raho!",
  },
  {
    id: "b4",
    name: "Anjali",
    relation: "College friend",
    city: "Bengaluru",
    message: "Finally! Can't wait to see you both as the most beautiful couple.",
  },
];

export type Package = {
  id: "basic" | "standard" | "premium";
  name: string;
  price: number;
  tagline: string;
  popular?: boolean;
  features: string[];
};

export const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: 4999,
    tagline: "Shaadi ka page + QR",
    features: [
      "Shaadi ka wedding page + QR code",
      "Sabhi functions ka schedule aur map",
      "300 photos / 10 videos",
      "1 saal tak page online",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 9999,
    tagline: "Live + replay + guest uploads",
    popular: true,
    features: [
      "Basic ka sab kuch",
      "4 ghante live streaming (500 viewers tak)",
      "Live ke baad automatic replay",
      "Mehmaan apne phone se photos upload karein",
      "3 saal tak page online",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 19999,
    tagline: "Lifetime + highlight reel",
    features: [
      "Standard ka sab kuch",
      "12 ghante live (2000 viewers tak)",
      "PIN-protected private page",
      "Highlight reel + full album download",
      "Lifetime page access",
    ],
  },
];

export const eventPresets = [
  { name: "Haldi", emoji: "💛" },
  { name: "Mehndi", emoji: "🌿" },
  { name: "Sangeet", emoji: "🎶" },
  { name: "Shaadi / Pheras", emoji: "🔥" },
  { name: "Reception", emoji: "✨" },
  { name: "Tilak / Roka", emoji: "🪔" },
];

export const dashboardStats = {
  pageViews: 1284,
  uniqueVisitors: 642,
  liveViewersPeak: 184,
  guestUploads: 37,
  blessings: 12,
  rsvpsCount: 15,
};

export const sampleRsvps: GuestRsvp[] = [
  {
    id: "rsvp-1",
    name: "Ramesh Sharma & Family",
    phone: "9829012345",
    attending: true,
    adultsCount: 4,
    kidsCount: 1,
    attendingEvents: ["haldi", "mehndi", "sangeet", "pheras", "reception"],
    diet: "veg",
    note: "Pura parivar shamil hoga! Bahut bahut badhai.",
    submittedAt: "2026-11-04T10:15:00+05:30",
  },
  {
    id: "rsvp-2",
    name: "Sunita Verma (Mami Ji)",
    phone: "9829123456",
    attending: true,
    adultsCount: 2,
    kidsCount: 0,
    attendingEvents: ["sangeet", "pheras", "reception"],
    diet: "jain",
    note: "Shubh vivah! Hum 7 tarikh sham ko pahunch rahe hain.",
    submittedAt: "2026-11-04T14:30:00+05:30",
  },
  {
    id: "rsvp-3",
    name: "Rajesh Gupta & Parivar",
    phone: "9829234567",
    attending: true,
    adultsCount: 3,
    kidsCount: 2,
    attendingEvents: ["mehndi", "sangeet", "pheras", "reception"],
    diet: "veg",
    note: "Bachche bahut excited hain dance ke liye!",
    submittedAt: "2026-11-05T09:45:00+05:30",
  },
  {
    id: "rsvp-4",
    name: "Vivek & Ananya Malhotra",
    phone: "9829345678",
    attending: true,
    adultsCount: 2,
    kidsCount: 0,
    attendingEvents: ["sangeet", "pheras"],
    diet: "all",
    note: "Can't wait to witness this beautiful union!",
    submittedAt: "2026-11-05T16:20:00+05:30",
  },
  {
    id: "rsvp-5",
    name: "Alok Khurana",
    phone: "9829456789",
    attending: false,
    adultsCount: 0,
    kidsCount: 0,
    attendingEvents: [],
    diet: "all",
    note: "Tabiyat theek na hone ki wajah se nahi aa paunga, par live poora dekhunga. Khoob aashirwad!",
    submittedAt: "2026-11-06T11:00:00+05:30",
  },
  {
    id: "rsvp-6",
    name: "Meera Chawla (Masi Ji)",
    phone: "9829567890",
    attending: true,
    adultsCount: 2,
    kidsCount: 1,
    attendingEvents: ["haldi", "mehndi", "sangeet", "pheras", "reception"],
    diet: "veg",
    note: "Haldi se leke vidaai tak saath rahenge.",
    submittedAt: "2026-11-06T18:10:00+05:30",
  },
];

export type Celebration = {
  id: "pheras" | "haldi" | "mehndi" | "sangeet" | "reception";
  name: string;
  nameHi: string;
  blurb: string;
  detail: string;
};

/** The celebrations a Live Shadi page is built around. Used by the home page and /explore. */
export const celebrations: Celebration[] = [
  {
    id: "pheras",
    name: "Shaadi & Pheras",
    nameHi: "विवाह",
    blurb: "Jaimala se vidaai tak, poora mandap live.",
    detail:
      "The main ceremony is what far-away family most want to see. Stream the jaimala, the saat phere and the vidaai, and keep the full recording on the same page afterwards.",
  },
  {
    id: "haldi",
    name: "Haldi",
    nameHi: "हल्दी",
    blurb: "Peele rang, dhol aur masti.",
    detail:
      "Haldi is loud, joyful and over in an hour. Go live for the rasam, then let guests add their own photos from the day.",
  },
  {
    id: "mehndi",
    name: "Mehndi",
    nameHi: "मेहंदी",
    blurb: "Rang, geet aur family games.",
    detail:
      "Share the evening schedule and venue map, stream the music and games, and collect blessings from relatives who could not travel.",
  },
  {
    id: "sangeet",
    name: "Sangeet",
    nameHi: "संगीत",
    blurb: "Family performances ki poori raat.",
    detail:
      "Every performance becomes a replay you can rewatch. Guests can upload clips they recorded from their seats.",
  },
  {
    id: "reception",
    name: "Reception",
    nameHi: "रिसेप्शन",
    blurb: "Aashirwad samaroh aur dinner.",
    detail:
      "Keep the reception page open for late guests, with timings, dress code and the photo album in one place.",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
};

/**
 * Only add real, permissioned testimonials here. The section stays hidden while this list is empty,
 * so the site never shows made-up reviews.
 */
export const testimonials: Testimonial[] = [];
