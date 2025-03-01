import { executeCode } from "../api";
import { useState } from "react";

const Output = ({editorRef,language}) => {
    const [output, setOutput]= useState(null);

    const runCode = async() =>{
        const sourceCode = editorRef.current.getValue();
        if(!sourceCode)return;
        try {
            const {run:result} = await executeCode(language,sourceCode);
            setOutput(result.output.split("\n"));
        } catch (error) {
            console.log(error);
            setOutput(error.message || "Unable to run code");
        }
    }

    return (
        <div className="OutputContainer">
            <button className="RunButton" onClick={runCode}>Run Code</button>
            <div className="Output">
                <text>
                    {output 
                    ? output.map((line, i) => <div key={i}>{line}</div>)
                    : 'Click "Run" to see the output here'}
                </text>
            </div>
        </div>
    );
};

export default Output;
