"use client";
import React from "react";
import Editor from '@monaco-editor/react';
import { useSettings } from "@/context/SettingsContext.tsx";
import { Copy, Download, Trash2 } from "lucide-react";
import copy_fn from "@/utils/copy_fn.ts";
import download_as from "@/utils/download_as.ts";
import CustomToolTip from "@/components/ui/CustomToolTip.tsx";
import Loader from "@/components/ui/Loader.tsx";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/shadcn/dropdown-menu.tsx"
import { toast } from "sonner";
import { useCode } from "@/context/CodeContext.tsx";
import UploadComponent from "@/components/ui/editors/upload_option/UploadComponent.tsx";
import ShinyText from "@/components/ui/ShinyText.tsx";

const JSONEditor: () => React.JSX.Element = (): React.JSX.Element => {

    const { setCode, code } = useCode();
    const { parameters } = useSettings();

    const handleChange: (value: string | undefined) => void = (value: string | undefined): void => {
        setCode(value || '');

        if (parameters.autoSave) {
            window.localStorage.setItem("code", value || '');
        }
    };

    console.log(parameters);

    return <div
        className="w-full h-full overflow-hidden grid grid-rows-[auto_1fr] bg-[#1e1e1e] gap-3 border-r-2 border-r-[rgba(255,255,255,0.05)]">
        <div
            className="py-3 pl-10 pr-7 border-b-[1px] border-rgba(255,255,255,0.05) flex items-center justify-between gap-2 bg-[#1E1E1E]">

            <ShinyText text="JSON Editor" className="font-extrabold text-[.8rem] lg:text-[1rem]" />

            <div className="flex items-center justify-center gap-3.5">

                <UploadComponent />

                <CustomToolTip key="copy" tooltip="Copy">
                    <Copy aria-label="copy button" className="h-3.5 w-3.5 cursor-pointer" onClick={(): void => {
                        if (code) copy_fn({ text: code, message: "Copied." });
                        else toast.info("No code to copy.", {
                            duration: 1500
                        });
                    }} />
                </CustomToolTip>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Download aria-label="download button" className="h-3.5 w-3.5 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Download as</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="cursor-pointer" onClick={(): void => {
                            if (code) download_as({ content: code, file_type: "json" })
                            else {
                                toast.info("No code to download.", {
                                    duration: 1500
                                });
                            }
                        }}>
                            JSON
                            <DropdownMenuShortcut>
                                <Download />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer" onClick={(): void => {
                            if (code) download_as({ content: code, file_type: "txt" });
                            else {
                                toast.info("No code to download.", {
                                    duration: 1500
                                });
                            }
                        }}>
                            TXT
                            <DropdownMenuShortcut>
                                <Download />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

                <CustomToolTip key="remove all code" tooltip="Remove all code">
                    <Trash2 aria-label="remove all code button" className="h-3.5 w-3.5 cursor-pointer"
                        onClick={(): void => {
                            if (code) {
                                setCode('');
                                window.localStorage.removeItem("code");
                            }
                            else {
                                toast.info("No code to remove.", {
                                    duration: 1500
                                });
                            }
                        }} />
                </CustomToolTip>

            </div>
        </div>
        <Editor
            height="100%"
            width="100%"
            language="json"
            theme="vs-dark"
            onChange={handleChange}
            value={code}
            options={{
                fontSize: parameters.fontSize,
                minimap: {
                    enabled: parameters.mapVisible
                },
                quickSuggestions: parameters.suggestions,
                folding: parameters.folding,
                renderValidationDecorations: parameters.showErrors ? "on" : "off",

                wordWrap: parameters.wordWrap ? "on" : "off",
                lineNumbers: parameters.lineNumbers ? "on" : "off",
            }}
            loading={<Loader />}
            beforeMount={(): void => {
                if (parameters.autoSave) {
                    const last_code: string | null = window.localStorage.getItem("code");

                    if (last_code) {
                        setCode(last_code);
                    }
                }
            }}
        />
    </div>
};

export default JSONEditor;