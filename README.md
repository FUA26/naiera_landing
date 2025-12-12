# Ultimate Next.js Boilerplate

A production-ready, feature-rich Next.js boilerplate with TypeScript, Tailwind CSS, internationalization, and comprehensive developer tooling.

## ✨ Features

### Core Stack

- ⚡ **Next.js 15** with App Router support
- 🔥 **TypeScript** with strict type checking
- 💎 **Tailwind CSS 4** for styling
- ⚛️ **React 19** with Strict Mode enabled

### Type Safety & Validation

- 🛡️ **T3 Env** - Type-safe environment variables
- ✅ **Zod** - Runtime validation library
- ⌨️ **React Hook Form** - Performant form handling with Zod integration

### Internationalization

- 🌐 **next-intl** - Multi-language support
- 🌍 **Crowdin** - Translation management integration
- 🔍 **i18n-check** - Validation and missing translation detection

### Developer Experience

- 📏 **ESLint** - Comprehensive linting (Next.js, Core Web Vitals, Tailwind CSS, Antfu config)
- 💖 **Prettier** - Consistent code formatting
- 🦊 **Lefthook** - Fast Git hooks (replaces Husky)
- 🚫 **Lint-staged** - Run linters on staged files only
- 🚓 **Commitlint** - Enforce conventional commits
- 📓 **Commitizen** - Interactive commit message helper
- 🔍 **Knip** - Detect unused files and dependencies

### UI Development

- 🎉 **Storybook** - Isolated component development and documentation

### Logging & Monitoring

- 📝 **LogTape** - Structured logging
- 📊 **Better Stack** - Log management integration

### SEO & Performance

- 🤖 **SEO Metadata** - JSON-LD and Open Graph tags
- 🗺️ **Sitemap & Robots.txt** - Automatic generation
- ⚡ **Core Web Vitals** - Optimized for performance

### Configuration

- 💡 **Absolute Imports** - Using `@/` prefix
- 🗂 **VSCode Setup** - Debug, settings, tasks, and recommended extensions
- 👷 **Dependabot** - Automatic dependency updates

## 📁 Project Structure

```
.
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
├── lib/                    # Utility functions and shared logic
├── messages/               # i18n translation files
│   └── en.json            # English translations
├── public/                 # Static assets
├── src/
│   ├── env.ts             # Type-safe environment variables
│   └── i18n.ts            # i18n configuration
├── .vscode/               # VSCode workspace settings
├── docs/                  # Documentation
│   └── PRD.md            # Product Requirements Document
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
├── lefthook.yml           # Git hooks configuration
├── commitlint.config.js   # Commit message linting
├── knip.json              # Unused code detection config
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd ascodenote_boilerplate
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and fill in your environment variables.

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `pnpm dev`        | Start development server with Turbopack |
| `pnpm build`      | Build production bundle                 |
| `pnpm start`      | Start production server                 |
| `pnpm lint`       | Run ESLint                              |
| `pnpm format`     | Format code with Prettier               |
| `pnpm type-check` | Run TypeScript type checking            |
| `pnpm commit`     | Interactive commit with Commitizen      |
| `pnpm storybook`  | Start Storybook UI development          |
| `pnpm knip`       | Detect unused files and dependencies    |

## 🌐 Internationalization

This boilerplate uses `next-intl` for internationalization.

### Adding a new language

1. Create a new translation file in `messages/`:

   ```bash
   messages/
   ├── en.json
   └── id.json  # Indonesian
   ```

2. Update `src/i18n.ts` to include the new locale.

3. Add translations to your JSON file:
   ```json
   {
     "HomePage": {
       "title": "Selamat Datang",
       "description": "Ini adalah boilerplate Next.js"
     }
   }
   ```

### Using translations in components

```tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return <h1>{t("title")}</h1>;
}
```

## 🔒 Environment Variables

Environment variables are validated using T3 Env and Zod. Define your schema in `src/env.ts`:

```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
```

## 📋 Form Handling

Forms are built with React Hook Form and validated with Zod:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input {...register("password")} type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

## 🎨 UI Development with Storybook

Start Storybook for isolated component development:

```bash
pnpm storybook
```

Create stories for your components:

```tsx
// components/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Click me",
    variant: "primary",
  },
};
```

## 🪝 Git Hooks

This project uses Lefthook for Git hooks:

- **pre-commit**: Runs linting and formatting on staged files
- **commit-msg**: Validates commit messages with Commitlint

### Making commits

Use Commitizen for guided commit messages:

```bash
pnpm commit
```

This ensures your commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## 🔍 Code Quality

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm type-check
```

### Unused Code Detection

```bash
pnpm knip
```

## 📊 Logging

LogTape is configured for structured logging:

```typescript
import { getLogger } from "logtape";

const logger = getLogger(["app", "user"]);

logger.info("User logged in", { userId: "123" });
logger.error("Failed to fetch data", { error });
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Other Platforms

Build the production bundle:

```bash
pnpm build
pnpm start
```

## 📚 Documentation

- [Product Requirements Document](./docs/PRD.md) - Detailed feature specifications
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`pnpm commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with best practices from:

- [T3 Stack](https://create.t3.gg/)
- [Next.js Best Practices](https://nextjs.org/docs)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

---

**Happy coding! 🎉**
