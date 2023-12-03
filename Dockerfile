FROM node:18-alpine3.18

WORKDIR /var/www/nest/skinx-frontend
COPY . .

RUN npm install

CMD ["npm", "run", "production"]