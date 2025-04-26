import React from "react";

type ShinyTextProps = {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    link?: string;
    href?: string
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 5,
    className = "",
    link = "",
    href = ""
}: ShinyTextProps): React.JSX.Element => {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={`text-[#b5b5b5a4] bg-clip-text inline-block relative overflow-hidden ${disabled ? '' : 'shiny-animation'} ${className}`}
            style={{
                backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                animationDuration,
            }}
        >
            {text} {link &&
                <a className="underline" title="user01101111000 github profile" target="_blank" href={href}>{link}</a>}
        </div>
    );
};

export default ShinyText;