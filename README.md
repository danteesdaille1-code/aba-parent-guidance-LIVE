# ABA Parent Guidance App

A visual, interactive web application designed to help parents implement Applied Behavior Analysis (ABA) strategies with their children. This app provides assessment tools, teaching goals, behavior intervention planning, and educational resources in a parent-friendly, accessible format.

## Features

- **Interactive Assessment** - 12 comprehensive questions to identify your child's needs with visual scale and immediate results
- **Parent Goals Wizard** - Personalize your experience by selecting what you want your child to work on
- **Teaching Goals Library** - 12+ evidence-based goals across 4 categories (Communication, Social Skills, Daily Living, Behavior)
- **BIP Generator** - Create behavior intervention plans using multiple-choice selections (no ABA expertise required)
- **Educational Content** - Learn ABA concepts through visual guides and videos covering:
  - Extinction bursts and why to stay consistent
  - How consequences work (positive and negative attention)
  - Naturalistic teaching, DTT, token boards, and more
- **Resource Library** - Replacement toys and activity suggestions tailored for children on the autism spectrum
- **Dark Mode** - Toggle between light and dark themes with persistent preferences
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling with custom gradient color palette
- **Framer Motion** - Smooth animations and transitions
- **React Context** - State management for theme and user preferences

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danteesdaille1-code/aba-parent-guidance.git
   cd aba-parent-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and set your admin password:
   ```
   ADMIN_PASSWORD=your_secure_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
aba-parent-app/
├── app/                          # Next.js App Router pages
│   ├── assessment/              # Assessment questionnaire
│   ├── bip/                     # Behavior Intervention Plan generator
│   ├── goals/                   # Teaching goals library
│   │   └── [id]/               # Individual goal detail pages
│   ├── learn/                   # Educational content hub
│   │   └── [concept]/          # Dynamic concept pages
│   ├── resources/               # Resource sections
│   │   ├── toys/               # Replacement toys
│   │   └── activities/         # Activity suggestions
│   └── layout.tsx              # Root layout with theme provider
├── components/
│   ├── features/               # Feature-specific components
│   │   ├── AssessmentQuestion.tsx
│   │   ├── BIPSelector.tsx     # Multiple-choice BIP interface
│   │   ├── EducationalModal.tsx
│   │   ├── GoalCard.tsx
│   │   └── ParentGoalsWizard.tsx
│   ├── layout/
│   │   └── Navigation.tsx      # Main navigation with dark mode toggle
│   ├── media/
│   │   ├── VideoPlayer.tsx     # Video player with placeholder support
│   │   └── ImageGallery.tsx    # Lightbox image gallery
│   ├── providers/
│   │   └── ThemeProvider.tsx   # Dark mode context provider
│   └── ui/                     # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── DarkModeToggle.tsx
│       ├── DropdownMenu.tsx
│       ├── InfoTooltip.tsx
│       └── InteractiveScale.tsx
├── data/                        # JSON data files
│   ├── activities.json         # Replacement toys and activities
│   ├── assessment.json         # Assessment questions
│   ├── bip-options.json        # Behavior and strategy options (73 total)
│   ├── educational-content.json # 10 ABA concepts
│   └── goals.json              # 12 teaching goals
├── types/                       # TypeScript type definitions
│   ├── assessment.ts
│   ├── bip.ts
│   └── goals.ts
├── public/                      # Static assets
│   ├── videos/                 # Video demonstrations (placeholders)
│   └── images/                 # Visual guides (placeholders)
└── tailwind.config.ts          # Custom color palette and dark mode config
```

## Key Design Features

### Gradient Color Palette
The app uses a soft, parent-friendly gradient color scheme:
- **Soft Lavender** (#E8D5F2) → **Pastel Blue** (#B8E5F0) → **Mint Green** (#D4F1D8)

### Dark Mode
- Toggle in navigation bar
- Persists preference in localStorage
- Smooth transitions between themes

### Interactive Elements
- Card hover effects (lift, glow, scale)
- Stagger animations for lists
- Large touch targets for accessibility
- Emoji-based visual scales

## Content Management

This app uses a JSON-based content management system for easy updates:

- **Assessment Questions**: Edit `data/assessment.json`
- **Teaching Goals**: Edit `data/goals.json`
- **BIP Options**: Edit `data/bip-options.json` (18 behaviors, 73 strategies)
- **Educational Content**: Edit `data/educational-content.json` (10 concepts)
- **Resources**: Edit `data/activities.json` (8 toys, 8 activities)

All content changes are reflected immediately after restarting the dev server.

## BACB Compliance & Disclaimers

This app is designed as an **educational resource and guidance tool** for parents, not a replacement for professional behavior analysis services. Throughout the app, we emphasize:

- Consulting with a Board Certified Behavior Analyst (BCBA) before implementing strategies
- Clear scope of practice limitations
- "When to seek professional help" warnings
- Ethical guidelines aligned with BACB standards

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Designed with input from BCBAs and parents
- Built with accessibility and mobile-first design principles
- Inspired by the need to make ABA strategies accessible to all parents

## Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Contact the development team

## Roadmap

Future enhancements planned:
- User accounts for saving progress across devices
- Progress tracking and data visualization
- BCBA collaboration features
- Multi-language support
- Community forum for parent support
- Advanced analytics dashboard

---

**Disclaimer**: This application provides educational guidance only. Always consult with qualified professionals (BCBAs, pediatricians, therapists) for personalized treatment plans and diagnosis.
