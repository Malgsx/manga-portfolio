"use client"

import { useState } from "react"
import { useEditMode } from "@/components/edit-mode-context"
import { Button } from "@/components/ui/button"

export default function EditModeToggle() {
  const { isAuthenticated, isEditMode, setEditMode, login, logout, refreshAuth } = useEditMode()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const enter = async () => {
    setError(null)
    const pwd = window.prompt("Enter admin password to enable Edit Mode:") || ""
    if (!pwd) return
    setLoading(true)
    const ok = await login(pwd)
    if (!ok) setError("Invalid password")
    setLoading(false)
  }

  const exit = async () => {
    setLoading(true)
    await logout()
    setLoading(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2">
      {error && (
        <div className="text-sm bg-red-600 text-white px-3 py-1 rounded">{error}</div>
      )}
      {!isAuthenticated ? (
        <Button size="sm" onClick={enter} disabled={loading} className="font-comic">
          {loading ? "Checking..." : "Enter Edit Mode"}
        </Button>
      ) : (
        <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-2 rounded border border-white">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isEditMode}
              onChange={(e) => setEditMode(e.target.checked)}
            />
            <span className="font-comic text-sm">Edit Mode {isEditMode ? "ON" : "OFF"}</span>
          </label>
          <Button size="sm" variant="outline" onClick={exit} disabled={loading} className="font-comic bg-white text-black">
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
