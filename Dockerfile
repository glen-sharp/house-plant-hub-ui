# Build stage
FROM node:lts AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
ARG ORIGIN
ENV REACT_APP_HOST_IP_ADDRESS $ORIGIN
RUN npm run build

# Production stage
FROM nginx:alpine AS server
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the desired port (e.g., 80)
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
