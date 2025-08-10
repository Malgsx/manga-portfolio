import { kv } from "@vercel/kv"

export type AuditEntry = {
  id: string
  ts: number
  action: string
  meta?: Record<string, unknown>
}

const AUDIT_KEY = "audit:entries"
const MAX_ENTRIES = 500

export async function logAudit(action: string, meta?: Record<string, unknown>) {
  const entry: AuditEntry = {
    id: crypto.randomUUID(),
    ts: Date.now(),
    action,
    meta,
  }
  // push to head and trim to keep list bounded
  await kv.lpush(AUDIT_KEY, JSON.stringify(entry))
  await kv.ltrim(AUDIT_KEY, 0, MAX_ENTRIES - 1)
}

export async function getAudit(limit = 100): Promise<AuditEntry[]> {
  const raw = await kv.lrange<string>(AUDIT_KEY, 0, Math.max(0, limit - 1))
  return raw
    .map((s) => {
      try {
        return JSON.parse(s) as AuditEntry
      } catch {
        return null
      }
    })
    .filter(Boolean) as AuditEntry[]
}
