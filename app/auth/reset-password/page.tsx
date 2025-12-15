"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Password reset with token:", token);
    setIsSuccess(true);
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password strength
    if (name === "password") {
      setPasswordStrength({
        hasMinLength: value.length >= 8,
        hasUpperCase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const getPasswordStrengthColor = () => {
    const count = Object.values(passwordStrength).filter(Boolean).length;
    if (count <= 2) return "bg-red-500";
    if (count <= 3) return "bg-yellow-500";
    if (count <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    const count = Object.values(passwordStrength).filter(Boolean).length;
    if (count <= 2) return "Weak";
    if (count <= 3) return "Fair";
    if (count <= 4) return "Good";
    return "Strong";
  };

  // Check if token exists
  if (!token) {
    return (
      <div className="from-background via-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
        <Card className="border-border/50 w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/auth/forgot-password">Request New Link</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="from-background via-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-lg">
          {!isSuccess ? (
            <>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <CardDescription>
                  Enter your new password below. Make sure it&apos;s strong and
                  secure.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="pr-10 pl-10"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
                            <div
                              className={`h-full transition-all ${getPasswordStrengthColor()}`}
                              style={{
                                width: `${(Object.values(passwordStrength).filter(Boolean).length / 5) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium">
                            {getPasswordStrengthText()}
                          </span>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div
                            className={`flex items-center gap-1 ${passwordStrength.hasMinLength ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            At least 8 characters
                          </div>
                          <div
                            className={`flex items-center gap-1 ${passwordStrength.hasUpperCase ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            One uppercase letter
                          </div>
                          <div
                            className={`flex items-center gap-1 ${passwordStrength.hasLowerCase ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            One lowercase letter
                          </div>
                          <div
                            className={`flex items-center gap-1 ${passwordStrength.hasNumber ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            One number
                          </div>
                          <div
                            className={`flex items-center gap-1 ${passwordStrength.hasSpecialChar ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            One special character
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pr-10 pl-10"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500">
                          Passwords do not match
                        </p>
                      )}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Resetting password...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
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
                  Password Reset Successful
                </CardTitle>
                <CardDescription className="text-center">
                  Your password has been successfully reset. You can now sign in
                  with your new password.
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>

        {/* Back to Login */}
        {!isSuccess && (
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="from-background via-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
          <Card className="border-border/50 w-full max-w-md shadow-lg">
            <CardContent className="flex items-center justify-center p-12">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
            </CardContent>
          </Card>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
