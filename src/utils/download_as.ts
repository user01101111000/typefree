type DownloadProps = {
    content: string,
    file_type: "ts" | "json" | "txt",
};

const download_as: (data: DownloadProps) => void = (data: DownloadProps): void => {

    let type: string = "";

    switch (data.file_type) {

        case "ts":
            type = "application/typescript;charset=utf-8";
            break;

        case "json":
            type = "application/json;charset=utf-8";
            break;

        case "txt":
            type = "text/plain;charset=utf-8";
            break;

        default:
            const _exhaustiveCheck: never = data.file_type;
            return _exhaustiveCheck;
    }

    const blob = new Blob([data.content], { type: type });

    const url: string = URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement("a");

    link.href = url;
    link.download = "code." + data.file_type;
    link.click();

    URL.revokeObjectURL(url);
};

export default download_as;