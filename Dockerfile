FROM gcc:latest

COPY . /usr/src/Catflix
WORKDIR /usr/src/Catflix

RUN g++ -o Catflix main.cpp 

CMD ["./Catflix"]

## docker run -it