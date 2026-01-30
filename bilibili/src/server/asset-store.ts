import { promises as fs } from "fs";
import path from "path";

export type AudioTrackInfo = {
  index: number;
  codec?: string;
  channels?: number;
  sampleRate?: number;
};

export type MediaMetadata = {
  durationSeconds: number | null;
  fps: number | null;
  width: number | null;
  height: number | null;
  audioTracks: AudioTrackInfo[];
};

export type AssetRecord = {
  id: string;
  originalName: string;
  sourcePath: string;
  sizeBytes: number;
  createdAt: string;
  metadata: MediaMetadata;
};

const defaultStorageRoot = path.join(process.cwd(), "storage");

export const getStorageRoot = (): string => {
  return process.env.ASSET_STORAGE_ROOT ?? defaultStorageRoot;
};

export const getAssetDir = (assetId: string): string => {
  return path.join(getStorageRoot(), "assets", assetId);
};

export const getAssetSourceDir = (assetId: string): string => {
  return path.join(getAssetDir(assetId), "source");
};

export const ensureDir = async (dirPath: string): Promise<void> => {
  await fs.mkdir(dirPath, { recursive: true });
};

export const writeAssetSource = async (
  assetId: string,
  filename: string,
  contents: Buffer,
): Promise<string> => {
  const sourceDir = getAssetSourceDir(assetId);
  await ensureDir(sourceDir);
  const sourcePath = path.join(sourceDir, filename);
  await fs.writeFile(sourcePath, contents);
  return sourcePath;
};

export const writeAssetRecord = async (record: AssetRecord): Promise<void> => {
  const assetDir = getAssetDir(record.id);
  await ensureDir(assetDir);
  const recordPath = path.join(assetDir, "asset.json");
  await fs.writeFile(recordPath, JSON.stringify(record, null, 2));
};
