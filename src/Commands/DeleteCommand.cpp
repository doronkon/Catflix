#include "../Headers/DeleteCommand.h"


bool DeleteCommand::isValid(std::vector<std::string> &inputVector, std::vector<User> &users){
    if (inputVector.size() <= 1)
    {
        return false;
    }
    else if (util::changeVectorType(inputVector).empty() && !inputVector.empty())
    {
        return false;
    }
    return true;
}
void DeleteCommand::print()
{
    //AMSALEM amsalem
}
void DeleteCommand::execute(std::vector<ID_TYPE> &inputVector, std::vector<User> &users){
    // Opening the file for writing
    ofstream file(PATH, ios::app);
    ID_TYPE user = inputVector[0];

    // Check if the given user is already in the user map
    int userIndex = util::findUserByID(users, user);
    //user doesn't exist
    if (userIndex == -1)
    {
        return;
    }
    int size =  inputVector.size();
    for (int i = 1; i < size; i++)
    {
        Movie cur(inputVector[i]);
        if (! users[userIndex].didIWatch(cur))
        {
            return;
        }
    }
    for (int i = 1; i < size; i++)
    {
        Movie cur(inputVector[i]);
        users[userIndex].removeMovie(cur);
    }
    util::updateUserMovies(user, users, userIndex);
    cout << "204 No Content" << endl;
    
}

