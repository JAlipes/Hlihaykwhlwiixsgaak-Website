import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Import Types
import type { EditableTextPropType } from "../../../shared-types/ComponentPropTypes";

export default function EditableText({ isAuthenticated, setText, text, placeholder }: EditableTextPropType) {

    // Quill toolbar options for authenticated users
    const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }], // enable text color and highlight
        [{ align: [] }],
        [{ list: "bullet" }],
    ];

    // Quill modules configuration
    const modules = {
        toolbar: isAuthenticated ? toolbarOptions : null,
    };

    // Allowed formats
    const formats = [
        "header",
        "bold", "italic", "underline", "strike",
        "color", "background",
        "align",
        "list",
    ];

    return (
        <ReactQuill
            key={isAuthenticated ? 'editable' : 'readonly'}
            value={text}
            onChange={setText}
            readOnly={!isAuthenticated}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder={placeholder}
            className={`rounded ${isAuthenticated ? "bg-white" : "ql-disabled cursor-auto"} text-lg`}
        />
    );
}
