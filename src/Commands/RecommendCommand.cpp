#include "RecommendCommand.h"

    void RecommendCommand::print()
    {
        cout << "recommend [userid] [movieid]" << endl;
    }

    map<ID_TYPE,int> RecommendCommand::findCommonMovies(User user, vector<User> &users){
        map<ID_TYPE,int> weight;
        vector<Movie> userMovies = user.getUserMovies();
        int userSize = userMovies.size();
        int amountOfUsers = users.size();
        // go through all users
        for(int i = 0; i < amountOfUsers; i++){
            // we don't want to count the amount of common movies for the same user
            if(users[i].getUserId() == user.getUserId()){
                continue;
            }
            weight[users[i].getUserId()] = 0;
            // go though all of the movies we want to get a recommendation for
            for(int j = 0; j < user.getUserMovies().size(); j++){
                // go through all movies of some user who is not the user we want to get a recommendation for
                for (int k = 0; k < users[i].getUserMovies().size(); k++){
                    if (user.getUserMovies()[j].movieId == users[i].getUserMovies()[k].movieId)
                    {
                       weight[users[i].getUserId()]++;
                    }
                    
                }
                if(weight[users[i].getUserId()] == 0){
                    weight.erase(users[i].getUserId());
                }
            }
        }
        return weight;
    }
    vector<User> RecommendCommand::filterUsers(Movie movie, User& user, vector<User> &users){
        vector<User> filteredUsers;
        int size = users.size();
        for(int i = 0; i < size; i++){
            if (user.getUserId() == users[i].getUserId())
            {
                continue;
            }
            if(users[i].didIWatch(movie)){
                filteredUsers.push_back(users[i]);
            }
            
        }
        return filteredUsers;
    }

    vector<Movie> RecommendCommand::filtermovies(vector<User> filteredUsers, Movie movie , User user){
        vector<Movie> filter;
        User emptyUser(0,filter);
        int size = filteredUsers.size();
        int amountOfMovies;
        // going through all filtered users
        for(int i = 0; i < size; i++){
            vector<Movie> curr = filteredUsers[i].getUserMovies();
            amountOfMovies = curr.size();
            // adding movies to filtered movies with no duplications
            for(int j = 0; j < amountOfMovies; j++){
                if(movie.movieId != curr[j].movieId && !emptyUser.didIWatch(curr[j]) && !user.didIWatch(curr[j])) {
                    filter.push_back(curr[j]);
                    emptyUser.addMovie(curr[j]);
                }
            }
        }
        return filter;
    }
    map <ID_TYPE , int> RecommendCommand::makingRatings(vector<Movie> MovieList,vector<User>& filteredUsers ,map <ID_TYPE , int> weights){
         map <ID_TYPE , int> ratings;
        //first we make all ratings zero
        for (Movie curMovie : MovieList){
            ratings[curMovie.movieId] = 0;
        }
        //then we add all the ratings
        int usersSize = filteredUsers.size();
        int moviesSize;
        for (int i =0; i < usersSize; i++)
        {
            vector<Movie> userMovies = filteredUsers[i].getUserMovies();
            moviesSize = userMovies.size();
            // each movie in his list
            for (int j = 0; j < moviesSize; j++)
            {
                Movie curMovie = userMovies[j];
                ratings[curMovie.movieId]+=weights[filteredUsers[i].getUserId()]; 
            }
        }
        return ratings;
    }
    void RecommendCommand::sortingMovies(vector<Movie>& MovieList,map <ID_TYPE , int> ratings){
        //first we sort by ID
        int moviesSize = MovieList.size();
        for (int i = 0; i < moviesSize-1; i++)
        {
            for (int j = i+1; j < moviesSize; j++)
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
        //now we sort by ratings
        for (int i = 0; i < moviesSize-1; i++)
        {
            for (int j = 0; j < moviesSize - i - 1; j++)
            {
                // swapping movie with  lower ID_TYPE to be 
                if (ratings[MovieList[j].movieId]<ratings[MovieList[j+1].movieId])
                {
                    //same swap
                    Movie temp = MovieList[j];
                    MovieList[j] = MovieList[j+1];
                    MovieList[j+1] = temp;
                }
            }
        }

    }

    void RecommendCommand::execute(vector<ID_TYPE> &inputVector, vector<User> &users){
        //here we need to check if user exists
        int place = util::findUserByID(users,inputVector[0]);
        if (place == -1 )
        {
            return;
        }
        User user = users[place];
        Movie movie(inputVector[1]);
        vector<User> filteredUsers = filterUsers(movie,user,users);
        if (filteredUsers.empty())
        {
            return;
        }
        vector<Movie> MovieList = filtermovies(filteredUsers, movie,user);
        map <ID_TYPE , int> weights = findCommonMovies(user,filteredUsers);
        if(weights.empty()){
            return;
        }
        map <ID_TYPE , int> ratings = makingRatings(MovieList,filteredUsers,weights);
        
        //now we have the ratings map all we need is to sort the movies vector by it
        sortingMovies(MovieList,ratings);        
        int moviesSize = MovieList.size();
        //now we print
        for(int i = 0; i < moviesSize; i ++){
            cout << MovieList[i].movieId << ' ';
        }
        cout << endl;

    }


    bool RecommendCommand::isValid(vector<string> &inputVector) {
        if (inputVector.size() < 2) {
            return false;
        }
        if (util::changeVectorType(inputVector).empty() && !inputVector.empty()) {
            return false;
        }
        return true;
    };