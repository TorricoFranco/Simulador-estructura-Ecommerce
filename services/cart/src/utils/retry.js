export async function retryConnection(fn, retries = 10, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err) {
      console.error(`[retry] Intento ${i + 1} fallido:`, err.message)
      if (i < retries - 1) {
        console.log(`[retry] Reintentando en ${delay / 1000}s...`)
        await new Promise((res) => setTimeout(res, delay))
      } else {
        console.error("[retry] Se agotaron los intentos, cerrando proceso")
        process.exit(1); // deja que Docker reinicie el contenedor
      }
    }
  }
}