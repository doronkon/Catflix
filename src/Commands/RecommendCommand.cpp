#include "../Headers/RecommendCommand.h"

/**
 * Prints the usage instructions for the RecommendCommand.
 */
string RecommendCommand::print()
{
    return "GET, arguments: [userid] [movieid]\n";
}

/**
 * Finds the common movies between the given user and all other users, and calculates a "weight"
 * based on the number of common movies.
 *
 * @param user The user for whom recommendations are being calculated.
 * @param users A reference to a vector of all users to compare against.
 * @return A map where the key is a user ID and the value is the count of common movies with the given user.
 */
map<ID_TYPE, int> RecommendCommand::findCommonMovies(User user, vector<User> &users)
{
    map<ID_TYPE, int> weight;
    vector<Movie> userMovies = user.getUserMovies();
    int userSize = userMovies.size();
    int amountOfUsers = users.size();
    // go through all users
    for (int i = 0; i < amountOfUsers; i++)
    {
        // we don't want to count the amount of common movies for the same user
        if (users[i].getUserId() == user.getUserId())
        {
            continue;
        }
        weight[users[i].getUserId()] = 0;
        // go though all of the movies we want to get a recommendation for
        for (int j = 0; j < user.getUserMovies().size(); j++)
        {
            // go through all movies of some user who is not the user we want to get a recommendation for
            for (int k = 0; k < users[i].getUserMovies().size(); k++)
            {
                if (user.getUserMovies()[j].movieId == users[i].getUserMovies()[k].movieId)
                {
                    weight[users[i].getUserId()]++;
                }
            }
            if (weight[users[i].getUserId()] == 0)
            {
                weight.erase(users[i].getUserId());
            }
        }
    }
    return weight;
}

/**
 * Filters users who have watched the given movie, excluding the specified user.
 *
 * @param movie The movie to check against.
 * @param user The user for whom the recommendations are being generated (excluded from results).
 * @param users A reference to a vector of all users.
 * @return A vector of users who have watched the given movie, excluding the specified user.
 */
vector<User> RecommendCommand::filterUsers(Movie movie, User &user, vector<User> &users)
{
    vector<User> filteredUsers;
    int size = users.size();
    for (int i = 0; i < size; i++)
    {
        if (user.getUserId() == users[i].getUserId())
        {
            continue;
        }
        if (users[i].didIWatch(movie))
        {
            filteredUsers.push_back(users[i]);
        }
    }
    return filteredUsers;
}

/**
 * Filters out movies that have already been watched by the given user or the filtered users,
 * and returns a list of movies that could be recommended.
 *
 * @param filteredUsers A vector of users who have watched the given movie.
 * @param movie The movie to exclude from recommendations if already watched.
 * @param user The user for whom the recommendations are being generated.
 * @return A vector of movies that are eligible for recommendation, without duplicates.
 */

vector<Movie> RecommendCommand::filtermovies(vector<User> filteredUsers, Movie movie, User user)
{
    vector<Movie> filter;
    User emptyUser(0, filter);
    int size = filteredUsers.size();
    int amountOfMovies;
    // going through all filtered users
    for (int i = 0; i < size; i++)
    {
        vector<Movie> curr = filteredUsers[i].getUserMovies();
        amountOfMovies = curr.size();
        // adding movies to filtered movies with no duplications
        for (int j = 0; j < amountOfMovies; j++)
        {
            if (movie.movieId != curr[j].movieId && !emptyUser.didIWatch(curr[j]) && !user.didIWatch(curr[j]))
            {
                filter.push_back(curr[j]);
                emptyUser.addMovie(curr[j]);
            }
        }
    }
    return filter;
}

/**
 * Calculates movie ratings based on the weights of filtered users' movie preferences.
 *
 * @param MovieList A vector of movies to be rated.
 * @param filteredUsers A vector of users who have watched the relevant movies.
 * @param weights A map of user IDs and their corresponding weight (common movie count).
 * @return A map of movie IDs and their corresponding ratings based on user preferences.
 */
map<ID_TYPE, int> RecommendCommand::makingRatings(vector<Movie> MovieList, vector<User> &filteredUsers, map<ID_TYPE, int> weights)
{
    map<ID_TYPE, int> ratings;
    // first we make all ratings zero
    for (Movie curMovie : MovieList)
    {
        ratings[curMovie.movieId] = 0;
    }
    // then we add all the ratings
    int usersSize = filteredUsers.size();
    int moviesSize;
    for (int i = 0; i < usersSize; i++)
    {
        vector<Movie> userMovies = filteredUsers[i].getUserMovies();
        moviesSize = userMovies.size();
        // each movie in his list
        for (int j = 0; j < moviesSize; j++)
        {
            Movie curMovie = userMovies[j];
            ratings[curMovie.movieId] += weights[filteredUsers[i].getUserId()];
        }
    }
    return ratings;
}

/**
 * Sorts a list of movies first by their ID and then by their ratings.
 *
 * @param MovieList A vector of movies to be sorted.
 * @param ratings A map of movie IDs and their corresponding ratings.
 */
void RecommendCommand::sortingMovies(vector<Movie> &MovieList, map<ID_TYPE, int> ratings)
{
    // first we sort by ID
    int moviesSize = MovieList.size();
    for (int i = 0; i < moviesSize - 1; i++)
    {
        for (int j = i + 1; j < moviesSize; j++)
        {
            // swapping movie with  lower ID_TYPE to be
            if (MovieList[i].bigger(MovieList[j]))
            {
                Movie temp = MovieList[i];
                MovieList[i] = MovieList[j];
                MovieList[j] = temp;
            }
        }
    }
    // now we sort by ratings
    for (int i = 0; i < moviesSize - 1; i++)
    {
        for (int j = 0; j < moviesSize - i - 1; j++)
        {
            // swapping movie with  lower ID_TYPE to be
            if (ratings[MovieList[j].movieId] < ratings[MovieList[j + 1].movieId])
            {
                // same swap
                Movie temp = MovieList[j];
                MovieList[j] = MovieList[j + 1];
                MovieList[j + 1] = temp;
            }
        }
    }
}

/**
 * Executes the recommendation process for a given user and movie, generating and displaying a list of recommended movies.
 *
 * @param inputVector A vector containing the user ID and movie ID to base the recommendations on.
 * @param users A reference to a vector of all users for finding common movie preferences.
 */
string RecommendCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users)
{
    global_mutex.lock();
    // here we need to check if user exists
    int place = util::findUserByID(users, inputVector[0]);
    User user = users[place];
    Movie movie(inputVector[1]);
    vector<User> filteredUsers = filterUsers(movie, user, users);
    global_mutex.unlock();

    vector<Movie> MovieList = filtermovies(filteredUsers, movie, user);
    map<ID_TYPE, int> weights = findCommonMovies(user, filteredUsers);
    if (weights.empty())
    {
        return "\n";
    }
    map<ID_TYPE, int> ratings = makingRatings(MovieList, filteredUsers, weights);

    // now we have the ratings map all we need is to sort the movies vector by it
    sortingMovies(MovieList, ratings);
    int moviesSize = MovieList.size();
    //targil 2 print
    string returnValue ="200 Ok\n\n";
    // now we print
    for (int i = 0; i < moviesSize; i++)
    {
        returnValue.append(to_string( MovieList[i].movieId) + ' ');
    }
    returnValue.append("\n");
    return returnValue;
}

/**
 * Validates the input for the RecommendCommand, ensuring the vector has at least two elements
 * and the elements are of valid types.
 *
 * @param inputVector A vector of strings representing user input.
 * @return true if the input is valid, false otherwise.
 */
int RecommendCommand::isValid(vector<string> &inputVector, vector<User> &users)
{
    vector <ID_TYPE> inputAfterConversion = util::changeVectorType(inputVector);
    if (inputVector.size() != 2)
    {
        return 400;
    }
    if (inputAfterConversion.empty() && !inputVector.empty())
    {
        return 400;
    }

    global_mutex.lock();
    if(util::findUserByID(users, inputAfterConversion[0]) == -1){
        global_mutex.unlock();
        return 404;
    }
    int place = util::findUserByID(users, inputAfterConversion[0]);
    User user = users[place];
    Movie movie(inputAfterConversion[1]);
    vector<User> filteredUsers = filterUsers(movie, user, users);
    global_mutex.unlock();
    if (filteredUsers.empty() && !user.didIWatch(movie))
    {
        return 404;
    }
    return 0;
};

string RecommendCommand::getName() {
    return "GET";
};