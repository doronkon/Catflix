// #include "test.h"
// std::mutex global_mutex;
// using namespace std;

// // Positive test case
// TEST(utils, toNumberTest1)
// {
//     ID_TYPE number;
//     EXPECT_EQ(util::toNumber("89", number), true);
// }

// // Negative test case
// TEST(utils, toNumberTest2)
// {
//     ID_TYPE number;
//     EXPECT_EQ(util::toNumber("sffsdfd", number), false);
// }

// // Positive test case
// TEST(utils, toNumberTest3)
// {
//     ID_TYPE number;
//     util::toNumber("89", number);
//     EXPECT_EQ(number,89);
// }

// // Positive test case
// TEST(utills, findUserTest1)
// {
//     vector<User> users;
//     ID_TYPE id = 200;
//     // Creating a User object with both parameters
//     users.push_back(User(id, {})); // Use empty movie list for now
//     EXPECT_EQ(util::findUserByID(users, 200), 0);
// }

// // Negative test case
// TEST(utills, findUserTest2)
// {
//     vector<User> users;
//     ID_TYPE id = 200;
//     users.push_back(User(id, {}));
//     EXPECT_EQ(util::findUserByID(users, 201), -1); // Corrected: should expect false
// }

// // Positive test case
// TEST(utills, ChangeVectorTest1)
// {
//     vector<string> strings;
//     strings.push_back("80"); 
//     vector<ID_TYPE> vec = util::changeVectorType(strings);
//     EXPECT_EQ(vec[0], 80);
// }

// // Negative test case
// TEST(utills, ChangeVectorTest2)
// {
//     vector<string> strings;
//     strings.push_back("aba"); 
//     vector<ID_TYPE> vec = util::changeVectorType(strings);
//     EXPECT_EQ(vec.empty(), true);
// }

// // Positive test case
// TEST(Movies, biggerTest1)
// {
//     Movie movie1(124);
//     Movie movie2(123);
//     EXPECT_EQ(movie1.bigger(movie2), true);
// }

// // Negative test case
// TEST(Movies, biggerTest2)
// {
//     Movie movie1(12);
//     Movie movie2(123);
//     EXPECT_EQ(movie1.bigger(movie2), false);
// }

// // Positive test case
// TEST(Users, getUserIDTest1)
// {
//     ID_TYPE id = 103;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies); // Pass movie list to constructor
//     EXPECT_EQ(user1.getUserId(), id);
// }

// // Negative test case
// TEST(Users, getUserIDTest2)
// {
//     ID_TYPE id = 300;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies); // Pass movie list to constructor
//     EXPECT_EQ(user1.getUserId() == id - 1, false);
// }

// // Positive test case
// TEST(Users, didIWatchTest1)
// {
//     ID_TYPE id = 103;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id + 1);
//     user1.addMovie(movie1); 
//     EXPECT_EQ(user1.didIWatch(movie1), true);
// }

// // Negative test case
// TEST(Users, didIWatchTest2)
// {
//     ID_TYPE id = 103;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id + 1);
//     EXPECT_EQ(user1.didIWatch(movie1), false);
// }

// //is valid tests

// //delete

// //id doesnt exist
// TEST(DeleteCommand,isValidTest1)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     User user2(id+1, movies);
//     User user3(id+2, movies);
//     User user4(id+3, movies);
//     users.push_back(user1);
//     users.push_back(user2);
//     users.push_back(user3);
//     users.push_back(user4);
//     vector<string> inputVector;
//     //id
//     inputVector.push_back("1");
//     inputVector.push_back(to_string(id));
//     DeleteCommand* del = new DeleteCommand();
//     EXPECT_EQ(del->isValid(inputVector,users), 404);

// }
// //movie doesnt exist for this user
// TEST(DeleteCommand,isValidTest2)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     User user2(id+1, movies);
//     Movie movie2(id+1);
//     user2.addMovie(movie2);
//     User user3(id+2, movies);
//     User user4(id+3, movies);
//     users.push_back(user1);
//     users.push_back(user2);
//     users.push_back(user3);
//     users.push_back(user4);
//     vector<string> inputVector;
//     //id
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id+1));
//     DeleteCommand* del = new DeleteCommand();
//     EXPECT_EQ(del->isValid(inputVector,users), 404);
// }

// //empty vector test
// TEST(DeleteCommand,isValidTest3)
// {
//     vector<User> users;
//     vector<string> inputVector;
//     DeleteCommand* del = new DeleteCommand();
//     EXPECT_EQ(del->isValid(inputVector,users), 400);
// }

// //help

// //empty vector test
// TEST(HelpCommand,isValidTest1)
// {
//     vector<User> users;
//     vector<string> inputVector;
//     HelpCommand* hel = new HelpCommand();
//     EXPECT_EQ(hel->isValid(inputVector,users), 0);
// }

// //not empty vector test
// TEST(HelpCommand,isValidTest2)
// {
//     vector<User> users;
//     vector<string> inputVector;
//     inputVector.push_back("something");
//     HelpCommand* hel = new HelpCommand();
//     EXPECT_EQ(hel->isValid(inputVector,users), 400);
// }

// //patch

// //id doesnt exist
// TEST(PatchCommand,isValidTest1)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     User user2(id+1, movies);
//     User user3(id+2, movies);
//     User user4(id+3, movies);
//     users.push_back(user1);
//     users.push_back(user2);
//     users.push_back(user3);
//     users.push_back(user4);
//     vector<string> inputVector;
//     //id
//     inputVector.push_back("1");
//     inputVector.push_back(to_string(id));
//     PatchCommand* pat = new PatchCommand();
//     EXPECT_EQ(pat->isValid(inputVector,users), 404);

// }

// //he has one movie and he doesnt have the other one - valid
// TEST(PatchCommand,isValidTest2)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     users.push_back(user1);
//     User user2(id+1, movies);
//     Movie movie2(id+1);
//     user2.addMovie(movie2);
//     users.push_back(user2);
//     User user3(id+2, movies);
//     users.push_back(user3);
//     User user4(id+3, movies);
//     users.push_back(user4);

//     vector<string> inputVector;
//     //id
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id+1));
//     PatchCommand* pat = new PatchCommand();
//     EXPECT_EQ(pat->isValid(inputVector,users), 0);
// }

// //empty vector test
// TEST(PatchCommand,isValidTest3)
// {
//     vector<User> users;
//     vector<string> inputVector;
//     PatchCommand* pat = new PatchCommand();
//     EXPECT_EQ(pat->isValid(inputVector,users), 400);
// }

// //Post Command

// //id doesnt exist - valid
// TEST(PostCommand,isValidTest1)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     users.push_back(user1);
//     User user2(id+1, movies);
//     User user3(id+2, movies);
//     User user4(id+3, movies);
//     users.push_back(user2);
//     users.push_back(user3);
//     users.push_back(user4);

//     vector<string> inputVector;
//     //id
//     inputVector.push_back("1");
//     inputVector.push_back(to_string(id));
//     PostCommand* pos = new PostCommand();
//     EXPECT_EQ(pos->isValid(inputVector,users), 0);

// }

// //id does exist - invalid
// TEST(PostCommand,isValidTest2)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     User user2(id+1, movies);
//     Movie movie2(id+1);
//     user2.addMovie(movie2);
//     User user3(id+2, movies);
//     User user4(id+3, movies);
//     users.push_back(user1);
//     users.push_back(user2);
//     users.push_back(user3);
//     users.push_back(user4);
//     vector<string> inputVector;
//     //id
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id+1));
//     PostCommand* pos = new PostCommand();
//     EXPECT_EQ(pos->isValid(inputVector,users), 404);
// }

// //empty vector test
// TEST(PostCommand,isValidTest3)
// {
//     vector<User> users;
//     vector<string> inputVector;
//     PostCommand* pos = new PostCommand();
//     EXPECT_EQ(pos->isValid(inputVector,users), 400);
// }

// //Recommend Command

// //id doesnt exist - invalid
// TEST(RecommendCommand,isValidTest1)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     User user2(id+1, movies);
//     User user3(id+2, movies);
//     User user4(id+3, movies);
//     users.push_back(user1);
//     users.push_back(user2);
//     users.push_back(user3);
//     users.push_back(user4);
//     vector<string> inputVector;
//     //id
//     inputVector.push_back("1");
//     inputVector.push_back(to_string(id));
//     RecommendCommand* rec = new RecommendCommand();
//     EXPECT_EQ(rec->isValid(inputVector,users), 404);

// }

// //movie doesnt exist - ok
// TEST(RecommendCommand,isValidTest2)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     User user2(id+1, movies);
//     Movie movie2(id+1);
//     user2.addMovie(movie2);
//     User user3(id+2, movies);
//     User user4(id+3, movies);
//     users.push_back(user1);
//     users.push_back(user2);
//     users.push_back(user3);
//     users.push_back(user4);
//     vector<string> inputVector;
//     //id
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id+2));
//     RecommendCommand* rec = new RecommendCommand();
//     EXPECT_EQ(rec->isValid(inputVector,users), 0);
// }

// //empty vector test
// TEST(RecommendCommand,isValidTest3)
// {
//     vector<User> users;
//     vector<string> inputVector;
//     RecommendCommand* rec = new RecommendCommand();
//     EXPECT_EQ(rec->isValid(inputVector,users), 400);
// }

// //more than two arguments
// TEST(RecommendCommand,isValidTest4)
// {
//     ID_TYPE id = 100;
//     vector<User> users;
//     vector<Movie> movies; // Create empty movie list
//     User user1(id, movies);
//     Movie movie1(id);
//     user1.addMovie(movie1);
//     User user2(id+1, movies);
//     Movie movie2(id+1);
//     user2.addMovie(movie2);
//     User user3(id+2, movies);
//     User user4(id+3, movies);
//     users.push_back(user1);
//     users.push_back(user2);
//     users.push_back(user3);
//     users.push_back(user4);
//     vector<string> inputVector;
//     //id
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id));
//     inputVector.push_back(to_string(id+1));
//     RecommendCommand* rec = new RecommendCommand();
//     EXPECT_EQ(rec->isValid(inputVector,users), 400);
// }