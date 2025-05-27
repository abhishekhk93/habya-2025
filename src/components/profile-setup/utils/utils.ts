// src/app/profile-setup/utils/utils.ts
export function validateName(name: string): string {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 3) return "Name must be at least 3 characters";
    return "";
  }
  
  export function validateGender(gender: string): string {
    if (!gender) return "Please select your gender";
    return "";
  }
  
  export function validateDob(dob: Date | null): string {
    if (!dob) return "Date of birth is required";
    const today = new Date();
    if (dob > today) return "Date of birth cannot be in the future";
    const ageDiff = today.getTime() - dob.getTime();
    const age = new Date(ageDiff).getUTCFullYear() - 1970;
    if (age < 8) return "You must be 8+ years old";
    return "";
  }
  