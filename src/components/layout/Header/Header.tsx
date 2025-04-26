import SettingsMenu from "@/components/layout/Header/SettingsMenu.tsx";
import { Github } from "lucide-react";
import CustomToolTip from "@/components/ui/CustomToolTip.tsx";
import Link from "next/link";
import Image from "next/image";
import typefree_logo from "../../../../public/logos/typefree_logo.webp";

const Header: () => React.JSX.Element = (): React.JSX.Element => {

    return <header className="w-full border-b-[1px] border-gray-700 bg-blue-900">

        <div className="flex items-center justify-between pl-10 pr-6 py-3">

            <Link href="/" className="flex items-center gap-3">
                <Image src={typefree_logo} width={24} alt={"icon"} title="Type Free" loading="eager"/>
                <p className="font-extrabold">Type Free</p>
            </Link>

            <div className="flex items-center justify-center gap-2.5">

                <SettingsMenu />

                <CustomToolTip key="github" tooltip="Github">
                    <a key="github" href="https://github.com/user01101111000/typefree" title="Source code"
                        target="_blank">
                        <Github className="h-4 w-4 cursor-pointer" />
                    </a>
                </CustomToolTip>

            </div>

        </div>

    </header>
};

export default Header;