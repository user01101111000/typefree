"use client";

import React from "react";
import { CodeContextProps, CodeContextProviderProps } from "@/types/code_context_types.ts";
import initialCode from "@/constants/code_data.ts";

const CodeContext = React.createContext<CodeContextProps>({} as CodeContextProps);

const CodeProvider: React.FC<CodeContextProviderProps> = ({ children }) => {
    const [code, setCode] = React.useState<string>("");

    React.useEffect(() => {
        const initialOpen = !window.localStorage.getItem("initialOpen");

        if (initialOpen) {
            window.localStorage.setItem("initialOpen", "true");
            setCode(initialCode);
        } else {
            setCode("");
        }
    }, []);

    const data: CodeContextProps = {
        code,
        setCode
    };

    return <CodeContext.Provider value={data}>{children}</CodeContext.Provider>;
};

const useCode = (): CodeContextProps => {
    const context = React.useContext(CodeContext);
    if (!context) throw new Error("useCode must be used within a CodeProvider");
    return context;
};

export { CodeProvider, useCode };
