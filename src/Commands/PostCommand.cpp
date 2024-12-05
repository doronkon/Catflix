#include "../Headers/PostCommand.h"

bool PostCommand::isValid(vector<string> &inputVector, vector<User> &users)
{
    vector <ID_TYPE> inputAfterConversion = util::changeVectorType(inputVector);
    if (inputVector.size() <= 1)
    {
        return false;
    }
    else if (inputAfterConversion.empty() && !inputVector.empty())
    {
        return false;
    }
    // the user already exist in the system
    if(util::findUserByID(users, inputAfterConversion[0]) != -1){
        return false;
    }
    return true;
};

void PostCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users){
    AddCommand::execute(inputVector, users);
        cout << to_string(inputVector[0]) << " Created" << endl;
    
}