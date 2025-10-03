
/**
 * Factory Function that creates reusable image input change handler
 * 
 * The returned function handles file selection from `<input type="file">`,
 * saves selected file and then generated a temporary preview of the image URL
 * 
 * 
 * @param setFile State setter for the selected file
 * @param setImage State setter for the image preview URL
 * @returns An input change handler
 */
export function HandleImageChangeFactory(setFile: (file: File | null) => void, setImage: (url: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setImage(URL.createObjectURL(file));
        }
    };
}
