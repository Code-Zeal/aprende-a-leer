

# ⚙️ Especificación Técnica del Backend

## 🚀 Stack Tecnológico y Arquitectura del Servidor

El servidor de la aplicación está construido con un *stack* **Node.js/Express**, diseñado para manejar las peticiones de autenticación (administradores), almacenamiento de sesiones de estudiantes y la gestión de la base de datos de usuarios.

| Componente | Tecnología | Propósito en el Backend |
| :--- | :--- | :--- |
| **Plataforma** | **Node.js** | Entorno de ejecución que permite que el JavaScript del servidor (`app.js`) se ejecute fuera del navegador. |
| **Framework** | **Express** (`express`) | El *framework* principal que gestiona las **rutas** (endpoints), maneja las peticiones HTTP (GET, POST) y las respuestas. |
| **Base de Datos** | **PostgreSQL** (`pg`, `pg-hstore`) | El sistema de gestión de bases de datos relacional utilizado para almacenar los datos del sistema (usuarios, administradores). |
| **ORM** | **Sequelize** (`sequelize`) | Un **Mapeador Objeto-Relacional** que simplifica la interacción con la base de datos PostgreSQL, permitiendo usar objetos JavaScript en lugar de escribir consultas SQL puras. |

---

## 📦 Dependencias Clave

Las dependencias instaladas revelan las capacidades y el alcance del servidor:

| Dependencia | Función en el Servidor | Implicación en la Aplicación |
| :--- | :--- | :--- |
| **`cors`** | Habilita el Intercambio de Recursos de Origen Cruzado. | Permite que el **Frontend (React)**, que corre en un dominio o puerto diferente, se comunique con éxito con este **Backend**. |
| **`dotenv`** | Carga variables de entorno. | Se utiliza para manejar **información sensible** (claves de base de datos, puertos, tokens) de forma segura, separada del código fuente. |
| **`morgan`** | Middleware de registro de peticiones HTTP. | Ayuda en el **monitoreo y *debugging***, mostrando en la consola del servidor un registro detallado de cada petición que llega. |
| **`multer`** | Middleware para manejar datos `multipart/form-data`. | Sugiere que el servidor tiene la capacidad de **manejar la subida de archivos** (como imágenes, audios o material educativo), aunque no se esté usando actualmente en las rutas de estudiante/admin documentadas. |
| **`uuid`** | Generador de identificadores únicos universales. | Se usa para crear **IDs únicos** y seguros (ej., para nuevos estudiantes o administradores) antes de guardarlos en la base de datos. |

---

## 🚦 Endpoints de API Confirmados

Las siguientes rutas de la API han sido confirmadas por el código del Frontend que ya documentamos:

| Flujo | Método | Endpoint (Ruta de API) | Propósito en el Frontend |
| :--- | :--- | :--- | :--- |
| **Admin** | `POST` | `/auth/loginAdmin` | **Autenticación** del personal administrativo. Recibe `email` y `password`. |
| **Admin** | `GET` | `/user/getStudents` | **Monitoreo.** Solicita la lista completa de todos los estudiantes registrados en el sistema. |
| **Estudiante** | `POST` | (Implícito, Login Estudiante) | **Registro/Inicio** de sesión inicial para estudiantes (aunque el Frontend usa `localStorage` para simplificar). |

---

## 🖥️ Flujo de Operación General

1.  **Inicio:** El servidor arranca con **Node.js**, utilizando **Vite** en desarrollo (`npm run dev`) y **Express** para montar la aplicación.
2.  **Conexión:** Se establece una conexión con la base de datos **PostgreSQL** a través de **Sequelize**.
3.  **Servicio:** El servidor se pone a la escucha de peticiones HTTP (a través de los puertos definidos en `.env`).
4.  **Respuesta:**
    * Si llega una petición de administrador, **Express** la dirige al controlador de autenticación, que usa **Sequelize** para verificar las credenciales en la DB.
    * Si se pide la lista de estudiantes, **Express** dirige la petición a la capa de usuario, que usa **Sequelize** para traer todos los registros de la tabla de estudiantes.
    * El middleware **CORS** se asegura de que estas respuestas puedan llegar de vuelta al **Frontend React** sin ser bloqueadas.

Este servidor es una **API RESTful** estándar que provee la lógica de negocio y la persistencia de datos necesarias para soportar las funcionalidades mostradas en el Frontend.

El servidor Node.js/Express organiza su lógica en dos módulos principales: `authRouter` y `userRouter`, cada uno gestionando un conjunto específico de funcionalidades.

---

# 🚦 Arquitectura de Rutas del Servidor Backend

El servidor utiliza un enfoque modular para el enrutamiento, separando la lógica de **Autenticación** (`/auth`) de la lógica de **Usuario/Datos** (`/user`).

## 1. Módulo de Autenticación (`/auth`)

Este módulo maneja todas las operaciones relacionadas con la identidad y el acceso, tanto para estudiantes como para administradores.

| Endpoint (Ruta) | Método HTTP | Función (Controlador) | Propósito en la Aplicación |
| :--- | :--- | :--- | :--- |
| **`/auth/login`** | `POST` | `Login` | **Inicio de Sesión del Estudiante.** Procesa las credenciales de un usuario estudiante. Si es exitoso, crea y devuelve un token de sesión. |
| **`/auth/register`** | `POST` | `Register` | **Registro de Nuevo Estudiante.** Crea un nuevo registro de usuario en la base de datos con los datos proporcionados. |
| **`/auth/loginAdmin`** | `POST` | `LoginAdmin` | **Inicio de Sesión del Administrador.** Procesa las credenciales de un administrador. Esta ruta suele tener medidas de seguridad más estrictas y devuelve un token de administrador. |

***

## 2. Módulo de Usuario y Datos (`/user`)

Este módulo se encarga de la recuperación de información y debe estar protegido, requiriendo un *token* de sesión válido (ya sea de estudiante o de administrador) para la mayoría de sus *endpoints*.

| Endpoint (Ruta) | Método HTTP | Función (Controlador) | Propósito en la Aplicación |
| :--- | :--- | :--- | :--- |
| **`/user/getInfo`** | `GET` | `GetInfo` | **Obtener Información del Perfil.** Permite a un usuario (estudiante o administrador) obtener sus propios datos (nombre, progreso, etc.) usando el token que enviaron en la petición. |
| **`/user/getStudents`** | `GET` | `GetStudents` | **Listado de Estudiantes (Ruta Restringida).** Utilizada por la ruta del *frontend* `/admin/inicio`. Requiere un **token de administrador** para devolver la lista completa de todos los estudiantes del sistema. |