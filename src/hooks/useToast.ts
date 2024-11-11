import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: number) => void;
}

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => 
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Date.now() }]
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}));

export function useToast() {
  const { addToast, removeToast } = useToastStore();

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now();
    addToast({ type, message, id });
    setTimeout(() => removeToast(id), 3000);
  };

  return { showToast };
}