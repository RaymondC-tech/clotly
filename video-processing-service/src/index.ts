import express from "express";
import ffmpeg from 'fluent-ffmpeg' //way to use CLI tool outside of command line


const app = express()
app.use(express.json());


app.post("/process-video", (req, res) => {
    // get path of input video file from request body since this is a post 
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    //Process video using ffmpg

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad request")
    }

    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360") //360p
        .on("end", () => {
            res.status(200).send("Processing Finish")
        })
        .on("error", (err) => {
            console.log(`Error ${err.message}`);
            res.status(500).send(`Internal Server Error ${err.message}`)
        })
        .save(outputFilePath);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video Processin at http://localhost:${port}`)
});  //starts the server