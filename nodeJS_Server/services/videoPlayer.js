const fs = require('fs');
const path = require('path');

const playVideo = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send("Requires movie ID");
    }

    const videoPath = path.join(__dirname, '..', 'public', 'actualMovies', id + '.mp4');
    console.log("Video path: ", videoPath);

    // Check if Range header exists
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send("Requires Range header");
    }

    try {
        const videoSize = fs.statSync(videoPath).size;
        console.log("Video size: ", videoSize);

        // Parse the range header
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);

        // Default chunk size
        const chunk_size = 10 ** 6; // 1MB
        let end = start + chunk_size - 1;

        // Ensure the end is within the video size
        end = Math.min(end, videoSize - 1);

        if (start >= videoSize || end >= videoSize || start < 0 || end < 0) {
            return res.status(416).send("Requested Range Not Satisfiable");
        }

        const stream = fs.createReadStream(videoPath, { start, end });
        const contentLength = end - start + 1;

        const head = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        stream.pipe(res);
    } catch (err) {
        console.error("Error playing video: ", err);
        res.status(404).send("File not found or other error");
    }
};

module.exports = { playVideo };
