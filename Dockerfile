FROM node:latest as build

WORKDIR /checkit
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

ARG PUBLIC_PATH=/
ENV PUBLIC_URL=${PUBLIC_PATH}

RUN set -ex; \
  npm run build

FROM nginx:alpine
COPY --from=build /checkit/dist /usr/share/nginx/html
COPY --from=build /checkit/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /checkit/config.js.template /usr/share/nginx/html/


# Make env var substitution happen on *.template files in the html dir
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/usr/share/nginx/html
ENV NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html
RUN chmod a+r -R /usr/share/nginx/html
RUN chmod ag+x /usr/share/nginx/html/assets
