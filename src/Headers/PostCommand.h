#ifndef POSTCOMMAND_H
#define POSTCOMMAND_H

#include "AddCommand.h" // Only include the base class

class PostCommand : public AddCommand
{
public:
    // Override the execute function with additional functionality
    void execute(std::vector<ID_TYPE> &inputVector, std::vector<User> &users) override;

    // Override the isValid function for specific behavior
    bool isValid(std::vector<std::string> &inputVector, std::vector<User> &users) override;
};

#endif // POSTCOMMAND_H
