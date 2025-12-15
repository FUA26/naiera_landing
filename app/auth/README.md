# Authentication Pages

This directory contains authentication-related pages for the application.

## Pages

### Login (`/auth/login`)

A modern login page with the following features:

- **Email/Password Authentication**
  - Email input with validation
  - Password input with show/hide toggle
  - Remember me checkbox
  - Forgot password link

- **Social Login**
  - Google OAuth integration (placeholder)
  - GitHub OAuth integration (placeholder)

- **UI/UX Features**
  - Loading states during form submission
  - Responsive design (mobile-first)
  - Accessible form controls
  - Icon indicators for input fields
  - Smooth animations and transitions

### Register (`/auth/register`)

A comprehensive registration page with:

- **Form Fields**
  - Full name input
  - Email input with validation
  - Password input with show/hide toggle
  - Confirm password with validation

- **Password Strength Indicator**
  - Real-time password strength analysis
  - Visual progress bar (color-coded)
  - Requirements checklist:
    - Minimum 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    - At least one special character

- **Social Registration**
  - Google OAuth integration (placeholder)
  - GitHub OAuth integration (placeholder)

- **Terms and Conditions**
  - Checkbox for accepting terms
  - Links to Terms of Service and Privacy Policy

- **UI/UX Features**
  - Real-time password validation
  - Password match validation
  - Loading states
  - Responsive design
  - Accessible form controls

### Forgot Password (`/auth/forgot-password`)

A password recovery page with:

- **Email Submission**
  - Email input with validation
  - Clear instructions for users

- **Success State**
  - Confirmation message after submission
  - Email address display
  - Helpful troubleshooting tips
  - Option to try another email

- **UI/UX Features**
  - Two-state UI (form → success)
  - Back to login link
  - Loading states
  - Responsive design
  - Support link

### Reset Password (`/auth/reset-password`)

A secure password reset page with:

- **Token Validation**
  - URL parameter token check
  - Invalid token handling
  - Expired link messaging

- **Password Reset Form**
  - New password input with show/hide toggle
  - Confirm password with validation
  - Password strength indicator (same as register)

- **Success State**
  - Confirmation message
  - Redirect to login option

- **UI/UX Features**
  - Real-time password validation
  - Password match validation
  - Loading states
  - Responsive design
  - Clear error messaging

## Components Used

- `Button` - Primary action buttons
- `Input` - Form input fields
- `Label` - Form labels
- `Card` - Container components
- Icons from `lucide-react`:
  - `Mail` - Email field indicator
  - `Lock` - Password field indicator
  - `User` - Name field indicator
  - `Eye/EyeOff` - Password visibility toggle
  - `CheckCircle2` - Password requirements indicator

## Styling

- Uses Tailwind CSS for styling
- Gradient background for visual appeal
- Card-based layout with shadows
- Consistent spacing and typography
- Dark mode support through CSS variables

## Future Enhancements

- [ ] Integrate with actual authentication backend (NextAuth.js, Supabase, etc.)
- [ ] Add email verification flow
- [ ] Implement forgot password functionality
- [ ] Add two-factor authentication (2FA)
- [ ] Implement rate limiting
- [ ] Add CAPTCHA for bot protection
- [ ] Add session management
- [ ] Implement OAuth providers (Google, GitHub)
- [ ] Add error handling and toast notifications
- [ ] Add form validation with Zod
- [ ] Integrate with React Hook Form

## Usage

Navigate to the pages:

- Login: `http://localhost:3000/auth/login`
- Register: `http://localhost:3000/auth/register`
- Forgot Password: `http://localhost:3000/auth/forgot-password`
- Reset Password: `http://localhost:3000/auth/reset-password?token=YOUR_TOKEN`

## Password Reset Flow

1. User clicks "Forgot password?" on login page
2. Redirects to `/auth/forgot-password`
3. User enters email and submits
4. Success message displayed with instructions
5. User receives email with reset link (simulated)
6. Link contains token: `/auth/reset-password?token=abc123`
7. User enters new password
8. Success message with redirect to login

## Notes

- Currently, form submissions are simulated with setTimeout
- Social login buttons are placeholders and need OAuth configuration
- Password validation is client-side only; server-side validation is required
- No actual authentication is performed yet
