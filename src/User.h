#ifndef USER_H
#define USER_H

#include <string>
#include <set>
#include "Movie.h"  // Including movie.h so that the Movie class can be used in User
#include <vector>

using namespace std;

class User {
private:
    int userId;           // The ID for the user
    vector<Movie> userMovies;   // vector of movies associated with the user

public:
    // Constructor declaration
    User(int userId, vector<Movie> userMovies);

    // Method to add a movie to the user's set of movies
    void addMovie(const Movie& movie);
    
    int getUserId();

    vector<Movie> getUserMovies();

    bool didIWatch(Movie &movie);
};

#endif  // USER_H
