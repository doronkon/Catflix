#ifndef CONSOLEMENU_H
#define CONSOLEMENU_H

#include "IMenu.h"  

class ConsoleMenu : public IMenu {
public:
    int nextCommand(); 
};


#endif // CONSOLEMENU_H