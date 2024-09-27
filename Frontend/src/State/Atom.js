import { atom, DefaultValue } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

const EXPIRATION_TIME = 60 * 60 * 1000;

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    
    if (savedValue != null) {
      const { value, expiration } = JSON.parse(savedValue);
      
      if (Date.now() < expiration) {
        setSelf(value);
      } else {
        localStorage.removeItem(key);
        setSelf(new DefaultValue());
      }
    } else {
      setSelf(new DefaultValue());
    }
  
    // Subscribe to changes in atom and store new values in localStorage
    onSet((newValue, _, isReset) => {
      if (isReset || newValue instanceof DefaultValue) {
        // If the atom is reset, remove the corresponding key from localStorage
        localStorage.removeItem(key);
      } else {
        const expiration = Date.now() + EXPIRATION_TIME;
        localStorage.setItem(key, JSON.stringify({ value: newValue, expiration }));
      }
    });
};

export const authState = atom({
    key: "auth",
    default: {
        token: localStorage.getItem("token") || null,
        isAuthenticated: false,
        user: null,
    },
    effects_UNSTABLE: [localStorageEffect("auth")]
})