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
    // the user doesn't exist in the system
    if(util::findUserByID(users, inputAfterConversion[0]) == -1){
        return 404;
    }
    int place = util::findUserByID(users, inputAfterConversion[0]);
    User user = users[place];
    Movie movie(inputAfterConversion[1]);
    if (!user.didIWatch(movie)) { 
        return 400;
    }
    return 0;
};

void DeleteCommand::print()
{
    cout << "DELETE, arguments [userid] [movieid1] [movieid2] ..." << endl;
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

string DeleteCommand::getName() {
    return "DELETE";
}

