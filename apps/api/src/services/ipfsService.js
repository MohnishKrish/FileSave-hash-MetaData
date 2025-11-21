import { create } from "ipfs-http-client";
import fs from "fs";

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const uploadToIPFS = async (filePath) => {
  try {
    const file = fs.readFileSync(filePath);
    const result = await client.add(file);
    return result.cid.toString();
  } catch (err) {
    console.error("Upload error =>", err);
    throw err;
  }
};