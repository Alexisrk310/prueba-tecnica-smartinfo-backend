
FROM node:18-alpine


WORKDIR /app


COPY package.json yarn.lock* package-lock.json* ./


RUN npm install


COPY . .


RUN npm run build


EXPOSE 4000


CMD ["npm", "run", "start:prod"]