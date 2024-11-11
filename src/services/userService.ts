import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  startingWeight: number;
  targetWeight: number;
  activityLevel: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userService = {
  async createProfile(userId: string, profileData: Omit<UserProfile, 'createdAt' | 'updatedAt'>) {
    const userRef = doc(db, 'users', userId);
    const now = new Date();
    
    const profile: UserProfile = {
      ...profileData,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(userRef, profile);
    return profile;
  },

  async getProfile(userId: string) {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    
    return null;
  },

  async updateProfile(userId: string, profileData: Partial<UserProfile>) {
    const userRef = doc(db, 'users', userId);
    const now = new Date();
    
    await setDoc(userRef, {
      ...profileData,
      updatedAt: now,
    }, { merge: true });
  }
};