#include "ICommand.h"
#define PATH "../data/userData.txt"
class AddCommand : public ICommand
{
public:
    void updateUserMovies(string user, map<string, set<string> > userMap)
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
        for (const string movie : userMap[user])
        {
            updatedLine += movie + " ";
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
    void execute(vector<string> &inputVector, map<string, set<string> > &users)
    {
        // Opening the file for writing
        ofstream file(PATH, ios::app);
        string user = inputVector[0];

        // Check if the given user is already in the user map
        if (users.find(user) != users.end()) // User is in the User map!
        {
            int size = inputVector.size();
            // Iterate through the given movies of the user
            for (int i = 1; i < size; i++)
            {
                // A movie that wasn't there before was detected -> add it to the set of that user
                if (users[user].find(inputVector[i]) == users[user].end())
                {
                    users[user].insert(inputVector[i]);
                }
            }
            updateUserMovies(user, users);

            // The given user was not in the map -> add him to the map
        }
        else
        {
            set<string> movies;
            int size = inputVector.size();
            file << inputVector[0] + " ";
            for (int i = 1; i < size; i++)
            {
                movies.insert(inputVector[i]);
                file << inputVector[i] + " ";
            }
            users[inputVector[0]] = movies;
            file << endl;
        }
        file.close();
    }
};