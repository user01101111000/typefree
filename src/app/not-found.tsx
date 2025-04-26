"use client";

import React from "react";
import { Button } from "@/components/ui/shadcn/button.tsx";
import { useRouter } from "next/navigation";

const NotFound: () => React.JSX.Element = (): React.JSX.Element => {

    const router = useRouter();

    return <section className="container mx-auto flex items-center justify-center p-4">

        <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-text-color-2">Page not found.</p>
            <Button size="sm" variant="secondary" className="cursor-pointer" onClick={(): void => {
                router.push("/");
            }}>
                Go home
            </Button>
        </div>

    </section>

};

export default NotFound;