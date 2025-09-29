export const paymentsHandlers = {
  "payment.succeeded": (event) => {
    console.log(`📊 [PAYMENT.SUCCEEDED]`)
    console.log(`✉️ Registrando pago aceptado`)
    // TODO: 
    // Accounting → registrar transacciones de dinero.
    // Fraud detection → analizar patrones de fallos.
    // Billing → generar comprobantes de pago.
  },

  "payment.failed": (event) => {
    console.log(`📊 [PAYMENT.FAILED]`)
    console.log(`📊 Registrando pago fallido`)
    // TODO: 
    // Accounting → registrar transacciones de dinero.
    // Fraud detection → analizar patrones de fallos.
    // Billing → generar comprobantes de pago.
  },
}

