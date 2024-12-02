#ifndef UTIL_H
#define UTIL_H

#include <cstring>
#include <cstdlib>
#include <string>
#include "definers.h"
#include <climits> 

using namespace std;


class util {
public:
    static bool toNumber(string  str,ID_TYPE & number);
    int findUserByID(vector<User> &users , ID_TYPE user);
};

#endif
