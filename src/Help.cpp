#include "ICommand.h"
#include "Ihelp.h"

class Help : public Ihelp, public ICommand {
    public:
        map<string, ICommand *> commands;

        void getCommands(map<string, ICommand *> CommandsInput) {
            commands = CommandsInput;
            return;
        }

    void execute(vector<string>&& inputVector = vector<string>{}, 
                            vector<User>&& users = vector<User>{}) {
                                if (!inputVector.empty()) {
                                    return;
                                } else {
                                    this->printAllCommands();
                                }
    };

    void printAllCommands() {
        vector<string> commandsList = {"add", "recommend", "help"};
        for (string command : commandsList) {
            commands[command]->helpPrint();
        }
    }

    void helpPrint() {
        cout << "help" << endl;
    }


};
