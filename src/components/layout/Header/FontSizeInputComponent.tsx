"use client";

import { Input } from "@/components/ui/shadcn/input.tsx";
import React from "react";
import { Button } from "@/components/ui/shadcn/button.tsx";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SettingsParametersProps } from "@/types/settings_context_types";

type FontSizeInputComponentProps = {
    register: UseFormRegister<SettingsParametersProps>,
    setValue: UseFormSetValue<SettingsParametersProps>,
    watch: UseFormWatch<SettingsParametersProps>
}

const FontSizeInputComponent: React.FC<FontSizeInputComponentProps> = ({
    register,
    setValue,
    watch
}: FontSizeInputComponentProps): React.JSX.Element => {

    const fontSize: number = watch("fontSize") || 16;

    return <div className="flex items-center justify-center gap-2">

        <Button size={"icon"} variant="secondary" type="button" onClick={(): void => {
            const newValue: number = fontSize - 1;

            if (newValue >= 10) setValue("fontSize", newValue);

        }} className="cursor-pointer">-</ Button>

        <Input key="fontSize" type="number" max={30}
            min={10} {...register("fontSize", { valueAsNumber: true })}
            className="w-12 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-noneappearance-none [&::-webkit-outer-spin-button]:appearance-none" />
        <Button size={"icon"} variant="secondary" type="button" onClick={(): void => {

            const newValue: number = fontSize + 1;

            if (newValue <= 30) setValue("fontSize", newValue);

        }} className="cursor-pointer">+</ Button>
    </div>
};

export default FontSizeInputComponent;