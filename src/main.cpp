#include <cstdlib>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <set>
#include "User.h"

using namespace std;
void printMapWithSet(const map<string, set<string> >& myMap) {
    for (const auto& pair : myMap) {
        // Print the key
        cout << "Key: " << pair.first << endl;

        // Access and print the set of values
        const auto& values = pair.second;
        cout << "    Values: ";
        for (const auto& value : values) {
            cout << value << " ";
        }
        cout << endl;
    }
}
map<string, set<string> > createUserMap(ifstream& file) {
    map<string, set<string> > users;
    string line;
    
    while (getline(file, line)) {
        istringstream stream(line);
        string word;
        string user;
        set<string> movies;
        int counter = 0;
        
        while (stream >> word) {
            if (counter == 0) {
                user = word; // First word is the user
            } else {
                movies.insert(word); // Remaining words are movies
            }
            counter++; // Increment the counter
        }
        
        users[user] = movies;
    }
    
    return users; // Return the map at the end
}
void updateUserMovies(string user, map<string, set<string> > userMap){
    ifstream inputFile("../data/userData.txt");
    vector<string> lines;
    string line;
    int currentLine = 0;
    int lineToChange = 0;
    while (getline(inputFile, line)) {
        istringstream stream(line);
        string word;
        stream >> word;
        if(user == word) {
            lineToChange = currentLine;
        }
        lines.push_back(line);
        currentLine++;
    }
    inputFile.close();
    string updatedLine = user + " ";
    for(const auto& movie:userMap[user]){
        updatedLine += movie + " ";
    }
    lines[lineToChange] = updatedLine;
    
    ofstream file("../data/userData.txt", ios::trunc);
    int size = lines.size();
    for(int i = 0; i < size; i ++){
        file << lines[i] << endl;
    }
    file.close();
}

void add(vector<string> inputVector){
    ifstream file("../data/userData.txt");
    // If file in empty - just write into it
    if (file.peek() == std::ifstream::traits_type::eof()) {
        file.close();
        ofstream file("../data/userData.txt", ios::app);
        if(!file){
            cerr << "error" << endl;
        }
        
        int size = inputVector.size();
        for(int i = 0; i < size; i++){
            file << inputVector[i] + " ";
        }
        file << endl;
        file.close();
    // If file is not empty - create a map where each key is a user and he has a set of movies
    } else {
        map<string,set<string> > users = createUserMap(file);
        ofstream file("../data/userData.txt", ios::app);
        string user = inputVector[0];
        // Check if the given user is already in the user map
        if (users.find(user) != users.end()) // User is in the User map!
        {
            int size = inputVector.size();
            // Iterate through the given movies of the user
            for(int i = 1; i < size; i++){
                // A movie that wasn't there before was detected -> add it to the set of that user
                if(users[user].find(inputVector[i]) == users[user].end()) {
                    users[user].insert(inputVector[i]);
                }
            }
            updateUserMovies(user, users);
        // The given user was not in the map -> add him to the map
        } else {
            set<string> movies;
            int size = inputVector.size();
            file << inputVector[0] + " ";
            for(int i = 1; i < size; i++){
                movies.insert(inputVector[i]);
                file << inputVector[i]+ " ";
            }
            file << endl;
        }
        file.close();
        printMapWithSet(users);
    }
}
int main() {
    string input;
    getline(cin, input);
    istringstream stream(input);
    string singleWord;
    vector<string> inputVector;
    while(stream >> singleWord){
        inputVector.push_back(singleWord);
    }
    add(inputVector);
    return 0;
}