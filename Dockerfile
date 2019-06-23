FROM node:10-alpine as build-stage

# Create app directory
WORKDIR /app

# Copy current directory in
COPY package*.json ./

# install everything
RUN npm install

COPY . .

RUN npm run build


# STAGE 2: PRODUCTION
FROM nginx:alpine

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# production stage
# FROM nginx:1.13.12-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
