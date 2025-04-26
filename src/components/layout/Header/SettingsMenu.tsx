"use client";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/shadcn/popover.tsx"
import { Settings } from "lucide-react";
import SettingsMenuList from "@/components/layout/Header/SettingsMenuList.tsx";

const SettingsMenu: () => React.JSX.Element = (): React.JSX.Element => {

    const [open, setOpen] = React.useState(false);

    React.useEffect((): void => {
        if (open) {
            setTimeout((): void => {
                if (document.activeElement instanceof HTMLInputElement) {
                    document.activeElement.blur();
                }
            }, 0);
        }
    }, [open]);

    return <Popover open={open} onOpenChange={(): void => {
        setOpen((p: boolean): boolean => !p);
    }}>
        <PopoverTrigger>
            <Settings aria-label="setting button" className="h-4 w-4 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
            <SettingsMenuList setOpen={setOpen} />
        </PopoverContent>
    </Popover>
};

export default SettingsMenu;