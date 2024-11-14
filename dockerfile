FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 6001

CMD ["node", "dist/app.ts"]
