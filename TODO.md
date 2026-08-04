# Astygma Hope Web — Supabase Integration Task Checklist

## Steps

### Backend & Environment Setup
- [x] 1. Create `.env` and `.env.example` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- [x] 2. Create `.gitignore` to protect `.env` and build artifacts.
- [x] 3. Create `supabase/migrations/0001_init.sql` — full production schema (tables, enums, indexes, FKs, triggers, RLS).
- [x] 4. Create `supabase/seed.sql` — seed initial data (doctors, services, testimonials, gallery, blog, faq, sound tracks, courses, cms).

### Client Layer
- [x] 5. Enhance `src/lib/supabase.ts` — robust typed client with event handling.
- [x] 6. Create `src/lib/database.types.ts` — TypeScript types for DB rows.
- [x] 7. Create `src/lib/queries.ts` — all query functions (appointments, contact, doctors, services, testimonials, gallery, blog, faq, feedback, sound, courses, cms).

### Data Layer Migration (replace mock with Supabase)
- [x] 8. Update `AppointmentContext.tsx` → Supabase insert/fetch/update with fallback.
- [x] 9. Update `CMSContext.tsx` → Supabase fetch/add blog posts with fallback.
- [x] 10. Update `SoundVaultContext.tsx` → Supabase fetch sound tracks with fallback.
- [x] 11. Update `ContactPage.tsx` → submit contact form to Supabase.
- [x] 12. Update `CMSFeed.tsx` → feedback to Supabase, blog posts from Supabase.
- [x] 13. Update `GalleryPage.tsx` → fetch gallery from Supabase.
- [x] 14. Update `TestimonialsSection.tsx` → fetch testimonials from Supabase.
- [x] 15. Update `DoctorsPage.tsx` → fetch doctors from Supabase.
- [x] 16. Update `ServicesGrid.tsx` → fetch services from Supabase.
- [x] 17. Update `CoursesPage.tsx` → fetch courses from Supabase.
- [x] 18. Add `src/types/index.ts` updated types (FAQ, Course, Testimonial, GalleryItem, ContactMessage).

### Auth & RBAC
- [x] 19. Update `PortalLoginModal.tsx` → Supabase sign-in with role-based access.
- [x] 20. Update `AdminDashboard.tsx` → Supabase-backed CMS publish, sound vault add, settings.

### Database Deployment
- [x] 21. Deploy schema + seed data to Supabase PostgreSQL (via `scripts/deploy-db.cjs`).
- [x] 22. Verify all tables populated in Supabase (doctors, services, testimonials, gallery, blog, sound, courses, faqs, settings).

### Version Control
- [x] 23. Initialize git repo, add remote, commit all code.
- [x] 24. Push code to `https://github.com/satyamkamble11/astygmahope.git` (branch `main`).

### Verification
- [ ] 25. Run `npm run build` — ensure production-ready compilation.
</content>
