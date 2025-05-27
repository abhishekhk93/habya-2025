export interface User {
    _id?: string; // MongoDB automatically generates this _id field
    phone: string;
    name: string;
    gender: string;
    dob: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  