#ifndef DELETECOMMAND_H
#define DELETECOMMAND_H

#include "ICommand.h"
#include "util.h"
#include "User.h"
#include "Movie.h"
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include "definers.h"

class DeleteCommand : public ICommand
{
public: 
    string execute(std::vector<ID_TYPE> &inputVector, std::vector<User> &users);
    int isValid(std::vector<std::string> &inputVector, std::vector<User> &users);
    string print();
    string getName();
};

#endif // DELETECOMMAND_H