"use client"
import { createContext, ReactNode, useContext, useState } from "react"

type AuthState = {
    user: any | null
    token?: string | null
}

const AuthContext = createContext<{
    auth: AuthState
    setAuth: (a: AuthState) => void
}>({ auth: { user: null }, setAuth: () => {} })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({ user: null, token: null })
    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
