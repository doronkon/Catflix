# Import socket module, AF_INET means we use IPv4 and SOCK_DGRAM means we use UDP protocol
import socket

# Create a socket that uses IPv4 and TCP protocol
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# The destenation ip is ourselvs
dest_ip = '127.0.0.1'

# The server will listen to 12345 port
dest_port = 7070

# Create a TCP connection with the given port and ip
s.connect((dest_ip, dest_port))

# asking for a msg from the client
msg = input()

# keep going till msg is 'quit'
while True:

    # send mdg to the server encoded by utf-8
    s.send(bytes(msg, 'utf-8'))

    # receive data back from the server - 4096 bytes at max
    data = s.recv(4096)

    # printing the data the client received back
    print(data.decode('utf-8'))

    # asking for a msg from the client
    msg = input()

# closing the socket
s.close()