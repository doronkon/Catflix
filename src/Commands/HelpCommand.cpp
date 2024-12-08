#include "../Headers/HelpCommand.h"

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
string HelpCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users)
{
    // Sort commands alphabetically, but keep "help" last
    std::sort(this->commands.begin(), this->commands.end(),
              [](ICommand *a, ICommand *b) {
                  std::string nameA = a->getName(); // Assuming ICommand has a getName() method
                  std::string nameB = b->getName();
                  
                  if (nameA == "help") return false; // "help" should always go last
                  if (nameB == "help") return true;
                  
                  return nameA < nameB; // Standard alphabetical comparison
              });

    // Print the commands
    string returnValue="";
    for (ICommand *command : this->commands)
    {
        returnValue.append(command->print());
    }
    return returnValue;
}


/**
 * Prints the usage instructions for the HelpCommand.
 */
string HelpCommand::print()
{
    return "help\n";
}

/**
 * Validates the input for the HelpCommand, ensuring the input vector is empty.
 *
 * @param inputVector A vector of strings representing user input.
 * @return true if the input vector is empty, false otherwise.
 */
int HelpCommand::isValid(vector<string> &inputVector, vector<User> &users)
{
    if (!inputVector.empty())
    {
        return 400;
    }
    return 0;
}

string HelpCommand::getName() {
    return "help";
}
