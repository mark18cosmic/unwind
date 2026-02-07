import {
    createContext,
    useEffect,
    useState,
    ReactNode
  } from "react"
  
  import { onAuthStateChanged, User } from "firebase/auth"
  import { doc, getDoc } from "firebase/firestore"
  
  import { auth, db } from "../services/firebase"
  import { AppUser } from "../types/user"
  
  interface AuthContextType {
    user: AppUser | null
    loading: boolean
  }
  
  export const AuthContext =
    createContext<AuthContextType>({
      user: null,
      loading: true
    })
  
  export function AuthProvider({
    children
  }: { children: ReactNode }) {
  
    const [user, setUser] =
      useState<AppUser | null>(null)
  
    const [loading, setLoading] =
      useState(true)
  
    useEffect(() => {
  
      const unsub = onAuthStateChanged(
        auth,
        async (firebaseUser: User | null) => {
  
          if(firebaseUser){
  
            const snap = await getDoc(
              doc(db,"users",firebaseUser.uid)
            )
  
            const role = snap.data()?.role
  
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              username: firebaseUser.displayName || "",
              role,
              photoURL: firebaseUser.photoURL || ""
            } as AppUser)
  
          } else {
            setUser(null)
          }
  
          setLoading(false)
        }
      )
  
      return () => unsub()
  
    }, [])
  
    return (
      <AuthContext.Provider value={{user, loading}}>
        {children}
      </AuthContext.Provider>
    )
  }
  