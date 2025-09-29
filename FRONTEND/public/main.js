// Dentro de Docker, el host es el nombre del servicio
const API_URL = "http://localhost:3000"

console.log("🌐 API_URL:", API_URL)

// ---------- REGISTER ----------
document.getElementById("registerBtn").addEventListener("click", async () => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "peshito",
      password: "12345",
    }),
  })
  const data = await res.json()
  console.log("✅ Registro:", data)
})

// ---------- LOGIN ----------
document.getElementById("loginBtn").addEventListener("click", async () => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "peshito",
      password: "12345",
    }),
  })
  const data = await res.json()
  console.log("✅ Login:", data)
})

// ---------- LOGOUT ----------
document.getElementById("logoutBtn").addEventListener("click", async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
  })
  const data = await res.json()
  console.log("✅ Logout:", data)
})

// ---------- REFRESH ----------
document.getElementById("refreshBtn").addEventListener("click", async () => {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
  })
  const data = await res.json()
  console.log("✅ Refresh:", data)
})

// ---------- GET PRODUCTS ----------
document.getElementById("getProductsBtn").addEventListener("click", async () => {
  const res = await fetch(`${API_URL}/products`, {
    method: "GET",
  })
  const data = await res.json()
  console.log("📦 Catálogo de productos:", data)
})

// ---------- GET PRODUCT BY ID ----------
document.getElementById("getProductByIdBtn").addEventListener("click", async () => {
  const productId = "123" // simulamos un producto fijo
  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: "GET",
  })
  const data = await res.json()
  console.log(`🔍 Detalle del producto ${productId}:`, data)
})

 // ---------- ADD TO CART ----------
  document.getElementById("addToCartBtn").addEventListener("click", async () => {
    const body = {
      productId: "123", // simulamos un producto
      quantity: 1
    }

    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    console.log("➕ Producto agregado al carrito:", data)
  })

  // ---------- GET CART ----------
  document.getElementById("getCartBtn").addEventListener("click", async () => {
    const res = await fetch(`${API_URL}/cart`, {
      method: "GET"
    })
    const data = await res.json()
    console.log("🛒 Carrito actual:", data)
  })

  // ---------- DELETE FROM CART ----------
  document.getElementById("deleteFromCartBtn").addEventListener("click", async () => {
    const itemId = "456" // simulamos un item fijo del carrito
    const res = await fetch(`${API_URL}/cart/${itemId}`, {
      method: "DELETE"
    })
    const data = await res.json()
    console.log(`❌ Producto ${itemId} eliminado del carrito:`, data)
  })


  // ---------- GET USER PROFILE ----------
document.getElementById("getProfileBtn").addEventListener("click", async () => {
  const userId = "123"

  try {
    const res = await fetch(`${API_URL}/accounts/users/${userId}`, { method: "GET" })
    const data = await res.json()
    console.log(`👤 Perfil del usuario ${userId}:`, data)
  } catch (err) {
    console.error("❌ Error obteniendo perfil:", err)
  }
})

  // ---------- UPDATE USER PROFILE ----------
document.getElementById("updateProfileBtn").addEventListener("click", async () => {
  const userId = "123"
  const updatedProfile = {
    name: "Peshito Malvado",
    email: "peshito@example.com"
  }

  try {
    const res = await fetch(`${API_URL}/accounts/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProfile)
    })
    const data = await res.json()
    console.log(`✅ Perfil del usuario ${userId} actualizado:`, data)
  } catch (err) {
    console.error("❌ Error actualizando perfil:", err)
  }
})


  // ---------- GET ORDERS BY CLIENT ----------
  document.getElementById("getUserOrdersBtn").addEventListener("click", async () => {
    const clientId = "123" 

    const res = await fetch(`${API_URL}/orders/client/${clientId}`, {
      method: "GET"
    })

    const data = await res.json()
    console.log(`📦 Órdenes del cliente ${clientId}:`, data)
  })

  // ---------- CREATE ORDER ----------
  document.getElementById("createOrderBtn").addEventListener("click", async () => {
    const order = {
    "clientId": "user123",
    "items": [
      { "productId": "p001", "quantity": 2 },
      { "productId": "p002", "quantity": 1 }
    ]
}


  const res = await fetch(`${API_URL}/orders/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    })
    const data = await res.json()
    console.log("📝 Orden generada:", data)
  })
  

   // ---------- GET ORDER BY ID ----------
document.getElementById("getOrderBtn").addEventListener("click", async () => {
  const orderId = "abc123"

  const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "GET"
    })
  const data = await res.json()
  console.log(`🔍 Orden ${orderId}:`, data)
})

// ---------- GET SHIPPING BY ID ----------
document.getElementById("getShippingBtn").addEventListener("click", async () => {
  const shippingId = "ship_123"

  try {
    const res = await fetch(`${API_URL}/shipping/${shippingId}`, { method: "GET" })
    const data = await res.json()
    console.log(`📦 Detalle del envío ${shippingId}:`, data)
  } catch (err) {
    console.error("❌ Error obteniendo envío:", err)
  }
})

// ---------- GET ALL SHIPPINGS FOR CLIENTID ----------
document.getElementById("getAllShippingsBtn").addEventListener("click", async () => {
  try {
    const clientId = 123
    const res = await fetch(`${API_URL}/shipping/${clientId}`, { method: "GET" })
    const data = await res.json()
    console.log("📦 Lista de envíos:", data)
  } catch (err) {
    console.error("❌ Error obteniendo todos los envíos:", err)
  }
})

  // ---------- PAY ORDER ----------
  document.getElementById("payOrderBtn").addEventListener("click", async () => {
    const body = {
      orderId: "abc123", 
      method: "credit_card"
    }

    const res = await fetch(`${API_URL}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    console.log("💳 Pago realizado:", data)
  })
