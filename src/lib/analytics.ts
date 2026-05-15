export async function trackServerEvent(name: string, payload: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", name, payload);
  }
}
