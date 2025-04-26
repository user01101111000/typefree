import { toast } from "sonner";

const copy_fn: (data: { text: string, message: string }) => void = (data: { text: string, message: string }): void => {
    navigator.clipboard.writeText(data.text);

    toast.success(data.message, {
        duration: 1000
    });
};

export default copy_fn;