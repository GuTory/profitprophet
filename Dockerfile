# Use an official Node.js image as the base image
FROM node:18 as node

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ./ /usr/src/app

# Install Angular CLI and other project dependencies
RUN npm install

# Build the Angular app in production mode
RUN npm run build

# DEPLOYMENT
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=node /usr/src/app/dist/profit-prophet-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80
