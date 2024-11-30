#include "User.h"  // Include the User header file (which includes movie.h)
#include <vector>

User::User(ID_TYPE userId, vector<Movie> userMovies) : userId(userId), userMovies(userMovies) {}

void User::addMovie(const Movie& movie) {
    userMovies.push_back(movie);  // Insert the movie into the user's set of movies
}
ID_TYPE User::getUserId(){
    return this->userId;
}

vector<Movie> User:: getUserMovies(){
    return this->userMovies;
}

bool User::didIWatch(Movie &movie){
    int size = this->userMovies.size();
    for(int i = 0; i < size; i++){
        if (movie.movieId == this->userMovies[i].movieId)
        {
            return true;
        }
    }
    return false;
}

