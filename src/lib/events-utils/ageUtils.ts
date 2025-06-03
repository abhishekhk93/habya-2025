export function parseEnvDate(key: string): Date {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return new Date(value);
  }
  
  export const TOURNAMENT_DAY1 = new Date(
    process.env.NEXT_PUBLIC_TOURNAMENT_DAY1!
  );
  
  export const TOURNAMENT_DAY2 = new Date(
    process.env.NEXT_PUBLIC_TOURNAMENT_DAY2!
  );
  
  
  /**
   * Returns age in years on a specific date.
   */
  export function calculateAgeOn(dateOfBirth: Date, onDate: Date): number {
    const dob = new Date(dateOfBirth);
    let age = onDate.getFullYear() - dob.getFullYear();
    const birthdayPassed =
      onDate.getMonth() > dob.getMonth() ||
      (onDate.getMonth() === dob.getMonth() && onDate.getDate() >= dob.getDate());
    return birthdayPassed ? age : age - 1;
  }
  
  export function isAgedBelow16(dob: Date): boolean {
    const age = calculateAgeOn(dob, TOURNAMENT_DAY2);
    console.log(`Age on ${TOURNAMENT_DAY2.toDateString()}: ${age}`);
    return age < 16;
  }
  
  export function isAgedAtLeast(dob: Date, minAge: number): boolean {
    const age = calculateAgeOn(dob, TOURNAMENT_DAY1);
    console.log(`Age on ${TOURNAMENT_DAY1.toDateString()}: ${age}`);
    return age >= minAge;
  }
  
  // Aliases for 35+, 50+, 60+
  export function isAgedAbove35(dob: Date): boolean {
    return isAgedAtLeast(dob, 35);
  }
  
  export function isAgedAbove50(dob: Date): boolean {
    return isAgedAtLeast(dob, 50);
  }
  
  export function isAgedAbove60(dob: Date): boolean {
    return isAgedAtLeast(dob, 60);
  }
  