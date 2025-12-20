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
    placeholder?: string;
}

export interface MiniServiceSectionProps {
    sectionName: string;
    defaultTitle: string; // static title
    defaultContent: string; // HTML editable (list of items)
    defaultImage: string;
}


export interface RedBannerProps {
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  layout?: 'default' | 'footer';
}

// Props for the generic SaveEdits button component
export interface SaveEditsButtonProps {
    onClickFunction: () => void | Promise<void>;
    color?: 'red' | 'dark-red' | 'gray';
    isLoading?: boolean;
    label?: string;
    disabled?: boolean;
}