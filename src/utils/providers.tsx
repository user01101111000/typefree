"use client";

import { SettingsProvider } from "@/context/SettingsContext.tsx";
import { CodeProvider } from "@/context/CodeContext.tsx";
import { Toaster } from "@/components/ui/shadcn/sonner";

type ProvidersProps = {
    children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = (props: ProvidersProps): React.JSX.Element => {
    return <CodeProvider>
        <SettingsProvider>
            {props.children}
            <Toaster />
        </SettingsProvider>
    </CodeProvider>;
};

export default Providers;