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
        User test = users[0];
        //findCommonMovies(test,users);
        Movie movie(104);
        vector<User> stam = filterUsers(movie,users[0],users);
        vector<Movie> stamStam = filtermovies(stam, movie);
        for(int i = 0; i < stamStam.size(); i ++){
            cout << stamStam[i].movieId << endl;
        }
    }
};