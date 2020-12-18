# Multi-stage Build
# 1) Build React app
# 2) Nginx for serving the app, and acting as reverse proxy for Gunicorn/Flask

# Build React app (stage name "builder")
FROM node:14.15.1-alpine AS builder

WORKDIR /app
ENV PATH ./node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build


# Nginx for serving and reverse proxy
FROM nginx:alpine

WORKDIR /app
# Copy static assets from builder stage
COPY --from=builder /app/build .

# Copy and replace with our configuration files
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
COPY project.conf /etc/nginx/conf.d/

# Run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]