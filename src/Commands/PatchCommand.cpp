#include "../Headers/PatchCommand.h"

int PatchCommand::isValid(vector<string> &inputVector, vector<User> &users)
{
    vector <ID_TYPE> inputAfterConversion = util::changeVectorType(inputVector);
    if (inputVector.size() <= 1)
    {
        return 400;
    }
    else if (inputAfterConversion.empty() && !inputVector.empty())
    {
        return 400;
    }
    // the user does not exist in the system
    if(util::findUserByID(users, inputAfterConversion[0]) == -1){
        return 404;
    }
    return 0;
};

string PatchCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users){
    AddCommand::execute(inputVector, users);
        return "204 No Content\n";
    
}

string PatchCommand::print(){
    return "patch, arguments: [existinguserid] [movieid1] [movieid2] ...\n";
};

string PatchCommand::getName() {
    return "patch";
};