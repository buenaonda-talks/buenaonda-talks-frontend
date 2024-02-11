# BuenaOnda Talks Frontend

## Acerca del Proyecto

El frontend de **BuenaOnda Talks** es una aplicación web moderna construida con Next.js, diseñada para ofrecer una experiencia interactiva y accesible a usuarios que buscan mejorar sus habilidades en programación a través de becas.

## Tecnologías Clave

-   **Next.js:** Marco de trabajo de React para producción que ofrece rendimiento, SEO y escalabilidad.
-   **GraphQL:** Utilizado para interactuar eficientemente con el backend.
-   **Tailwind CSS:** Un framework CSS que permite diseñar rápidamente sin salir del HTML.
-   **Clerk:** Para autenticación segura y manejo de sesiones.
-   **React Hook Form:** Para la gestión eficiente de formularios, incluyendo validación.

## Configuración del Entorno de Desarrollo

### Requisitos Previos

Asegúrate de tener instalado Node.js (v14 o superior) y npm/Yarn en tu sistema. Este proyecto fue construido usando Yarn como gestor de paquetes.

### Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/buenaonda-talks/buenaonda-talks-frontend.git
cd buenaonda-talks-frontend
```

2. **Instala las dependencias:**

```bash
yarn install
```

### Ejecutar el Proyecto

-   **Desarrollo:** Para iniciar el servidor de desarrollo:

```bash
yarn dev
```

-   **Producción:** Para construir y ejecutar en producción:

```bash
yarn build
yarn start
```

### Scripts Importantes

-   `yarn gen`: Genera tipos TypeScript basados en tus queries y mutations de GraphQL.
-   `yarn lint`: Ejecuta ESLint para identificar problemas en el código.
-   `yarn fix:all`: Corrige automáticamente los problemas de formato y linting en tu código.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
