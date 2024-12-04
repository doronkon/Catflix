#ifndef RECOMMENDCOMMAND_H
#define RECOMMENDCOMMAND_H

#include "ICommand.h"
#include "util.h"
#include "User.h"
#include "Movie.h"
#include <vector>
#include <map>
#include <string>
#include <iostream>


class RecommendCommand : public ICommand
{
public:
    void print();
    map<ID_TYPE, int> findCommonMovies(User user, vector<User> &users);
    vector<User> filterUsers(Movie movie, User &user, vector<User> &users);
    vector<Movie> filtermovies(vector<User> filteredUsers, Movie movie,User user);
    map<ID_TYPE, int> makingRatings(vector<Movie> MovieList, vector<User>& filteredUsers, map<ID_TYPE, int> weights);
    void sortingMovies(vector<Movie> &MovieList, map<ID_TYPE, int> ratings);
    void execute(vector<ID_TYPE> &inputVector, vector<User> &users);
    bool isValid(vector<string> &inputVector);
};

#endif // RECOMMENDCOMMAND_H
