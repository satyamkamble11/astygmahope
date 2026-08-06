import pg from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = "postgresql://postgres:astygma@2026@db.gcqawwsopkbsednwzgph.supabase.co:5432/postgres";

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString });
  console.log("🔌 Connecting to Supabase database...");
  await client.connect();
  console.log("🟢 Connected!");

  try {
    console.log("🗑️ Dropping existing tables and types for a clean migration...");
    await client.query(`
      DROP TABLE IF EXISTS public.settings CASCADE;
      DROP TABLE IF EXISTS public.doctors CASCADE;
      DROP TABLE IF EXISTS public.services CASCADE;
      DROP TABLE IF EXISTS public.gallery_items CASCADE;
      DROP TABLE IF EXISTS public.testimonials CASCADE;
      DROP TABLE IF EXISTS public.blog_posts CASCADE;
      DROP TABLE IF EXISTS public.sound_tracks CASCADE;
      DROP TABLE IF EXISTS public.courses CASCADE;
      DROP TABLE IF EXISTS public.faqs CASCADE;
      DROP TABLE IF EXISTS public.appointments CASCADE;
      DROP TABLE IF EXISTS public.profiles CASCADE;
      DROP TABLE IF EXISTS public.contact_messages CASCADE;
      DROP TABLE IF EXISTS public.feedback CASCADE;

      DROP POLICY IF EXISTS "media_public_read" ON storage.objects;
      DROP POLICY IF EXISTS "media_admin_insert" ON storage.objects;
      DROP POLICY IF EXISTS "media_admin_update" ON storage.objects;
      DROP POLICY IF EXISTS "media_admin_delete" ON storage.objects;
      DROP POLICY IF EXISTS "sound_vault_auth_read" ON storage.objects;
      DROP POLICY IF EXISTS "sound_vault_admin_insert" ON storage.objects;
      DROP POLICY IF EXISTS "sound_vault_admin_update" ON storage.objects;
      DROP POLICY IF EXISTS "sound_vault_admin_delete" ON storage.objects;

      DROP TYPE IF EXISTS public.user_role CASCADE;
      DROP TYPE IF EXISTS public.appointment_status CASCADE;
      DROP TYPE IF EXISTS public.payment_mode CASCADE;
      DROP TYPE IF EXISTS public.branch_name CASCADE;
      DROP TYPE IF EXISTS public.post_category CASCADE;
      DROP TYPE IF EXISTS public.sound_category CASCADE;
      DROP TYPE IF EXISTS public.service_category CASCADE;
      DROP TYPE IF EXISTS public.gallery_category CASCADE;
    `);
    console.log("🟢 Cleaned up!");

    console.log("📝 Running 0001_init.sql migrations...");
    const initSqlPath = path.resolve('supabase/migrations/0001_init.sql');
    const initSql = fs.readFileSync(initSqlPath, 'utf8');
    await client.query(initSql);
    console.log("🟢 Schema created successfully!");

    console.log("🌱 Inserting clean seed data (without ₹500 fee, empty mock music, only 7 real videos)...");
    
    // Insert Config Settings
    await client.query(`
      INSERT INTO public.settings (key, value) VALUES
      ('clinic_socials', '{"instagram":"https://www.instagram.com/astygma_369/?hl=en","facebook":"https://www.facebook.com/p/Astygma-Hope-Clinic-100034449925414/","youtube":"https://youtube.com/@astygmahopeclinic"}'),
      ('clinic_config', '{"name":"Astygma Hope Clinic","branch":"Shirol & Kolhapur Branches","phone":"+91 7522900512","whatsApp":"+91 7522900512","email":"astygmahope@gmail.com","workingHours":"10 AM to 6 PM","workingDays":"Monday to Saturday","closedDay":"Sunday Closed / Emergency"}')
      ON CONFLICT (key) DO NOTHING;
    `);

    // Insert Doctors
    await client.query(`
      INSERT INTO public.doctors (name, role, title, experience, qualifications, bio, highlights, image_path, is_founder, is_active, display_order) VALUES
      (
        'Dr. Umesh Datta Kalekar',
        'Founder & MD',
        'Founder of Astygma Hope Clinic',
        '31+ Years',
        ARRAY['Doctor of Medicine (MD)','Senior Health Educator','Medical Author','Yoga Researcher','Meditation Researcher','Ayurvedic Fertility Coach'],
        'Dr. Umesh Datta Kalekar is a pioneer in combining advanced reproductive medicine with ancient holistic sciences. Over his 31+ years of clinical practice, he has conducted national and international workshops, developer of Ultra Yoga and A-Dhyand Meditation, guiding thousands of families to fertility success. As a certified Ayurvedic Fertility Coach, he personally guides couples through natural conception pathways using Beeja Shuddhi (purification of egg and sperm), Rasayana rejuvenation, and classical Ayurvedic nutrition.',
        ARRAY['Developer of Ultra Yoga','Developer of A-Dhyand Meditation','Ayurvedic Fertility Coach (Natural Conception Expert)','Conducted Workshops Nationally & Internationally','31+ Years Clinical Excellence in Reproductive Science','Holistic Fertility & Garbhasanskar Expert'],
        '/assets/doctors/dr_umesh_kalekar.png',
        TRUE, TRUE, 0
      );
    `);

    // Insert Services with updated image paths
    await client.query(`
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
       'Microscope', '/assets/clinic/laboratory_tests.jpg', TRUE, 4),
      ('diet-lifestyle-guidance', 'Diet and Lifestyle Guidance', 'holistic',
       'Customized fertility nutritional plans, circadian rhythm realignment, and detoxification pathways.',
       'Cellular nutrition plays a central role in egg and sperm quality. Our protocol incorporates anti-inflammatory dietary strategies, gut microbiome restoration, and daily habit realignment.',
       ARRAY['Anti-Inflammatory Fertility Diet','Circadian & Sleep Optimization','Endocrine Disruptor Elimination','Micronutrient Supplementation'],
       'Apple', '/assets/clinic/diet_lifestyle.jpg', TRUE, 5),
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
       'BookOpen', '/assets/clinic/ayurvedic_fertility.jpg', TRUE, 8),
      ('scientific-garbhasanskar-guide', 'Scientific Garbhasanskar Guide', 'educational',
       'Structured pre-conception and intra-uterine cognitive development practices based on neuroscience and ancient wisdom.',
       'Scientific Garbhasanskar blends modern epigenetics and fetal psychology with traditional mental bonding exercises, giving unborn children an optimal emotional and cognitive start.',
       ARRAY['Epigenetic Fetal Stimulation','Pre-Conception Mental Alignment','Maternal Emotional Bonding','Neuro-Sensory Development'],
       'Sparkles', '/assets/clinic/scientific_garbhasanskar.jpg', TRUE, 9),
      ('suprajaa-nirmiti-program', 'Suprajaa Nirmiti Program', 'holistic',
       'Our flagship comprehensive program integrating Ultra Yoga, A-Dhyand Meditation, Sangeetopchar, and Clinical Medicine.',
       'The ultimate transformation protocol created by Dr. Umesh Datta Kalekar. Suprajaa Nirmiti brings together medicine, mind, sound, and yoga into one unified journey for couples seeking high-vibrational parenthood.',
       ARRAY['Unified Clinical & Holistic Care','Personalized Dr. Kalekar Consultations','Exclusive Access to Healing Vault','Complete Mind-Body Transformation'],
       'Award', '/assets/clinic/suprajaa_nirmiti.jpg', TRUE, 10);
    `);

    // Insert Gallery items (Excluding generated videos not provided, only keeping real image records. Video assets are read from default list on frontend)
    await client.query(`
      INSERT INTO public.gallery_items (title, category, path, description, is_video, is_active, display_order) VALUES
      ('Astygma Hope Clinic Shirol Branch', 'Clinic', '/assets/clinic/shirol_branch.jpg', 'Modern luxury facility located on Maharashtra State Highway 137, Shirol.', FALSE, TRUE, 0),
      ('Astygma Hope Clinic Kolhapur Branch', 'Clinic', '/assets/clinic/kolhapur_branch.jpg', 'Kolhapur branch near Deshmukh Hall, Hari Om Nagar.', FALSE, TRUE, 1),
      ('Dr. Umesh Datta Kalekar National Workshop', 'Workshops', '/assets/gallery/workshop_1.jpg', 'Dr. Kalekar conducting Ultra Yoga & Garbhasanskar training for healthcare professionals.', FALSE, TRUE, 2),
      ('Front Reception Triage Desk', 'Reception', '/assets/reception/reception_desk.jpg', 'Patient check-in desk and appointment triage lounge.', FALSE, TRUE, 3),
      ('Clinical Diagnostic Laboratory', 'Lab', '/assets/lab/lab_equipment.jpg', 'In-house reproductive hormone testing equipment.', FALSE, TRUE, 4),
      ('Dr. Umesh Datta Kalekar Portrait', 'Doctors', '/assets/doctors/dr_umesh_kalekar.png', 'Founder & MD of Astygma Hope Clinic (31+ Years Experience).', FALSE, TRUE, 5),
      ('Free Fertility & Ultrasound Health Camp', 'Events', '/assets/gallery/health_camp.jpg', 'Community health outreach event held at Shirol Branch.', FALSE, TRUE, 6),
      ('Nursing & Technical Support Team', 'Staff', '/assets/staff/nursing_staff.jpg', 'Experienced clinical care team at Shirol.', FALSE, TRUE, 7);
    `);

    // Insert Testimonials
    await client.query(`
      INSERT INTO public.testimonials (name, location, rating, review, service, is_active, is_approved, display_order) VALUES
      ('Priya Sharma', 'Kolhapur, Maharashtra', 5, 'The care and guidance I received during my fertility journey was exceptional. Dr. Kalekar and his team made me feel informed and supported at every step.', 'Fertility Consultation', TRUE, TRUE, 0),
      ('Rajesh Patil', 'Shirol, Maharashtra', 5, 'Very professional and compassionate. The sonography and follow-up care were smooth and thoroughly explained.', 'Sonography & Follow-up', TRUE, TRUE, 1),
      ('Sneha Deshmukh', 'Ichalkaranji, Maharashtra', 5, 'The holistic approach combining Ayurveda, Yoga and modern medicine gave us new hope. Highly recommended.', 'Suprajaa Nirmiti Program', TRUE, TRUE, 2);
    `);

    // Insert Blog posts
    await client.query(`
      INSERT INTO public.blog_posts (title, category, content, media_url, media_type, author, likes, is_published, published_at) VALUES
      ('Dr. Umesh Datta Kalekar''s Workshop on Ultra Yoga for Fertility', 'Story', 'Highlights from our recent national workshop exploring pelvic blood flow optimization through Ultra Yoga techniques.', '/assets/gallery/workshop_1.jpg', 'image', 'Dr. Umesh Datta Kalekar', 142, TRUE, NOW()),
      ('Scientific Garbhasanskar: Fetal Epigenetics & Mindful Conception', 'Blog', 'Discover how maternal stress reduction during the first trimester directly influences fetal neurodevelopment and emotional wellbeing.', '/assets/gallery/garbhasanskar_blog.jpg', 'image', 'Dr. Umesh Datta Kalekar', 289, TRUE, NOW()),
      ('Free Fertility & Sonography Screening Camp at Shirol Branch', 'HealthCamp', 'Join us at Astygma Hope Clinic Shirol for personalized guidance with Dr. Umesh Datta Kalekar and ultrasound diagnostics.', '/assets/clinic/shirol_branch.jpg', 'image', 'Clinic Admin', 310, TRUE, NOW());
    `);

    // Insert courses
    await client.query(`
      INSERT INTO public.courses (title, category, instructor, duration, description, includes, is_paid, price, is_active, display_order) VALUES
      ('Scientific Garbhasanskar Master Guide', 'Free', 'Dr. Umesh Datta Kalekar', '6 Hours (8 Modules)', 'Structured pre-conception and intra-uterine cognitive development practices based on modern epigenetics and ancient wisdom.', ARRAY['8 HD Video Lessons','Downloadable Prenatal PDF Guide','Audio Soundscape Links'], FALSE, NULL, TRUE, 0),
      ('Suprajaa Nirmiti Holistic Conception Program', 'Paid', 'Dr. Umesh Datta Kalekar', '12 Hours (16 Modules)', 'Our ultimate flagship program integrating Ultra Yoga, A-Dhyand Meditation, Sangeetopchar, and Clinical Endocrine Management.', ARRAY['Personalized Consultation Session','Exclusive Sound Vault Access Token','Completion Certificate'], TRUE, 'Paid', TRUE, 1),
      ('Ultra Yoga for Pelvic Blood Flow Optimization', 'Free', 'Dr. Umesh Datta Kalekar', '4 Hours (6 Modules)', 'Step-by-step video instruction on Dr. Kalekar''s proprietary Ultra Yoga postures designed for ovarian and uterine vascularity.', ARRAY['Daily Exercise Tracker','Breathing Pattern Guide','Video Demonstration'], FALSE, NULL, TRUE, 2),
      ('Ayurvedic Fertility & Beeja Shuddhi Rejuvenation', 'Paid', 'Dr. Umesh Datta Kalekar', '8 Hours (10 Modules)', 'Evidence-informed natural fertility principles, Panchakarma preparation, and Rasayana rejuvenation therapies.', ARRAY['Cellular Detox Diet Plan','Herbal Guidance Manual','Official Certificate of Completion'], TRUE, 'Paid', TRUE, 3);
    `);

    // Insert FAQs without ₹500 fee
    await client.query(`
      INSERT INTO public.faqs (question, answer, category, display_order, is_active) VALUES
      ('How do I book an appointment?', 'You can book your appointment directly on our website! No online payment is required.', 'Appointments', 0, TRUE),
      ('Which branches are open on which days?', 'Kolhapur Branch: Mondays & Wednesdays (10 AM to 5 PM). Shirol Branch (HQ): Tuesdays, Thursdays, Fridays & Saturdays (10 AM to 6 PM). Sunday is closed.', 'Branches', 1, TRUE),
      ('Is sonography available at both branches?', 'No, sonography (ultrasound) is available exclusively at the Shirol Branch.', 'Sonography', 2, TRUE),
      ('How do I access the Sound Vault?', 'The Sound Vault is password-protected. Please contact the clinic reception to receive the access passcode.', 'Sound Vault', 3, TRUE);
    `);

    console.log("🌱 Database seeded successfully!");

  } catch (err) {
    console.error("❌ SQL Query Error:", err);
  } finally {
    await client.end();
    console.log("🔌 Connection closed.");
  }
}

main().catch(console.error);
