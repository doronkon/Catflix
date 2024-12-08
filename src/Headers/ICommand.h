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
#include <algorithm>
#include <string.h>


using namespace std;
class ICommand {
public:
    virtual string execute(vector<ID_TYPE> &inputVector, vector<User> &users) = 0; // Pure virtual function
    virtual string print() = 0;
    virtual int isValid(vector<string> &inputVector, vector<User> &users) = 0;
    virtual string getName() = 0;
};

#endif // ICOMMAND_H
