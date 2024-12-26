const net = require('net');

const sendToServer= async(message) =>{
    // Get the destination IP and port from command-line arguments
    const destIp = '127.0.0.1';
    const destPort = 7071;

    // Create a TCP socket
    const client = new net.Socket();
    client.connect(destPort, destIp, () => {
        client.write(message); // Send the message
    });

    // Handle data from the server
    client.on('data', (data) => {
        resolve(data.toString()); // Resolve the response
        client.end(); // Close the connection
    });

    // Handle errors
    client.on('error', (err) => {
        reject(`Error: ${err.message}`);
    });

}


const getRecommendation = async (UserID,MovieID) => {

}
const addMovie = async (UserID,MovieID) => {
    const response = await sendToServer('POST 14 2')
    console.log('res: ',response)
}
module.exports = {addMovie,getRecommendation , sendToServer}
