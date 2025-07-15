FROM node:current-alpine3.22 AS base

FROM base AS builder

WORKDIR /app

COPY package*.json ./

RUN npm clean-install

COPY . .

RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["npm","start"]