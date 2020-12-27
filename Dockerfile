FROM node:14-alpine AS frontend-builder

WORKDIR /app

COPY frontend/package.json /app/
COPY frontend/yarn.lock /app/
RUN yarn install

COPY frontend /app
RUN yarn build

FROM node:14-alpine AS backend-builder

WORKDIR /app

COPY backend/package.json /app/
COPY backend/yarn.lock /app/
RUN yarn install

COPY backend /app
RUN yarn build

FROM node:14-alpine

WORKDIR /app

COPY backend/package.json /app/
COPY backend/yarn.lock /app/
RUN yarn install --production

COPY backend/.sequelizerc /app/

COPY --from=backend-builder /app/dist /app/
COPY --from=backend-builder /app/public /app/

COPY --from=frontend-builder /app/build /app/public

CMD ["node", "dist/index.js"]
