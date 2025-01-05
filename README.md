# Catflix (TM)

## Table of Contents
- [Instructions](#instructions)
- [1. Add Command](#1-add-command)
- [2. Delete Command](#2-delete-command)
- [3. Patch Command](#3-patch-command)
- [4. Post Command](#4-post-command)
- [5. Server Side](#5-server-side)
- [6. Answers to the questions in Targil 2](#6-answers-to-the-questions-in-targil-2)

## Instructions

1. Clone the repository -
  ```
  git clone https://github.com/doronkon/catflix.git
  ```
2. Enter the file -
   ```
   cd Catflix
   ```
3. running server:
   ```
   docker-compose up server --build
   ```
4. opens a new client:

   4.1 - Open a new terminal
   
   4.2 Enter the file -
   ```
   cd Catflix
   ```
   4.3 - Run the new client
   ```
   docker-compose run -it client
   ```
5. build tests:
   ```
   docker build -t catflix-tests -f Dockerfile.tests .
   ```
6. run tests:
   ```
   docker run catflix-tests
   ```
* All commands are upper case except help command.

## 1. user commands

1. *Create user* - creates a new user 
![*Create user* - creates a new user](./photos/create-user.png)

2. *Patch user* - patching a user
![*Patch user* - patching a user](./photos/patch-user.png)

3. *Get specific user* - Getting a specific user
![*Get specific user* - Getting a specific user](./photos/get-specific-user.png)

4. *Get all user* - Getting all user
![*Get specific user* - Getting a specific user](./photos/get-user.png)

5. *Delete user* - Delete a user
![*Delete user* - Delete a user](./photos/delete-user.png)

## 2. Category commands

1. *Create Category* - creates a new category 
![*Create Category* - creates a new category ](./photos/create-category.png)

2. *Patch category* - patching a category
![*Patch user* - patching a user](./photos/patch-category.png)

3. *Get categories* - Getting all categories
![*Get categories* - Getting all categories](./photos/get-category.png)

4. *Delete category* - Delete a category
![*Delete category* - Delete a category](./photos/delete-category.png)

## 4. Movie Commands

1. *Create Movie* - creates a new movie 
![*Create Movie* - creates a new movie ](./photos/create-movie.png)

3. *Get all movies* - Getting all movies
![3*Get all movies* - Getting all movies](./photos/get-movie.png)

4. *Get movie* - Getting a specific movies
![*Get movie* - Getting a specific movies](./photos/get-specific_movie.png)

5. *Delete Movie* - Delete a Movie
![*Delete Movie* - Delete a Movie](./photos/delete-movie.png)

## 5. Recommend command

1. *Post* - inserts a movie for a given user into the cpp recommensation system
![*Post* - inserts a movie for a given user into the cpp recommensation system](./photos/recommend-post.png)

2. *Get* - Get a recommendation for a given user and a given movie from the cpp server
![*Get* - Get a recommendation for a given user and a given movie from the cpp server](./photos/get-recommendation.png)

   
### Repository Link - [https://github.com/doronkon/catflix.git]
