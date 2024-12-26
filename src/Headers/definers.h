#ifndef DEFINERS_H
#define DEFINERS_H

 #include <mutex>

#define ID_TYPE unsigned long int
#define PATH "data/userData.txt"
 //#define PATH "/Catflix/data/userData.txt"

 #define MAX_CLIENTS 20



// Declare the global mutex
extern std::mutex global_mutex;

#endif
