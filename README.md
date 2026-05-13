# ASon Dropship Platform

A production-ready dropshipping platform optimized for sourcing products from 1688 and Taobao to Vietnam, with Zalo integration.

## 🧱 Tech Stack
- **Frontend:** Next.js 16 (App Router), React 19, TailwindCSS v4, ShadCN UI
- **Backend:** Next.js API Routes (Serverless)
- **Database:** PostgreSQL (Neon / Supabase recommended)
- **ORM:** Prisma
- **State Management:** Zustand
- **Auth:** NextAuth.js (for Admin panel)

## 📦 Features
- 🛍️ **Customer Storefront:** Homepage, Catalogue, and Product Details with conversion-optimized UI.
- 💬 **Zalo Integration:** 1-click Zalo ordering auto-generates order templates.
- ⚙️ **Admin Dashboard:** Manage products, smart pricing rules, and categories.
- 🤖 **1688 Import Tool:** (UI ready) Input a 1688 link to scrape and import.
- 🧮 **Smart Pricing:** Auto-calculates VND prices based on CNY cost, global multiplier, and shipping rules.

## 🚀 Setup Guide (Local Development)

### Prerequisites
- Node.js 20+
- A PostgreSQL database (you can use Neon.tech or Supabase for a free cloud Postgres)

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Create a \`.env\` file in the root directory and add the following:
\`\`\`env
# Database connection string
DATABASE_URL="postgresql://user:password@host:5432/db_name?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-string-here"

# Admin Account Credentials
ADMIN_EMAIL="admin@asondropship.com"
ADMIN_PASSWORD="securepassword"
\`\`\`

### 3. Setup Database & Seed Data
Push the Prisma schema to your database and seed it with mock data:
\`\`\`bash
npm run db:push
npm run db:seed
\`\`\`

### 4. Start Development Server
\`\`\`bash
npm run dev
\`\`\`
The site will be available at \`http://localhost:3000\`.

## 🚢 Deployment Guide (Vercel)

1. **Push your code to GitHub.**
2. **Create a project on Vercel:**
   - Import your GitHub repository.
   - Framework preset: `Next.js`.
3. **Environment Variables on Vercel:**
   - Add \`DATABASE_URL\` pointing to your production PostgreSQL database.
   - Add \`NEXTAUTH_SECRET\` (generate a random string).
   - Add \`NEXTAUTH_URL\` (e.g., \`https://asondropship.com\`).
4. **Build Command:**
   - Vercel automatically runs \`npm run build\`. 
   - Ensure Prisma generates the client by adding a \`postinstall\` script in `package.json` if needed: `"postinstall": "prisma generate"`. (Already handled automatically by Prisma on Vercel in most cases).
5. **Deploy!**

## 🔮 Future Expansions
The architecture is designed to easily integrate:
- Full checkout/cart system (Stripe/VNPay).
- Real-time 1688 API Scraping (via proxies or 1688 Open API).
- Multi-language support (i18n).
- Customer CRM and Order tracking.
