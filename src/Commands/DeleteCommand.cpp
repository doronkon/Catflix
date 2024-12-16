#include "../Headers/DeleteCommand.h"


int DeleteCommand::isValid(vector<string> &inputVector, vector<User> &users)
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
    global_mutex.lock();
    // the user doesn't exist in the system
    if(util::findUserByID(users, inputAfterConversion[0]) == -1){
        global_mutex.unlock();
        return 404;
    }
    int place = util::findUserByID(users, inputAfterConversion[0]);
    int size =  inputAfterConversion.size();
    for (int i = 1; i < size; i++)
    {
        Movie cur(inputAfterConversion[i]);
        if (! users[place].didIWatch(cur))
        {
            global_mutex.unlock();
            return 404;
        }
    }
    global_mutex.unlock();
    return 0;
};

string DeleteCommand::print()
{
    return "DELETE, arguments [userid] [movieid1] [movieid2] ...\n";
}
string DeleteCommand::execute(std::vector<ID_TYPE> &inputVector, std::vector<User> &users){
    global_mutex.lock();
    // Opening the file for writing
    ofstream file(PATH, ios::app);
    ID_TYPE user = inputVector[0];

    // Check if the given user is already in the user map
    int userIndex = util::findUserByID(users, user);
    int size =  inputVector.size();

    for (int i = 1; i < size; i++)
    {
        Movie cur(inputVector[i]);
        users[userIndex].removeMovie(cur);
    }
    util::updateUserMovies(user, users, userIndex);
    global_mutex.unlock();
    return "204 No Content\n";
}

string DeleteCommand::getName() {
    return "DELETE";
}

