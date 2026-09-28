// import { Validators  } from "@angular/forms";
import {
  // FieldPath,
  email,
  required,

  minLength,
  pattern,
  validate,
  maxLength,
} from '@angular/forms/signals';

import { computed, Signal } from '@angular/core';

export function passwordSchema(password:any , confirmPassword:any){
  // password
  required(password, { message: 'Password is required' });
  minLength(password, 8, { message: 'Password must be at least 8 characters' });
  maxLength(password, 64, { message: 'Password must be at 8 -64 characters' });

  pattern(password, /[A-Z]/, { message: 'Password must contain an uppercase letter' });
  pattern(password, /[a-z]/, { message: 'Password must contain a lowercase letter' });
  pattern(password, /[0-9]/, { message: 'Password must contain a number' });

  pattern(password, /[^A-Za-z0-9]/, { message: 'Password must contain a special character' });

  // Confirm Password
  required(confirmPassword, { message: 'Please confirm your password' });
  validate(confirmPassword, ({ value, valueOf }) => {
    const pass = valueOf(password);
    const confirm = value();
    if (!confirm || pass=== confirm) {
      return null;
    }
    return {
      kind: 'passwordMismatch',
      message: 'Passwords do not match',
    };
  });
}

// password===resetModel.password
export function createPasswordValidation(password: Signal<string>) {
  const hasMinLength = computed(() => password().length >= 8);
  const hasOneSpecialChar = computed(() => /[!@#$%^&*]/.test(password()));

  // mix (upper lower digit)
  const hasMixedCase = computed(() => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S*$/.test(password()));
  const hasLowercase = computed(() => /[a-z]/.test(password()));
  const hasUppercase = computed(() => /[A-Z]/.test(password()));
  const hasDigit = computed(() => /[0-9]/.test(password()));
  const hasValidLength = computed(() => {
    return password().length >= 8 && length <= 64;
  });

  const passwordValid = computed(() => hasOneSpecialChar() && hasMixedCase() && hasValidLength());

  const passwordCheckedStatsG5 = computed(() => [
    {  label: '8 - 64 characters', inCase: hasValidLength(), },
    { label: 'Uppercase letter',  inCase: hasUppercase(),},
    { label: 'Lowercase letter', inCase: hasLowercase(),  },
    { label: 'At least one digit', inCase: hasDigit(), },
    { label: 'Special character (e.g. !@#$)', inCase: hasOneSpecialChar() },
  ]);
   const passwordCheckedStatsG3= computed(() => [
    { label: 'At least 8 characters', inCase: hasMinLength() },
    { label: 'One uppercase, lowercase, and digit', inCase: hasMixedCase() },
    { label: 'One special character', inCase: hasOneSpecialChar() },
  ]);

  return {
    passwordCheckedStatsG3,
    hasValidLength,

    hasLowercase,
    hasUppercase,
    hasDigit,

    hasMinLength,
    hasMixedCase,
    hasOneSpecialChar,
    passwordValid,

    passwordCheckedStatsG5,
  };
}

// --------------------

export function emailValidation(field: any) {
  required(field, {  message: 'Email is required', });
  email(field, {  message: 'Enter a valid email address', });
}
