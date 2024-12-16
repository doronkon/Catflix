# Catflix (TM)

## Instructions
running server:
docker-compose up server --build
opens a new client:
docker-compose run -it client

running server:
cd Catflix
g++ -std=c++17 -I./include -o server $(find src -name "*.cpp")
./server

running client:
cd /Catflix/src/ClientSide
python3 client.py 127.0.0.1 7071

1. Clone the repository -
  ```
  git clone https://github.com/doronkon/catflix.git
  ```
2. Enter the file -
   ```
   cd Catflix
   ```
3. Create an image -
  ```
  docker build -t catflix .
  ```
4. To run the tests -
   ```
   docker run catflix /Catflix/build/runTests
   ```
5. To run the app -
   ```
   docker run -it catflix /Catflix/build/Catflix_app
   ```

## 1. Add Command

1. **updateUserMovies function** - updates the data in the file after using add
![updateUserMovies function - updates the data in the file after using add](./photos/add-1.png)
![updateUserMovies function - updates the data in the file after using add](./photos/add-2.png)

2. **execute function** - creates or updates a user then updates the data in usersData.txt
![execute function - creates or updates a user then updates the data in usersData.txt](./photos/add-3.png)
![execute function - creates or updates a user then updates the data in usersData.txt](./photos/add-4.png)

3. **isValid and print function** - print is used by help (all commands have a print function which help initiates while it runs), isValid validates the input of each command
![isValid and print function - print is used by help (all commands have a print function which help initiates while it runs), isValid validates the input of each command](./photos/add-5.png)

## 2. Help Command

1. **help** initiates all "print" functions which every command has including itself, execute initiates exactly that, and addCommand adds a given command to the command list of Help
![help initiates all "print" functions which every command has including itself, execute initiates exactly that, and addCommand adds a given command to the command list of Help](./photos/help-1.png)

2. **isValid** validates the arguments given to the help command
![isValid validates the arguments given to help command](./photos/help-2.png)

## 3. Recommend Command

1. **print function** - used by help
![print function - used by help](./photos/reco-1.png)

2. **findCommonMovies** - finds the "weight" each user should get in the recommendation algorithm
![findCommonMovies - finds the "weight" each user should get in the recommendation algorithm](./photos/reco-2.png)
![findCommonMovies - finds the "weight" each user should get in the recommendation algorithm](./photos/reco-3.png)

3. **filterUsers function** - filters out the users who did not watch the movie we want to make a recommendation by
![filterUsers function filters out the users who did not watch the movie we want to make a recommendation by](./photos/reco-4.png)

4. **filterMovies** - takes the movies from the filtered users which our user still has not watched
![filterMovies - takes the movies from the filtered users which our user still has not watched](./photos/reco-5.png)

5. **makingRating** - calculates movie ratings based on the weights of the filtered users' movies
![makingRating - calculates movie ratings based on the weights of the filtered users' movies](./photos/reco-6.png)

6. **sortingMovies** - stable sort for the required Recommend function printing
![sortingMovies - stable sort for the required Recommend function printing](./photos/reco-7.png)
![sortingMovies - stable sort for the required Recommend function printing](./photos/reco-8.png)

7. **execute** - starts the recommendation process
![execute - starts the recommendation process](./photos/reco-9.png)
![execute - starts the recommendation process](./photos/reco-10.png)

8. **isValid** - validates the input for the recommend command
![isValid - validates the input for recommend command](./photos/reco-11.png)

### Repository Link - [https://github.com/doronkon/catflix.git](https://github.com/doronkon/catflix.git)
