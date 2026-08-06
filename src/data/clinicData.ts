import { ClinicConfig, Doctor, ServiceItem, SoundTrack, CMSPost } from '../types';

export const CLINIC_DATA: ClinicConfig = {
  name: "Astygma Hope Clinic",
  branch: "Shirol & Kolhapur Branches",
  phone: "+91 7522900512",
  whatsApp: "+91 7522900512",
  email: "astygmahope@gmail.com",
  workingHours: "10 AM to 6 PM",
  workingDays: "Monday to Saturday",
  closedDay: "Sunday Closed / Emergency",
  address: {
    line1: "Maharashtra State Highway 137",
    line2: "Main Road",
    landmark: "Near Mall Bhag",
    city: "Shirol",
    state: "Maharashtra",
    pincode: "416103",
    country: "India"
  },
  socials: {
    instagram: "https://www.instagram.com/astygma_369/?hl=en",
    facebook: "https://www.facebook.com/p/Astygma-Hope-Clinic-100034449925414/",
    youtube: "https://youtube.com/@astygmahopeclinic"
  },
  branches: {
    shirol: {
      name: "Shirol Branch (Main HQ)",
      address: "Maharashtra State Highway 137, Main Road, Mall Bhag, Shirol, Maharashtra 416103",
      landmark: "Near Mall Bhag, Main Road",
      distanceInfo: "Just 250 meters (2-minute walk) from Shirol Central Bus Stand",
      daysAvailable: "Tuesdays, Thursdays & Saturdays (10 AM to 6 PM)",
      hours: "10 AM to 6 PM",
      gmapsUrl: "https://www.google.com/maps/search/?api=1&query=Astygma+Hope+Clinic+Shirol+Maharashtra+416103",
      hasSonography: true,
      imagePath: "/assets/clinic/shirol_branch.jpg"
    },
    kolhapur: {
      name: "Kolhapur Branch",
      address: "Near Deshmukh Hall, Hari Om Nagar, Kolhapur, Maharashtra 416008",
      landmark: "Near Deshmukh Hall, Hari Om Nagar",
      distanceInfo: "1.5 km from Kolhapur Railway Station & Central Bus Stand",
      daysAvailable: "Mondays, Wednesdays & Fridays (10 AM to 5 PM)",
      hours: "10 AM to 5 PM",
      gmapsUrl: "https://www.google.com/maps/search/?api=1&query=Astygma+Hope+Fertility+Clinic+Kolhapur+Branch+Hari+Om+Nagar",
      hasSonography: false,
      imagePath: "/assets/clinic/kolhapur_branch.jpg"
    }
  }
};

export const CLINIC_MISSION = "Astygma Hope Clinic combines evidence-based fertility medicine with holistic wellness, compassionate reception support, and personalized care pathways that help patients feel informed, confident, and supported from the first consultation onward.";

export const TRUST_POINTS = [
  {
    title: "Human-Centered Care",
    desc: "Every family receives calm, guided support from reception to consultation, with clear communication and transparent appointment handling."
  },
  {
    title: "Multi-Branch Access",
    desc: "Patients can choose between our Shirol and Kolhapur clinics based on the day-wise availability and convenience of travel."
  },
  {
    title: "Holistic Fertility Science",
    desc: "Advanced reproductive medicine is paired with Ultra Yoga, A-Dhyand Meditation, and Garbhasanskar guidance for a full-circle wellness journey."
  },
  {
    title: "Fast, Reachable Support",
    desc: "Patients can call, WhatsApp, email, or use the virtual receptionist to get immediate help with logistics and care queries."
  },
  {
    title: "Trusted Medical Leadership",
desc: "The clinic is led by Dr. Umesh Datta Kalekar, whose 31+ years of clinical practice and educational work have shaped a trusted patient experience."
  },
  {
    title: "Transparent Booking Experience",
    desc: "Appointments can be booked directly with a simple ₹500 consultation fee — paid online or at the clinic — making the first step simple, clear, and reassuring."
  }
];

export const FOUNDER_DOCTOR: Doctor = {
  id: "dr-umesh-kalekar",
name: "Dr. Umesh Datta Kalekar",
  role: "Founder & MD",
  title: "Founder of Astygma Hope Clinic",
  experience: "31+ Years",
  qualifications: [
    "Doctor of Medicine (MD)",
    "Senior Health Educator",
    "Medical Author",
    "Yoga Researcher",
    "Meditation Researcher",
    "Ayurvedic Fertility Coach"
  ],
  bio: "Dr. Umesh Datta Kalekar is a pioneer in combining advanced reproductive medicine with ancient holistic sciences. Over his 31+ years of clinical practice, he has conducted national and international workshops, developer of Ultra Yoga and A-Dhyand Meditation, guiding thousands of families to fertility success. As a certified Ayurvedic Fertility Coach, he personally guides couples through natural conception pathways using Beeja Shuddhi (purification of egg and sperm), Rasayana rejuvenation, and classical Ayurvedic nutrition.",
  highlights: [
    "Developer of Ultra Yoga",
    "Developer of A-Dhyand Meditation",
    "Ayurvedic Fertility Coach (Natural Conception Expert)",
    "Conducted Workshops Nationally & Internationally",
    "31+ Years Clinical Excellence in Reproductive Science",
    "Holistic Fertility & Garbhasanskar Expert"
  ],
  imagePath: "/assets/doctors/dr_umesh_kalekar.png",
  isFounder: true
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "female-infertility",
    title: "Female Infertility",
    category: "clinical",
    shortDesc: "Comprehensive diagnostic evaluation and clinical management for ovulation disorders, tubal factor, PCOS, and hormonal imbalances.",
    fullDesc: "Our specialized female infertility division utilizes evidence-based reproductive protocols to identify root causes of subfertility. From ovarian reserve testing and follicle tracking to targeted endocrine regulation, we provide tailored medical pathways.",
    benefits: ["Detailed Ovarian Reserve Analysis", "Follicular Dynamics Tracking", "Endometrial Receptivity Enhancement", "Hormonal Balance Restoration"],
    iconName: "UserCheck",
    imagePath: "/assets/clinic/female_infertility.jpg"
  },
  {
    id: "male-infertility",
    title: "Male Infertility",
    category: "clinical",
    shortDesc: "Advanced andrology assessment, semen analysis, oxidative stress reduction, and lifestyle-integrated sperm quality optimization.",
    fullDesc: "Male fertility accounts for nearly 40-50% of conception challenges. Our clinic conducts specialized diagnostic evaluations, sperm morphology checks, and targeted therapies to optimize male reproductive health naturally and medically.",
    benefits: ["Computerized Semen Analysis", "Sperm DNA Fragmentation Management", "Varicocele & Oxidative Stress Care", "Vitality & Motility Enhancement"],
    iconName: "Activity",
    imagePath: "/assets/clinic/male_infertility.jpg"
  },
  {
    id: "pregnancy-care",
    title: "Pregnancy Care",
    category: "clinical",
    shortDesc: "Holistic prenatal monitoring, high-risk pregnancy triage, maternal nutritional support, and fetal wellness tracking.",
    fullDesc: "Continuous care from early conception through full term. We combine routine clinical check-ups with maternal sound therapy and guided prenatal exercises to ensure a peaceful, healthy pregnancy journey.",
    benefits: ["Routine Clinical Prenatal Care", "High-Risk Pregnancy Screening", "Maternal Nutrition Protocols", "Fetal Wellbeing Monitoring"],
    iconName: "HeartHandshake",
    imagePath: "/assets/clinic/pregnancy_care.jpg"
  },
  {
    id: "ultrasound",
    title: "Ultrasound (Shirol Branch Only)",
    category: "clinical",
    shortDesc: "High-resolution sonography scans for pelvic health, follicular monitoring, early pregnancy confirmation, and anomaly screening.",
    fullDesc: "Equipped with state-of-the-art sonography technology. All ultrasound procedures follow strict medical protocols to monitor organ health, endometrial thickness, and fetal development stages. Sonography is available exclusively at Shirol HQ on Tue, Thu, and Sat.",
    benefits: ["Pelvic & Follicular Sonography", "Early Gestation Confirmation Scans", "Endometrial Color Doppler", "Fetal Anomaly & Growth Evaluation"],
    iconName: "Scan",
    imagePath: "/assets/clinic/ultrasound_scan.jpg"
  },
  {
    id: "laboratory-tests",
    title: "Laboratory Tests",
    category: "clinical",
    shortDesc: "Precise hormonal panels, infectious disease screening, genetic carrier testing, and routine hematology.",
    fullDesc: "In-house clinical lab offering fast, precise diagnostic panels tailored specifically for reproductive medicine, thyroid regulation, and metabolic health.",
    benefits: ["AMH, FSH, LH, E2, Progesterone Panels", "Male Hormone Profiling", "Thyroid & Metabolic Assessments", "In-House Rapid Reporting"],
    iconName: "Microscope",
    imagePath: "/assets/clinic/laboratory_tests.jpg"
  },
  {
    id: "diet-lifestyle-guidance",
    title: "Diet and Lifestyle Guidance",
    category: "holistic",
    shortDesc: "Customized fertility nutritional plans, circadian rhythm realignment, and detoxification pathways.",
    fullDesc: "Cellular nutrition plays a central role in egg and sperm quality. Dr. Kalekar's protocol incorporates anti-inflammatory dietary strategies, gut microbiome restoration, and daily habit realignment.",
    benefits: ["Anti-Inflammatory Fertility Diet", "Circadian & Sleep Optimization", "Endocrine Disruptor Elimination", "Micronutrient Supplementation"],
    iconName: "Apple",
    imagePath: "/assets/clinic/diet_lifestyle.jpg"
  },
  {
    id: "yoga-therapy",
    title: "Yoga Therapy (Ultra Yoga)",
    category: "holistic",
    shortDesc: "Dr. Umesh Datta Kalekar's proprietary Ultra Yoga system designed to enhance pelvic blood circulation and balance neuro-endocrine pathways.",
    fullDesc: "Ultra Yoga is a specialized medical yoga research program developed by Dr. Umesh Datta Kalekar. It targets pelvic vascular flow, relieves autonomic stress, and revitalizes reproductive organ tissue.",
    benefits: ["Enhanced Pelvic Blood Flow", "Autonomic Nervous System Regulation", "Cortisol & Stress Reduction", "Endocrine System Activation"],
    iconName: "Flame",
    imagePath: "/assets/clinic/ultra_yoga.jpg"
  },
  {
    id: "sangeetopchar",
    title: "Sangeetopchar (Sound Therapy)",
    category: "holistic",
    shortDesc: "Acoustic resonance frequency therapy tailored to induce deep parasympathetic relaxation and cellular healing.",
    fullDesc: "Sangeetopchar leverages specific Indian classical raga frequencies and acoustic resonance to calm maternal brainwave states, reduce anxiety, and promote cellular repair during conception and pregnancy.",
    benefits: ["Alpha & Theta Brainwave Induction", "Anxiety & Hypertension Mitigation", "Enhanced Cellular Vibration", "Protected Audio Vault Stream"],
    iconName: "Music",
    imagePath: "/assets/clinic/sangeetopchar.jpg"
  },
  {
    id: "ayurvedic-fertility-course",
    title: "Ayurvedic Fertility Course",
    category: "educational",
    shortDesc: "Evidence-informed natural fertility principles, Panchakarma preparation, and Rasayana rejuvenation therapies.",
    fullDesc: "Educational guidance grounded in classical Ayurvedic reproductive physiology (Beeja Shuddhi), preparing couples physically and mentally for healthy conception.",
    benefits: ["Natural Body Detox Principles", "Beeja Shuddhi Preparation", "Rasayana Rejuvenation Protocols", "Seasonal Conception Guidance"],
    iconName: "BookOpen",
    imagePath: "/assets/clinic/ayurvedic_fertility.jpg"
  },
  {
    id: "scientific-garbhasanskar-guide",
    title: "Scientific Garbhasanskar Guide",
    category: "educational",
    shortDesc: "Structured pre-conception and intra-uterine cognitive development practices based on neuroscience and ancient wisdom.",
    fullDesc: "Scientific Garbhasanskar blends modern epigenetics and fetal psychology with traditional mental bonding exercises, giving unborn children an optimal emotional and cognitive start.",
    benefits: ["Epigenetic Fetal Stimulation", "Pre-Conception Mental Alignment", "Maternal Emotional Bonding", "Neuro-Sensory Development"],
    iconName: "Sparkles",
    imagePath: "/assets/clinic/scientific_garbhasanskar.jpg"
  },
  {
    id: "suprajaa-nirmiti-program",
    title: "Suprajaa Nirmiti Program",
    category: "holistic",
    shortDesc: "Our flagship comprehensive program integrating Ultra Yoga, A-Dhyand Meditation, Sangeetopchar, and Clinical Medicine.",
    fullDesc: "The ultimate transformation protocol created by Dr. Umesh Datta Kalekar. Suprajaa Nirmiti brings together medicine, mind, sound, and yoga into one unified journey for couples seeking high-vibrational parenthood.",
    benefits: ["Unified Clinical & Holistic Care", "Personalized Dr. Kalekar Consultations", "Exclusive Access to Healing Vault", "Complete Mind-Body Transformation"],
    iconName: "Award",
    imagePath: "/assets/clinic/suprajaa_nirmiti.jpg"
  }
];

export const INITIAL_SOUND_TRACKS: SoundTrack[] = [
  {
    id: "snd-01",
    title: "A-Dhyand Deep Meditation",
    category: "Meditation",
    duration: "15:00",
    filePath: "/assets/music/meditation/a_dhyand_meditation.mp3",
    frequencyHz: 432,
    description: "Dr. Umesh Datta Kalekar's signature meditation frequency designed for deep mental stillness and endocrine harmony."
  },
  {
    id: "snd-02",
    title: "Garbhasanskar Fetal Bonding Raga",
    category: "Pregnancy",
    duration: "20:00",
    filePath: "/assets/music/pregnancy/garbhasanskar_raga.mp3",
    frequencyHz: 528,
    description: "Soothing harmonic soundwaves formulated to nurture fetal auditory development and maternal calming."
  },
  {
    id: "snd-03",
    title: "Cellular Healing Soundscape",
    category: "Healing",
    duration: "12:30",
    filePath: "/assets/music/healing/cellular_healing.mp3",
    frequencyHz: 639,
    description: "Gentle acoustic resonance supporting tissue regeneration and stress hormone clearance."
  },
  {
    id: "snd-04",
    title: "Deep Autonomic Relaxation",
    category: "Relaxation",
    duration: "18:45",
    filePath: "/assets/music/relaxation/autonomic_relaxation.mp3",
    frequencyHz: 396,
    description: "Calming parasympathetic tone aimed at alleviating reproductive anxiety and insomnia."
  },
  {
    id: "snd-05",
    title: "Ultra Yoga Flow Atmosphere",
    category: "Yoga",
    duration: "25:00",
    filePath: "/assets/music/yoga/ultra_yoga_flow.mp3",
    frequencyHz: 741,
    description: "Rhythmic breathing soundscape matched to pelvic movement cycles during Ultra Yoga sessions."
  },
  {
    id: "snd-06",
    title: "Western Ghats Natural Rain & Birds",
    category: "Nature",
    duration: "30:00",
    filePath: "/assets/music/nature/western_ghats_rain.mp3",
    frequencyHz: 432,
    description: "Pure ambient nature recording from Maharashtra rainforests for grounding and peaceful sleep."
  }
];

export const SOUND_TRACKS = INITIAL_SOUND_TRACKS;

export const SAMPLE_CMS_POSTS: CMSPost[] = [
  {
    id: "post-01",
    title: "Dr. Umesh Datta Kalekar's Workshop on Ultra Yoga for Fertility",
    category: "Story",
    content: "Highlights from our recent national workshop exploring pelvic blood flow optimization through Ultra Yoga techniques.",
    mediaUrl: "/assets/gallery/workshop_1.jpg",
    mediaType: "image",
    date: "2026-07-28",
    author: "Dr. Umesh Datta Kalekar",
    likes: 142
  },
  {
    id: "post-02",
    title: "Scientific Garbhasanskar: Fetal Epigenetics & Mindful Conception",
    category: "Blog",
    content: "Discover how maternal stress reduction during the first trimester directly influences fetal neurodevelopment and emotional wellbeing.",
    mediaUrl: "/assets/gallery/garbhasanskar_blog.jpg",
    mediaType: "image",
    date: "2026-07-25",
    author: "Dr. Umesh Datta Kalekar",
    likes: 289
  },
  {
    id: "post-03",
    title: "Free Fertility & Sonography Screening Camp at Shirol Branch",
    category: "HealthCamp",
    content: "Join us at Astygma Hope Clinic Shirol for personalized guidance with Dr. Umesh Datta Kalekar and ultrasound diagnostics.",
    mediaUrl: "/assets/clinic/shirol_branch.jpg",
    mediaType: "image",
    date: "2026-07-20",
    author: "Clinic Admin",
    likes: 310
  }
];
