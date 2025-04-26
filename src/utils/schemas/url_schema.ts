import { z } from "zod";
import { UploadContentURLInput } from "@/types/upload_content_url_types.ts";

const upload_url_schema: z.ZodType<UploadContentURLInput> = z.object({
    url: z.string().url("Invalid URL.")
})

export default upload_url_schema;