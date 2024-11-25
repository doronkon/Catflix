#include "App.cpp"

int main()
{
    App app;
    try {
        app.run();
    } catch (...) {
        return -1;
    }
    return 0;
}


