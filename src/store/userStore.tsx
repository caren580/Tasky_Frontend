import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  isDeleted?: boolean;
}

interface UserState {
  user: User | null;
  login:  (u: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login:  (u) => set({ user: u }),
      logout: () => set({ user: null }),
    }),
    {
      name: "tasky_user", 
    }
  )
);