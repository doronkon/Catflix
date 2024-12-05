#include "../Headers/AddCommand.h"


/**
 * Executes the addition of movies for a user, updating or creating user data in the file and user vector.
 *
 * @param inputVector A vector containing the user ID and the list of movie IDs to add.
 * @param users A reference to the vector of User objects to update or expand.
 */
void AddCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users)
{
    // Opening the file for writing
    ofstream file(PATH, ios::app);
    ID_TYPE user = inputVector[0];

    // Check if the given user is already in the user map
    int userIndex = util::findUserByID(users, user);
    if (userIndex != -1) // User is in the User map!
    {
        int size = inputVector.size();
        // Iterate through the given movies of the user
        for (int i = 1; i < size; i++)
        {
            Movie curr(inputVector[i]);
            // A movie that wasn't there before was detected -> add it to the set of that user
            if (!users[userIndex].didIWatch(curr))
            {
                users[userIndex].addMovie(curr);
            }
        }
        util::updateUserMovies(user, users, userIndex);
    }
    // The given user was not in the map -> add him to the user vector
    else
    {
        cout << "entered here "<< endl;
        vector<Movie> movies;
        User userToAdd(user, movies);
        int size = inputVector.size();
        // iterate through the movies, print them to the data and add them to a movie vector
        file << to_string(inputVector[0]) + " ";
        for (int i = 1; i < size; i++)
        {
            Movie curr(inputVector[i]);
            if (!userToAdd.didIWatch(curr))
            {
                userToAdd.addMovie(curr);
                file << to_string(inputVector[i]) + " ";
            }
        }
        // create a new user with the created movie vector and add it to the user vector
        users.push_back(userToAdd);
        file << endl;
    }
    file.close();
}

/**
 * Prints the usage instructions for the AddCommand. Will be used over at "Help" command
 */
void AddCommand::print()
{
    cout << "add [userid] [movieid1] [movieid2] …" << endl;
}

/**
 * Validates the input vector for the AddCommand, ensuring it has sufficient elements and valid types.
 *
 * @param inputVector A vector of strings representing user input.
 * @return true if the input is valid, false otherwise.
 */
bool AddCommand::isValid(vector<string> &inputVector, std::vector<User> &users)
{
    if (inputVector.size() <= 1)
    {
        return false;
    }
    else if (util::changeVectorType(inputVector).empty() && !inputVector.empty())
    {
        return false;
    }
    return true;
};