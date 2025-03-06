
import "./App.css";
import CodeEditor from "./components/Editor";
import MainNav from "./components/MainNav";
import Output from "./components/Output";
import { useRef, useState } from "react";
import { CODE_LIBRARY } from "./constants";

function Compiler2() {
    const editorRef = useRef();
    const [selectedProgram, setSelectedProgram] = useState(null);

    // Load the selected program into the editor
    const loadProgram = (programKey) => {
        const program = CODE_LIBRARY[programKey]?.code;
        if (program && editorRef.current) {
            editorRef.current.setValue(program);
        }
    };

    return (
        <div className="Compiler">
            <MainNav />
            <div className="Container">
                <div className="Toolbar">
                    <select 
                        onChange={(e) => setSelectedProgram(e.target.value)} 
                        value={selectedProgram || ""}
                    >
                        <option value="">Select a Program</option>
                        {Object.keys(CODE_LIBRARY).map((key) => (
                            <option key={key} value={key}>
                                {CODE_LIBRARY[key].name}
                            </option>
                        ))}
                    </select>
                    <button 
                        className="LoadButton" 
                        onClick={() => loadProgram(selectedProgram)}
                        disabled={!selectedProgram}
                    >
                        Load Program
                    </button>
                </div>

                <CodeEditor editorRef={editorRef} />
                <Output editorRef={editorRef} language="java" />
            </div>
        </div>
    );
}

export default Compiler2;


