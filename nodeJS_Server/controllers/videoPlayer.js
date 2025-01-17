const videoService = require('../services/videoPlayer');

const playVideo = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Requires movie ID");
    }
    // Check if Range header exists
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send("Requires Range header");
    }
    
    const [head,stream] = await videoService.playVideo(id,range);
    if(!head){
        res.status(404).send("File not found or other error");
    } else if(!stream){
        res.status(416).send("Requested Range Not Satisfiable")
    }
    res.writeHead(206, head);
    stream.pipe(res);
};

module.exports = { playVideo }
