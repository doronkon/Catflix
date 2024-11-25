#include "ICommand.h"
#define PATH "../data/userData.txt"
class AddCommand : public ICommand
{
public:
    void updateUserMovies(string user, vector<User> userMap, int userIndex)
    {
        // Opening the file for reading
        ifstream inputFile(PATH);
        vector<string> lines;
        string line;
        string word;
        int currentLine = 0;
        int lineToChange = 0;
        // Finding the line we want to update
        while (getline(inputFile, line))
        {
            istringstream stream(line);
            stream >> word;
            if (user == word)
            {
                lineToChange = currentLine;
            }
            lines.push_back(line);
            currentLine++;
        }
        inputFile.close();

        // Creating the updated line
        string updatedLine = user + " ";
        int amountOfMovies = userMap[userIndex].getUserMovies().size();
        for(int i = 0; i < amountOfMovies; i++){
            updatedLine += userMap[userIndex].getUserMovies()[i].movieId + " ";
        }
        lines[lineToChange] = updatedLine;
        // copying all line and the updated one
        ofstream file(PATH, ios::trunc);
        int size = lines.size();
        for (int i = 0; i < size; i++)
        {
            file << lines[i] << endl;
        }
        file.close();
    }

    int findUser(string user, vector<User> &users){
        int size = users.size();
        for(int i = 0; i < size; i++){
            if (user == users[i].getUserId())
            {
                return i;
            }  
        }
        return -1;
    }

    void execute(vector<string> &inputVector, vector<User> &users)
    {
        // Opening the file for writing
        ofstream file(PATH, ios::app);
        string user = inputVector[0];

        // Check if the given user is already in the user map
        int userIndex = findUser(user,users);
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
            updateUserMovies(user, users, userIndex);

            // The given user was not in the map -> add him to the map
        }
        else
        {
            vector<Movie> movies;
            int size = inputVector.size();
            file << inputVector[0] + " ";
            for (int i = 1; i < size; i++)
            {
                movies.push_back(Movie(inputVector[i]));
                file << inputVector[i] + " ";
            }
            User userToAdd(user,movies);
            users.push_back(userToAdd);
            file << endl;
        }
        file.close();
    }
};