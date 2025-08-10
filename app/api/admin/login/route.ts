import { NextResponse } from "next/server"
import { logAudit } from "@/lib/audit"

export async function POST(req: Request) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return NextResponse.json({ error: "not_configured" }, { status: 500 })
  if (password !== adminPassword) {
    await logAudit("admin.login_failed", {})
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set("edit_mode", "1", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 })
  await logAudit("admin.login_success", {})
  return res
}
