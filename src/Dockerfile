FROM gcc:latest

COPY . /usr/src/Catflix
WORKDIR /usr/src/Catflix

RUN g++ -o Catflix ConsoleMenu.cpp 

CMD ["./Catflix"]