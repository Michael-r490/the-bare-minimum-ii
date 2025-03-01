
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";

const CodeEditor = ({ editorRef }) => {
    const [value, setValue] = useState(`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`);

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    return (
        <div className="Editor">
                <Editor
                    language="java"
                    value={value} 
                    onMount={onMount}
                    onChange={(value) => setValue(value)}
                />
        </div>
    );
};

export default CodeEditor;
