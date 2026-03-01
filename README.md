# ABA Parent Guidance App

A web application that helps parents of children on the autism spectrum implement ABA (Applied Behavior Analysis) strategies at home. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Skills Assessment**: Multi-step questionnaire to evaluate your child's current abilities
- **Personalized Recommendations**: Get goal suggestions based on assessment results
- **Goal Library**: Browse evidence-based ABA goals with detailed teaching procedures
- **Prompt Hierarchy Guide**: Learn the ABA prompt levels for effective teaching
- **BIP Generator**: Create printable Behavior Intervention Plans
- **Admin Dashboard**: Manage questions and goals (requires password)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: JSON files + localStorage (MVP)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd aba-parent-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and set your admin password:
```env
ADMIN_PASSWORD=your_secure_password
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import your repository on [Vercel](https://vercel.com)

3. Set environment variables in Vercel dashboard:
   - `ADMIN_PASSWORD`: Your admin password

4. Deploy!

**Important**: The admin content editing feature won't work in production on Vercel because the filesystem is read-only. For MVP, edit content locally in the `data/` folder and redeploy. For production, consider migrating to a database (see Upgrade Path below).

## Project Structure

```
aba-parent-app/
├── app/                    # Next.js app directory
│   ├── assessment/        # Assessment pages
│   ├── goals/            # Goal library pages
│   ├── bip/              # BIP generator
│   ├── prompts/          # Prompt guide
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
├── lib/                  # Helper functions
│   ├── storage.ts       # localStorage wrapper
│   ├── recommendations.ts # Recommendation algorithm
│   └── utils.ts         # Utilities
├── types/               # TypeScript definitions
├── data/                # Content (JSON files)
│   ├── questions.json  # Assessment questions
│   └── goals.json      # Goal library
└── public/             # Static assets
```

## Usage

### For Parents

1. **Take the Assessment**: Visit `/assessment` to answer questions about your child's skills
2. **Review Results**: Get personalized goal recommendations based on responses
3. **Explore Goals**: Click on recommended goals to see detailed teaching procedures
4. **Learn About Prompts**: Visit `/prompts` to understand the ABA prompt hierarchy
5. **Create a BIP**: Use `/bip` to generate a printable behavior plan

### For Admins

1. Visit `/admin` and enter the admin password
2. Edit questions in `/admin/questions`
3. Edit goals in `/admin/goals`
4. Save changes (works in local development)

**Note**: Admin editing in production requires database migration (see below).

## Customization

### Adding Questions

Edit `data/questions.json`:

```json
{
  "categories": [
    {
      "id": "communication",
      "name": "Communication",
      "description": "Skills related to expressing needs",
      "questions": [
        {
          "id": "comm_1",
          "text": "Your question here?",
          "category": "communication",
          "relatedGoals": ["goal_id_1", "goal_id_2"]
        }
      ]
    }
  ]
}
```

### Adding Goals

Edit `data/goals.json`:

```json
{
  "goals": [
    {
      "id": "goal_comm_1",
      "category": "communication",
      "title": "Goal Title",
      "description": "What the child will learn",
      "targetBehavior": "Specific behavior to achieve",
      "teachingProcedures": [
        {
          "step": 1,
          "instruction": "First step",
          "note": "Helpful tip"
        }
      ],
      "promptLevels": ["Independent", "Verbal", "Model", "Physical"],
      "dataTips": ["How to track progress"],
      "parentTips": ["Tips for parents"],
      "materials": ["Items needed"],
      "priority": "high"
    }
  ]
}
```

### Styling

Colors are defined in `tailwind.config.ts`:

- **Primary**: `#6B9BD1` (soft blue)
- **Success**: `#7FB685` (soft green)
- **Background**: `#E8EEF2` (light gray)
- **Text Dark**: `#2C3E50` (dark gray)

Modify these in the config file to match your brand.

## Upgrade Path

This MVP uses JSON files and localStorage. For production, consider:

### 1. Migrate to Database (Recommended)

Replace JSON files with a database like:
- **Supabase** (PostgreSQL)
- **PlanetScale** (MySQL)
- **MongoDB Atlas**

Update `lib/storage.ts` and create new functions:

```typescript
export async function saveAssessmentToDb(userId: string, responses: AssessmentResponses) {
  // Save to database instead of localStorage
}
```

### 2. Add User Authentication

Replace simple password with:
- **NextAuth.js**
- **Clerk**
- **Auth0**

### 3. Add User Accounts

Store assessment results per user:
- User profiles
- Assessment history
- Progress tracking over time

### 4. Advanced Features

- PDF export for BIPs
- Progress charts and visualizations
- Reminders and notifications
- Video demonstrations
- Collaboration with BCBAs

## Important Disclaimers

This app provides general educational guidance based on ABA principles. It is **NOT**:

- A substitute for professional evaluation or diagnosis
- A replacement for ABA therapy with a BCBA
- Medical or psychological treatment
- Suitable for complex or dangerous behaviors without professional support

Always consult with qualified professionals (BCBA, psychologist, pediatrician) for your child's specific needs.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Please consult with a legal professional for appropriate licensing.

## Support

For questions or issues:
- Review the documentation
- Check existing issues on GitHub
- Open a new issue with details

## Credits

Built by an RBT (Registered Behavior Technician) to make evidence-based ABA strategies accessible to parents.

---

**Disclaimer**: This app is for educational purposes only. It is not a substitute for professional behavior analysis services. For complex needs, always consult a Board Certified Behavior Analyst (BCBA) or other qualified professional.
