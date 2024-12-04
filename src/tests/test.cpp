#include "test.h"
using namespace std;

// Positive test case
TEST(utils, toNumberTest1)
{
    ID_TYPE number;
    EXPECT_EQ(util::toNumber("89", number), true);
}

// Negative test case
TEST(utils, toNumberTest2)
{
    ID_TYPE number;
    EXPECT_EQ(util::toNumber("sffsdfd", number), false);
}

// Positive test case
TEST(utils, toNumberTest3)
{
    ID_TYPE number;
    util::toNumber("89", number);
    EXPECT_EQ(number,89);
}

// Positive test case
TEST(utills, findUserTest1)
{
    vector<User> users;
    ID_TYPE id = 200;
    // Creating a User object with both parameters
    users.push_back(User(id, {})); // Use empty movie list for now
    EXPECT_EQ(util::findUserByID(users, 200), 0);
}

// Negative test case
TEST(utills, findUserTest2)
{
    vector<User> users;
    ID_TYPE id = 200;
    users.push_back(User(id, {}));
    EXPECT_EQ(util::findUserByID(users, 201), -1); // Corrected: should expect false
}

// Positive test case
TEST(utills, ChangeVectorTest1)
{
    vector<string> strings;
    strings.push_back("80"); 
    vector<ID_TYPE> vec = util::changeVectorType(strings);
    EXPECT_EQ(vec[0], 80);
}

// Negative test case
TEST(utills, ChangeVectorTest2)
{
    vector<string> strings;
    strings.push_back("aba"); 
    vector<ID_TYPE> vec = util::changeVectorType(strings);
    EXPECT_EQ(vec.empty(), true);
}

// Positive test case
TEST(Movies, biggerTest1)
{
    Movie movie1(124);
    Movie movie2(123);
    EXPECT_EQ(movie1.bigger(movie2), true);
}

// Negative test case
TEST(Movies, biggerTest2)
{
    Movie movie1(12);
    Movie movie2(123);
    EXPECT_EQ(movie1.bigger(movie2), false);
}

// Positive test case
TEST(Users, getUserIDTest1)
{
    ID_TYPE id = 103;
    vector<Movie> movies; // Create empty movie list
    User user1(id, movies); // Pass movie list to constructor
    EXPECT_EQ(user1.getUserId(), id);
}

// Negative test case
TEST(Users, getUserIDTest2)
{
    ID_TYPE id = 300;
    vector<Movie> movies; // Create empty movie list
    User user1(id, movies); // Pass movie list to constructor
    EXPECT_EQ(user1.getUserId() == id - 1, false);
}

// Positive test case
TEST(Users, didIWatchTest1)
{
    ID_TYPE id = 103;
    vector<Movie> movies; // Create empty movie list
    User user1(id, movies);
    Movie movie1(id + 1);
    user1.addMovie(movie1); 
    EXPECT_EQ(user1.didIWatch(movie1), true);
}

// Negative test case
TEST(Users, didIWatchTest2)
{
    ID_TYPE id = 103;
    vector<Movie> movies; // Create empty movie list
    User user1(id, movies);
    Movie movie1(id + 1);
    EXPECT_EQ(user1.didIWatch(movie1), false);
}