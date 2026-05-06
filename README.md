# Resul Ersürer - Freelance Portfolio

A modern, minimal, high-converting freelance portfolio website built with Next.js and Tailwind CSS.

## Features

- 🚀 **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for modern styling
- 📱 **Fully Responsive** (mobile-first design)
- 🌙 **Dark Theme** with premium SaaS style
- ✨ **Smooth Animations** and micro-interactions
- 🔍 **SEO Optimized** with proper meta tags
- 🎯 **High Conversion** focused design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── About.tsx            # About section
│   ├── Contact.tsx          # Contact section
│   ├── Footer.tsx           # Footer
│   ├── Hero.tsx             # Hero section
│   ├── Navigation.tsx       # Navigation bar
│   ├── Portfolio.tsx        # Portfolio section
│   ├── Process.tsx          # Process section
│   ├── Services.tsx         # Services section
│   └── Testimonials.tsx     # Testimonials section
├── public/                  # Static assets
└── ...config files
```

## Build & Deploy

### Local Build

1. Build for production:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

### Deploy to Vercel

1. **Create a PostgreSQL database** (Vercel Postgres or Neon.tech)

2. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for Vercel deploy"
git push origin main
```

3. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repo
   - Framework: Next.js

4. **Environment Variables** in Vercel:
   ```
   DATABASE_URL=postgresql://...
   ADMIN_PASSWORD=your_admin_password
   ```

5. **Deploy** - Migrations will run automatically

### Admin Panel

- Login: `/admin/login`
- Password: Set in `ADMIN_PASSWORD` env variable

## Customization

- Update personal information in components
- Modify colors in `tailwind.config.js`
- Add your own projects in `Portfolio.tsx`
- Update contact details in `Contact.tsx`

## License

MIT License - feel free to use this template for your own portfolio!
