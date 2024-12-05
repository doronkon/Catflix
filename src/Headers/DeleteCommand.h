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

class DeleteCommand : public ICommand
{
public: 
    void execute(std::vector<ID_TYPE> &inputVector, std::vector<User> &users);
    bool isValid(std::vector<std::string> &inputVector, std::vector<User> &users);
    void print();
};

#endif // DELETECOMMAND_H