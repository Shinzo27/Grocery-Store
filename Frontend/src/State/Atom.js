import { atom } from 'recoil' 
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const authState = atom({
    key: "auth",
    default: {
        token: localStorage.getItem("token") || null,
        isAuthenticated: false,
        user: null,
    },
    effects_UNSTABLE: [persistAtom]
})