#include "App.h"


using namespace std;

vector<User> App::createUserMap(ifstream &file)
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
void App::helpPrint(vector<User> users)
{
        for (long unsigned int i = 0; i < users.size(); i++)
    {
        cout << "user: "  << to_string(users[i].getUserId()) <<endl;
        vector<Movie> movies = users[i].getUserMovies();
        for (long unsigned int j = 0; j < movies.size(); j++)
        {
            cout << "movie " << movies[j].movieId << endl;
        }
        
    }
}

int App::run()
{
    // Creating the user map out of the file
    ifstream file(PATH);
    vector<User> users = createUserMap(file);
    file.close();
    map<string, ICommand *> commands;
    ICommand *add = new AddCommand();
    ICommand *recommend = new RecommendCommand();
    HelpCommand *help =new HelpCommand();
    commands["add"] = add;
    help->addCommand(add);
    commands["recommend"] = recommend;
    help->addCommand(recommend);
    commands["help"] = help;
    help->addCommand(help);
    //adding to help

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
        // if commands[task]->isValid(inputVector)) {commands[task]->execute(...); } else {continue;}
        if (commands[task] && commands[task]->isValid(inputVector)) {
            vector<ID_TYPE> inputNumbers = changeVectorType(inputVector);
            commands[task]->execute(inputNumbers, users);
        }
    }
    return 0;
}


// Function to change vector type, currently to usigned long int.
vector<ID_TYPE> App::changeVectorType(vector<string> inputStringVector) {
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