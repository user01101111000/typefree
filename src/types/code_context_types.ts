export type CodeContextProps = {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>
};

export type CodeContextProviderProps = {
    children: React.ReactNode;
};