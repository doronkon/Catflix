#include "ICommand.h"
#define PATH "../data/userData.txt"

class RecommendCommand : public ICommand {
public:
    void print()
    {
        cout << "recommend [userid] [movieid]" << endl;
    }

    void findCommonMovies(User user, vector<User> &users){
        vector<Movie> userMovies = user.getUserMovies();
        int userSize = userMovies.size();
        int amountOfUsers = users.size();
        int common;
        // go through all users
        for(int i = 0; i < amountOfUsers; i++){
            common = 0;
            // we don't want to count the amount of common movies for the same user
            if(users[i].getUserId() == user.getUserId()){
                continue;
            }
            // go though all of the movies we want to get a recommendation for
            for(int j = 0; j < user.getUserMovies().size(); j++){
                // go through all movies of some user who is not the user we want to get a recommendation for
                for (int k = 0; k < users[i].getUserMovies().size(); k++){
                    if (user.getUserMovies()[j].movieId == users[i].getUserMovies()[k].movieId)
                    {
                       common++;
                    }
                    
                }
            }
        }
    }

    vector<User> filterUsers(Movie movie, User user, vector<User> &users){
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

    vector<Movie> filtermovies(vector<User> filteredUsers, Movie movie){
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
                if(movie.movieId != curr[j].movieId && !emptyUser.didIWatch(curr[j])) {
                    filter.push_back(curr[j]);
                    emptyUser.addMovie(curr[j]);
                }
            }
        }
        return filter;
    }

    void execute(vector<ID_TYPE> &inputVector, vector<User> &users){
        //here we need to check if user exists
        User test = users[0];
        //findCommonMovies(test,users);
        Movie movie(104);
        vector<User> filteredUsers = filterUsers(movie,users[0],users);
        if (filteredUsers.empty())
        {
            return;
        }
        //maybe change to ID_TYPE vector?
        vector<Movie> MovieList = filtermovies(filteredUsers, movie);
        //we might get weight from rhe function, wait for doron
        map <User , int> weights;
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
                //ratings[curMovie.movieId]+=weights[filteredUsers[i]]; 
            }
            
        }
        //now we have the ratings map all we need is to sort the movies vector by it

        //first we bubble sort by ID
        moviesSize = MovieList.size();
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
        /*
        for (int i = 0; i < moviesSize-1; i++)
        {
            for (int j = i+1; j < moviesSize; j++)
            {
                // swapping movie with  lower ID_TYPE to be 
                if (ratings[MovieList[i].movieId]>ratings[MovieList[j].movieId])
                {
                    //same swap
                    Movie temp = MovieList[i];
                    MovieList[i] = MovieList[j];
                    MovieList[j] = temp;
                }
            }
        }
        */
        //now we print
        for(int i = 0; i < moviesSize; i ++){
            cout << MovieList[i].movieId << " , ";
        }
        cout << endl;
        

    }
};