// 1. Do all the google cloud storage (GSc file interactions here)
// 2. Keep track of local file interactions

import { Storage } from '@google-cloud/storage';
import fs from 'fs'; //file system
import ffmpeg from 'fluent-ffmpeg'; //ffmpeg

//google cloud storage bucket name need to be globally unique

const storage = new Storage(); //Create an instance of a storage

const rawVideoBucketName = '69-yt-raw-videos'; 
// the place where people upload the raw videos to



/**
 * Creates local directories within docker container for raw and processed videos   
 * 
 */