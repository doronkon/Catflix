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

using namespace std;
class ICommand {
public:
    virtual void execute(vector<string>&& inputVector = vector<string>{}, 
                            vector<User>&& users = vector<User>{}) = 0; // Const references

    virtual void helpPrint() = 0;
};

#endif // ICOMMAND_H
