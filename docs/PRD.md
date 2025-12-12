# Product Requirement Document: Ultimate Next.js Boilerplate

## 1. Overview

This document outlines the requirements and specifications for a high-quality, feature-rich Next.js boilerplate. The goal is to provide a robust starting point for modern web development with a focus on type safety, developer experience, and performance.

## 2. Technical Stack & Key Features

### Core Framework

- **Next.js**: Latest version with App Router support (`app/` directory).
- **React**: Version 19, strictly typed.
- **Strict Mode**: Enabled for both TypeScript and React to ensure robust code.

### Styling & UI

- **Tailwind CSS**: Integrated for utility-first styling.
- **UI Components**: Built with Tailwind CSS.
- **Storybook**: For isolated UI component development and documentation.

### Type Safety & Validation

- **TypeScript**: Strict type checking enabled.
- **T3 Env**: Type-safe environment variables validation to prevent runtime crashes due to missing config.
- **Zod**: Schema validation library, used for env vars, forms, and API data.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation (integrated with Zod).

### Internationalization (i18n)

- **next-intl**: Lightweight and efficient internationalization for Next.js.
- **Crowdin**: Integration for translation management workflow.
- **i18n-check**: Tooling to validate translations and detect missing keys.
- **Validation**: Strict validation of translation keys.

### Developer Experience & Quality Assurance

- **Linter**:
  - **ESLint**: configured with:
    - Default Next.js config
    - Next.js Core Web Vitals
    - Tailwind CSS plugin
    - Antfu configuration (opinionated preset).
- **Formatter**: **Prettier** for consistent code style.
- **Git Hooks**: **Lefthook** (replacing Husky) to run tasks before commits/pushes.
- **Lint Staged**: Run linters only on staged files for faster commits.
- **Commit Convention**:
  - **Commitlint**: Enforce conventional commits.
  - **Commitizen**: CLI helper to write standard compliant commit messages.
- **Code Analysis**: **Knip** to detect unused files, dependencies, and exports.
- **Dependency Updates**: **Dependabot** configuration for automatic updates.

### Logging & Monitoring

- **LogTape**: For structured logging.
- **Better Stack**: Integration for log management and monitoring.

### Configuration & Utilities

- **Absolute Imports**: Configured using `@/` prefix (e.g., `@/components/Button`).
- **VSCode**:
  - `extensions.json`: Recommended extensions.
  - `settings.json`: Workspace settings.
  - `launch.json`: Debugging configuration.
- **SEO**:
  - Metadata generation.
  - JSON-LD structured data.
  - Open Graph tags.
  - `sitemap.xml` and `robots.txt` generation.

## 3. Implementation Details

### 3.1. Project Structure

```
.
├── app/                  # Next.js App Router
├── components/           # Reusable components
├── lib/                  # Utility functions and shared logic
├── locales/              # Translation files
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript type definitions
├── .env.example          # Example environment variables
├── .eslintrc.json        # ESLint config
├── .prettierrc           # Prettier config
├── next.config.mjs       # Next.js config
├── tailwind.config.ts    # Tailwind config
├── tsconfig.json         # TypeScript config
└── ...
```

### 3.2. Configuration Files

- **TypeScript**: `tsconfig.json` with `strict: true` and paths configured.
- **Environment**: `src/env.mjs` (or similar) using `@t3-oss/env-nextjs`.
- **Lefthook**: `lefthook.yml` configuring pre-commit hooks for linting and type checking.

## 4. Workflows

- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Test**: `pnpm test` (if testing is added later)
- **Storybook**: `pnpm storybook`
- **Commit**: `pnpm commit` (triggers Commitizen)

## 5. Success Criteria

- [ ] ALL requested libraries (next-intl, T3 Env, Zod, React Hook Form, LogTape, Better Stack, etc.) are installed.
- [ ] ESLint and Prettier are configured and conflict-free.
- [ ] Lefthook runs pre-commit checks.
- [ ] Commitizen prompts for commit messages.
- [ ] Sitemap and robots.txt are generated.
- [ ] VSCode settings are present.
