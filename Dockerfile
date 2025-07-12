FROM node:latest AS react-stage

WORKDIR /app

COPY . .

WORKDIR /app/frontend

RUN npm install

RUN npm run build

FROM golang:latest AS go-build-stage

WORKDIR /app

COPY --from=react-stage /app .

WORKDIR /app/backend

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o charlie_ticketing_system .

FROM cgr.dev/chainguard/static
COPY --from=go-build-stage /app/backend /usr/bin/
EXPOSE 8080
ENTRYPOINT ["/usr/bin/charlie_ticketing_system"]