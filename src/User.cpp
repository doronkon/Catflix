#include "user.h"  // Include the User header file (which includes movie.h)

User::User(string userId, set<Movie> userMovies) : userId(userId), userMovies(userMovies) {}

void User::addMovie(const Movie& movie) {
    userMovies.insert(movie);  // Insert the movie into the user's set of movies
}
