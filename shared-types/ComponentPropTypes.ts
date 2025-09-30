export interface EditableImagePropType {
    src: string;
    alt: string;
    wrapperClassName?: string; 
    imageClassName?: string; 
    isAuthenticated : boolean;
    inputIdString : string; 
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}