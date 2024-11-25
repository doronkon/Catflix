#include "util.h"

using namespace std;

#define MAX_INT 2147483647

//return -1 if not valid
//else returns the number 1 -> MAX_INT
int util::toNumber(string  str)
{
    //bigger than max int or empty 
    int n = str.length();
    if (n > 10 || n==0){
        return -1;
    }
    //starting with 0
    if (str[0] == '0')
    {
        return -1;
    }
    //storing the number
    long long number=0;
    for (int i = 0; i < n; i++)
    {
        if (str[i] < '0' || str[i] > '9'){
            return -1;
        }
        number*=10;
        number+= str[i] - '0';
    }
    //chcking if bigger than max int
    if (number > MAX_INT){
        return -1;
    }
    return (int) number;
}