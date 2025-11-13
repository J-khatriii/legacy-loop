import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  savedPosts: [],
  likedPosts: [],
  connections: [],

  setUser: (user) => set({ user }),
  savePost: (post) =>
    set((state) => ({
      savedPosts: [...state.savedPosts, post],
    })),
  likePost: (post) =>
    set((state) => ({
      likedPosts: [...state.likedPosts, post],
    })),
  addConnection: (person) =>
    set((state) => ({
      connections: [...state.connections, person],
    })),
}));
