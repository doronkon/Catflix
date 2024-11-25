#include "ICommand.h"
#define PATH "../data/userData.txt"

class RecommendCommand : public ICommand {

    void execute(vector<string>&& inputVector = vector<string>{}, 
                            vector<User>&& users = vector<User>{}) {
                                return;
                            }
    
    void helpPrint() {
        cout << "recommend [userid] [movieid]" << endl;
    
    }
};