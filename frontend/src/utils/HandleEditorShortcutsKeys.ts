// src/utils/handleEditorShortcuts.ts

/**
 * Handles common rich text editor shortcuts like bold, italic, underline, etc.
 *
 * @param e KeyboardEvent
 */
export function HandleEditorShortcuts(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!(e.ctrlKey || e.metaKey)) return;

    switch (e.key.toLowerCase()) {
        case "b":
            e.preventDefault();
            document.execCommand("bold", false);
            break;
        case "i":
            e.preventDefault();
            document.execCommand("italic", false);
            break;
        case "u":
            e.preventDefault();
            document.execCommand("underline", false);
            break;
        default:
            break;
    }
}

export function ApplyAlignment(alignment: "left" | "center" | "right") {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    
    // 1. Check for an existing DIV wrapper that contains the selection
    const existingWrapper = getImmediateWrapper(range, 'DIV');

    // Create the new wrapper DIV with the desired alignment
    const newWrapper = document.createElement("div");
    newWrapper.style.textAlign = alignment; 

    if (existingWrapper) {
        console.log("Existing DIV wrapper found. Replacing it.");
        
        // 2. SWAP/REPLACE LOGIC
        
        // Move all of the old wrapper's children into the new wrapper
        while (existingWrapper.firstChild) {
            newWrapper.appendChild(existingWrapper.firstChild);
        }

        // Replace the old wrapper with the new wrapper in the DOM
        existingWrapper.parentNode?.replaceChild(newWrapper, existingWrapper);

        // If you were removing specific attributes, you would do it here, 
        // but since we are replacing the whole element, cleaning is simpler.
        
    } else {
        console.log("No existing DIV wrapper found. Wrapping selection.");
        
        // 3. CREATE NEW WRAPPER LOGIC (from your original code)
        
        const selectedContent = range.extractContents();
        newWrapper.appendChild(selectedContent);
        range.insertNode(newWrapper);
    }

    // 4. Update the selection/cursor
    range.setStartAfter(newWrapper);
    range.setEndAfter(newWrapper);
    selection.removeAllRanges();
    selection.addRange(range);
}


/**
 * Checks if the selection is directly contained within a specific HTML element type.
 * @param range The selected DOM Range object.
 * @param tagName The tag name to search for (e.g., 'DIV', 'P', 'SPAN').
 * @returns The wrapping HTMLElement if found, or null.
 */
function getImmediateWrapper(range: Range, tagName: string): HTMLElement | null {
    const commonContainer = range.commonAncestorContainer;
    let elementToCheck: HTMLElement | null = null;

    // 1. Get the starting HTMLElement.
    if (commonContainer.nodeType === Node.TEXT_NODE) {
        elementToCheck = (commonContainer as Text).parentElement;
    } else if (commonContainer.nodeType === Node.ELEMENT_NODE) {
        elementToCheck = commonContainer as HTMLElement;
    }
    
    if (!elementToCheck) {
        return null;
    }
    
    // 2. Find the closest ancestor of the specified tag name.
    const genericWrapper = elementToCheck.closest(tagName.toUpperCase());
    
    // 3. Type Check and Boundary Check
    if (genericWrapper) {
        // Assert the generic Element is an HTMLElement to match the function's return type.
        const wrapper = genericWrapper as HTMLElement; 

        // Find the editable root boundary.
        const editableRoot = elementToCheck.closest('.editableRoot');
        
        // Check if the wrapper is inside the editable root and is not the root itself.
        if (editableRoot && editableRoot.contains(wrapper) && wrapper !== editableRoot) {
            return wrapper;
        }
    }
    
    // If no wrapper was found or it failed the boundary check.
    return null;
}