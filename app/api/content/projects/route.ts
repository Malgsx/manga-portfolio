import { NextResponse } from "next/server"
import { getSection, setSection, type Project } from "@/lib/storage"

const defaultProjects: Project[] = []

export async function GET() {
  const data = await getSection<Project[]>("content:projects", defaultProjects)
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = (await req.json()) as Project[]
  await setSection("content:projects", body)
  return NextResponse.json(body)
}
