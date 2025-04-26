import { SettingsParametersProps } from "@/types/settings_context_types.ts";

const settings_initial_data: SettingsParametersProps = {
    fontSize: 16,
    rootName: "RootObject",
    prefix: "I",
    namespace: "",
    flow: false,
    mapVisible: true,
    suggestions: true,
    folding: true,
    showErrors: true,
    wordWrap: false,
    lineNumbers: true,
    autoSave: true
};

export default settings_initial_data;