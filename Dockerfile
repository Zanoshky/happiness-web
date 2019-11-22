# ######################
# BUILD ENVIRONMENT
# ######################
FROM node:10-slim AS build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# ######################
# PRODUCTION ENVIRONMENT
# ######################
FROM nginx:1.16.1-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

ENV HOST=0.0.0.0 PORT=80

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
