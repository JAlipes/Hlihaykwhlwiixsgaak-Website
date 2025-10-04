// Import Types
import type { EditableTextPropType } from "../../../shared-types/ComponentPropTypes";

/**
 * A reusable Text edit component
 * 
 * Renders a contentEditable `<div>` that allows editing text if the user
 * is authenticated. The updated text is saved when the element loses focus
 * 
 * @param isAuthenticated Whether the user can edit text
 * @param setText Call back to update the parent state with the updated text
 * @param text The current text value to be displayed.
 * 
 */
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