export interface IUserProfile {
  user_id: number;
  bio: string;
  address: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other'; 
}