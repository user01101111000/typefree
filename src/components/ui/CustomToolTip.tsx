import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/shadcn/tooltip.tsx"
import React from "react";


type CustomToolTipProps = {
    tooltip: string,
    children: React.ReactNode,
    w50?: boolean
}

const CustomToolTip: React.FC<CustomToolTipProps> = (props: CustomToolTipProps): React.JSX.Element => {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>{props.children}</TooltipTrigger>
            <TooltipContent className={"font-medium" + (props.w50 ? " w-50" : "")}>
                {props.tooltip}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
};

export default CustomToolTip;