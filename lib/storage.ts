import { redis } from "@/lib/redis"

export type ProfileData = {
  profileImage: string
  name: string
  bio: string
  githubUrl: string
  twitterUrl: string
  substackUrl: string
}

export type FeaturedData = {
  showcaseImage: string
  featuredTitle: string
  featuredDescription: string
  demoUrl: string
  sourceCodeUrl: string
  technologies: string[]
  keyFeatures: string[]
}

export type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: { name: string; class: string }[]
  stars: number
  repo: string
}

export type AboutSection = {
  id: number
  content: string
}

export async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await redis.get<string>(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (e) {
    return fallback
  }
}

export async function setSection<T>(key: string, value: T): Promise<void> {
  await redis.set(key, JSON.stringify(value))
}
