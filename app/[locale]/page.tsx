import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Banner } from "@/components/banner";
import { Header } from "@/components/header";
import {
  Code2,
  Palette,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  GitBranch,
  TestTube2,
  FileCode2,
  Sparkles,
  User,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "TypeScript First",
    description:
      "Strict type checking with TypeScript 5 for robust, maintainable code.",
  },
  {
    icon: Zap,
    title: "Next.js 15 App Router",
    description:
      "Latest Next.js with Server Components and streaming for optimal performance.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS 4",
    description:
      "Utility-first CSS with custom theme and dark mode support out of the box.",
  },
  {
    icon: Shield,
    title: "Type-Safe Environment",
    description:
      "Runtime validation with T3 Env and Zod for bulletproof configs.",
  },
  {
    icon: User,
    title: "Authentication Pages",
    description:
      "Ready-to-use login and register pages with password strength indicator and social login.",
  },
  {
    icon: Globe,
    title: "Internationalization",
    description:
      "Built-in i18n with next-intl and Crowdin integration for global reach.",
  },
  {
    icon: GitBranch,
    title: "Git Workflow",
    description:
      "Lefthook, Commitlint, and Commitizen for standardized commits and hooks.",
  },
  {
    icon: TestTube2,
    title: "Storybook Integration",
    description:
      "Isolated component development with comprehensive testing and documentation.",
  },
  {
    icon: FileCode2,
    title: "Code Quality",
    description:
      "ESLint, Prettier, and Knip configured for clean, optimized codebases.",
  },
  {
    icon: CheckCircle2,
    title: "Form Handling",
    description:
      "React Hook Form with Zod validation for type-safe, performant forms.",
  },
  {
    icon: Sparkles,
    title: "Developer Experience",
    description:
      "VSCode configs, auto-formatting, and hot reload for seamless development.",
  },
];

export default function HomePage() {
  return (
    <>
      <Banner />
      <Header />
      <div className="bg-background relative min-h-screen overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Gradient Orbs */}
        <div className="from-primary/20 via-primary/5 absolute top-0 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br to-transparent blur-3xl" />
        <div className="from-accent/20 via-accent/5 absolute top-1/3 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-br to-transparent blur-3xl" />

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          {/* Hero Section */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="border-border bg-muted/50 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
              <Sparkles className="text-primary h-4 w-4" />
              <span className="text-muted-foreground">Version 0.3.0</span>
            </div>

            <h1 className="from-foreground to-foreground/60 bg-gradient-to-br bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
              Next.js Boilerplate
            </h1>

            <p className="text-muted-foreground mt-6 text-lg leading-8 sm:text-xl">
              A production-ready, enterprise-grade Next.js starter with
              TypeScript, Tailwind CSS, and comprehensive developer tooling.
              Ship faster with confidence.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/auth/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link
                  href="https://github.com/yourusername/boilerplate"
                  target="_blank"
                >
                  View on GitHub
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Authentication Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Type-Safe Environment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Dark Mode Support</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mx-auto mt-32 max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to build fast
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Carefully crafted with best practices and modern tooling
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group border-border bg-card hover:border-primary/50 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-lg"
                >
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>

                  {/* Hover Gradient */}
                  <div className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mx-auto mt-32 max-w-3xl text-center">
            <div className="border-border bg-card rounded-3xl border p-12 shadow-xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to build?
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Clone the repository and start building your next project with
                confidence.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/docs">Read Documentation</Link>
                </Button>
                <Button size="lg" variant="ghost" asChild>
                  <Link href="/storybook">View Components</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-border relative mt-32 border-t">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <p className="text-muted-foreground text-center text-sm">
              Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
