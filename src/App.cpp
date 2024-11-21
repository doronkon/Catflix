#include <iostream>
#include <string>
#include <IMenu.h>
#include <ICommand.h>
#include <ConsoleMenu.h>
#include <map>
using namespace std;

class App {

    ConsoleMenu menu;
    map<string, ICommand*> commands;

    public:

        App(IMenu* menu, map<string, ICommand*> commands): menu(), commands(commands) {}

        int main() {
            run();
        }

        void run() {
            string task;
            while (true) {
                task = menu.nextCommand();

                try {
                    commands[task]->execute();
                } catch(...) {
                    cout << "Sorry, no can do" << endl;
                }
            }
        }
}