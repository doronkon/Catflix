#ifndef PATCHCOMMAND_H
#define PATCHCOMMAND_H

#include "AddCommand.h" // Only include the base class

class PatchCommand : public AddCommand
{
public:
    // Override the execute function with additional functionality
    string execute(std::vector<ID_TYPE> &inputVector, std::vector<User> &users) override;

    // Override the isValid function for specific behavior
    int isValid(std::vector<std::string> &inputVector, std::vector<User> &users) override;

    string print() override;

    string getName() override;
};

#endif // PATCHCOMMAND_H
