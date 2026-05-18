export interface IUser {
  name: string;
  email: string;
  password: string;
  is_active?: boolean;
  role: "admin" | "modarator" | "user";
  age: number;
}
