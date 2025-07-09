# Stevano Wahyu Al'fandi - Portfolio Website

A modern, minimalist full-stack portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Prisma ORM.

## Features

- 🎨 Modern minimalist design
- 📱 Fully responsive (mobile-first approach)
- 🌙 Dark mode support
- ⚡ Smooth animations with Framer Motion
- 🔧 Full-stack functionality with API routes
- 📝 Blog system with Markdown support
- 💾 MySQL database integration with Prisma
- 📧 Contact form with database storage
- 🎯 SEO optimized
- 🚀 Performance optimized

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React** (Icons)
- **shadcn/ui** (UI Components)

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **MySQL Database**

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL (Laragon recommended for local development)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/stevano/portfolio-website.git
   cd portfolio-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update the `.env` file with your database credentials:
   \`\`\`env
   DATABASE_URL="mysql://root:@localhost:3306/portfolio_db"
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/               # UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
├── scripts/              # Database scripts
└── public/               # Static assets
\`\`\`

## Database Schema

The application uses the following main tables:

- **messages**: Contact form submissions
- **projects**: Portfolio projects
- **blog_posts**: Blog articles

## API Endpoints

- `GET/POST /api/contact` - Handle contact form
- `GET/POST /api/projects` - Manage projects
- `GET/POST /api/blog` - Blog posts
- `GET /api/blog/[slug]` - Individual blog post

## Customization

### Personal Information
Update personal information in:
- `components/sections/hero.tsx`
- `components/sections/about.tsx`
- `app/layout.tsx` (metadata)

### Skills & Technologies
Modify the skills list in:
- `components/sections/skills.tsx`

### Projects
Add/edit projects through:
- Database seeding in `scripts/seed.ts`
- Admin interface (to be implemented)
- Direct database manipulation

### Blog Posts
Create blog posts by:
- Adding entries to the database
- Using the API endpoints
- Direct database insertion

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

\`\`\`env
# Database
DATABASE_URL="mysql://username:password@host:port/database_name"

# Optional: Email configuration for contact form
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
\`\`\`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Stevano Wahyu Al'fandi
- Email: stevano.wahyu@example.com
- LinkedIn: [linkedin.com/in/stevano-wahyu](https://linkedin.com/in/stevano-wahyu)
- GitHub: [github.com/stevano](https://github.com/stevano)

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
