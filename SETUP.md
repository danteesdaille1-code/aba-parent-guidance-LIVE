# Setup Guide

Complete setup instructions for the ABA Parent Guidance App.

## Prerequisites

Before you begin, ensure you have:
- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd aba-parent-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript 5.9
- Tailwind CSS 3.4
- Framer Motion
- And all other dependencies

### 3. Environment Setup

Create your environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set a secure admin password:
```env
ADMIN_PASSWORD=your_secure_password_here
```

**Important:** Use a strong password in production!

### 4. Start Development Server

```bash
npm run dev
```

The app will start on [http://localhost:3000](http://localhost:3000)

If port 3000 is in use, Next.js will automatically try port 3001, 3002, etc.

## Verification

After starting the dev server, verify the setup by checking:

1. **Homepage** - http://localhost:3000
2. **Dark Mode Toggle** - Click the sun/moon icon in navigation
3. **Assessment** - http://localhost:3000/assessment
4. **BIP Generator** - http://localhost:3000/bip
5. **Learn Hub** - http://localhost:3000/learn
6. **Resources** - http://localhost:3000/resources

## Common Issues

### Port Already in Use

If you see "Port 3000 is already in use":
- Next.js will automatically use the next available port
- Or manually specify a port: `npm run dev -- -p 3001`

### Module Not Found Errors

Run:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Ensure you're using Node.js 18+:
```bash
node --version
```

## Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure Quick Reference

```
aba-parent-app/
├── app/              # Pages (Next.js 14 app directory)
├── components/       # React components
├── data/            # JSON data files
├── lib/             # Utilities
├── types/           # TypeScript types
└── public/          # Static assets
```

## Next Steps

After setup:
1. Explore the `/assessment` page
2. Try creating a BIP at `/bip`
3. Read educational content at `/learn`
4. Check out resources at `/resources`
5. Toggle dark mode and see the transformation!

## Development Tips

- **Hot Reload:** Changes auto-reload in dev mode
- **Dark Mode:** Persists in localStorage
- **Data:** Edit JSON files in `/data` folder
- **Styles:** Tailwind classes in components
- **New Pages:** Add to `/app` directory

## Need Help?

- Check the main [README.md](./README.md)
- Review the [Next.js documentation](https://nextjs.org/docs)
- Open an issue on GitHub

---

Happy developing! 🎉
