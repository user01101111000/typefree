import { z } from "zod";
import { UploadInputs } from "@/types/upload_content_file_types.ts";

let jsonFile_schema: z.ZodType<UploadInputs>;

if (typeof window !== "undefined") {
  jsonFile_schema = z.object({
    JSONFile: z
      .instanceof(FileList, { message: "File is required." })
      .refine((files: FileList): boolean => files?.length > 0, "File is required.")
      .refine(
        (files: FileList): boolean =>
          files[0]?.type === "application/json" ||
          (files[0]?.type === "text/plain" && files[0]?.name.endsWith(".txt")),
        "Content must be a JSON or TXT file."
      ),
  });
}

export default jsonFile_schema!;
