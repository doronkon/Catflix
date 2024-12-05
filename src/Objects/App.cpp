#include "../Headers/App.h"

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
            util::toNumber(word, current);
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
        User userToAdd(user, movies);
        users.push_back(userToAdd);
    }

    return users; // Return the map at the end
}
void App::helpPrint(vector<User> users)
{
    for (long unsigned int i = 0; i < users.size(); i++)
    {
        cout << "user: " << to_string(users[i].getUserId()) << endl;
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
    ICommand *post = new PostCommand();
    ICommand *patch = new PatchCommand();
    ICommand *recommend = new RecommendCommand();
    ICommand* deleteC = new DeleteCommand();
    HelpCommand *help = new HelpCommand();
    commands["post"] = post;
    help->addCommand(post);
    commands["patch"] = patch;
    help->addCommand(patch);
    commands["DELETE"] = deleteC;
    help->addCommand(deleteC);
    commands["GET"] = recommend;
    help->addCommand(recommend);
    commands["help"] = help;
    help->addCommand(help);
    // adding to help

    while (true) {
        string input;
        getline(cin, input);
        if (input.empty() || input.find('\t') != std::string::npos)
        {
            continue;
        }
        istringstream stream(input);
        string singleWord;
        vector<string> inputVector;

        while (stream >> singleWord) {
            inputVector.push_back(singleWord);
        }

        if (!inputVector.empty()) {
            string task = inputVector[0];
            inputVector.erase(inputVector.begin());

            if (commands[task] && commands[task]->isValid(inputVector, users)) {
                vector<ID_TYPE> inputNumbers = util::changeVectorType(inputVector);
                commands[task]->execute(inputNumbers, users);
            }
        }
    }
    return 0;
}
