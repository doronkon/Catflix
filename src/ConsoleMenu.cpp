#include <iostream>
#include <string>
#include "IMenu.h"
using namespace std;

class ConsoleMenu : public IMenu {
public:

    string nextCommand() {
        string input;
        getline(cin,input);
        return input;
    }
};
int main() {
    ConsoleMenu test;
    test.nextCommand();
    return 1;
}
