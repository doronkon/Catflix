#include <iostream>
#include <string>
#include "IMenu.h"
using namespace std;

class ConsoleMenu : public IMenu {
public:

    int nextCommand() {
        string input;
        std::cin >> input;
        cout << input;
        return 0;
    }
};
int main() {
    ConsoleMenu test;
    test.nextCommand();
    return 1;
}
