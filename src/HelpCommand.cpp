#include "HelpCommand.h"

void HelpCommand:: addCommand(ICommand * command)
{
    this->commands.push_back(command);
}


void HelpCommand::execute(vector<ID_TYPE>& inputVector, vector<User>& users) {
    for (ICommand* command : this->commands) {
        command->print();
    }
}

void HelpCommand::print() {
    cout << "help" << endl;
}

bool HelpCommand::isValid(vector<string>& inputVector) {
    if (! inputVector.empty()) {
        return false;
    }
    return true;
}
