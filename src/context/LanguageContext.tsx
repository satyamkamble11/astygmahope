import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Language } from '../types';

type Translations = Record<string, Record<Language, string>>;

export const TRANSLATIONS: Translations = {
  /* ===== Brand & Navbar ===== */
  clinicName: {
    EN: "Astygma Hope Clinic",
    MR: "अस्टिग्मा होप क्लिनिक",
    HI: "अस्टिग्मा होप क्लिनिक"
  },
  tagline: {
    EN: "India's Most Premium Fertility & Holistic Healthcare Platform",
    MR: "भारतातील सर्वात प्रीमियम वंध्यत्व निवारण आणि सर्वसमावेशक आरोग्य केंद्र",
    HI: "भारत का सबसे प्रीमियम निसंतानता निवारण और समग्र स्वास्थ्य मंच"
  },
  home: { EN: "Home", MR: "मुख्यपृष्ठ", HI: "होम" },
  about: { EN: "About", MR: "आमच्याबद्दल", HI: "हमारे बारे में" },
  doctors: { EN: "Doctors", MR: "डॉक्टर", HI: "डॉक्टर" },
  services: { EN: "Services", MR: "सेवा", HI: "सेवाएं" },
  gallery: { EN: "Gallery", MR: "गॅलरी", HI: "गैलरी" },
  cmsFeed: { EN: "CMS Feed", MR: "सीएमएस फीड", HI: "सीएमएस फीड" },
  courses: { EN: "Courses", MR: "कोर्सेस", HI: "कोर्स" },
  contact: { EN: "Contact", MR: "संपर्क", HI: "संपर्क" },
  soundVault: { EN: "Sound Vault", MR: "साउंड व्हॉल्ट", HI: "साउंड वॉल्ट" },
  bookAppointment: { EN: "Book Appointment", MR: "अपॉइंटमेंट बुक करा", HI: "अपॉइंटमेंट बुक करें" },

  /* ===== Hero ===== */
  callHelpline: {
    EN: "Need Quick Consultation? Call Helpline:",
    MR: "त्वरित सल्ला हवा? हेल्पलाइनवर कॉल करा:",
    HI: "त्वरित सलाह चाहिए? हेल्पलाइन पर कॉल करें:"
  },
  shirolHqLocation: {
    EN: "Shirol HQ (250m from Bus Stand)",
    MR: "शिरोळ मुख्य कार्यालय (बस स्टँडपासून 250 मी)",
    HI: "शिरोल मुख्यालय (बस स्टैंड से 250 मी)"
  },
  kolhapurLocation: {
    EN: "Kolhapur Branch (Hari Om Nagar)",
    MR: "कोल्हापूर शाखा (हरि ओम नगर)",
    HI: "कोल्हापुर शाखा (हरि ओम नगर)"
  },
  branchesBadge: {
    EN: "Shirol & Kolhapur Branches",
    MR: "शिरोळ आणि कोल्हापूर शाखा",
    HI: "शिरोल और कोल्हापुर शाखाएं"
  },
  clinicalExcellence: {
    EN: "Clinical Excellence",
    MR: "वैद्यकीय उत्कृष्टता",
    HI: "चिकित्सा उत्कृष्टता"
  },
  heroTitleLine1: {
    EN: "Where Science Meets",
    MR: "जिथे विज्ञान मिळते",
    HI: "जहां विज्ञान मिलता है"
  },
  heroTitleLine2: {
    EN: "Holistic Fertility Hope",
    MR: "सर्वांगीण प्रजनन आशा",
    HI: "समग्र प्रजनन आशा"
  },
heroSubtitle: {
    EN: "Founded by Dr. Umesh Datta Kalekar, Astygma Hope Clinic combines 31+ years of reproductive medicine with Ultra Yoga, A-Dhyand Meditation, and Garbhasanskar science across our Shirol and Kolhapur centers.",
    MR: "डॉ. उमेश दत्ता कळेकर यांनी स्थापित केलेले, अस्टिग्मा होप क्लिनिक ३१+ वर्षांचे प्रजनन औषध, अल्ट्रा योग, अ-ध्यान ध्यान आणि गर्भसंस्कार विज्ञान आपल्या शिरोळ आणि कोल्हापूर केंद्रांमध्ये एकत्र करते.",
    HI: "डॉ. उमेश दत्ता कळेकर द्वारा स्थापित, अस्टिग्मा होप क्लिनिक 31+ वर्षों की प्रजनन चिकित्सा, अल्ट्रा योग, अ-ध्यान ध्यान और गर्भसंस्कार विज्ञान को अपने शिरोल और कोल्हापुर केंद्रों में जोड़ता है।"
  },
  shirolBranchName: { EN: "Shirol Branch (HQ)", MR: "शिरोळ शाखा (मुख्यालय)", HI: "शिरोल शाखा (मुख्यालय)" },
  kolhapurBranchName: { EN: "Kolhapur Branch", MR: "कोल्हापूर शाखा", HI: "कोल्हापुर शाखा" },
  shirolDaysShort: {
    EN: "• Tue, Thu, Sat (10 AM - 6 PM) | Sonography Available",
    MR: "• मंगळ, गुरु, शनि (सकाळी १० - संध्याकाळी ६) | सोनोग्राफी उपलब्ध",
    HI: "• मंगल, गुरु, शनि (सुबह 10 - शाम 6) | सोनोग्राफी उपलब्ध"
  },
  kolhapurDaysShort: {
    EN: "• Mon, Wed, Fri (10 AM - 5 PM) | Near Deshmukh Hall",
    MR: "• सोम, बुध, शुक्र (सकाळी १० - संध्याकाळी ५) | देशमुख हॉलजवळ",
    HI: "• सोम, बुध, शुक्र (सुबह 10 - शाम 5) | देशमुख हॉल के पास"
  },
  bookAppointmentCTA: {
    EN: "Book Appointment • ₹500",
    MR: "अपॉइंटमेंट बुक करा • ₹५००",
    HI: "अपॉइंटमेंट बुक करें • ₹500"
  },
  exploreSoundVault: {
    EN: "Explore Sound Vault",
    MR: "साउंड व्हॉल्ट पहा",
    HI: "साउंड वॉल्ट देखें"
  },
  viewFullCredentials: {
    EN: "View Full Dr. Kalekar Credentials",
    MR: "डॉ. काळेकर यांची संपूर्ण ओळख पहा",
    HI: "डॉ. कालेकर की पूरी योग्यता देखें"
  },
  keySpecializations: {
    EN: "Key Specializations:",
    MR: "प्रमुख विशेषता:",
    HI: "मुख्य विशेषताएं:"
  },
  mdHealthEducator: {
    EN: "MD | Health Educator | Author",
    MR: "एमडी | आरोग्य शिक्षक | लेखक",
    HI: "एमडी | स्वास्थ्य शिक्षक | लेखक"
  },

  /* ===== Clinic Info Section ===== */
  aboutClinicBadge: {
    EN: "About Astygma Hope Clinic",
    MR: "अस्टिग्मा होप क्लिनिकबद्दल",
    HI: "अस्टिग्मा होप क्लिनिक के बारे में"
  },
  whyPatientsTrustUs: {
    EN: "Why Patients Trust Us",
    MR: "रुग्ण आमच्यावर का विश्वास ठेवतात",
    HI: "मरीज हम पर भरोसा क्यों करते हैं"
  },
  bookConsultation500: {
    EN: "Book Your Consultation — ₹500",
    MR: "तुमचा सल्ला बुक करा — ₹५००",
    HI: "अपना परामर्श बुक करें — ₹500"
  },

  /* ===== Services ===== */
  servicesBadgeText: {
    EN: "Integrated Medical & Holistic Programs",
    MR: "एकात्मिक वैद्यकीय आणि समग्र कार्यक्रम",
    HI: "एकीकृत चिकित्सा और समग्र कार्यक्रम"
  },
  servicesHeading: {
    EN: "Our Core Clinical & Holistic Offerings",
    MR: "आमच्या मुख्य वैद्यकीय आणि समग्र सेवा",
    HI: "हमारी मुख्य चिकित्सा और समग्र सेवाएं"
  },
  servicesSubheading: {
    EN: "From advanced medical infertility diagnostics to Dr. Umesh Datta Kalekar's proprietary Ultra Yoga and Garbhasanskar programs.",
    MR: "प्रगत वैद्यकीय वंध्यत्व तपासणीपासून डॉ. उमेश दत्ता कळेकर यांच्या अल्ट्रा योग आणि गर्भसंस्कार कार्यक्रमांपर्यंत.",
    HI: "उन्नत चिकित्सा निसंतानता जांच से लेकर डॉ. उमेश दत्ता कळेकर के अल्ट्रा योग और गर्भसंस्कार कार्यक्रमों तक।"
  },
  viewFullDetails: {
    EN: "View Full Clinical Details",
    MR: "संपूर्ण तपशील पहा",
    HI: "पूरा विवरण देखें"
  },
  categoryClinical: { EN: "Clinical", MR: "वैद्यकीय", HI: "चिकित्सा" },
  categoryHolistic: { EN: "Holistic", MR: "समग्र", HI: "समग्र" },
  categoryEducational: { EN: "Educational", MR: "शैक्षणिक", HI: "शैक्षिक" },
  requestGeneralAppointment: {
    EN: "Request General Appointment",
    MR: "सामान्य अपॉइंटमेंटची विनंती करा",
    HI: "सामान्य अपॉइंटमेंट का अनुरोध करें"
  },
  close: { EN: "Close", MR: "बंद करा", HI: "बंद करें" },
  keyBenefits: {
    EN: "Key Benefits & Protocols:",
    MR: "प्रमुख फायदे आणि उपचार:",
    HI: "मुख्य लाभ और प्रक्रियाएं:"
  },

  /* ===== Sonography Section ===== */
  sonographyBadge: {
    EN: "High-Precision Diagnostic Sonography",
    MR: "उच्च-सुस्पष्ट निदानात्मक सोनोग्राफी",
    HI: "उच्च-सटीक डायग्नोस्टिक सोनोग्राफी"
  },
  sonographyTitle: {
    EN: "Sonography & Ultrasound Department",
    MR: "सोनोग्राफी आणि अल्ट्रासाऊंड विभाग",
    HI: "सोनोग्राफी और अल्ट्रासाउंड विभाग"
  },
  sonographySubtitle: {
    EN: "Equipped with high-resolution pelvic Doppler and 3D/4D fetal sonography capabilities.",
    MR: "उच्च-रिझोल्यूशन पेल्विक डॉपलर आणि ३डी/४डी गर्भ सोनोग्राफी क्षमतांनी सुसज्जित.",
    HI: "हाई-रिज़ॉल्यूशन पेल्विक डॉपलर और 3D/4D भ्रूण सोनोग्राफी क्षमताओं से सुसज्जित।"
  },
  bookUltrasound: {
    EN: "Book Ultrasound Scan",
    MR: "अल्ट्रासाऊंड बुक करा",
    HI: "अल्ट्रासाउंड बुक करें"
  },
  tabCapabilities: {
    EN: "Diagnostic Capabilities",
    MR: "निदान क्षमता",
    HI: "निदान क्षमताएं"
  },
  tabMediaPlayer: {
    EN: "Sonography Media Player",
    MR: "सोनोग्राफी मीडिया प्लेयर",
    HI: "सोनोग्राफी मीडिया प्लेयर"
  },
  tabAssetFolder: {
    EN: "Asset Folder (/assets/sonography)",
    MR: "ॲसेट फोल्डर (/assets/sonography)",
    HI: "एसेट फोल्डर (/assets/sonography)"
  },
  follicularStudy: {
    EN: "Follicular Study & Doppler",
    MR: "फॉलिक्युलर अभ्यास आणि डॉपलर",
    HI: "फॉलिक्युलर अध्ययन और डॉपलर"
  },
  follicularStudyDesc: {
    EN: "Serial follicular tracking scans to accurately monitor egg growth, rupture timings, and endometrial vascularity.",
    MR: "अंड्याची वाढ, फुटण्याची वेळ आणि गर्भाशयाची रक्तवाहिनी अचूक तपासण्यासाठी सलग फॉलिक्युलर स्कॅन.",
    HI: "अंडे की वृद्धि, फटने का समय और गर्भाशय की रक्तवाहिनियों की सटीक निगरानी के लिए लगातार फॉलिक्युलर स्कैन।"
  },
  earlyGestation: {
    EN: "Early Gestation & Viability",
    MR: "सुरुवातीची गर्भावस्था आणि व्यवहार्यता",
    HI: "प्रारंभिक गर्भावस्था और व्यवहार्यता"
  },
  earlyGestationDesc: {
    EN: "Precision early pregnancy ultrasound scans to confirm fetal heartbeat, gestational sac integrity, and intra-uterine location.",
    MR: "गर्भाच्या हृदयाचा ठोका, गर्भाशयातील थैली आणि स्थान तपासण्यासाठी सुरुवातीच्या गर्भधारणेचे अचूक स्कॅन.",
    HI: "भ्रूण की दिल की धड़कन, गर्भाशय की थैली और स्थान की पुष्टि के लिए प्रारंभिक गर्भावस्था के सटीक स्कैन।"
  },
  pelvicHealth: {
    EN: "Pelvic Health & Anomaly",
    MR: "पेल्विक आरोग्य आणि विकृती",
    HI: "पेल्विक स्वास्थ्य और असामान्यता"
  },
  pelvicHealthDesc: {
    EN: "Comprehensive uterine and ovarian evaluation for fibroids, polyps, adenomyosis, and ovarian cyst classification.",
    MR: "फायब्रॉइड, पॉलीप, एडेनोमायोसिस आणि गर्भाशयाच्या गाठीचे वर्गीकरण करण्यासाठी संपूर्ण गर्भाशय आणि बीजांड तपासणी.",
    HI: "फाइब्रॉइड, पॉलीप, एडेनोमायोसिस और डिम्बग्रंथि सिस्ट के वर्गीकरण के लिए पूर्ण गर्भाशय और डिम्बग्रंथि मूल्यांकन।"
  },
  videoShowcaseTitle: {
    EN: "Sonography & Ultrasound Video Showcase",
    MR: "सोनोग्राफी आणि अल्ट्रासाऊंड व्हिडिओ शोकेस",
    HI: "सोनोग्राफी और अल्ट्रासाउंड वीडियो शोकेस"
  },
  videoShowcaseSub: {
    EN: "Patient education clips & real-time ultrasound demonstrations.",
    MR: "रुग्ण शिक्षण क्लिप आणि थेट अल्ट्रासाऊंड प्रात्यक्षिके.",
    HI: "रोगी शिक्षा क्लिप और लाइव अल्ट्रासाउंड प्रदर्शन।"
  },
  folderReadyTitle: {
    EN: "Dedicated Sonography Media Folder Ready",
    MR: "समर्पित सोनोग्राफी मीडिया फोल्डर तयार",
    HI: "समर्पित सोनोग्राफी मीडिया फोल्डर तैयार"
  },
  folderReadyDesc: {
    EN: "A dedicated folder has been set up. Any video files, ultrasound recordings, sonographer documentation, or specialist images placed in /public/assets/sonography will automatically be shown inside this Sonography Media Center.",
    MR: "एक समर्पित फोल्डर तयार केला आहे. /public/assets/sonography मध्ये ठेवलेले कोणतेही व्हिडिओ, अल्ट्रासाऊंड रेकॉर्डिंग, सोनोग्राफर दस्तऐवज किंवा तज्ज्ञांच्या प्रतिमा आपोआप या सोनोग्राफी मीडिया सेंटरमध्ये दिसतील.",
    HI: "एक समर्पित फोल्डर बनाया गया है। /public/assets/sonography में रखे गए कोई भी वीडियो, अल्ट्रासाउंड रिकॉर्डिंग, सोनोग्राफर दस्तावेज़ या विशेषज्ञ छवियां स्वतः इस सोनोग्राफी मीडिया सेंटर में दिखाई देंगी।"
  },

  /* ===== Doctor Profile ===== */
  founderProfileBadge: {
    EN: "Founder & Medical Director Profile",
    MR: "संस्थापक आणि वैद्यकीय संचालक प्रोफाइल",
    HI: "संस्थापक एवं चिकित्सा निदेशक प्रोफाइल"
  },
  medicalPhilosophy: {
    EN: "Medical Philosophy & Journey",
    MR: "वैद्यकीय तत्त्वज्ञान आणि प्रवास",
    HI: "चिकित्सा दर्शन और यात्रा"
  },
  qualificationsCredentials: {
    EN: "Qualifications & Credentials",
    MR: "शैक्षणिक पात्रता आणि ओळख",
    HI: "शैक्षणिक योग्यता और प्रमाणपत्र"
  },
  ultraYogaTitle: { EN: "Ultra Yoga Protocol", MR: "अल्ट्रा योग पद्धत", HI: "अल्ट्रा योग प्रोटोकॉल" },
  ultraYogaDesc: {
    EN: "Developer of Ultra Yoga - a specialized vascular movement system engineered to increase blood flow to pelvic organs and optimize follicular growth.",
    MR: "अल्ट्रा योगाचे निर्माते - पेल्विक अवयवांमध्ये रक्त प्रवाह वाढवण्यासाठी आणि फॉलिक्युलर वाढीसाठी विशेष व्यायाम प्रणाली.",
    HI: "अल्ट्रा योग के विकासक - पेल्विक अंगों में रक्त प्रवाह बढ़ाने और फॉलिक्युलर वृद्धि के लिए विशेष व्यायाम प्रणाली।"
  },
  aDhyandTitle: { EN: "A-Dhyand Meditation", MR: "अ-ध्यान ध्यान", HI: "अ-ध्यान ध्यान" },
  aDhyandDesc: {
    EN: "Developer of A-Dhyand Meditation - targeted neuro-acoustic mindfulness training to mitigate autonomic stress and balance reproductive hormones.",
    MR: "अ-ध्यान ध्यानाचे निर्माते - तणाव कमी करण्यासाठी आणि प्रजनन संप्रेरक संतुलित करण्यासाठी विशेष ध्यान प्रशिक्षण.",
    HI: "अ-ध्यान ध्यान के विकासक - तनाव कमी करने और प्रजनन हार्मोन संतुलित करने के लिए विशेष ध्यान प्रशिक्षण।"
  },
  workshopsTitle: {
    EN: "National & International Workshops",
    MR: "राष्ट्रीय आणि आंतरराष्ट्रीय कार्यशाळा",
    HI: "राष्ट्रीय और अंतर्राष्ट्रीय कार्यशालाएं"
  },
  workshopsDesc: {
    EN: "Dr. Kalekar has conducted numerous clinical workshops across India and abroad, educating medical practitioners and couples on Garbhasanskar science, holistic lifestyle transformation, and natural fertility enhancement.",
    MR: "डॉ. काळेकर यांनी भारतात आणि परदेशात अनेक कार्यशाळा घेतल्या आहेत, वैद्यकीय व्यावसायिक आणि जोडप्यांना गर्भसंस्कार, समग्र जीवनशैली आणि नैसर्गिक प्रजनन वाढीचे शिक्षण दिले आहे.",
    HI: "डॉ. कालेकर ने भारत और विदेश में कई कार्यशालाएं आयोजित की हैं, चिकित्सकों और दंपत्तियों को गर्भसंस्कार विज्ञान, समग्र जीवनशैली और प्राकृतिक प्रजनन वृद्धि की शिक्षा दी है।"
  },
  consultDoctor: {
    EN: "Consult Dr. Umesh Datta Kalekar",
    MR: "डॉ. उमेश दत्ता कळेकर यांचा सल्ला घ्या",
    HI: "डॉ. उमेश दत्ता कळेकर से परामर्श लें"
  },
  ayurvedicCoachTitle: {
    EN: "Ayurvedic Fertility Coach",
    MR: "आयुर्वेदिक प्रजनन मार्गदर्शक",
    HI: "आयुर्वेदिक प्रजनन कोच"
  },
  ayurvedicCoachDesc: {
    EN: "Certified Ayurvedic Fertility Coach — Dr. Kalekar personally guides couples on natural conception using Beeja Shuddhi (egg & sperm purification), Rasayana rejuvenation, and classical Ayurvedic nutrition.",
    MR: "प्रमाणित आयुर्वेदिक प्रजनन मार्गदर्शक — डॉ. काळेकर बीज शुद्धी, रसायन पुनरुज्जीवन आणि आयुर्वेदिक आहाराने जोडप्यांना नैसर्गिक गर्भधारणेचे मार्गदर्शन करतात.",
    HI: "प्रमाणित आयुर्वेदिक प्रजनन कोच — डॉ. कालेकर बीज शुद्धि, रसायन पुनरुज्जीवन और आयुर्वेदिक पोषण से दंपत्तियों को प्राकृतिक गर्भधारण का मार्गदर्शन करते हैं।"
  },

  /* ===== Contact Bar ===== */
  easyContactBadge: {
    EN: "Easy Contact — Reach Us Instantly",
    MR: "सोपा संपर्क — लगेच आमच्यापर्यंत पोहोचा",
    HI: "आसान संपर्क — तुरंत हम तक पहुंचें"
  },
  wereHereToHelp: {
    EN: "We're Here to Help You",
    MR: "आम्ही तुम्हाला मदत करण्यासाठी आहोत",
    HI: "हम आपकी मदद के लिए यहां हैं"
  },
  contactSubtitle: {
    EN: "Call, WhatsApp, or email — our reception responds quickly",
    MR: "कॉल, व्हॉट्सॲप किंवा ईमेल — आमचे रिसेप्शन लवकर प्रतिसाद देते",
    HI: "कॉल, व्हाट्सएप या ईमेल — हमारा रिसेप्शन तुरंत जवाब देता है"
  },
  whatsAppChat: { EN: "WhatsApp Chat", MR: "व्हॉट्सॲप चॅट", HI: "व्हाट्सएप चैट" },
  chatNow: { EN: "Chat Now", MR: "आता चॅट करा", HI: "अभी चैट करें" },
  emailUs: { EN: "Email Us", MR: "आम्हाला ईमेल करा", HI: "हमें ईमेल करें" },

  /* ===== Footer ===== */
  footerTagline: {
    EN: "India's most premium fertility healthcare platform integrating advanced reproductive medicine with ancient holistic sciences.",
    MR: "प्रगत प्रजनन औषध आणि प्राचीन समग्र विज्ञान एकत्र करणारे भारतातील सर्वात प्रीमियम प्रजनन आरोग्य मंच.",
    HI: "उन्नत प्रजनन चिकित्सा और प्राचीन समग्र विज्ञान को जोड़ने वाला भारत का सबसे प्रीमियम प्रजनन स्वास्थ्य मंच।"
  },
  shirolBranchLocation: { EN: "Shirol Branch Location", MR: "शिरोळ शाखेचा पत्ता", HI: "शिरोल शाखा का पता" },
  directHelpline: { EN: "Direct Helpline", MR: "थेट हेल्पलाइन", HI: "सीधी हेल्पलाइन" },
  internalPortals: { EN: "Internal Portals", MR: "अंतर्गत पोर्टल्स", HI: "आंतरिक पोर्टल्स" },
  staffPortal: { EN: "Staff / Reception Portal", MR: "स्टाफ / रिसेप्शन पोर्टल", HI: "स्टाफ / रिसेप्शन पोर्टल" },
  rightsReserved: {
    EN: "All Rights Reserved.",
    MR: "सर्व हक्क राखीव.",
    HI: "सर्व अधिकार सुरक्षित।"
  },
  developedFor: {
    EN: "Developed for Enterprise Fertility Care & Holistic Science",
    MR: "एंटरप्राइझ प्रजनन काळजी आणि समग्र विज्ञानासाठी विकसित",
    HI: "एंटरप्राइज़ प्रजनन देखभाल और समग्र विज्ञान के लिए विकसित"
  },

  /* ===== About Page ===== */
  aboutBadge: { EN: "About Astygma Hope Clinic Shirol", MR: "अस्टिग्मा होप क्लिनिक शिरोळबद्दल", HI: "अस्टिग्मा होप क्लिनिक शिरोल के बारे में" },
  aboutHeading: {
    EN: "Pioneering Advanced Fertility & Ancient Holistic Sciences",
    MR: "प्रगत प्रजनन आणि प्राचीन समग्र विज्ञानातील प्रणेते",
    HI: "उन्नत प्रजनन और प्राचीन समग्र विज्ञान में अग्रणी"
  },
  aboutSubtitle: {
    EN: "For over 31 years, Astygma Hope Clinic has served as a beacon of clinical excellence and compassionate reproductive healthcare in Shirol, Maharashtra.",
    MR: "गेल्या ३१+ वर्षांपासून, अस्टिग्मा होप क्लिनिक शिरोळ, महाराष्ट्रातील वैद्यकीय उत्कृष्टता आणि कळकळीच्या प्रजनन आरोग्याचा दिवा म्हणून कार्यरत आहे.",
    HI: "31+ वर्षों से, अस्टिग्मा होप क्लिनिक शिरोल, महाराष्ट्र में चिकित्सा उत्कृष्टता और करुणामय प्रजनन स्वास्थ्य का प्रतीक रहा है।"
  },
  ourVision: { EN: "Our Vision", MR: "आमचे दृष्टीकोन", HI: "हमारा दृष्टिकोण" },
  visionDesc: {
    EN: "To be India's most trusted and technologically advanced fertility platform, delivering world-class success rates through the seamless integration of modern reproductive medicine with ancient mind-body sciences.",
    MR: "आधुनिक प्रजनन औषध आणि प्राचीन मन-शरीर विज्ञानाच्या सुसंगत एकत्रीकरणाद्वारे जागतिक दर्जाचे यश देणारे भारतातील सर्वात विश्वासार्ह प्रजनन मंच बनणे.",
    HI: "आधुनिक प्रजनन चिकित्सा और प्राचीन मन-शरीर विज्ञान के सहज एकीकरण से विश्वस्तरीय सफलता देने वाला भारत का सबसे विश्वसनीय प्रजनन मंच बनना।"
  },
  ourMission: { EN: "Our Mission", MR: "आमचे ध्येय", HI: "हमारा मिशन" },
  missionDesc: {
    EN: "To empower couples with personalized, non-invasive, and evidence-informed fertility pathways that address physiological, cellular, and psychological dimensions of conception.",
    MR: "गर्भधारणेच्या शारीरिक, पेशीय आणि मानसिक पैलूंना संबोधित करणारे वैयक्तिक, अनाक्रमक आणि विज्ञानावर आधारित मार्ग जोडप्यांना देणे.",
    HI: "दंपत्तियों को गर्भधारणा के शारीरिक, कोशिकीय और मानसिक पहलुओं को संबोधित करने वाले व्यक्तिगत, सुरक्षित और विज्ञान-आधारित मार्ग प्रदान करना।"
  },
  ourPhilosophy: { EN: "Our Healthcare Philosophy", MR: "आमचे आरोग्य तत्त्वज्ञान", HI: "हमारा स्वास्थ्य दर्शन" },
  philosophyDesc: {
    EN: "Conception is both a biological process and a sacred journey. Dr. Umesh Datta Kalekar's protocol treats the whole person through Ultra Yoga, Sangeetopchar sound therapy, and scientific Garbhasanskar.",
    MR: "गर्भधारणा ही जैविक प्रक्रिया आणि पवित्र प्रवास दोन्ही आहे. डॉ. उमेश दत्ता कळेकर यांची पद्धत अल्ट्रा योग, संगीतोपचार आणि वैज्ञानिक गर्भसंस्काराने संपूर्ण व्यक्तीवर उपचार करते.",
    HI: "गर्भधारणा एक जैविक प्रक्रिया और पवित्र यात्रा दोनों है। डॉ. उमेश दत्ता कळेकर की पद्धति अल्ट्रा योग, संगीतोपचार और वैज्ञानिक गर्भसंस्कार से पूरे व्यक्ति का उपचार करती है।"
  },
  founderResearcher: { EN: "Founder & Medical Researcher", MR: "संस्थापक आणि वैद्यकीय संशोधक", HI: "संस्थापक और चिकित्सा शोधकर्ता" },
  ultraYogaResearch: { EN: "Ultra Yoga Research", MR: "अल्ट्रा योग संशोधन", HI: "अल्ट्रा योग शोध" },
  ultraYogaResearchDesc: {
    EN: "Targeted pelvic vascular flow exercises designed for egg and sperm vitality.",
    MR: "अंडी आणि शुक्राणू सशक्ततेसाठी पेल्विक रक्तप्रवाह व्यायाम.",
    HI: "अंडे और शुक्राणु की मजबूती के लिए पेल्विक रक्त प्रवाह व्यायाम।"
  },
  aDhyandMeditation: { EN: "A-Dhyand Meditation", MR: "अ-ध्यान ध्यान", HI: "अ-ध्यान ध्यान" },
  aDhyandMeditationDesc: {
    EN: "Acoustic brainwave entrainment to alleviate reproductive stress and cortisol spikes.",
    MR: "प्रजनन तणाव आणि कॉर्टिसोल कमी करण्यासाठी ध्वनी लहरी प्रशिक्षण.",
    HI: "प्रजनन तनाव और कोर्टिसोल कम करने के लिए ध्वनि तरंग प्रशिक्षण।"
  },
  scheduleConsultation: {
    EN: "Schedule Consultation with Dr. Kalekar",
    MR: "डॉ. काळेकर यांच्याशी सल्ला निश्चित करा",
    HI: "डॉ. कालेकर से परामर्श निर्धारित करें"
  },
  legacyTitle: { EN: "31+ Years Clinical Legacy", MR: "३१+ वर्षांचा वैद्यकीय वारसा", HI: "31+ वर्षों की चिकित्सा विरासत" },
  legacySubtitle: {
    EN: "Key milestones in Astygma Hope Clinic's journey",
    MR: "अस्टिग्मा होप क्लिनिकच्या प्रवासातील महत्त्वाचे टप्पे",
    HI: "अस्टिग्मा होप क्लिनिक की यात्रा के प्रमुख पड़ाव"
  },
  legacy1Title: { EN: "Foundation in Shirol", MR: "शिरोळमध्ये स्थापना", HI: "शिरोल में स्थापना" },
  legacy1Desc: {
    EN: "Dr. Umesh Datta Kalekar establishes clinical practice focusing on subfertility.",
    MR: "डॉ. उमेश दत्ता कळेकर वंध्यत्वावर लक्ष केंद्रित करून वैद्यकीय सराव सुरू करतात.",
    HI: "डॉ. उमेश दत्ता कळेकर निसंतानता पर केंद्रित चिकित्सा अभ्यास शुरू करते हैं।"
  },
  legacy2Title: { EN: "Ultra Yoga Launch", MR: "अल्ट्रा योग लाँच", HI: "अल्ट्रा योग लॉन्च" },
  legacy2Desc: {
    EN: "Formulation of Ultra Yoga medical protocols for pelvic organ vascularization.",
    MR: "पेल्विक अवयवांच्या रक्तप्रवाहासाठी अल्ट्रा योग वैद्यकीय पद्धतींची निर्मिती.",
    HI: "पेल्विक अंगों के रक्त संचार के लिए अल्ट्रा योग चिकित्सा प्रोटोकॉल का निर्माण।"
  },
  legacy3Title: { EN: "A-Dhyand Sound Vault", MR: "अ-ध्यान साउंड व्हॉल्ट", HI: "अ-ध्यान साउंड वॉल्ट" },
  legacy3Desc: {
    EN: "Development of Sangeetopchar acoustic raga therapy for pregnant mothers.",
    MR: "गर्भवती मातांसाठी संगीतोपचार ध्वनी राग चिकित्सेचा विकास.",
    HI: "गर्भवती माताओं के लिए संगीतोपचार ध्वनि राग चिकित्सा का विकास।"
  },
  legacy4Title: { EN: "Digital Master Platform", MR: "डिजिटल मास्टर प्लॅटफॉर्म", HI: "डिजिटल मास्टर प्लेटफॉर्म" },
  legacy4Desc: {
    EN: "Next-gen digital healthcare engine serving patients across India.",
    MR: "भारतभरातील रुग्णांची सेवा करणारे आधुनिक डिजिटल आरोग्य केंद्र.",
    HI: "पूरे भारत के मरीजों की सेवा करने वाला अगली पीढ़ी का डिजिटल स्वास्थ्य इंजन।"
  },

  /* ===== Doctors Page ===== */
  medicalLeadershipBadge: {
    EN: "Medical Leadership & Specialist Faculty",
    MR: "वैद्यकीय नेतृत्व आणि तज्ज्ञ टीम",
    HI: "चिकित्सा नेतृत्व और विशेषज्ञ टीम"
  },
  ourDoctorsHeading: { EN: "Our Expert Clinical Physicians", MR: "आमचे तज्ज्ञ वैद्यकीय डॉक्टर", HI: "हमारे विशेषज्ञ चिकित्सक" },
  ourDoctorsSubtitle: {
    EN: "Meet the medical pioneers dedicated to your reproductive journey at Astygma Hope Clinic Shirol.",
    MR: "अस्टिग्मा होप क्लिनिक शिरोळ येथे तुमच्या प्रजनन प्रवासासाठी समर्पित वैद्यकीय प्रणेत्यांना भेटा.",
    HI: "अस्टिग्मा होप क्लिनिक शिरोल में आपकी प्रजनन यात्रा के लिए समर्पित चिकित्सा अग्रणियों से मिलें।"
  },
  biographyHeading: { EN: "Biography & Clinical Philosophy", MR: "चरित्र आणि वैद्यकीय तत्त्वज्ञान", HI: "जीवनी और चिकित्सा दर्शन" },
  ultraYogaDev: { EN: "Developer of Ultra Yoga", MR: "अल्ट्रा योगाचे निर्माते", HI: "अल्ट्रा योग के विकासक" },
  ultraYogaDevDesc: {
    EN: "Specialized pelvic movement system engineered to optimize follicular growth and vascular flow.",
    MR: "फॉलिक्युलर वाढ आणि रक्तप्रवाह सुधारण्यासाठी विशेष पेल्विक व्यायाम प्रणाली.",
    HI: "फॉलिक्युलर वृद्धि और रक्त प्रवाह सुधारने के लिए विशेष पेल्विक व्यायाम प्रणाली।"
  },
  aDhyandDev: { EN: "Developer of A-Dhyand Meditation", MR: "अ-ध्यान ध्यानाचे निर्माते", HI: "अ-ध्यान ध्यान के विकासक" },
  aDhyandDevDesc: {
    EN: "Acoustic brainwave mindfulness research aimed at neuro-endocrine stress mitigation.",
    MR: "न्यूरो-एंडोक्राइन तणाव कमी करण्यासाठी ध्वनी लहरी ध्यान संशोधन.",
    HI: "न्यूरो-एंडोक्राइन तनाव कमी करने के उद्देश्य से ध्वनि तरंग ध्यान शोध।"
  },
  ayurvedicCoachBadge: {
    EN: "Certified Ayurvedic Fertility Coach",
    MR: "प्रमाणित आयुर्वेदिक प्रजनन मार्गदर्शक",
    HI: "प्रमाणित आयुर्वेदिक प्रजनन कोच"
  },
  sonographySpecialist: { EN: "Sonography Specialist", MR: "सोनोग्राफी तज्ज्ञ", HI: "सोनोग्राफी विशेषज्ञ" },
  sonographyDept: {
    EN: "Shirol Branch Diagnostic Department",
    MR: "शिरोळ शाखा निदान विभाग",
    HI: "शिरोल शाखा निदान विभाग"
  },
  openSonographyCenter: {
    EN: "Open Sonography Media Center",
    MR: "सोनोग्राफी मीडिया सेंटर उघडा",
    HI: "सोनोग्राफी मीडिया सेंटर खोलें"
  },
  sonographyDeptTitle: {
    EN: "High-Resolution Pelvic & Fetal Sonography",
    MR: "उच्च-सुस्पष्ट पेल्विक आणि गर्भ सोनोग्राफी",
    HI: "उच्च-रिज़ॉल्यूशन पेल्विक और भ्रूण सोनोग्राफी"
  },
  sonographyDeptDesc: {
    EN: "Our dedicated Sonography Division conducts follicular dynamics tracking, color Doppler endometrial evaluation, early viability scans, and fetal anomaly screening using high-resolution ultrasound technology.",
    MR: "आमचा समर्पित सोनोग्राफी विभाग उच्च-सुस्पष्ट अल्ट्रासाऊंड तंत्रज्ञानाने फॉलिक्युलर ट्रॅकिंग, कलर डॉपलर, सुरुवातीची व्यवहार्यता आणि गर्भ विकृती तपासणी करतो.",
    HI: "हमारा समर्पित सोनोग्राफी विभाग उच्च-रिज़ॉल्यूशन अल्ट्रासाउंड तकनीक से फॉलिक्युलर ट्रैकिंग, कलर डॉपलर, प्रारंभिक व्यवहार्यता और भ्रूण असामान्यता जांच करता है।"
  },
  requestUltrasoundAppointment: {
    EN: "Request Ultrasound Scan Appointment",
    MR: "अल्ट्रासाऊंड अपॉइंटमेंटची विनंती करा",
    HI: "अल्ट्रासाउंड अपॉइंटमेंट का अनुरोध करें"
  },
  requestAppointmentKalekar: {
    EN: "Request Appointment with Dr. Kalekar",
    MR: "डॉ. काळेकर यांच्याशी अपॉइंटमेंटची विनंती करा",
    HI: "डॉ. कालेकर से अपॉइंटमेंट का अनुरोध करें"
  },
  diagnosticUltrasoundDept: {
    EN: "Diagnostic & Ultrasound Department",
    MR: "निदान आणि अल्ट्रासाऊंड विभाग",
    HI: "निदान और अल्ट्रासाउंड विभाग"
  },
  folderProvisioned: {
    EN: "Dedicated Asset Folder Provisioned",
    MR: "समर्पित ॲसेट फोल्डर तयार",
    HI: "समर्पित एसेट फोल्डर तैयार"
  },
  folderProvisionedDesc: {
    EN: "Videos, ultrasound recordings, and specialist documentation placed into",
    MR: "व्हिडिओ, अल्ट्रासाऊंड रेकॉर्डिंग आणि तज्ज्ञ दस्तऐवज यामध्ये ठेवल्यास",
    HI: "वीडियो, अल्ट्रासाउंड रिकॉर्डिंग और विशेषज्ञ दस्तावेज़ इसमें रखने पर"
  },

  /* ===== Gallery ===== */
  galleryBadge: { EN: "Official Media Showcase", MR: "अधिकृत मीडिया शोकेस", HI: "आधिकारिक मीडिया शोकेस" },
  galleryHeading: { EN: "Astygma Hope Photo & Video Gallery", MR: "अस्टिग्मा होप फोटो आणि व्हिडिओ गॅलरी", HI: "अस्टिग्मा होप फोटो और वीडियो गैलरी" },
  gallerySubtitle: {
    EN: "Explore our Shirol & Kolhapur branch facilities, workshops, health camps, and diagnostic media centers.",
    MR: "आमच्या शिरोळ आणि कोल्हापूर शाखा, कार्यशाळा, आरोग्य शिबिरे आणि निदान मीडिया केंद्रे पहा.",
    HI: "हमारे शिरोल और कोल्हापुर शाखाओं, कार्यशालाओं, स्वास्थ्य शिविरों और निदान मीडिया केंद्रों को देखें।"
  },
  categoryAll: { EN: "All", MR: "सर्व", HI: "सभी" },
  categoryClinic: { EN: "Clinic", MR: "क्लिनिक", HI: "क्लिनिक" },
  categoryReception: { EN: "Reception", MR: "रिसेप्शन", HI: "रिसेप्शन" },
  categoryLab: { EN: "Lab", MR: "प्रयोगशाळा", HI: "प्रयोगशाला" },
  categoryDoctors: { EN: "Doctors", MR: "डॉक्टर", HI: "डॉक्टर" },
  categoryStaff: { EN: "Staff", MR: "स्टाफ", HI: "स्टाफ" },
  categoryEvents: { EN: "Events", MR: "कार्यक्रम", HI: "आयोजन" },
  categoryWorkshops: { EN: "Workshops", MR: "कार्यशाळा", HI: "कार्यशालाएं" },
  categoryVideos: { EN: "Videos", MR: "व्हिडिओ", HI: "वीडियो" },

  /* ===== Courses ===== */
  coursesBadge: { EN: "Online Learning & Certification Platform", MR: "ऑनलाइन शिक्षण आणि प्रमाणपत्र मंच", HI: "ऑनलाइन शिक्षा और प्रमाणपत्र मंच" },
  coursesHeading: { EN: "Dr. Umesh Datta Kalekar's Fertility Academy", MR: "डॉ. उमेश दत्ता कळेकर यांची प्रजनन अकादमी", HI: "डॉ. उमेश दत्ता कळेकर की प्रजनन अकादमी" },
  coursesSubtitle: {
    EN: "Future-ready digital education platform offering free guides, paid holistic courses, and verifiable certificates.",
    MR: "मोफत मार्गदर्शक, पेड समग्र कोर्स आणि प्रमाणपत्रे देणारे आधुनिक डिजिटल शिक्षण मंच.",
    HI: "मुफ्त गाइड, भुगतान समग्र कोर्स और प्रमाणित प्रमाणपत्र देने वाला आधुनिक डिजिटल शिक्षा मंच।"
  },
  allCourses: { EN: "All", MR: "सर्व", HI: "सभी" },
  freeCourses: { EN: "Free", MR: "मोफत", HI: "मुफ्त" },
  paidCourses: { EN: "Paid", MR: "पेड", HI: "भुगतान" },
  certificates: { EN: "Certificates", MR: "प्रमाणपत्रे", HI: "प्रमाणपत्र" },
  programHighlights: { EN: "Program Highlights:", MR: "कार्यक्रमाचे वैशिष्ट्य:", HI: "कार्यक्रम की मुख्य विशेषताएं:" },
  instructor: { EN: "Instructor:", MR: "प्रशिक्षक:", HI: "प्रशिक्षक:" },
  enrollNow: { EN: "Enroll Now", MR: "आता प्रवेश घ्या", HI: "अभी प्रवेश लें" },
  startFreeCourse: { EN: "Start Free Course", MR: "मोफत कोर्स सुरू करा", HI: "मुफ्त कोर्स शुरू करें" },
  paidCourseTag: { EN: "Paid Course", MR: "पेड कोर्स", HI: "भुगतान कोर्स" },
  freeClinicalCourse: { EN: "Free Clinical Course", MR: "मोफत वैद्यकीय कोर्स", HI: "मुफ्त चिकित्सा कोर्स" },

  /* ===== Contact Page ===== */
  contactBadge: { EN: "Shirol & Kolhapur Branch Headquarters", MR: "शिरोळ आणि कोल्हापूर शाखा मुख्यालये", HI: "शिरोल और कोल्हापुर शाखा मुख्यालय" },
  contactHeading: { EN: "Contact Astygma Hope Clinic", MR: "अस्टिग्मा होप क्लिनिकशी संपर्क साधा", HI: "अस्टिग्मा होप क्लिनिक से संपर्क करें" },
  contactPageSubtitle: {
    EN: "Reach out for consultations, appointment triage, or clinical inquiries.",
    MR: "सल्ला, अपॉइंटमेंट किंवा वैद्यकीय चौकशीसाठी संपर्क साधा.",
    HI: "परामर्श, अपॉइंटमेंट या चिकित्सा संबंधी पूछताछ के लिए संपर्क करें।"
  },
  helplineWhatsApp: { EN: "Helpline & WhatsApp", MR: "हेल्पलाइन आणि व्हॉट्सॲप", HI: "हेल्पलाइन और व्हाट्सएप" },
  clinicPhone: { EN: "Clinic Phone:", MR: "क्लिनिक फोन:", HI: "क्लिनिक फोन:" },
  officialEmail: { EN: "Official Email:", MR: "अधिकृत ईमेल:", HI: "आधिकारिक ईमेल:" },
  openWhatsAppChat: { EN: "Open Direct WhatsApp Chat", MR: "थेट व्हॉट्सॲप चॅट उघडा", HI: "सीधा व्हाट्सएप चैट खोलें" },
  requestAppointment500: {
    EN: "Request Appointment • ₹500",
    MR: "अपॉइंटमेंटची विनंती करा • ₹५००",
    HI: "अपॉइंटमेंट का अनुरोध करें • ₹500"
  },
  sendInquiry: { EN: "Send an Online Inquiry", MR: "ऑनलाइन चौकशी पाठवा", HI: "ऑनलाइन पूछताछ भेजें" },
  inquirySuccess: {
    EN: "Thank you! Your inquiry has been sent to our reception team.",
    MR: "धन्यवाद! तुमची चौकशी आमच्या रिसेप्शन टीमला पाठवली गेली आहे.",
    HI: "धन्यवाद! आपकी पूछताछ हमारी रिसेप्शन टीम को भेज दी गई है।"
  },
  yourName: { EN: "Your Name *", MR: "तुमचे नाव *", HI: "आपका नाम *" },
  phoneNumber: { EN: "Phone Number *", MR: "फोन नंबर *", HI: "फोन नंबर *" },
  emailOptional: { EN: "Email Address (Optional)", MR: "ईमेल पत्ता (ऐच्छिक)", HI: "ईमेल पता (वैकल्पिक)" },
  messageInquiry: { EN: "Message / Inquiry", MR: "संदेश / चौकशी", HI: "संदेश / पूछताछ" },
  sendInquiryToReception: {
    EN: "Send Inquiry to Reception",
    MR: "रिसेप्शनला चौकशी पाठवा",
    HI: "रिसेप्शन को पूछताछ भेजें"
  },
  quickDirections: { EN: "Quick Directions", MR: "दिशा", HI: "दिशा निर्देश" },
  openLocation: { EN: "Open location", MR: "ठिकाण उघडा", HI: "स्थान खोलें" },
  shirolBranchDesc: {
    EN: "250m from the Shirol bus stand.",
    MR: "शिरोळ बस स्टँडपासून 250 मी.",
    HI: "शिरोल बस स्टैंड से 250 मी।"
  },
  kolhapurBranchDesc: {
    EN: "Near Deshmukh Hall, Hari Om Nagar.",
    MR: "देशमुख हॉल, हरि ओम नगर जवळ.",
    HI: "देशमुख हॉल, हरि ओम नगर के पास।"
  },
  viewOnMap: { EN: "View on Google Maps", MR: "गुगल मॅपवर पहा", HI: "गूगल मैप पर देखें" },

  /* ===== Appointment Modal ===== */
paidConsultationBadge: {
    EN: "Direct Clinic Triage • Book Appointment",
    MR: "थेट क्लिनिक ट्रायेज • अपॉइंटमेंट बुक करा",
    HI: "सीधा क्लिनिक ट्रायेज • अपॉइंटमेंट बुक करें"
  },
  appointmentHeading: {
    EN: "Take the Next Step in Your Fertility Journey",
    MR: "तुमच्या प्रजनन प्रवासातील पुढील पाऊल उचला",
    HI: "अपनी प्रजनन यात्रा में अगला कदम उठाएं"
  },
  appointmentSubtitle: {
    EN: "Choose the branch and day that works for you. Morning slots are available only.",
    MR: "तुम्हाला अनुकूल शाखा आणि दिवस निवडा. फक्त सकाळचे स्लॉट उपलब्ध आहेत.",
    HI: "अपने लिए उपयुक्त शाखा और दिन चुनें। केवल सुबह के स्लॉट उपलब्ध हैं।"
  },
  branchScheduleTitle: {
    EN: "Day-Wise Branch Consultation Schedule:",
    MR: "दिवसानुसार शाखा सल्ला वेळापत्रक:",
    HI: "दिन के अनुसार शाखा परामर्श कार्यक्रम:"
  },
  sundayClosed: { EN: "Sunday: Holiday / Closed", MR: "रविवार: सुट्टी / बंद", HI: "रविवार: अवकाश / बंद" },
  sonographyNote: {
    EN: "Note: Sonography is available ONLY at Shirol Branch (Tue, Thu, Sat).",
    MR: "टीप: सोनोग्राफी फक्त शिरोळ शाखेत (मंगळ, गुरु, शनि) उपलब्ध आहे.",
    HI: "नोट: सोनोग्राफी केवल शिरोल शाखा (मंगल, गुरु, शनि) में उपलब्ध है।"
  },
  branchGuideTitle: { EN: "Branch guide", MR: "शाखा मार्गदर्शक", HI: "शाखा गाइड" },
  branchGuideNote: {
    EN: "At the moment, patients can choose a branch by the visiting day.",
    MR: "सध्या, रुग्ण भेटीच्या दिवसानुसार शाखा निवडू शकतात.",
    HI: "फिलहाल, मरीज मुलाकात के दिन के अनुसार शाखा चुन सकते हैं।"
  },
  suggestedDays: { EN: "Suggested days:", MR: "सुचवलेले दिवस:", HI: "सुझाए गए दिन:" },
  fullName: { EN: "Full Name *", MR: "पूर्ण नाव *", HI: "पूरा नाम *" },
  mobileNumber: { EN: "Mobile Number *", MR: "मोबाईल नंबर *", HI: "मोबाइल नंबर *" },
  cityVillage: { EN: "City / Village Name *", MR: "शहर / गावाचे नाव *", HI: "शहर / गांव का नाम *" },
  selectBranch: { EN: "Select Clinic Branch *", MR: "क्लिनिक शाखा निवडा *", HI: "क्लिनिक शाखा चुनें *" },
  shirolOption: {
    EN: "Shirol Branch (Main HQ) - 250m from Bus Stand",
    MR: "शिरोळ शाखा (मुख्यालय) - बस स्टँडपासून 250 मी",
    HI: "शिरोल शाखा (मुख्यालय) - बस स्टैंड से 250 मी"
  },
  kolhapurOption: {
    EN: "Kolhapur Branch - Near Deshmukh Hall, Hari Om Nagar",
    MR: "कोल्हापूर शाखा - देशमुख हॉल, हरि ओम नगर जवळ",
    HI: "कोल्हापुर शाखा - देशमुख हॉल, हरि ओम नगर के पास"
  },
  paymentModeLabel: { EN: "Payment Mode *", MR: "पेमेंट पद्धत *", HI: "भुगतान विधि *" },
  onlinePayment: { EN: "Online Payment", MR: "ऑनलाइन पेमेंट", HI: "ऑनलाइन भुगतान" },
  payAtClinic: { EN: "Pay at Clinic", MR: "क्लिनिकमध्ये पैसे द्या", HI: "क्लिनिक में भुगतान करें" },
  preferredDate: { EN: "Preferred Date *", MR: "पसंतीचा दिवस *", HI: "पसंदीदा तारीख *" },
  morningTimeSlot: { EN: "Morning Time Slot", MR: "सकाळचा वेळ", HI: "सुबह का समय" },
  consultationFee: {
    EN: "Consultation fee:",
    MR: "सल्ला शुल्क:",
    HI: "परामर्श शुल्क:"
  },
bookAppointmentPay: {
    EN: "Book Appointment",
    MR: "अपॉइंटमेंट बुक करा",
    HI: "अपॉइंटमेंट बुक करें"
  },
  dataSafe: {
    EN: "No need to worry, your data is 100% safe with us!",
    MR: "काळजी करू नका, तुमचा डेटा आमच्याकडे १००% सुरक्षित आहे!",
    HI: "चिंता करने की जरूरत नहीं, आपका डेटा हमारे पास 100% सुरक्षित है!"
  },
  receptionTriageNote: {
    EN: "Reception triage confirmation sent directly to your phone.",
    MR: "रिसेप्शन पुष्टी थेट तुमच्या फोनवर पाठवली जाते.",
    HI: "रिसेप्शन पुष्टि सीधे आपके फोन पर भेजी जाती है।"
  },
  requestSentTitle: {
    EN: "Request Sent to Clinic Reception!",
    MR: "विनंती क्लिनिक रिसेप्शनला पाठवली!",
    HI: "अनुरोध क्लिनिक रिसेप्शन को भेज दिया गया!"
  },
  requestSentDesc: {
    EN: "Thank you {name}! Your appointment request for {branch} on {date} at {time} has been logged into our reception queue. Our team will confirm your slot after payment.",
    MR: "धन्यवाद {name}! {branch} येथे {date} रोजी {time} वाजता तुमच्या अपॉइंटमेंटची विनंती आमच्या रिसेप्शन रांगेत नोंदवली गेली आहे. पेमेंटनंतर आमची टीम तुमचा वेळ निश्चित करेल.",
    HI: "धन्यवाद {name}! {branch} में {date} को {time} बजे आपके अपॉइंटमेंट का अनुरोध हमारी रिसेप्शन कतार में दर्ज कर लिया गया है। भुगतान के बाद हमारी टीम आपका स्लॉट पुष्टि करेगी।"
  },
  appointmentReference: { EN: "Appointment Reference:", MR: "अपॉइंटमेंट संदर्भ:", HI: "अपॉइंटमेंट संदर्भ:" },
  patientCityLabel: { EN: "Patient City/Village:", MR: "रुग्ण शहर/गाव:", HI: "रोगी शहर/गांव:" },
  helplinePhoneLabel: { EN: "Helpline Phone:", MR: "हेल्पलाइन फोन:", HI: "हेल्पलाइन फोन:" },
  sendWhatsAppConfirmation: {
    EN: "Send Instant WhatsApp Confirmation",
    MR: "तात्काळ व्हॉट्सॲप पुष्टी पाठवा",
    HI: "तुरंत व्हाट्सएप पुष्टि भेजें"
  },
  done: { EN: "Done", MR: "पूर्ण", HI: "पूर्ण" },
  morningLabel: { EN: "Morning", MR: "सकाळ", HI: "सुबह" },

  /* ===== Chatbot ===== */
  chatGreeting: {
    EN: "Hello 👋 I'm here to help you with all your queries and tasks",
    MR: "नमस्कार 👋 मी तुमच्या सर्व प्रश्नांसाठी आणि कामांसाठी मदतीसाठी आहे",
    HI: "नमस्ते 👋 मैं आपकी सभी समस्याओं और कार्यों में मदद के लिए हूं"
  },
  chatLanguagePrompt: {
    EN: "Please select your preferred Language",
    MR: "कृपया तुमची पसंतीची भाषा निवडा",
    HI: "कृपया अपनी पसंदीदा भाषा चुनें"
  },
  selectLanguage: { EN: "Select your preferred Language:", MR: "तुमची पसंतीची भाषा निवडा:", HI: "अपनी पसंदीदा भाषा चुनें:" },
  virtualReceptionist: { EN: "Astygma Virtual Receptionist", MR: "अस्टिग्मा व्हर्च्युअल रिसेप्शनिस्ट", HI: "अस्टिग्मा वर्चुअल रिसेप्शनिस्ट" },
  virtualReceptionistSub: {
    EN: "Shirol & Kolhapur Branch Assistant",
    MR: "शिरोळ आणि कोल्हापूर शाखा सहाय्यक",
    HI: "शिरोल और कोल्हापुर शाखा सहायक"
  },
  chatPlaceholder: {
    EN: "Type your query here...",
    MR: "तुमचा प्रश्न येथे लिहा...",
    HI: "अपना प्रश्न यहां लिखें..."
  },
  bookVisit: { EN: "Book Visit (₹500)", MR: "भेट बुक करा (₹५००)", HI: "मुलाकात बुक करें (₹500)" },
  callNow: { EN: "Call", MR: "कॉल करा", HI: "कॉल करें" },
  chatWithUs: { EN: "Chat with us", MR: "आमच्याशी चॅट करा", HI: "हमसे चैट करें" },
  translate: { EN: "Translate", MR: "भाषांतर", HI: "अनुवाद" },

  /* ===== Payment / Branch Info ===== */
  founderTitle: {
    EN: "Founder & Managing Director",
    MR: "संस्थापक आणि व्यवस्थापकीय संचालक",
    HI: "संस्थापक एवं प्रबंध निदेशक"
  },
  experience: { EN: "31+ Years Experience", MR: "३१+ वर्षांचा अनुभव", HI: "31+ वर्षों का अनुभव" },
  servicesHeader: {
    EN: "Our Specialized Services & Holistic Programs",
    MR: "आमच्या विशेष वैद्यकीय सेवा आणि उपचार उपक्रम",
    HI: "हमारी विशिष्ट चिकित्सा सेवाएं और समग्र कार्यक्रम"
  },
  soundVaultTitle: {
    EN: "Protected Healing Sound Library",
    MR: "संरक्षित हीलिंग साऊंड लायब्ररी",
    HI: "संरक्षित हीलिंग साउंड लाइब्रेरी"
  },
  sonographyMedia: {
    EN: "Sonography & Diagnostics Media Center",
    MR: "सोनोग्राफी आणि निदान मीडिया सेंटर",
    HI: "सोनोग्राफी और डायग्नोस्टिक्स मीडिया सेंटर"
  },
  addressLabel: {
    EN: "Shirol Branch Address",
    MR: "शिरोळ शाखा पत्ता",
    HI: "शिरोल शाखा पता"
  },
  workingHours: {
    EN: "Monday - Saturday: 10 AM to 6 PM | Sunday Holiday",
    MR: "सोमवार - शनिवार: सकाळी १० ते संध्याकाळी ६ | रविवार सुट्टी",
    HI: "सोमवार - शनिवार: सुबह 10 से शाम 6 बजे | रविवार अवकाश"
  },
  receptionPortal: {
    EN: "Reception Triage Portal",
    MR: "रिसेप्शन डॅशबोर्ड",
    HI: "रिसेप्शन पोर्टल"
  },
  paymentNotice: {
    EN: "Paid consultation • ₹500 • Offline or online payment accepted",
    MR: "पेड कन्सल्टेशन • ₹५०० • ऑफलाइन किंवा ऑनलाइन पेमेंट",
    HI: "पेड कंसल्टेशन • ₹500 • ऑफलाइन या ऑनलाइन भुगतान"
  },
  noPaymentNotice: {
    EN: "Online payment available. Reception will review and confirm your request after payment.",
    MR: "ऑनलाइन पेमेंट उपलब्ध. पेमेंटनंतर आमचे रिसेप्शन आपल्या विनंतीचे पुनरावलोकन करेल.",
    HI: "ऑनलाइन भुगतान उपलब्ध। भुगतान के बाद रिसेप्शन आपके अनुरोध की समीक्षा करेगा।"
  },
  branchDayInfo: {
    EN: "Choose branch by visiting day. Shirol open on Tue, Thu, Sat. Kolhapur open on Mon, Wed, Fri. Sunday closed.",
    MR: "दिवसावरून शाखा निवडा. शिरोळ - मंगळवार, गुरुवार, शनिवार. कोल्हापूर - सोमवार, बुधवार, शुक्रवार. रविवार बंद.",
    HI: "दिन के आधार पर शाखा चुनें। शिरोल - मंगलवार, गुरुवार, शनिवार। कोल्हापुर - सोमवार, बुधवार, शुक्रवार। रविवार बंद।"
  },

  /* ===== Services (by id) ===== */
  'service_female-infertility_title': { EN: "Female Infertility", MR: "स्त्री वंध्यत्व", HI: "महिला निसंतानता" },
  'service_female-infertility_shortDesc': {
    EN: "Complete testing and care for ovulation, PCOS, and hormone balance.",
    MR: "ओव्हुलेशन, पीसीओएस आणि संप्रेरक संतुलनासाठी संपूर्ण तपासणी आणि काळजी.",
    HI: "ओव्यूलेशन, पीसीओएस और हार्मोन संतुलन के लिए पूरी जांच और देखभाल।"
  },
  'service_male-infertility_title': { EN: "Male Infertility", MR: "पुरुष वंध्यत्व", HI: "पुरुष निसंतानता" },
  'service_male-infertility_shortDesc': {
    EN: "Advanced testing and care to improve sperm health naturally.",
    MR: "शुक्राणू आरोग्य नैसर्गिकरीत्या सुधारण्यासाठी प्रगत तपासणी आणि काळजी.",
    HI: "शुक्राणु स्वास्थ्य को स्वाभाविक रूप से सुधारने के लिए उन्नत जांच और देखभाल।"
  },
  'service_pregnancy-care_title': { EN: "Pregnancy Care", MR: "गर्भधारणा काळजी", HI: "गर्भावस्था देखभाल" },
  'service_pregnancy-care_shortDesc': {
    EN: "Gentle prenatal monitoring and support through every month.",
    MR: "प्रत्येक महिन्यात सौम्य गर्भधारणा तपासणी आणि आधार.",
    HI: "हर महीने सौम्य गर्भावस्था निगरानी और सहायता।"
  },
  'service_ultrasound_title': { EN: "Ultrasound (Shirol Branch Only)", MR: "अल्ट्रासाऊंड (फक्त शिरोळ शाखा)", HI: "अल्ट्रासाउंड (केवल शिरोल शाखा)" },
  'service_ultrasound_shortDesc': {
    EN: "High-resolution scans for pelvic health, follicular study, and early pregnancy.",
    MR: "पेल्विक आरोग्य, फॉलिक्युलर अभ्यास आणि सुरुवातीच्या गर्भधारणेसाठी उच्च-सुस्पष्ट स्कॅन.",
    HI: "पेल्विक स्वास्थ्य, फॉलिक्युलर अध्ययन और प्रारंभिक गर्भावस्था के लिए उच्च-रिज़ॉल्यूशन स्कैन।"
  },
  'service_laboratory-tests_title': { EN: "Laboratory Tests", MR: "प्रयोगशाळा तपासण्या", HI: "प्रयोगशाला जांच" },
  'service_laboratory-tests_shortDesc': {
    EN: "Fast, precise hormone and health panels in our own lab.",
    MR: "आमच्या स्वतःच्या प्रयोगशाळेत जलद, अचूक संप्रेरक आणि आरोग्य तपासण्या.",
    HI: "हमारी अपनी प्रयोगशाला में तेज़, सटीक हार्मोन और स्वास्थ्य जांच।"
  },
  'service_diet-lifestyle-guidance_title': { EN: "Diet and Lifestyle Guidance", MR: "आहार आणि जीवनशैली मार्गदर्शन", HI: "आहार और जीवनशैली मार्गदर्शन" },
  'service_diet-lifestyle-guidance_shortDesc': {
    EN: "Personal nutrition plans and daily habits for better fertility.",
    MR: "चांगल्या प्रजननासाठी वैयक्तिक आहार योजना आणि दैनंदिन सवयी.",
    HI: "बेहतर प्रजनन के लिए व्यक्तिगत आहार योजना और दैनिक आदतें।"
  },
  'service_yoga-therapy_title': { EN: "Yoga Therapy (Ultra Yoga)", MR: "योग चिकित्सा (अल्ट्रा योग)", HI: "योग चिकित्सा (अल्ट्रा योग)" },
  'service_yoga-therapy_shortDesc': {
    EN: "Dr. Kalekar's special Ultra Yoga for pelvic blood flow and stress relief.",
    MR: "पेल्विक रक्तप्रवाह आणि तणावमुक्तीसाठी डॉ. काळेकर यांचे विशेष अल्ट्रा योग.",
    HI: "पेल्विक रक्त प्रवाह और तनाव मुक्ति के लिए डॉ. कालेकर का विशेष अल्ट्रा योग।"
  },
  'service_sangeetopchar_title': { EN: "Sangeetopchar (Sound Therapy)", MR: "संगीतोपचार (ध्वनी चिकित्सा)", HI: "संगीतोपचार (ध्वनि चिकित्सा)" },
  'service_sangeetopchar_shortDesc': {
    EN: "Calming music and raga therapy to relax the mind and body.",
    MR: "मन आणि शरीर शांत करण्यासाठी सुखद संगीत आणि राग चिकित्सा.",
    HI: "मन और शरीर को शांत करने के लिए सुखद संगीत और राग चिकित्सा।"
  },
  'service_ayurvedic-fertility-course_title': { EN: "Ayurvedic Fertility Course", MR: "आयुर्वेदिक प्रजनन कोर्स", HI: "आयुर्वेदिक प्रजनन कोर्स" },
  'service_ayurvedic-fertility-course_shortDesc': {
    EN: "Natural fertility principles, detox, and rejuvenation from Ayurveda.",
    MR: "आयुर्वेदातील नैसर्गिक प्रजनन तत्त्वे, शुद्धी आणि पुनरुज्जीवन.",
    HI: "आयुर्वेद से प्राकृतिक प्रजनन सिद्धांत, शुद्धि और पुनरुज्जीवन।"
  },
  'service_scientific-garbhasanskar-guide_title': { EN: "Scientific Garbhasanskar Guide", MR: "वैज्ञानिक गर्भसंस्कार मार्गदर्शक", HI: "वैज्ञानिक गर्भसंस्कार गाइड" },
  'service_scientific-garbhasanskar-guide_shortDesc': {
    EN: "Pre-conception and pregnancy practices for baby's mind and health.",
    MR: "बाळाच्या मनासाठी आणि आरोग्यासाठी गर्भधारणापूर्व आणि गर्भधारणेदरम्यानच्या पद्धती.",
    HI: "शिशु के मन और स्वास्थ्य के लिए गर्भधारणा से पहले और गर्भावस्था के अभ्यास।"
  },
  'service_suprajaa-nirmiti-program_title': { EN: "Suprajaa Nirmiti Program", MR: "सुप्रजा निर्मिती कार्यक्रम", HI: "सुप्रजा निर्मिति कार्यक्रम" },
  'service_suprajaa-nirmiti-program_shortDesc': {
    EN: "Our complete program uniting medicine, yoga, sound, and mind.",
    MR: "औषध, योग, ध्वनी आणि मन एकत्र करणारा आमचा संपूर्ण कार्यक्रम.",
    HI: "चिकित्सा, योग, ध्वनि और मन को एकजुट करने वाला हमारा संपूर्ण कार्यक्रम।"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][language]) {
      return TRANSLATIONS[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

