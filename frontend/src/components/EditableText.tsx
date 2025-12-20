import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Import Types
import type { EditableTextPropType } from "../../../shared-types/ComponentPropTypes";

export default function EditableText({ isAuthenticated, setText, text, placeholder }: EditableTextPropType) {
    const Font = Quill.import("attributors/class/font") as any;
    Font.whitelist = ["overlock-sc", "quicksand", "montserrat", "miniver", "miama"];
    Quill.register(Font, true);

    const Size = Quill.import("attributors/class/size") as any;
    Size.whitelist = ["12px","14px","16px","18px","20px","24px","30px","36px","48px","60px","72px"];
    Quill.register(Size, true);


    // Quill toolbar options for authenticated users
    const toolbarOptions = [
        [{ font: ["overlock-sc", "quicksand", "montserrat", "miniver", "miama"] }],
        [{ size: ["12px","14px","16px","18px","20px","24px","30px","36px","48px","60px","72px"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "bullet" }],
    ];

    // Quill modules configuration
    const modules = {
        toolbar: isAuthenticated ? toolbarOptions : null,
    };

    // Allowed formats
    const formats = [
        "header", "font", "size",
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
            className={`rounded ${isAuthenticated ? "colorOption" : "ql-disabled cursor-auto"} text:xl`}
        />
    );
}
