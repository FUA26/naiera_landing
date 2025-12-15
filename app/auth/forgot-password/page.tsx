"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="from-background via-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md">
        {/* Back to Login Link */}
        <Link
          href="/auth/login"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <Card className="border-border/50 shadow-lg">
          {!isSubmitted ? (
            <>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Forgot Password?</CardTitle>
                <CardDescription>
                  No worries! Enter your email address and we&apos;ll send you a
                  link to reset your password.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending reset link...
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>

                  <div className="text-muted-foreground text-center text-sm">
                    Remember your password?{" "}
                    <Link
                      href="/auth/login"
                      className="text-primary font-medium hover:underline"
                    >
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="space-y-1">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-center text-2xl">
                  Check Your Email
                </CardTitle>
                <CardDescription className="text-center">
                  We&apos;ve sent a password reset link to
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-center font-medium">{email}</p>
                <p className="text-muted-foreground text-center text-sm">
                  Click the link in the email to reset your password. If you
                  don&apos;t see it, check your spam folder.
                </p>

                <div className="border-border bg-muted/50 rounded-lg border p-4">
                  <p className="text-muted-foreground text-sm">
                    <strong>Didn&apos;t receive the email?</strong>
                  </p>
                  <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• Wait a few minutes and check again</li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                >
                  Try Another Email
                </Button>

                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/auth/login">Back to Login</Link>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>

        {/* Help Text */}
        {!isSubmitted && (
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Need help?{" "}
            <Link href="/support" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
