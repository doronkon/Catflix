#include "util.h"

using namespace std;

//return false if not valid
//else returns true and inserts into number
bool util::toNumber(string  str, ID_TYPE & number)
{
    // Empty string is invalid
    if (str.empty()){ 
        return false;
    }
    if (str[0] == '0')
    {
        //actually 0
        if (str.length()==1)
        {
            number =0;
            return true;
        }
        //starting 0 not 0
        return false;
    }
    

    ID_TYPE  maxAllowedNumber;
     // Convert string to unsigned long int and check for non char or overflow
    number = 0;
    for (char c : str) {
        //makes sure its a digit
        if (!isdigit(c)) {
            return false;
        }
        int digit = c - '0';
        //the maximum allowed number for this digit
        maxAllowedNumber = (ULONG_MAX - digit) / 10;
        if (number > maxAllowedNumber) {
            return false; // Overflow detected
        }
        number *= 10;
        number += digit;
    }
    return true;
}

int util::findUserByID(vector<User> &users , ID_TYPE user)
{
    int size = users.size();
    for(int i = 0; i < size; i++){
        if (users[i].getUserId() == user)
        {
            return i;
        }  
    }
    return -1;
}

vector<ID_TYPE> util::changeVectorType(vector<string> inputStringVector) {
    int size=inputStringVector.size();
    vector<ID_TYPE> inputNumbers;
    for (int i = 0; i < size; i++)
        {
            ID_TYPE current;
            if (! util::toNumber(inputStringVector[i],current)) {
                inputNumbers.clear();
                return inputNumbers;
            }
            inputNumbers.push_back(current);
        }
    return inputNumbers;
}