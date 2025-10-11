export interface EditableImagePropType {
    src: string;
    alt: string;
    wrapperClassName?: string; 
    imageClassName?: string; 
    isAuthenticated : boolean;
    inputIdString : string; 
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export interface EditableTextPropType {
    isAuthenticated : boolean;
    setText : (text : string) => void;
    text : string;
}

export interface MiniServiceSectionProps {
    sectionName: string;
    defaultTitle: string; // static title
    defaultContent: string; // HTML editable (list of items)
    defaultImage: string;
}
