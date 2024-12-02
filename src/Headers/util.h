#ifndef UTIL_H
#define UTIL_H

#include <cstring>
#include <cstdlib>
#include <string>
#include "definers.h"
#include <climits> 
#include <vector>
#include "User.h"

using namespace std;


class util {
public:
    static bool toNumber(string  str,ID_TYPE & number);
    static int findUserByID(vector<User> &users , ID_TYPE user);
    static vector<ID_TYPE> changeVectorType(vector<string> inputStringVector);
};

#endif
