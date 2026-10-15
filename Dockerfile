# ---- Build stage -------------------------------------------------------------
# Dependency sets are installed from the lockfile first to maximize layer cache
# reuse; the app is then built to `dist/` via `npm run build` (typecheck + Vite).
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Serve stage -------------------------------------------------------------
# Nginx serves the static build output; `VITE_API_BASE_URL` is baked at build
# time, so point the build (or a dev server) at the API upstream as needed.
FROM nginx:alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]