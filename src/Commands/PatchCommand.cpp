#include "../Headers/PatchCommand.h"

bool PatchCommand::isValid(vector<string> &inputVector, vector<User> &users)
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
    // the user does not exist in the system
    if(util::findUserByID(users, inputAfterConversion[0]) == -1){
        return false;
    }
    return true;
};

void PatchCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users){
    AddCommand::execute(inputVector, users);
        cout << to_string(inputVector[0]) << " No Content" << endl;
    
}