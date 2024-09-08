import { atom } from 'recoil' 

export const auth = atom({
    key: "auth",
    default: {
        token: localStorage.getItem("token") || null,
        isAuthenticated: false,
        user: null,
    },
})