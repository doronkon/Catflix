#include "ICommand.h"
#include "util.h"

#define PATH "../data/userData.txt"
class AddCommand : public ICommand
{
public:
    void updateUserMovies(ID_TYPE user, vector<User> userMap, int userIndex)
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
            ID_TYPE current;
            util::toNumber(word,current);
            if (user == current)
            {
                lineToChange = currentLine;
            }
            lines.push_back(line);
            currentLine++;
        }
        inputFile.close();

        // Creating the updated line
        string updatedLine = to_string(user) + " ";
        int amountOfMovies = userMap[userIndex].getUserMovies().size();
        for(int i = 0; i < amountOfMovies; i++){
            updatedLine += to_string(userMap[userIndex].getUserMovies()[i].movieId) + " ";
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

    // A function that looks for a user named 'user' in the vector, if it is found, return its index, else return -1
    int findUser(ID_TYPE user, vector<User> &users){
        int size = users.size();
        for(int i = 0; i < size; i++){
            if (user == users[i].getUserId())
            {
                return i;
            }  
        }
        return -1;
    }

    void execute(vector<ID_TYPE> &inputVector, vector<User> &users)
    {
        // Opening the file for writing
        ofstream file(PATH, ios::app);
        ID_TYPE user = inputVector[0];

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

        }
        // The given user was not in the map -> add him to the user vector
        else
        {
            vector<Movie> movies;
            int size = inputVector.size();
            // iterate through the movies, print them to the data and add them to a movie vector
            file << to_string(inputVector[0]) + " ";
            for (int i = 1; i < size; i++)
            {
                movies.push_back(Movie(inputVector[i]));
                file << to_string(inputVector[i]) + " ";
            }
            // create a new user with the created movie vector and add it to the user vector
            User userToAdd(user,movies);
            users.push_back(userToAdd);
            file << endl;
        }
        file.close();
    }

    void print()
    {
        cout << "add [userid] [movieid1] [movieid2] …" << endl;
    }

    bool isValid(vector<string> &inputVector) {
        if (inputVector.size() <= 1) {
            return false;
        }
        else if (changeVectorType(inputVector).empty() && !inputVector.empty()) {
            return false;
        }
        return true;
    }

    vector<ID_TYPE> changeVectorType(vector<string> inputStringVector) {
        int size=inputStringVector.size();
        vector<ID_TYPE> inputNumbers;
        for (int i = 0; i < size; i++)
            {
                ID_TYPE current;
                if (! util::toNumber(inputStringVector[i],current)) {
                    inputNumbers.clear();
                    return inputNumbers;
                }
                inputNumbers.push_back(current);
            }
        return inputNumbers;
    }

};