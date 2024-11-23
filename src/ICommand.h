#ifndef ICOMMAND_H
#define ICOMMAND_H
#include <cstdlib>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <set>
#include <vector>
using namespace std;
class ICommand {
public:
    virtual void execute(vector<string> &inputVector, map<string, set<string> > &users) = 0; // Pure virtual function
};

#endif // ICOMMAND_H
