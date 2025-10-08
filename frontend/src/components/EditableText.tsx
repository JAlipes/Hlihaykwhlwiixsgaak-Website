// Import Components
import EditableTextToolBar from "./EditableTextToolBar";

// Import Types
import type { EditableTextPropType } from "../../../shared-types/ComponentPropTypes";

// Import Utils
import { HandleEditorShortcuts } from "../utils/HandleEditorShortcutsKeys";

export default function EditableText({ isAuthenticated, setText, text }: EditableTextPropType) {
    
    const ApplyCommand = (command : string) => {
        document.execCommand(command, false);
    }

    const HandleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        const el = e.currentTarget;

        // Clean HTML like before
        const cleanedHTML = (() => {
            const temp = document.createElement("div");
            temp.innerHTML = el.innerHTML.trim();

            const removeEmptyDivs = (el: HTMLElement) => {
                Array.from(el.children).forEach((child) => {
                    if (child.tagName === "DIV" && child.innerHTML.trim() === "") {
                        child.remove();
                    } else {
                        removeEmptyDivs(child as HTMLElement);
                    }
                });
            };

            removeEmptyDivs(temp);

            return temp.innerHTML.trim();
        })();

        // Check for unsaved changes
        if (cleanedHTML !== text) {
            const proceed = window.confirm("You have unsaved changes. Please Click the save button");
            if (!proceed) {
                e.preventDefault();
                el.focus(); // keep focus inside the editable div
                return;
            }
        }

        // Save only if they confirmed
        setText(cleanedHTML);
    };

    
    return (
        <div>
            {/* Text Editor Toolbar */}
            {isAuthenticated && <EditableTextToolBar ApplyCommand={ApplyCommand}/>}

            {/* Displayed Editable Text */}
            <div
                contentEditable={isAuthenticated}
                suppressContentEditableWarning={true}
                onKeyDown={HandleEditorShortcuts}
                onBlur={HandleBlur}
                className={`w-full mb-4 p-2 text-lg rounded whitespace-pre-wrap editableRoot ${
                    !isAuthenticated ? "cursor-auto" : "bg-white"
                }`}
                dangerouslySetInnerHTML={{ __html: text }}
            >

            </div>
        </div>
    );
}

