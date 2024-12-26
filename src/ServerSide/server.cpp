// Include needed modules for the program
#include <iostream>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include "../Headers/App.h"
#include <thread>
#include "../Headers/definers.h"

std::mutex global_mutex; 

using namespace std;

int create_connection(int sock)
{
    struct sockaddr_in client_sin;
    unsigned int addr_len = sizeof(client_sin);
    int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);

    if (client_sock < 0)
    {
        perror("error accepting client");
        return -1;
    }
    return client_sock;
}

void handlingThread(App& myApp, int sock)
{
    // create a struct in order to receive data from the client
    int client_sock = create_connection(sock);
    if (client_sock == -1)
    {
        return;
    }

    while (true)
    {
        // receiving data from the client
        char buffer[4096] = {'\0'};
        int expected_data_len = sizeof(buffer);
        int read_bytes = recv(client_sock, buffer, expected_data_len, 0);
        string response ="";
        if (read_bytes == 0)
        {
            client_sock = create_connection(sock);
            continue;
        }
        else if (read_bytes < 0)
        {
            perror("error reciving message");
            break;
        }
        else
        {
            response = myApp.handler(buffer);
        }

        // sending back to the client the data they sent and closing the sockets.
        int sent_bytes = send(client_sock, response.c_str(), response.size() , 0);

        if (sent_bytes < 0)
        {
            perror("error sending to client");
        }
    }
    close(client_sock);
}

int main()
{
    App myApp;
    // create a socket that will listen at 5555 port that uses TCP and IPv4
    const int server_port = 7071;

    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0)
    {
        perror("error creating socket");
    }

    // create a struct for the server
    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(server_port);


    // bind the created socket to the given ip and port
    if (::bind(sock, (struct sockaddr *)&sin, sizeof(sin)) < 0)
    {
        perror("error binding socket");
    }

    // wait for a connection, 5 can wait in line at max in any given time
    if (listen(sock, MAX_CLIENTS) < 0)
    {
        perror("error listening to a socket");
    }

    thread threads[MAX_CLIENTS];
    for (int i = 0; i < MAX_CLIENTS; i++)
    {
        threads[i] = thread(handlingThread , ref(myApp) , sock);
    }
    for (int i = 0; i < MAX_CLIENTS; i++)
    {
        threads[i].join();
    }
    close(sock);
    return 0;
}