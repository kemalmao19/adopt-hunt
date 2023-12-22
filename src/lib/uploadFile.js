"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "sgp",
  endpoint: {
    url: "https://h7w7.sg.idrivee2-18.com"
  },
  credentials: {
    accessKeyId: process.env.AWSS3_ACCESS_KEY,
    secretAccessKey: process.env.AWSS3_SECRET_KEY,
  },
});

export async function uploadFile({ Body, Key, ContentType, Dir }) {
  const bytes = await Body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const command = new PutObjectCommand({
    Bucket: "adopthunt",
    Body: buffer,
    Key: `${Dir}/${Key}`,
    ContentType,
  });

  try {
    const res = await s3Client.send(command);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}