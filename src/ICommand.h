#ifndef ICOMMAND_H
#define ICOMMAND_H
#include <cstdlib>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <set>
#include <vector>
#include "User.h"
#include "definers.h"


using namespace std;
class ICommand {
public:
    virtual void execute(vector<ID_TYPE> &inputVector, vector<User> &users) = 0; // Pure virtual function
};

#endif // ICOMMAND_H
