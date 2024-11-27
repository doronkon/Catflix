#ifndef MOVIE_H
#define MOVIE_H

#include <string>
#include "definers.h"

using namespace std;

class Movie {
public:
    ID_TYPE movieId;

    Movie(ID_TYPE t);
    bool bigger (Movie& other);
};

#endif
