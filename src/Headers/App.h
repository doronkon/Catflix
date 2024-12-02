#ifndef APP_H
#define APP_H


#include <cstdlib>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <set>
#include <vector>
#include "ICommand.h"
#include "AddCommand.h"
#include "RecommendCommand.h"
#include "User.h"
#include "Movie.h"
#include "util.h"
#include "definers.h"
#include "HelpCommand.h"

class App {
    public:
        vector<User> createUserMap(ifstream &file);
        void helpPrint(vector<User> users);
        int run();
};

#endif