#include "HelpCommand.h"

/**
 * Adds a command to the list of commands managed by the HelpCommand.
 *
 * @param command A pointer to the ICommand to add.
 */
void HelpCommand::addCommand(ICommand *command)
{
    this->commands.push_back(command);
}

/**
 * Executes the HelpCommand by printing the usage instructions for all registered commands.
 *
 * @param inputVector Unused in this implementation.
 * @param users Unused in this implementation.
 */
void HelpCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users)
{
    for (ICommand *command : this->commands)
    {
        command->print();
    }
}

/**
 * Prints the usage instructions for the HelpCommand.
 */
void HelpCommand::print()
{
    cout << "help" << endl;
}

/**
 * Validates the input for the HelpCommand, ensuring the input vector is empty.
 *
 * @param inputVector A vector of strings representing user input.
 * @return true if the input vector is empty, false otherwise.
 */
bool HelpCommand::isValid(vector<string> &inputVector)
{
    if (!inputVector.empty())
    {
        return false;
    }
    return true;
}
