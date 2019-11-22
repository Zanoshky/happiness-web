# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim AS build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Set to a non-root built-in user `node`
USER node

COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# production environment
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

ENV HOST=0.0.0.0 PORT=8443

EXPOSE 8443

CMD ["nginx", "-g", "daemon off;"]
