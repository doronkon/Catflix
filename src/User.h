#ifndef USER_H
#define USER_H

#include <string>
#include <set>
#include "movie.h"  // Including movie.h so that the Movie class can be used in User

using namespace std;

class User {
private:
    string userId;           // The ID for the user
    set<Movie> userMovies;   // Set of movies associated with the user

public:
    // Constructor declaration
    User(string userId, set<Movie> userMovies);

    // Method to add a movie to the user's set of movies
    void addMovie(const Movie& movie);
    
};

#endif  // USER_H
