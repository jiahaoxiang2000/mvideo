import { NextResponse } from "next/server";
import { ingestUploadedFile } from "../../../../server/ingestion";
import { runOnAssetImported } from "../../../../services/plugins";
import { logger } from "../../../../helpers/logger";

export const runtime = "nodejs";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { type: "error", message: "Missing file upload" },
        { status: 400 },
      );
    }

    const asset = await ingestUploadedFile(file);
    await runOnAssetImported(asset);
    return NextResponse.json({ type: "success", data: asset });
  } catch (error) {
    logger.reportError(error as Error, { action: "ingestion-import" });
    return NextResponse.json(
      {
        type: "error",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
