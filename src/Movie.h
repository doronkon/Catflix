#ifndef MOVIE_H
#define MOVIE_H

#include <string>
#include "definers.h"

using namespace std;

class Movie {
public:
    ID_TYPE movieId;

    Movie(ID_TYPE t);

    bool operator<(const Movie& other) const {
        return this->movieId < other.movieId;
    }
};

#endif
