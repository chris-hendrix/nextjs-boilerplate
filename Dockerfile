FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN npm ci

USER node

CMD npm run migrate