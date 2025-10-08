import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Info } from "lucide-react";


import {ApplyAlignment} from '../utils/HandleEditorShortcutsKeys'

type Props = {
    ApplyCommand: (command: string) => void;
};

export default function EditableTextToolbar({ ApplyCommand }: Props) {
    // Use onMouseDown with preventDefault so clicking the button doesn't blur the editable div
    // (which would lose the selection).
    return (
        <div className="flex items-center gap-3 mb-2 bg-gray-100 p-2 rounded-lg border border-gray-300">
            <button
                onMouseDown={(e) => { e.preventDefault(); ApplyCommand("bold"); }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Bold (Ctrl/Cmd + B)"
                type="button"
            >
                <Bold className="w-4 h-4" />
            </button>

            <button
                onMouseDown={(e) => { e.preventDefault(); ApplyCommand("italic"); }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Italic (Ctrl/Cmd + I)"
                type="button"
            >
                <Italic className="w-4 h-4" />
            </button>

            <button
                onMouseDown={(e) => { e.preventDefault(); ApplyCommand("underline"); }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Underline (Ctrl/Cmd + U)"
                type="button"
            >
                <Underline className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-gray-300 mx-1" />

            <button
                onMouseDown={(e) => { e.preventDefault(); ApplyAlignment("left"); }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Align Left"
                type="button"
            >
                <AlignLeft className="w-4 h-4" />
            </button>

            <button
                onMouseDown={(e) => { e.preventDefault(); ApplyAlignment("center"); }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Align Center"
                type="button"
            >
                <AlignCenter className="w-4 h-4" />
            </button>

            <button
                onMouseDown={(e) => { e.preventDefault(); ApplyAlignment("right"); }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Align Right"
                type="button"
            >
                <AlignRight className="w-4 h-4" />
            </button>

            <div className="flex items-center ml-auto text-sm text-gray-500">
                <Info className="w-4 h-4 mr-1" />
                Editable mode enabled
            </div>
        </div>
    );
}
