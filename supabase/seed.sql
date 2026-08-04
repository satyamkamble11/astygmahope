-- =============================================================================
-- Astygma Hope Clinic — Seed Data
-- Run AFTER the migration (0001_init.sql) has been applied.
-- Idempotent-friendly: uses ON CONFLICT where possible.
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- SETTINGS
-- -----------------------------------------------------------------------------
INSERT INTO public.settings (key, value) VALUES
  ('clinic_socials', '{"instagram":"https://www.instagram.com/astygma_369/?hl=en","facebook":"https://www.facebook.com/p/Astygma-Hope-Clinic-100034449925414/","youtube":"https://youtube.com/@astygmahopeclinic"}'),
  ('clinic_config',   '{"name":"Astygma Hope Clinic","branch":"Shirol & Kolhapur Branches","phone":"+91 7522900512","whatsApp":"+91 7522900512","email":"astygmahope@gmail.com","workingHours":"10 AM to 6 PM","workingDays":"Monday to Saturday","closedDay":"Sunday Closed / Emergency"}')
ON CONFLICT (key) DO NOTHING;

-- -----------------------------------------------------------------------------
-- DOCTORS
-- -----------------------------------------------------------------------------
INSERT INTO public.doctors (name, role, title, experience, qualifications, bio, highlights, image_path, is_founder, is_active, display_order) VALUES
(
  'Dr. Umesh Datta Kalekar',
  'Founder & MD',
  'Founder of Astygma Hope Clinic',
  '31+ Years',
  ARRAY['Doctor of Medicine (MD)','Senior Health Educator','Medical Author','Yoga Researcher','Meditation Researcher','Ayurvedic Fertility Coach'],
  'Dr. Umesh Datta Kalekar is a pioneer in combining advanced reproductive medicine with ancient holistic sciences. Over his 31+ years of clinical practice, he has conducted national and international workshops, developer of Ultra Yoga and A-Dhyand Meditation, guiding thousands of families to fertility success.',
  ARRAY['Developer of Ultra Yoga','Developer of A-Dhyand Meditation','Ayurvedic Fertility Coach (Natural Conception Expert)','Conducted Workshops Nationally & Internationally','31+ Years Clinical Excellence in Reproductive Science','Holistic Fertility & Garbhasanskar Expert'],
  '/assets/doctors/dr_umesh_kalekar.png',
  TRUE, TRUE, 0
);

-- -----------------------------------------------------------------------------
-- SERVICES
-- -----------------------------------------------------------------------------
INSERT INTO public.services (slug, title, category, short_desc, full_desc, benefits, icon_name, image_path, is_active, display_order) VALUES
('female-infertility', 'Female Infertility', 'clinical',
 'Comprehensive diagnostic evaluation and clinical management for ovulation disorders, tubal factor, PCOS, and hormonal imbalances.',
 'Our specialized female infertility division utilizes evidence-based reproductive protocols to identify root causes of subfertility. From ovarian reserve testing and follicle tracking to targeted endocrine regulation, we provide tailored medical pathways.',
 ARRAY['Detailed Ovarian Reserve Analysis','Follicular Dynamics Tracking','Endometrial Receptivity Enhancement','Hormonal Balance Restoration'],
 'UserCheck', '/assets/clinic/female_infertility.jpg', TRUE, 0),
('male-infertility', 'Male Infertility', 'clinical',
 'Advanced andrology assessment, semen analysis, oxidative stress reduction, and lifestyle-integrated sperm quality optimization.',
 'Male fertility accounts for nearly 40-50% of conception challenges. Our clinic conducts specialized diagnostic evaluations, sperm morphology checks, and targeted therapies to optimize male reproductive health naturally and medically.',
 ARRAY['Computerized Semen Analysis','Sperm DNA Fragmentation Management','Varicocele & Oxidative Stress Care','Vitality & Motility Enhancement'],
 'Activity', '/assets/clinic/male_infertility.jpg', TRUE, 1),
('pregnancy-care', 'Pregnancy Care', 'clinical',
 'Holistic prenatal monitoring, high-risk pregnancy triage, maternal nutritional support, and fetal wellness tracking.',
 'Continuous care from early conception through full term. We combine routine clinical check-ups with maternal sound therapy and guided prenatal exercises to ensure a peaceful, healthy pregnancy journey.',
 ARRAY['Routine Clinical Prenatal Care','High-Risk Pregnancy Screening','Maternal Nutrition Protocols','Fetal Wellbeing Monitoring'],
 'HeartHandshake', '/assets/clinic/pregnancy_care.jpg', TRUE, 2),
('ultrasound', 'Ultrasound (Shirol Branch Only)', 'clinical',
 'High-resolution sonography scans for pelvic health, follicular monitoring, early pregnancy confirmation, and anomaly screening.',
 'Equipped with state-of-the-art sonography technology. All ultrasound procedures follow strict medical protocols to monitor organ health, endometrial thickness, and fetal development stages.',
 ARRAY['Pelvic & Follicular Sonography','Early Gestation Confirmation Scans','Endometrial Color Doppler','Fetal Anomaly & Growth Evaluation'],
 'Scan', '/assets/clinic/ultrasound_scan.jpg', TRUE, 3),
('laboratory-tests', 'Laboratory Tests', 'clinical',
 'Precise hormonal panels, infectious disease screening, genetic carrier testing, and routine hematology.',
 'In-house clinical lab offering fast, precise diagnostic panels tailored specifically for reproductive medicine, thyroid regulation, and metabolic health.',
 ARRAY['AMH, FSH, LH, E2, Progesterone Panels','Male Hormone Profiling','Thyroid & Metabolic Assessments','In-House Rapid Reporting'],
 'Microscope', NULL, TRUE, 4),
('diet-lifestyle-guidance', 'Diet and Lifestyle Guidance', 'holistic',
 'Customized fertility nutritional plans, circadian rhythm realignment, and detoxification pathways.',
 'Cellular nutrition plays a central role in egg and sperm quality. Our protocol incorporates anti-inflammatory dietary strategies, gut microbiome restoration, and daily habit realignment.',
 ARRAY['Anti-Inflammatory Fertility Diet','Circadian & Sleep Optimization','Endocrine Disruptor Elimination','Micronutrient Supplementation'],
 'Apple', NULL, TRUE, 5),
('yoga-therapy', 'Yoga Therapy (Ultra Yoga)', 'holistic',
 'Dr. Umesh Datta Kalekar''s proprietary Ultra Yoga system designed to enhance pelvic blood circulation and balance neuro-endocrine pathways.',
 'Ultra Yoga is a specialized medical yoga research program developed by Dr. Umesh Datta Kalekar. It targets pelvic vascular flow, relieves autonomic stress, and revitalizes reproductive organ tissue.',
 ARRAY['Enhanced Pelvic Blood Flow','Autonomic Nervous System Regulation','Cortisol & Stress Reduction','Endocrine System Activation'],
 'Flame', '/assets/clinic/ultra_yoga.jpg', TRUE, 6),
('sangeetopchar', 'Sangeetopchar (Sound Therapy)', 'holistic',
 'Acoustic resonance frequency therapy tailored to induce deep parasympathetic relaxation and cellular healing.',
 'Sangeetopchar leverages specific Indian classical raga frequencies and acoustic resonance to calm maternal brainwave states, reduce anxiety, and promote cellular repair during conception and pregnancy.',
 ARRAY['Alpha & Theta Brainwave Induction','Anxiety & Hypertension Mitigation','Enhanced Cellular Vibration','Protected Audio Vault Stream'],
 'Music', '/assets/clinic/sangeetopchar.jpg', TRUE, 7),
('ayurvedic-fertility-course', 'Ayurvedic Fertility Course', 'educational',
 'Evidence-informed natural fertility principles, Panchakarma preparation, and Rasayana rejuvenation therapies.',
 'Educational guidance grounded in classical Ayurvedic reproductive physiology (Beeja Shuddhi), preparing couples physically and mentally for healthy conception.',
 ARRAY['Natural Body Detox Principles','Beeja Shuddhi Preparation','Rasayana Rejuvenation Protocols','Seasonal Conception Guidance'],
 'BookOpen', NULL, TRUE, 8),
('scientific-garbhasanskar-guide', 'Scientific Garbhasanskar Guide', 'educational',
 'Structured pre-conception and intra-uterine cognitive development practices based on neuroscience and ancient wisdom.',
 'Scientific Garbhasanskar blends modern epigenetics and fetal psychology with traditional mental bonding exercises, giving unborn children an optimal emotional and cognitive start.',
 ARRAY['Epigenetic Fetal Stimulation','Pre-Conception Mental Alignment','Maternal Emotional Bonding','Neuro-Sensory Development'],
 'Sparkles', NULL, TRUE, 9),
('suprajaa-nirmiti-program', 'Suprajaa Nirmiti Program', 'holistic',
 'Our flagship comprehensive program integrating Ultra Yoga, A-Dhyand Meditation, Sangeetopchar, and Clinical Medicine.',
 'The ultimate transformation protocol created by Dr. Umesh Datta Kalekar. Suprajaa Nirmiti brings together medicine, mind, sound, and yoga into one unified journey for couples seeking high-vibrational parenthood.',
 ARRAY['Unified Clinical & Holistic Care','Personalized Dr. Kalekar Consultations','Exclusive Access to Healing Vault','Complete Mind-Body Transformation'],
 'Award', NULL, TRUE, 10);

-- -----------------------------------------------------------------------------
-- GALLERY ITEMS
-- -----------------------------------------------------------------------------
INSERT INTO public.gallery_items (title, category, path, description, is_video, is_active, display_order) VALUES
('Astygma Hope Clinic Shirol Branch', 'Clinic', '/assets/clinic/shirol_branch.jpg', 'Modern luxury facility located on Maharashtra State Highway 137, Shirol.', FALSE, TRUE, 0),
('Astygma Hope Clinic Kolhapur Branch', 'Clinic', '/assets/clinic/kolhapur_branch.jpg', 'Kolhapur branch near Deshmukh Hall, Hari Om Nagar.', FALSE, TRUE, 1),
('Dr. Umesh Datta Kalekar National Workshop', 'Workshops', '/assets/gallery/workshop_1.jpg', 'Dr. Kalekar conducting Ultra Yoga & Garbhasanskar training for healthcare professionals.', FALSE, TRUE, 2),
('Front Reception Triage Desk', 'Reception', '/assets/reception/reception_desk.jpg', 'Patient check-in desk and appointment triage lounge.', FALSE, TRUE, 3),
('Clinical Diagnostic Laboratory', 'Lab', '/assets/lab/lab_equipment.jpg', 'In-house reproductive hormone testing equipment.', FALSE, TRUE, 4),
('Dr. Umesh Datta Kalekar Portrait', 'Doctors', '/assets/doctors/dr_umesh_kalekar.png', 'Founder & MD of Astygma Hope Clinic (31+ Years Experience).', FALSE, TRUE, 5),
('Free Fertility & Ultrasound Health Camp', 'Events', '/assets/gallery/health_camp.jpg', 'Community health outreach event held at Shirol Branch.', FALSE, TRUE, 6),
('Nursing & Technical Support Team', 'Staff', '/assets/staff/nursing_staff.jpg', 'Experienced clinical care team at Shirol.', FALSE, TRUE, 7),
('Sonography & Follicular Study Video', 'Videos', '/assets/sonography/follicular_study.mp4', 'High-resolution follicular tracking demonstration clip.', TRUE, TRUE, 8);

-- -----------------------------------------------------------------------------
-- TESTIMONIALS
-- -----------------------------------------------------------------------------
INSERT INTO public.testimonials (name, location, rating, review, service, is_active, is_approved, display_order) VALUES
('Priya Sharma', 'Kolhapur, Maharashtra', 5, 'The care and guidance I received during my fertility journey was exceptional. Dr. Kalekar and his team made me feel informed and supported at every step.', 'Fertility Consultation', TRUE, TRUE, 0),
('Rajesh Patil', 'Shirol, Maharashtra', 5, 'Very professional and compassionate. The sonography and follow-up care were smooth and thoroughly explained.', 'Sonography & Follow-up', TRUE, TRUE, 1),
('Sneha Deshmukh', 'Ichalkaranji, Maharashtra', 5, 'The holistic approach combining Ayurveda, Yoga and modern medicine gave us new hope. Highly recommended.', 'Suprajaa Nirmiti Program', TRUE, TRUE, 2);

-- -----------------------------------------------------------------------------
-- BLOG POSTS
-- -----------------------------------------------------------------------------
INSERT INTO public.blog_posts (title, category, content, media_url, media_type, author, likes, is_published, published_at) VALUES
('Dr. Umesh Datta Kalekar''s Workshop on Ultra Yoga for Fertility', 'Story',
 'Highlights from our recent national workshop exploring pelvic blood flow optimization through Ultra Yoga techniques.',
 '/assets/gallery/workshop_1.jpg', 'image', 'Dr. Umesh Datta Kalekar', 142, TRUE, NOW()),
('Scientific Garbhasanskar: Fetal Epigenetics & Mindful Conception', 'Blog',
 'Discover how maternal stress reduction during the first trimester directly influences fetal neurodevelopment and emotional wellbeing.',
 '/assets/gallery/garbhasanskar_blog.jpg', 'image', 'Dr. Umesh Datta Kalekar', 289, TRUE, NOW()),
('Free Fertility & Sonography Screening Camp at Shirol Branch', 'HealthCamp',
 'Join us at Astygma Hope Clinic Shirol for personalized guidance with Dr. Umesh Datta Kalekar and ultrasound diagnostics.',
 '/assets/clinic/shirol_branch.jpg', 'image', 'Clinic Admin', 310, TRUE, NOW());

-- -----------------------------------------------------------------------------
-- SOUND TRACKS
-- -----------------------------------------------------------------------------
INSERT INTO public.sound_tracks (title, category, duration, file_path, frequency_hz, description, is_protected, is_active, display_order) VALUES
('A-Dhyand Deep Meditation', 'Meditation', '15:00', '/assets/music/meditation/a_dhyand_meditation.mp3', 432, 'Dr. Umesh Datta Kalekar''s signature meditation frequency designed for deep mental stillness and endocrine harmony.', TRUE, TRUE, 0),
('Garbhasanskar Fetal Bonding Raga', 'Pregnancy', '20:00', '/assets/music/pregnancy/garbhasanskar_raga.mp3', 528, 'Soothing harmonic soundwaves formulated to nurture fetal auditory development and maternal calming.', TRUE, TRUE, 1),
('Cellular Healing Soundscape', 'Healing', '12:30', '/assets/music/healing/cellular_healing.mp3', 639, 'Gentle acoustic resonance supporting tissue regeneration and stress hormone clearance.', TRUE, TRUE, 2),
('Deep Autonomic Relaxation', 'Relaxation', '18:45', '/assets/music/relaxation/autonomic_relaxation.mp3', 396, 'Calming parasympathetic tone aimed at alleviating reproductive anxiety and insomnia.', TRUE, TRUE, 3),
('Ultra Yoga Flow Atmosphere', 'Yoga', '25:00', '/assets/music/yoga/ultra_yoga_flow.mp3', 741, 'Rhythmic breathing soundscape matched to pelvic movement cycles during Ultra Yoga sessions.', TRUE, TRUE, 4),
('Western Ghats Natural Rain & Birds', 'Nature', '30:00', '/assets/music/nature/western_ghats_rain.mp3', 432, 'Pure ambient nature recording from Maharashtra rainforests for grounding and peaceful sleep.', TRUE, TRUE, 5);

-- -----------------------------------------------------------------------------
-- COURSES
-- -----------------------------------------------------------------------------
INSERT INTO public.courses (title, category, instructor, duration, description, includes, is_paid, price, is_active, display_order) VALUES
('Scientific Garbhasanskar Master Guide', 'Free', 'Dr. Umesh Datta Kalekar', '6 Hours (8 Modules)',
 'Structured pre-conception and intra-uterine cognitive development practices based on modern epigenetics and ancient wisdom.',
 ARRAY['8 HD Video Lessons','Downloadable Prenatal PDF Guide','Audio Soundscape Links'], FALSE, NULL, TRUE, 0),
('Suprajaa Nirmiti Holistic Conception Program', 'Paid', 'Dr. Umesh Datta Kalekar', '12 Hours (16 Modules)',
 'Our ultimate flagship program integrating Ultra Yoga, A-Dhyand Meditation, Sangeetopchar, and Clinical Endocrine Management.',
 ARRAY['Personalized Consultation Session','Exclusive Sound Vault Access Token','Completion Certificate'], TRUE, '₹4,999', TRUE, 1),
('Ultra Yoga for Pelvic Blood Flow Optimization', 'Free', 'Dr. Umesh Datta Kalekar', '4 Hours (6 Modules)',
 'Step-by-step video instruction on Dr. Kalekar''s proprietary Ultra Yoga postures designed for ovarian and uterine vascularity.',
 ARRAY['Daily Exercise Tracker','Breathing Pattern Guide','Video Demonstration'], FALSE, NULL, TRUE, 2),
('Ayurvedic Fertility & Beeja Shuddhi Rejuvenation', 'Paid', 'Dr. Umesh Datta Kalekar', '8 Hours (10 Modules)',
 'Evidence-informed natural fertility principles, Panchakarma preparation, and Rasayana rejuvenation therapies.',
 ARRAY['Cellular Detox Diet Plan','Herbal Guidance Manual','Official Certificate of Completion'], TRUE, '₹2,999', TRUE, 3);

-- -----------------------------------------------------------------------------
-- FAQS
-- -----------------------------------------------------------------------------
INSERT INTO public.faqs (question, answer, category, display_order, is_active) VALUES
('What is the consultation fee?', 'The consultation fee is ₹500, payable online via UPI or at the clinic for offline bookings.', 'Appointments', 0, TRUE),
('Which branches are open on which days?', 'Kolhapur Branch: Mondays, Wednesdays & Fridays (10 AM to 5 PM). Shirol Branch (HQ): Tuesdays, Thursdays & Saturdays (10 AM to 6 PM). Sunday is closed.', 'Branches', 1, TRUE),
('Is sonography available at both branches?', 'No, sonography (ultrasound) is available exclusively at the Shirol Branch on Tuesdays, Thursdays and Saturdays.', 'Sonography', 2, TRUE),
('How do I access the Sound Vault?', 'The Sound Vault is password-protected. Please contact the clinic reception to receive the access passcode.', 'Sound Vault', 3, TRUE);

COMMIT;
