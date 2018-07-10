import Axios from "axios";
import cloudinary from "cloudinary";
import Fs from "fs";
import MzFs from "mz/fs";
import Path from "path";

const downloadImage = async photoUrl => {
  const url = photoUrl;

  const path = Path.resolve(__dirname, "images", "slackUpload.jpg");

  const response = await Axios({
    method: "GET",
    url,
    responseType: "stream",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`
    }
  });

  response.data.pipe(Fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", () => {
      reject();
    });
  });
};

const cloudinaryUpload = async (slackUrl: string) => {
  downloadImage(slackUrl);
  try {
    const file = await MzFs.readFile(
      Path.join(__dirname, "images/slackUpload.jpg")
    );
    const result = await cloudinary.uploader.upload(file);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default cloudinaryUpload;
