#include "HelpCommand.h"

void HelpCommand::setCommands(map<string, ICommand *> CommandsInput) {
    for (const auto& pair : CommandsInput) {
        this->commands.push_back(pair.second); // Add each value to the vector.
    }

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
