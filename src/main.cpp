#include <cstdlib>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <set>
#include <vector>
#include "ICommand.h"
#include "AddCommand.cpp"
#include "RecommendCommand.cpp"
#include "User.h"
#include "Movie.h"
#include "util.h"
#include "definers.h"
#include "HelpCommand.h"


using namespace std;

vector<User> createUserMap(ifstream &file)
{
    vector<User> users;
    string line;
    string word;
    ID_TYPE user;
    vector<Movie> movies;
    int counter = 0;
    while (getline(file, line))
    {
        movies.clear();
        istringstream stream(line);
        counter = 0;
        while (stream >> word)
        {
            ID_TYPE current;
            util::toNumber(word,current);
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
void helpPrint(vector<User> users)
{
        for (int i = 0; i < users.size(); i++)
    {
        cout << "user: "  << to_string(users[i].getUserId()) <<endl;
        vector<Movie> movies = users[i].getUserMovies();
        for (int j = 0; j < movies.size(); j++)
        {
            cout << "movie " << movies[j].movieId << endl;
        }
        
    }
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
    commands["add"] = add;
    commands["recommend"] = recommend;
    HelpCommand *help =new HelpCommand();
    commands["help"] = help;
    //adding to help
    help->setCommands(commands);

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
            bool flag = true;
            int size=inputVector.size();
            vector<ID_TYPE> inputNumbers;
            for (int i = 0; i < size; i++)
            {
                ID_TYPE current;
                if (! util::toNumber(inputVector[i],current))
                {
                    flag=false;
                }
                inputNumbers.push_back(current);
            }
            if (flag){
                //help
                commands["help"]->execute(inputNumbers, users);
                commands[task]->execute(inputNumbers, users);
            }
        }
    }
    return 0;
}