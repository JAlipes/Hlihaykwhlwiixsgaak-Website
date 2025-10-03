// Import Types
import type { EditableTextPropType } from "../../../shared-types/ComponentPropTypes";

export default function EditableText({isAuthenticated, setText, text} : EditableTextPropType){

    {/* Single editable contentEditable div */}
    return(
        <div
            contentEditable={isAuthenticated}
            suppressContentEditableWarning={true}
            onBlur={(e) =>
                setText((e.target as HTMLDivElement).innerText)
            }
            className={`w-full mb-4 p-2 text-lg rounded whitespace-pre-wrap ${!isAuthenticated ? 'cursor-auto' : 'bg-white'}`
            }
        >
            {text}
        </div>
    );
}