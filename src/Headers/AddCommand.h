#ifndef ADDCOMMAND_H
#define ADDCOMMAND_H

#include "ICommand.h"
#include "util.h"
#include "User.h"
#include "Movie.h"
#include <vector>
#include <string>
#include <fstream>
#include <sstream>

class AddCommand : public ICommand
{
public:
    void updateUserMovies(ID_TYPE user, vector<User> userMap, int userIndex);
    void execute(vector<ID_TYPE> &inputVector, vector<User> &users);
    void print();
    bool isValid(vector<string> &inputVector);
};

#endif // ADDCOMMAND_H
