import { Brackets } from "lucide-react";

type BracketProps = {
    children: React.ReactNode;
    size?: number;
};

export default function Bracket({ children, size = 24 }: BracketProps) {
    return (
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg"
                width={size / 2}
                height={size}
                viewBox="0 0 12 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="lucide lucide-brackets-icon lucide-brackets flex items-center justify-center"
            >
                <path d="M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3" />
            </svg>

            {children}
            <svg xmlns="http://www.w3.org/2000/svg"
                width={size / 2}
                height={size}
                viewBox="12 0 12 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="lucide lucide-brackets-icon lucide-brackets flex items-center justify-center"
            >
                <path d="M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3" />
            </svg>
        </div>
    );
}
