import "./App.css";
import CodeEditor from "./components/Editor";
import MainNav from "./components/MainNav";
import Output from "./components/Output"
import editorRef from "./components/Editor"

import { useRef, useState } from "react";

function Compiler2(){
    const editorRef = useRef();
    return(
        <div className="Compiler">
            <MainNav/>
            <div className="Container">
                <CodeEditor editorRef={editorRef}/>
                <Output editorRef={editorRef} language="java"/>
            </div>
        </div>
    );
}
export default Compiler2;