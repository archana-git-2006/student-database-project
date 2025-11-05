export enum Role {
  NONE = 'none',
  STUDENT = 'student',
  STAFF = 'staff',
  VISITOR = 'visitor',
}

export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

export interface StudentEntry {
  name: string;
  id: string;
  roomNumber: string;
  timestamp: string;
}

export interface StaffEntry {
  name: string;
  id: string;
  department: string;
  timestamp: string;
}

export interface VisitorEntry {
  id: number;
  name: string;
  visiting: string;
  timeIn: string;
}
