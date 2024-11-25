#include <cstdlib>
#include <cstring>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <set>
#include <vector>
#include "ICommand.h"
#include "Ihelp.h"
#include "AddCommand.cpp"
#include "RecommendCommand.cpp"
#include "Help.cpp"
#include "User.h"
#include "Movie.h"
#define PATH "../data/userData.txt"

using namespace std;

class App {
    public:

        int run() {
            try { 
                main();
            } catch(...) {
                return -1;
            }
            return 0;
        }

    vector<User> createUserMap(ifstream &file)
{
    vector<User> users;
    string line;
    string word;
    string user;
    vector<Movie> movies;
    int counter = 0;
    while (getline(file, line))
    {
        istringstream stream(line);
        counter = 0;
        while (stream >> word)
        {
            if (counter == 0)
            {
                user = word; // First word is the user
            }
            else
            {
                movies.push_back(Movie(word)); // Remaining words are movies
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
    ICommand *recommend = new RecommendCommand();
    Help *help = new Help();
    commands["add"] = add;
    commands["recommend"] = recommend;
    commands["help"] = help;
    help->getCommands(commands);
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
        if (task == "help") {
            commands[task]->execute();
        }
        inputVector.erase(inputVector.begin());
        if (inputVector.size() > 1)
        {
            commands[task]->execute(std::move(inputVector), std::move(users));
        }
    }
    return 0;
}
};