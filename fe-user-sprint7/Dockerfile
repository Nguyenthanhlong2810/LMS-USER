FROM node:lts AS development

WORKDIR /workdir/react
COPY package*.json /workdir/react/package.json
RUN yarn
#RUN npm ci
COPY . /workdir/react
RUN yarn build
#ENV CI=true
CMD yarn start
#FROM development AS build

#RUN yarn 
#RUN yarn build
#RUN yarn global add serve
#RUN serve -s build

FROM nginx:1.13-alpine

COPY --from=development /workdir/react/build /usr/share/nginx/html
# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3003
CMD ["nginx","-g","daemon off;"]

