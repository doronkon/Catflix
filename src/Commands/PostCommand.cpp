#include "../Headers/PostCommand.h"

int PostCommand::isValid(vector<string> &inputVector, vector<User> &users)
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
    // the user already exist in the system
    global_mutex.lock();
    if(util::findUserByID(users, inputAfterConversion[0]) != -1){
        global_mutex.unlock();
        return 404;
    }
    global_mutex.unlock();
    return 0;
};

string PostCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users){
    AddCommand::execute(inputVector, users);
        return "201 Created\n";
    
}

string PostCommand::print(){
    return  "post, arguments: [non-existinguserid] [movieid1] [movieid2] ...\n";
};

string PostCommand::getName() {
    return "post";
};