FROM node:18.12.1-alpine AS production
WORKDIR /app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm run start:generate

FROM node:18.12.1-alpine
COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/package*.json ./
COPY --from=production /app/dist ./dist
COPY --from=production /app/prisma ./prisma
CMD ["node", "dist/main.js", "start:migrate:prod"]