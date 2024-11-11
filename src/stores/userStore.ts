import { create } from 'zustand';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProfile } from '../types';

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  addProfile: (userId: string, profile: UserProfile) => Promise<void>;
  updateProfile: (userId: string, profile: Partial<UserProfile>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const profileData = docSnap.data() as UserProfile;
        // Convert Firestore Timestamps to Dates
        profileData.createdAt = (profileData.createdAt as any).toDate();
        profileData.updatedAt = (profileData.updatedAt as any).toDate();
        set({ profile: profileData });
      } else {
        set({ profile: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addProfile: async (userId: string, profile: UserProfile) => {
    try {
      set({ isLoading: true, error: null });
      const docRef = doc(db, 'users', userId);
      await setDoc(docRef, {
        ...profile,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      set({ profile });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (userId: string, profileUpdates: Partial<UserProfile>) => {
    try {
      set({ isLoading: true, error: null });
      const docRef = doc(db, 'users', userId);
      await setDoc(docRef, {
        ...profileUpdates,
        updatedAt: new Date()
      }, { merge: true });
      
      // Update local state
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...profileUpdates } : null
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));