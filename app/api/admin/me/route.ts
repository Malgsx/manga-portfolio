import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()
  const edit = cookieStore.get("edit_mode")?.value === "1"
  return NextResponse.json({ authenticated: edit })
}
