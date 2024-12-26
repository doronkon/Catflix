const net = require('net');

const sendToServer = (message) => {
    return new Promise((resolve, reject) => {
        // Get the destination IP and port
        const destIp = '127.0.0.1';
        const destPort = 7071;

        // Create a TCP socket
        const client = new net.Socket();
        client.connect(destPort, destIp, () => {
            client.write(message); // Send the message
        });

        // Handle data from the server
        client.on('data', (data) => {
            resolve(data.toString()); // Resolve the response with the data
            client.end(); // Close the connection
        });
    });
}


const getRecommendation = async (UserID,MovieID) => {

}
const addMovie = async (UserID,MovieID) => {
    var response = await sendToServer('PATCH ' + UserID + ' ' + MovieID + '\n');
    if(response[0] == '4'){
         response = await sendToServer('POST ' + UserID + ' ' + MovieID + '\n');
    }
    return response;
}
module.exports = {addMovie, getRecommendation , sendToServer}
