# Contributing to ABA Parent Guidance App

Thank you for your interest in contributing to the ABA Parent Guidance App! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and collaborative environment.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs. actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- **Clear use case** - Why is this enhancement valuable?
- **Detailed description** of the proposed functionality
- **Mockups or examples** if applicable
- **Potential implementation approach** (optional)

### Content Contributions

We welcome contributions to the educational content:

- **New Teaching Goals** - Evidence-based ABA goals with teaching procedures
- **Educational Concepts** - ABA principles explained in parent-friendly language
- **Activities & Resources** - Practical suggestions for toys and activities
- **Translations** - Help make the app accessible in other languages

For content contributions, please ensure:
- Content aligns with BACB ethical guidelines
- Language is parent-friendly (avoid jargon)
- Sources are cited where applicable
- Content is reviewed by a BCBA or qualified professional

### Code Contributions

#### Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/aba-parent-guidance.git
   cd aba-parent-app
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Workflow

1. **Make your changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Test thoroughly in both light and dark modes
   - Ensure responsive design (mobile, tablet, desktop)

2. **Test your changes**
   ```bash
   npm run dev        # Development server
   npm run build      # Production build
   npm run lint       # Run linter
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for UI changes

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define types for all props and function parameters
- Avoid `any` types - use specific types or generics
- Use interfaces for object shapes

### React Components

- Use functional components with hooks
- Prefer named exports over default exports (except for pages)
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color palette (gradient pastels)
- Support dark mode with `dark:` prefix
- Ensure accessibility (ARIA labels, keyboard navigation)

### File Organization

```
components/
  ├── features/      # Feature-specific components
  ├── layout/        # Layout components (nav, footer)
  ├── media/         # Media components (video, images)
  ├── providers/     # Context providers
  └── ui/            # Reusable UI components
```

### Naming Conventions

- **Components**: PascalCase (e.g., `BIPSelector.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase with descriptive names (e.g., `BehaviorPlan`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_GOALS`)

## Data File Structure

When adding or modifying JSON data files:

### Assessment Questions (`data/assessment.json`)
```json
{
  "id": "unique_id",
  "text": "Parent-friendly question",
  "category": "communication|social|daily_living|behavior",
  "relatedGoals": ["goal_id_1", "goal_id_2"]
}
```

### Teaching Goals (`data/goals.json`)
```json
{
  "id": "goal_category_#",
  "category": "communication|social|daily_living|behavior",
  "title": "Clear goal title",
  "description": "Brief description",
  "targetBehavior": "Specific observable behavior",
  "teachingProcedures": [
    {
      "step": 1,
      "instruction": "Clear instruction",
      "note": "Helpful tip",
      "imageUrl": "/images/guides/step.jpg",
      "videoUrl": "/videos/techniques/demo.mp4"
    }
  ],
  "promptLevels": ["Least intrusive", "Most intrusive"],
  "dataTips": ["How to track progress"],
  "parentTips": ["Practical advice"],
  "materials": ["Required items"],
  "priority": "high|medium|low",
  "videoGuideUrl": "/videos/techniques/overview.mp4",
  "thumbnailUrl": "/images/guides/thumbnail.jpg"
}
```

### BIP Options (`data/bip-options.json`)
```json
{
  "targetBehaviors": [
    {
      "id": "unique_id",
      "label": "Parent-friendly behavior name",
      "description": "When your child...",
      "category": "aggression|self_injury|property|non_compliance|other",
      "seekProfessionalHelp": false,
      "educationalNote": "Why this behavior happens"
    }
  ]
}
```

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All TypeScript types are defined
- [ ] Dark mode support is implemented
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] No console errors or warnings
- [ ] Build succeeds (`npm run build`)
- [ ] Lint passes (`npm run lint`)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Content update
- [ ] Documentation
- [ ] Code refactoring

## Related Issues
Closes #[issue number]

## Screenshots
(If applicable)

## Testing
How did you test these changes?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested in dark mode
- [ ] Responsive design tested
```

## BACB Compliance

All contributions must:
- Align with BACB ethical guidelines
- Include appropriate disclaimers
- Emphasize parent-BCBA collaboration
- Flag safety concerns appropriately
- Use evidence-based practices

## Questions?

If you have questions about contributing:
- Open a discussion on GitHub
- Review existing issues and PRs
- Contact the maintainers

## Recognition

All contributors will be acknowledged in the project README.

Thank you for helping make ABA strategies more accessible to parents!
