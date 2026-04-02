# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Naiera Landing** is a Next.js 15 government services portal for Indonesian public services. It features a sophisticated service catalog system with mega menu navigation, internationalization support (Indonesian/English), and a comprehensive component library built on Shadcn UI.

### Key Technologies
- **Next.js 15** with App Router (`app/` directory structure)
- **React 19** with TypeScript strict mode
- **Tailwind CSS 4** for styling
- **next-intl** for internationalization (id/en)
- **Drizzle ORM** with SQLite for database
- **TanStack Table** for advanced data tables
- **Zod** for validation

## Common Development Commands

```bash
# Development
pnpm dev              # Start development server (port 3000)
pnpm build            # Build for production (uses Turbopack)
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm format           # Format code with Prettier
pnpm type-check       # Run TypeScript type checking
pnpm knip             # Detect unused files and dependencies

# Database
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Run database migrations
pnpm db:push          # Push schema changes to database
pnpm db:studio        # Open Drizzle Studio
pnpm db:seed          # Seed database with initial data

# Component Development
pnpm storybook        # Start Storybook (port 6006)
pnpm build-storybook  # Build Storybook

# Commits
pnpm commit           # Interactive commit with Commitizen (conventional commits)
```

## Architecture

### Directory Structure

```
app/                          # Next.js App Router
├── (government)/             # Government services landing page group
├── (backoffice)/             # Backoffice/dashboard group
├── (support)/                # Support pages group
├── api/                      # API routes
├── demo/                     # Demo pages (e.g., advanced data table)
├── layanan/                  # Service pages
├── informasi-publik/         # Public information pages
├── layout.tsx                # Root layout
└── page.tsx                  # Home page

components/
├── ui/                       # Shadcn UI components (46 components)
├── landing/                  # Landing page specific components
├── dashboard/                # Dashboard specific components
├── shared/                   # Shared utility components
└── providers/                # React context providers

lib/                          # Utility functions and data
├── services-data.ts          # Service catalog data access
├── news-data.ts              # News data access
├── events-data.ts            # Events data access
├── logger.ts                 # LogTape logging utility
└── utils.ts                  # General utilities

data/                         # Static JSON data files
├── services/
│   ├── categories.json       # Service categories metadata
│   ├── population.json       # Population services
│   ├── health.json           # Health services
│   └── ...                   # Other service categories
├── news/                     # News articles
└── events/                   # Events data

db/                           # Database configuration
├── schema.ts                 # Drizzle database schema
├── migrations/               # Database migrations
├── migrate.ts                # Migration runner
└── seed.ts                   # Database seeder

messages/                     # i18n translation files
├── id.json                   # Indonesian (default locale)
└── en.json                   # English

src/
├── env.ts                    # T3 Env environment variable schema
└── i18n/
    ├── config.ts             # Locale configuration (id, en)
    └── request.ts            # next-intl request configuration
```

### Component Organization

Components are organized by purpose:
- **ui/**: Shadcn UI base components (button, dialog, table, etc.)
- **landing/**: Public-facing page components (hero, features, etc.)
- **dashboard/**: Admin/internal dashboard components
- **shared/**: Components used across multiple contexts

### Service Catalog Architecture

The service catalog system is the core feature:

1. **Data Storage**: Services are stored as JSON files in `data/services/`
   - `categories.json`: Category metadata with `showInMenu` flag
   - `{categoryId}.json`: Services for each category

2. **Service Visibility**: Two-level visibility control
   - `category.showInMenu`: Controls category visibility in mega menu
   - `service.showInMenu`: Controls individual service visibility

3. **Integration Status**: Services have `isIntegrated` flag
   - `true`: Fully integrated/available
   - `false`: Coming soon/not yet integrated

4. **Data Access Layer** (`lib/services-data.ts`):
   - `getServiceCategories()`: All categories
   - `getVisibleServiceCategories()`: Categories with `showInMenu: true`
   - `getVisibleServicesGroupedByCategory()`: For mega menu rendering
   - `getAllServices()`: All services with category info
   - `getServiceBySlug(slug)`: Single service by slug
   - `getIntegratedServices()`: Filter by `isIntegrated: true`

### Internationalization

- **Default locale**: Indonesian (`id`)
- **Supported locales**: `id`, `en`
- **Translation files**: `messages/{locale}.json`
- **Usage in components**:
  ```tsx
  import { useTranslations } from "next-intl";
  const t = useTranslations("ComponentName");
  return <h1>{t("title")}</h1>;
  ```
- **Locale config**: `src/i18n/config.ts`
- **Request config**: `src/i18n/request.ts`

### Advanced Data Table

Located at `app/demo/table/`, this is a feature-rich TanStack Table implementation:

- **Features**: Faceted filters, multi-column sort, density control, bulk actions, export
- **Components**: `DataTable`, `DataTableToolbar`, `DataTableFacetedFilter`, `DataTableColumnHeader`
- **Usage**: Import `<DataTable columns={columns} data={data} />` and define your own column schema

### Environment Variables

Defined in `src/env.ts` using T3 Env + Zod:

**Server-side**:
- `NODE_ENV`: development/test/production

**Client-side** (prefixed with `NEXT_PUBLIC_`):
- `NEXT_PUBLIC_APP_URL`: Application URL (default: http://localhost:3000)
- `NEXT_PUBLIC_APP_NAME`: Application name

Add new variables to the schema in `src/env.ts` before using them.

### Routing Structure

The app uses Next.js 15 route groups with parentheses for logical organization without affecting URL structure:

- `(government)/*`: Public government services pages
- `(backoffice)/*`: Dashboard and admin pages
- `(support)/*`: Support and informational pages

Route groups share layouts and can have different layouts per group.

### Git Hooks

Uses **Lefthook** (configured in `lefthook.yml`):
- **pre-commit**: Runs lint-staged (ESLint + Prettier on staged files)
- **commit-msg**: Validates commit format with Commitlint

Always use `pnpm commit` instead of `git commit` to ensure conventional commits compliance.

### UI Components

The project uses **Shadcn UI** (46 components installed). Components are in `components/ui/`. These are copied (not installed as packages), so you can modify them directly.

Common components include: button, dialog, dropdown-menu, table, select, checkbox, etc.

### State Management

- **Server State**: Server actions and direct database queries via Drizzle
- **Client State**: React hooks (useState, useReducer) - no global state library currently
- **URL State**: Uses `nuqs` for URL-based state management in filters/tables

### Logging

Structured logging with **LogTape** (configured in `lib/logger.ts`):
```tsx
import { getLogger } from "lib/logger";
const logger = getLogger(["app", "feature"]);
logger.info("Message", { metadata });
```

## Development Notes

1. **TypeScript strict mode** is enabled - all code must be fully typed
2. **Absolute imports** use `@/` prefix (configured in `tsconfig.json`)
3. **ESLint is disabled during builds** (`eslint.ignoreDuringBuilds: true` in `next.config.ts`)
4. **Service catalog changes** require updating both JSON files and potentially type definitions
5. **Internationalization** - always add translations for both `id` and `en` locales when adding user-facing text
6. **Component modifications** - Shadcn components can be directly edited in `components/ui/`
7. **Database migrations** - Use `pnpm db:generate` after schema changes, then `pnpm db:migrate`

## Testing

- **Vitest** for unit testing (configured but no tests written yet)
- **Playwright** for E2E testing (configured but no tests written yet)
- **Storybook** for component testing and visual documentation