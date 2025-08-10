"use client"

import React from "react"

type EditModeContextType = {
  isAuthenticated: boolean
  isEditMode: boolean
  setEditMode: (v: boolean) => void
  login: (password: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const EditModeContext = React.createContext<EditModeContextType | null>(null)

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = React.useState(false)
  const [isEditMode, setEditMode] = React.useState(false)

  const refreshAuth = React.useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me", { cache: "no-store" })
      const data = await res.json()
      setAuthenticated(!!data?.authenticated)
      if (!data?.authenticated) setEditMode(false)
    } catch {}
  }, [])

  React.useEffect(() => {
    refreshAuth()
  }, [refreshAuth])

  const login = async (password: string) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthenticated(true)
      setEditMode(true)
      return true
    }
    return false
  }

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    setAuthenticated(false)
    setEditMode(false)
  }

  return (
    <EditModeContext.Provider value={{ isAuthenticated, isEditMode, setEditMode, login, logout, refreshAuth }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  const ctx = React.useContext(EditModeContext)
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider")
  return ctx
}

export function IfEdit({ children }: { children: React.ReactNode }) {
  const { isEditMode } = useEditMode()
  if (!isEditMode) return null
  return <>{children}</>
}
