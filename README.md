# 🛍️ E-commerce Simulator con Microservicios y RabbitMQ  

Este proyecto es un **simulador de e-commerce** basado en una arquitectura de **microservicios**.  
Cada servicio cumple una responsabilidad específica y se comunica a través de **RabbitMQ** mediante publicación/suscripción de eventos.  

- Botones de simulación → para permitir ejecutar diferentes operaciones del e-commerce (crear usuario, agregar productos al carrito, generar pagos, etc.) sin necesidad de un cliente real.
---

## 🚀 Tecnologías principales  

- **Node.js + Express** → Backend de cada microservicio.  
- **Frontend html+js** → Interfaz de usuario.  
- **RabbitMQ** → Comunicación asíncrona entre microservicios.  
- **Docker + Docker Compose** → Orquestación y despliegue.  

---

## 📚 Documentación

Para ver la documentación completa del proyecto y todos los eventos de RabbitMQ, endpoints y flujo de microservicios, visitá el [Notion del proyecto](https://www.notion.so/TU_LINK_AQUI).

## 📦 Instalación y ejecución  

### 🔹 Desarrollo  

En desarrollo se usa **`docker-compose.override.yml`** automáticamente:  

```bash
docker compose up --build
```
**Características principales:**  
- 🔄 Uso de `nodemon` para recargar los servicios en caliente.  
- 🗂️ Volúmenes para montar el código local → cambios inmediatos en los contenedores.

### 🔹 Producción  

En producción se levanta solo con el archivo base **`docker-compose.yml`**:  

```bash
docker compose -f docker-compose.yml up --build -d
```

Frontend: http://localhost:4000
API Gateway: http://localhost:3000
RabbitMQ panel: http://localhost:8081 (user: 123, pass: 123)

### 🔗 Conexión RabbitMQ  

Los microservicios se conectan a RabbitMQ usando:  

```js
const connection = process.env.CONNECTION_RABBITMQ || "amqp://123:123@rabbitmq:5672";
```
⚠️ Nota: las credenciales (123/123) son solo de prueba y ya aparecen en el docker-compose.yml.
En producción se deben cambiarlas.

### 🌐 Arquitectura y flujo

- Frontend (4000) → Consume API Gateway.
- API Gateway (3000) → Orquesta todas las peticiones hacia microservicios.
- Microservicios (3001–3009) → No expuestos al host, solo accesibles por la red ecommerce_net.
- RabbitMQ (5672 interno, 8081 panel web) → Broker de mensajería.

### 👉 Flujo básico:

- Cliente entra al Frontend.
- Las requests viajan al API Gateway.
- El Gateway las reenvía al microservicio correspondiente.
- Los microservicios publican/escuchan eventos en RabbitMQ para coordinar acciones.
