import { NextResponse } from "next/server"
import { logAudit } from "@/lib/audit"

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set("edit_mode", "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 })
  await logAudit("admin.logout", {})
  return res
}
