"use client";

import React from "react";
import {
    SettingsParametersProps,
    SettingsContextProps,
    SettingsContextProviderProps
} from "@/types/settings_context_types.ts";
import { toast } from "sonner";
import settings_initial_data from "@/constants/settings_data.ts";
import { useCode } from "@/context/CodeContext.tsx";

const SettingsContext = React.createContext<SettingsContextProps>({} as SettingsContextProps);

const SettingsProvider: React.FC<SettingsContextProviderProps> = (props) => {
    const { code } = useCode();

    const [settings, setSettings] = React.useState<SettingsParametersProps>(settings_initial_data);

    React.useEffect(() => {
        const localSettingsData = window.localStorage.getItem("settings");

        const settings: SettingsParametersProps = localSettingsData
            ? JSON.parse(localSettingsData)
            : settings_initial_data;

        setSettings(settings);

        if (!localSettingsData) {
            window.localStorage.setItem("settings", JSON.stringify(settings));
            window.localStorage.setItem("code", code);
        }
    }, [code]);

    const reset = (): void => {

        setSettings(settings_initial_data);

        window.localStorage.setItem("settings", JSON.stringify(settings_initial_data));
        window.localStorage.setItem("code", code);

        toast.success("Settings reset.", { duration: 1000 });
    };

    const save = (data: SettingsParametersProps): void => {
        setSettings(data);
        window.localStorage.setItem("settings", JSON.stringify(data));

        if (!data.autoSave) {
            window.localStorage.removeItem("code");
        } else {
            window.localStorage.setItem("code", code);
        }

        toast.success("Settings saved.", { duration: 1000 });
    };

    const data: SettingsContextProps = {
        parameters: {
            fontSize: settings.fontSize,
            rootName: settings.rootName,
            prefix: settings.prefix,
            namespace: settings.namespace,
            flow: settings.flow,
            mapVisible: settings.mapVisible,
            folding: settings.folding,
            suggestions: settings.suggestions,
            showErrors: settings.showErrors,
            wordWrap: settings.wordWrap,
            lineNumbers: settings.lineNumbers,
            autoSave: settings.autoSave
        },
        save,
        reset
    };

    return <SettingsContext.Provider value={data}>{props.children}</SettingsContext.Provider>;
};

const useSettings = (): SettingsContextProps => {
    const context = React.useContext(SettingsContext);
    if (!context) throw new Error("useSettings must be used within a SettingsProvider");
    return context;
};

export { SettingsProvider, useSettings };