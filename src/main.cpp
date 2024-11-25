#include <cstdlib>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <set>
#include <vector>
#include "ICommand.h"
#include "AddCommand.cpp"
#include "User.h"
#include "Movie.h"
#include "util.h"
#define PATH "../data/userData.txt"

using namespace std;

vector<User> createUserMap(ifstream &file)
{
    vector<User> users;
    string line;
    string word;
    int user;
    vector<Movie> movies;
    int counter = 0;
    while (getline(file, line))
    {
        istringstream stream(line);
        counter = 0;
        while (stream >> word)
        {
            int current = util::toNumber(word);
            if (counter == 0)
            {
                user = current; // First word is the user
            }
            else
            {
                movies.push_back(Movie(current)); // Remaining words are movies
            }
            counter++; // Increment the counter
        }
        User userToAdd(user,movies);
        users.push_back(userToAdd);
    }

    return users; // Return the map at the end
}

int main()
{
    // Creating the user map out of the file
    ifstream file(PATH);
    vector<User> users = createUserMap(file);
    file.close();
    map<string, ICommand *> commands;
    ICommand *add = new AddCommand();
    commands["add"] = add;
    while (1)
    {
        string input;
        getline(cin, input);
        istringstream stream(input);
        string singleWord;
        vector<string> inputVector;
        while (stream >> singleWord)
        {
            inputVector.push_back(singleWord);
        }
        string task = inputVector[0];
        inputVector.erase(inputVector.begin());
        if (inputVector.size() > 1)
        {
            int size=inputVector.size();
            vector<int> inputNumbers;
            for (int i = 0; i < size; i++)
            {
                printf("%d\n",util::toNumber(inputVector[i]));
                inputNumbers.push_back(util::toNumber(inputVector[i]));
            }
            
            commands[task]->execute(inputNumbers, users);
        }
    }
    return 0;
}