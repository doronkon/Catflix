#ifndef HELP_H
#define HELP_H

#include "ICommand.h"
#include "definers.h"
using namespace std;

class HelpCommand : public ICommand {
    vector <ICommand *> commands;
    public:
        void addCommand(ICommand * command);

        void execute(vector<ID_TYPE>& inputVector, vector<User>& users);
        void print();

};

#endif // IHELP_H