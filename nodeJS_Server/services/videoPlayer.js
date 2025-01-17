const fs = require('fs');
const path = require('path');

const playVideo = async (id, range) => {

    const videoPath = path.join(__dirname, '..', 'public', 'actualMovies', id + '.mp4');

    try {
            const videoSize = fs.statSync(videoPath).size;
            
        // Parse the range header
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);

        // Default chunk size
        const chunk_size = 10 ** 6; // 1MB
        let end = start + chunk_size - 1;

        // Ensure the end is within the video size
        end = Math.min(end, videoSize - 1);

        if (start >= videoSize || end >= videoSize || start < 0 || end < 0) {
            return ["ab",null];
        }

        const stream = fs.createReadStream(videoPath, { start, end });
        const contentLength = end - start + 1;

        const head = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };
        return [head, stream];
    } catch (err) {
        console.error("Error playing video: ", err);
        return [null,"ab"];
    }
};

module.exports = { playVideo };
