#ifndef USER_H
#define USER_H

#include <string>
#include <set>
#include "Movie.h"  // Including movie.h so that the Movie class can be used in User
#include <vector>

using namespace std;

class User {
private:
    ID_TYPE userId;           // The ID for the user
    vector<Movie> userMovies;   // vector of movies associated with the user

public:
    // Constructor declaration
    User(ID_TYPE userId, vector<Movie> userMovies);

    // Method to add a movie to the user's set of movies
    void addMovie(const Movie& movie);

    void removeMovie( Movie& movie);
    
    ID_TYPE getUserId();

    vector<Movie> getUserMovies();

    bool didIWatch(Movie &movie);
};

#endif  // USER_H
