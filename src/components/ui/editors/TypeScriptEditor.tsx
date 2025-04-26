"use client";
import React from "react";
import Editor from '@monaco-editor/react';
import { useSettings } from "@/context/SettingsContext.tsx";
import { Copy, Download } from "lucide-react";
import copy_fn from "@/utils/copy_fn.ts";
import download_as from "@/utils/download_as.ts";
import CustomToolTip from "@/components/ui/CustomToolTip.tsx";
import Loader from "@/components/ui/Loader.tsx";
import { json2ts } from "json-ts"

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
import ShinyText from "@/components/ui/ShinyText.tsx";

const TypeScriptEditor: () => React.JSX.Element = (): React.JSX.Element => {

    const { code } = useCode();
    const [interfaceCode, setInterfaceCode] = React.useState('');
    const { parameters } = useSettings();

    React.useEffect((): void => {
        try {
            if (code) {
                const interface_code: string = json2ts(code, {
                    rootName: parameters.rootName,
                    prefix: parameters.prefix,
                    namespace: parameters.namespace,
                    flow: parameters.flow
                }).trim();

                setInterfaceCode(interface_code);

            } else setInterfaceCode("")

        } catch (e) {
            const errorMessage: string = e instanceof Error ? e.name : "Unknown error";

            if (errorMessage === "TypeError") setInterfaceCode("// This format not supported.");
            else setInterfaceCode("// This format is unknown.");

        }

    }, [code, parameters.rootName, parameters.prefix, parameters.namespace, parameters.flow])

    return <div className="w-full h-full overflow-hidden grid grid-rows-[auto_1fr] bg-[#1e1e1e] gap-3">

        <div
            className="py-3 pl-10 pr-7 border-t-1 border-b-[1px] border-rgba(255,255,255,0.05) flex items-center justify-between gap-2 bg-[#1E1E1E] lg:border-t-0">

            <ShinyText text="TypeScript Editor" className="font-extrabold text-[.8rem] lg:text-[1rem]" />

            <div className="flex items-center justify-center gap-3">

                <CustomToolTip key="copy" tooltip="Copy">
                    <Copy aria-label="copy button" className="h-3.5 w-3.5 cursor-pointer" onClick={(): void => {
                        if (interfaceCode) copy_fn({ text: interfaceCode, message: "Copied." });
                        else {
                            toast.info("No code to copy.", {
                                duration: 1500
                            });
                        }

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
                            if (interfaceCode) download_as({ content: interfaceCode, file_type: "ts" });
                            else {
                                toast.info("No code to download.", {
                                    duration: 1500
                                });
                            }
                        }}>
                            TS
                            <DropdownMenuShortcut>
                                <Download />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer" onClick={(): void => {
                            if (interfaceCode) download_as({ content: interfaceCode, file_type: "txt" });
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


            </div>
        </div>

        <Editor
            height="100%"
            width="100%"
            language="typescript"
            theme="vs-dark"
            options={{
                fontSize: parameters.fontSize,
                readOnly: true,
                minimap: {
                    enabled: parameters.mapVisible,
                },
                quickSuggestions: parameters.suggestions,
                folding: parameters.folding,
                renderValidationDecorations: parameters.showErrors ? "on" : "off",

                wordWrap: parameters.wordWrap ? "on" : "off",
                lineNumbers: parameters.lineNumbers ? "on" : "off",
            }}
            loading={<Loader />}
            value={interfaceCode}
        />
    </div>
};

export default TypeScriptEditor;