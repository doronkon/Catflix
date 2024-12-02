// #include "test.h"
// using namespace std;

// //positive
// TEST(utils , toNumberTest1)
// {
//     ID_TYPE number;
//     EXPECT_EQ(util::toNumber("89", number),89);
// }
// //negative
// TEST(utils , toNumberTest2)
// {
//     ID_TYPE number;
//     EXPECT_EQ(util::toNumber("sffsdfd", number),-1);
// }
// //positive
// TEST(utills, findUserTest1)
// {
//     vector<ID_TYPE> vec;
//     vec.Push_back(200);
//     EXPECT_EQ(util::findUserByID(vec, 200),true);
// }
// //negative
// TEST(utills, findUserTest2)
// {
//     vector<ID_TYPE> vec;
//     vec.Push_back(200);
//     EXPECT_EQ(util::findUserByID(vec, 201),true);
// }
// //positive
// TEST(utills, ChangeVectorTest1)
// {
//     vector<string> strings;
//     strings.Push_back("80");
//     vector<ID_TYPE> vec=util::changeVectorType(strings);
//     EXPECT_EQ(vec[0],80);

// }
// //negative
// TEST(utills, ChangeVectorTest2)
// {
//     vector<string> strings;
//     strings.Push_back("aba");
//     vector<ID_TYPE> vec=util::changeVectorType(strings);
//     EXPECT_EQ(vec.empty(), true);
// }
// //positive
// TEST(Movies, biggerTest1)
// {
//     Movie movie1(124);
//     Movie movie2(123);
//     EXPECT_EQ(movie1.bigger(movie2), true);
// }
// //negative
// TEST(Movies, biggerTest2)
// {
//     Movie movie1(12);
//     Movie movie2(123);
//     EXPECT_EQ(movie1.bigger(movie2), false);
// }
// //positive
// TEST (Users, getUserIDTest1)
// {
//     ID_TYPE id = 103;
//     User user1(id);
//     EXPECT_EQ(user1.getUserId(), id);
// }
// //negative
// TEST (Users, getUserIDTest2)
// {
//     ID_TYPE id = 300;
//     User user1(id);
//     EXPECT_EQ(user1.getUserId() == id-1, false);
// }
// //positive
// TEST (Users, didIWatchTest1)
// {
//     ID_TYPE id = 103;
//     User user1(id);
//     Movie movie1(id + 1);
//     user1.addMovie(movie1)
//     EXPECT_EQ(user1.didIWatch(movie1), true);
// }
// //negative
// TEST (Users, didIWatchTest2)
// {
//     ID_TYPE id = 103;
//     User user1(id);
//     Movie movie1(id + 1);
//     EXPECT_EQ(user1.didIWatch(movie1), false);
// }


