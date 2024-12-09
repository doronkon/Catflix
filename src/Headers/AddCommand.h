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
#include "definers.h"
#include <unistd.h>

class AddCommand : public ICommand
{
public:
    virtual ~AddCommand() {}



    // Virtual execute function to allow overriding
    virtual string execute(std::vector<ID_TYPE> &inputVector, std::vector<User> &users);

    // Print function
    string print();

    virtual string getName();

    // Virtual isValid function to allow overriding
    virtual int isValid(std::vector<std::string> &inputVector, std::vector<User> &users);
};

#endif // ADDCOMMAND_H
