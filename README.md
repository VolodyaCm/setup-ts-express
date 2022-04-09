# Getting Started

Install modules:

```bash
> npm i
```

Install Husky

```bash
> npx husky install
```

Add dev.env prod.env
```bash
APP_EXTERNAL_PORT=3000
APP_INTERNAL_PORT=3000
APP_IMAGE_NAME=
APP_CONTAINER_NAME=
APP_API_KEY=
APP_DB_URI=
APP_SIGN_EXPIRES_IN=
ORIGIN=
APP_COOKIE_DOMAIN=
APP_SALT=
```

Run the development server:

```bash
> npm run dev
```

Or run docker-compose
```bash
> npm run docker-dev
```

Generate types from graphql schema
```
> npm run generate
```