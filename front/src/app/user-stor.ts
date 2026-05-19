import { create } from "zustand";

type UserStoretype = {
    user: {id:string, name:string, role:string} | null

    setUser: (user: {id:string, name:string, role:string}) => void
    remove: () => void
}

export const useUserStore = create<UserStoretype>((set) => ({
    user: null,
    setUser: (user) => {set({user})},
    remove: () => {set({user: null})}
}))