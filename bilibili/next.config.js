/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [
    "@ffprobe-installer/ffprobe",
    "@ffprobe-installer/linux-x64",
    "@ffmpeg-installer/ffmpeg",
    "@ffmpeg-installer/linux-x64",
    "fluent-ffmpeg",
  ],
};

module.exports = nextConfig;
