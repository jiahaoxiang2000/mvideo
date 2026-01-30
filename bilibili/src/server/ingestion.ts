import path from "path";
import { randomUUID } from "crypto";
import { probeMedia } from "./ffmpeg";
import {
  AssetRecord,
  MediaMetadata,
  writeAssetRecord,
  writeAssetSource,
} from "./asset-store";

const parseFraction = (value?: string): number | null => {
  if (!value) {
    return null;
  }

  const [numerator, denominator] = value.split("/").map((part) => Number(part));
  if (!numerator || !denominator) {
    return null;
  }

  return numerator / denominator;
};

const sanitizeFilename = (filename: string): string => {
  const base = path.basename(filename).trim();
  if (!base) {
    return "source";
  }

  return base.replaceAll(/[\\/]/g, "_");
};

const extractMetadata = async (sourcePath: string): Promise<MediaMetadata> => {
  const data = await probeMedia(sourcePath);
  const videoStream = data.streams.find(
    (stream) => stream.codec_type === "video",
  );
  const audioStreams = data.streams.filter(
    (stream) => stream.codec_type === "audio",
  );
  const durationSeconds = data.format.duration
    ? Number(data.format.duration)
    : null;

  return {
    durationSeconds: Number.isFinite(durationSeconds) ? durationSeconds : null,
    fps:
      parseFraction(videoStream?.avg_frame_rate) ??
      parseFraction(videoStream?.r_frame_rate),
    width: videoStream?.width ?? null,
    height: videoStream?.height ?? null,
    audioTracks: audioStreams.map((stream) => ({
      index: stream.index,
      codec: stream.codec_name,
      channels: stream.channels,
      sampleRate: stream.sample_rate ? Number(stream.sample_rate) : undefined,
    })),
  };
};

export const ingestUploadedFile = async (file: File): Promise<AssetRecord> => {
  const assetId = randomUUID();
  const originalName = sanitizeFilename(file.name || "source");
  const buffer = Buffer.from(await file.arrayBuffer());
  const sourcePath = await writeAssetSource(assetId, originalName, buffer);
  const metadata = await extractMetadata(sourcePath);

  const record: AssetRecord = {
    id: assetId,
    originalName,
    sourcePath,
    sizeBytes: buffer.byteLength,
    createdAt: new Date().toISOString(),
    metadata,
  };

  await writeAssetRecord(record);
  return record;
};
