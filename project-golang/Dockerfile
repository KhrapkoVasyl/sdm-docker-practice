##
## Build
##
FROM golang:1.17.9-buster AS build

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download & go mod verify

COPY . .

RUN CGO_ENABLED=0 go build -o ./build/fizzbuzz



##
## Deploy
##
FROM gcr.io/distroless/static

WORKDIR /app

COPY --from=build /app/templates/index.html ./templates/index.html

COPY --from=build /app/build/fizzbuzz ./fizzbuzz

ENTRYPOINT [ "./fizzbuzz" ]