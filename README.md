# Trivia Backend - NestJS

Este es el backend para una aplicación de trivia interactiva con ranking en tiempo real. Desarrollado con **NestJS**, **TypeORM**, **PostgreSQL** y **WebSockets**.

---

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/trivia-backend.git
   cd trivia-backend
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env`:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=trivia_db
   JWT_SECRET=tu_clave_secreta_jwt
   ```

4. **Ejecuta la aplicación**:
   ```bash
   npm run start
   ```

## Estructura del Proyecto

```
src/
├── auth/               # Módulo de autenticación
├── questions/          # Módulo de preguntas
├── scores/             # Módulo de puntajes
├── ranking/            # Módulo de ranking en tiempo real
├── users/              # Módulo de usuarios
├── app.module.ts       # Módulo principal
└── main.ts             # Punto de entrada
```

## Rutas de la API

### Autenticación

#### Registro de Usuario

- **Método:** POST
- **Ruta:** `/auth/register`
- **Body:**
  ```json
  {
    "username": "juan123",
    "password": "contraseñaSegura"
  }
  ```
- **Respuesta:**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Inicio de Sesión

- **Método:** POST
- **Ruta:** `/auth/login`
- **Body:**
  ```json
  {
    "username": "juan123",
    "password": "contraseñaSegura"
  }
  ```
- **Respuesta:**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Preguntas

#### Obtener Preguntas por Categoría

- **Método:** GET
- **Ruta:** `/questions?category=geografía`
- **Respuesta:**
  ```json
  [
    {
      "id": 1,
      "category": "geografía",
      "question": "¿Cuál es la capital de Francia?",
      "options": ["París", "Londres", "Berlín", "Madrid"],
      "correctAnswer": "París"
    }
  ]
  ```

#### Crear una Nueva Pregunta (Admin)

- **Método:** POST
- **Ruta:** `/questions`
- **Body:**
  ```json
  {
    "category": "historia",
    "question": "¿Quién descubrió América?",
    "options": ["Cristóbal Colón", "Magallanes", "Vasco da Gama", "Marco Polo"],
    "correctAnswer": "Cristóbal Colón"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": 2,
    "category": "historia",
    "question": "¿Quién descubrió América?",
    "options": ["Cristóbal Colón", "Magallanes", "Vasco da Gama", "Marco Polo"],
    "correctAnswer": "Cristóbal Colón"
  }
  ```

### Puntajes

#### Enviar Puntaje

- **Método:** POST
- **Ruta:** `/scores`
- **Body:**
  ```json
  {
    "score": 100
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": 1,
    "score": 100,
    "userId": 1
  }
  ```

#### Obtener Ranking Global

- **Método:** GET
- **Ruta:** `/scores/ranking`
- **Respuesta:**
  ```json
  [
    {
      "id": 1,
      "score": 100,
      "user": {
        "id": 1,
        "username": "juan123"
      }
    },
    {
      "id": 2,
      "score": 90,
      "user": {
        "id": 2,
        "username": "maria456"
      }
    }
  ]
  ```

### Ranking en Tiempo Real (WebSockets)

#### Actualizar el Ranking

- **Evento:** `updateRanking`
- **Ruta:** `ws://localhost:3000`
- **Respuesta:**
  ```json
  {
    "event": "rankingUpdated",
    "data": [
      {
        "id": 1,
        "score": 100,
        "user": {
          "id": 1,
          "username": "juan123"
        }
      },
      {
        "id": 2,
        "score": 90,
        "user": {
          "id": 2,
          "username": "maria456"
        }
      }
    ]
  }
  ```

## Ejecución en Desarrollo

1. **Inicia la base de datos**:

   - Asegúrate de que PostgreSQL esté en ejecución.

2. **Ejecuta la aplicación**:

   ```bash
   npm run start
   ```

3. **Prueba los endpoints**:
   - Usa herramientas como Postman o cURL para probar las rutas.

# Si vas a levantar Docker solo coloca este comando en tu terminal: docker-compose up --build -d

# Si vas a levantar el sevidor de nest solo coloca este comando en tu terminal: npm run start:dev
