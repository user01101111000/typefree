"use client";

import { Input } from "@/components/ui/shadcn/input.tsx";
import React from "react";
import { Button } from "@/components/ui/shadcn/button.tsx";
import { useCode } from "@/context/CodeContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import get_json_data from "@/service/get_json_data.ts";
import { UploadContentURLInput, UploadContentURLProps } from "@/types/upload_content_url_types.ts";
import upload_url_schema from "@/utils/schemas/url_schema.ts";

const UploadContentURL: React.FC<UploadContentURLProps> = ({ setOpen }: UploadContentURLProps): React.JSX.Element => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const { setCode } = useCode();
    const { register, handleSubmit, formState: { errors }, setError } = useForm<UploadContentURLInput>({
        resolver: zodResolver(upload_url_schema)
    });

    React.useEffect((): void => {
        setTimeout((): void => {
            if (document.activeElement instanceof HTMLInputElement) {
                document.activeElement.blur();
            }
        }, 0);
    }, []);

    const onSubmit: SubmitHandler<UploadContentURLInput> = (data: UploadContentURLInput): void => {
        setLoading(true);
        get_json_data(data.url).then(((x: unknown): void => {
            const json_code: string = JSON.stringify(x, null, 2);
            setCode(json_code);
            window.localStorage.setItem("code", json_code)
            setOpen(false);
        })
        ).catch((): void => {
            setError("url", { message: "Failed to retrieve data. Check the URL and try again." });
        }).finally((): void => {
            setLoading(false);
        })
    }

    return <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-white font-bold">🔗 URL</p>
        <Input className="text-white" type="text"
            placeholder="https://jsonplaceholder.typicode.com/users" {...register("url")} />
        {errors.url?.message && <p className="text-red-500 text-sm">{errors.url.message}</p>}

        <Button disabled={loading} className="cursor-pointer">
            {loading ? "Fetching..." : "Fetch"}
        </Button>
    </form>
};

export default UploadContentURL;