FROM golang:1.17.9-buster

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download & go mod verify

COPY . .

RUN go build -o ./build/fizzbuzz

ENTRYPOINT [ "./build/fizzbuzz" ]