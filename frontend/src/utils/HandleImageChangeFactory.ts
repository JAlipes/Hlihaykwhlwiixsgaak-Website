export function HandleImageChangeFactory(setFile: (file: File | null) => void, setImage: (url: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setImage(URL.createObjectURL(file));
        }
    };
}
