import { create } from 'zustand';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit,
  writeBatch,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { DailyLog } from '../types';

interface LogsState {
  logs: DailyLog[];
  isLoading: boolean;
  error: string | null;
  fetchLogs: (userId: string) => Promise<void>;
  addLog: (userId: string, log: Partial<DailyLog>) => Promise<void>;
  updateLog: (userId: string, logId: string, updates: Partial<DailyLog>) => Promise<void>;
  deleteLog: (userId: string, logId: string) => Promise<void>;
  bulkDeleteLogs: (userId: string, logIds: string[]) => Promise<void>;
}

export const useLogsStore = create<LogsState>((set, get) => ({
  logs: [],
  isLoading: false,
  error: null,

  fetchLogs: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const logsRef = collection(db, `users/${userId}/logs`);
      const q = query(logsRef, orderBy('date', 'desc'), limit(100));
      const querySnapshot = await getDocs(q);
      
      const logs = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          date: data.date,
          weight: typeof data.weight === 'number' ? Number(data.weight) : undefined,
          calories: typeof data.calories === 'number' ? Number(data.calories) : undefined,
          steps: typeof data.steps === 'number' ? Number(data.steps) : undefined,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as DailyLog;
      });

      set({ logs, error: null });
    } catch (error) {
      console.error('Error fetching logs:', error);
      set({ error: 'Failed to fetch logs. Please try again.' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addLog: async (userId: string, logData: Partial<DailyLog>) => {
    try {
      set({ isLoading: true, error: null });
      const logsRef = collection(db, `users/${userId}/logs`);
      
      // Validate the data before saving
      const validatedData = {
        ...logData,
        date: logData.date || new Date().toISOString(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        weight: typeof logData.weight === 'number' ? Number(logData.weight) : null,
        calories: typeof logData.calories === 'number' ? Number(logData.calories) : null,
        steps: typeof logData.steps === 'number' ? Number(logData.steps) : null
      };

      await addDoc(logsRef, validatedData);
      
      // Refresh logs
      await get().fetchLogs(userId);
    } catch (error) {
      console.error('Error adding log:', error);
      set({ error: 'Failed to add log. Please try again.' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateLog: async (userId: string, logId: string, updates: Partial<DailyLog>) => {
    try {
      set({ isLoading: true, error: null });
      const logRef = doc(db, `users/${userId}/logs`, logId);

      // Validate and clean the update data
      const validatedUpdates = {
        ...updates,
        updatedAt: Timestamp.now(),
        weight: typeof updates.weight === 'number' ? Number(updates.weight) : null,
        calories: typeof updates.calories === 'number' ? Number(updates.calories) : null,
        steps: typeof updates.steps === 'number' ? Number(updates.steps) : null
      };

      await updateDoc(logRef, validatedUpdates);

      // Update local state
      set(state => ({
        logs: state.logs.map(log => 
          log.id === logId 
            ? { ...log, ...updates, updatedAt: new Date() }
            : log
        )
      }));
    } catch (error) {
      console.error('Error updating log:', error);
      set({ error: 'Failed to update log. Please try again.' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteLog: async (userId: string, logId: string) => {
    try {
      set({ isLoading: true, error: null });
      const logRef = doc(db, `users/${userId}/logs`, logId);
      await deleteDoc(logRef);

      // Update local state
      set(state => ({
        logs: state.logs.filter(log => log.id !== logId)
      }));
    } catch (error) {
      console.error('Error deleting log:', error);
      set({ error: 'Failed to delete log. Please try again.' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  bulkDeleteLogs: async (userId: string, logIds: string[]) => {
    try {
      set({ isLoading: true, error: null });
      const batch = writeBatch(db);

      logIds.forEach(logId => {
        const logRef = doc(db, `users/${userId}/logs`, logId);
        batch.delete(logRef);
      });

      await batch.commit();

      // Update local state
      set(state => ({
        logs: state.logs.filter(log => !logIds.includes(log.id))
      }));
    } catch (error) {
      console.error('Error bulk deleting logs:', error);
      set({ error: 'Failed to delete selected logs. Please try again.' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));