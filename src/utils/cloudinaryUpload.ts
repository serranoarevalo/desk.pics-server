import Axios from "axios";
import cloudinary from "cloudinary";
import Fs from "fs";

import Path from "path";

const downloadImage = async (photoUrl: string, name: string) => {
  const url = photoUrl;

  const path = Path.resolve(__dirname, `${name}.jpg`);

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

const cloudinaryUpload = async (slackUrl: string): Promise<string | null> => {
  const name = Math.random()
    .toString(36)
    .substr(2);

  await downloadImage(slackUrl, name);

  const result = await cloudinary.uploader.upload(
    Path.join(__dirname, `${name}.jpg`)
  );

  Fs.unlink(Path.join(__dirname, `${name}.jpg`), error => console.log(error));

  if (result.secure_url) {
    return result.secure_url;
  } else {
    return null;
  }
};

export default cloudinaryUpload;
