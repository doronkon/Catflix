#include <cstdlib>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <set>
#include <vector>
#include "ICommand.h"
#include "AddCommand.cpp"
#define PATH "../data/userData.txt"

using namespace std;

map<string, set<string> > createUserMap(ifstream &file)
{
    map<string, set<string> > users;
    string line;
    string word;
    string user;
    set<string> movies;
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
                movies.insert(word); // Remaining words are movies
            }
            counter++; // Increment the counter
        }

        users[user] = movies;
    }

    return users; // Return the map at the end
}

int main()
{
    // Creating the user map out of the file
    ifstream file(PATH);
    map<string, set<string> > users = createUserMap(file);
    file.close();
    map<string, ICommand*> commands;
    ICommand* add = new AddCommand();
    commands["add"] = add;
    while(1) {
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
        if(inputVector.size() > 1){
            commands[task]->execute(inputVector,users);
        }
        
    }

    return 0;
}