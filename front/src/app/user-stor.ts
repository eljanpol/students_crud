import { create } from "zustand";

type UserStoretype = {
    user: {name: string} | null

    setUser: (user: {name: string}) => void
    remove: () => void
}

export const useUserStore = create<UserStoretype>((set) => ({
    user: null,
    setUser: (user) => {set({user})},
    remove: () => {set({user: null})}
}))