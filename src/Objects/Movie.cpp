#include "../Headers/Movie.h"


Movie::Movie(ID_TYPE t) : movieId(t){}

bool Movie::bigger (Movie& other){
    return this->movieId > other.movieId;
}


