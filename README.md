# Rick & Morty Explorer

Proyecto que consume la Rick & Morty API utilizando un **backend intermedio en ASP.NET Core**, con persistencia en **MySQL** y frontend en **React**, siguiendo un enfoque tipo **Backend as a Service (BaaS)**.

---

Mi objetivo es:

Demostrar la capacidad de:
- Consumir una API externa a partir de su documentación oficial
- Implementar un backend intermedio como capa de integración
- Manejar paginación, filtros, navegación a detalle y estados de interfaz
- Persistir información relevante en base de datos
- Separar responsabilidades por capas

---

Funcionalidades

### Personajes
- Listado con imagen, nombre, estado, especie y ubicación
- Filtros por nombre, estado y especie
- Paginación
- Manejo de estados: cargando, error y sin resultados

### Detalle de personaje
- Ruta `/characters/:id`
- Información completa del personaje
- Listado de episodios en los que aparece

---

Arquitectura

### Backend (ASP.NET Core)
- Controllers
- Services
- Models
- Data (Entity Framework)
- Consumo de Rick & Morty API mediante HttpClient
- Persistencia en MySQL
- Manejo centralizado de errores

### Frontend (React)
- Separación por páginas, componentes y servicios
- Consumo exclusivo del backend propio
- React Router para navegación
- Manejo de estados de carga y error

---
Base de datos

Contiene:
- Personajes
- Estado
- Especie
- Género
- Origen
- Ubicación
- Episodios asociados

### Script de ejemplo
CREATE TABLE Characters (
    Id INT PRIMARY KEY,
    Name VARCHAR(100),
    Status VARCHAR(50),
    Species VARCHAR(50),
    Gender VARCHAR(50),
    Origin VARCHAR(100),
    Location VARCHAR(100),
    Image TEXT
);

Tecnologías usadas

*ASP.NET Core

*Entity Framework Core

*MySQL

*React

*TypeScript

*TailwindCSS

*Rick & Morty API

To learn React, check out the [React documentation](https://reactjs.org/).
