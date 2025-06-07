// CodeEditor.js

import React, { useState } from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import './CodeEditor.css';

const defaultTemplates = {
    c_cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // your code goes here

    return 0;
}`,
    java: `import java.util.*;
import java.lang.*;
import java.io.*;

class Zcoder {
    public static void main (String[] args) throws java.lang.Exception {
        // your code goes here

    }
}`,
    python: ''
};

const CodeEditor = () => {
    const [language, setLanguage] = useState('java');
    const [code, setCode] = useState(defaultTemplates['java']);
    const [output, setOutput] = useState('');

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        setLanguage(selectedLang);
        setCode(defaultTemplates[selectedLang]); // always switch to the correct header
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleRunCode = async () => {
        try {
            const response = await axios.post('/api/code/execute', { language, code });
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error executing code:', error);
            setOutput('Error executing code');
        }
    };

    return (
        <div className="code-editor-container">
            <div className="editor-wrapper">
                <select value={language} onChange={handleLanguageChange}>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="c_cpp">C++</option>
                </select>

                <AceEditor
                    mode={language}
                    theme="monokai"
                    onChange={handleCodeChange}
                    editorProps={{ $blockScrolling: true }}
                    value={code}
                    lineHeight={24}
                    fontSize={18}
                    width="100%"
                    height="575px"
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true
                    }}
                    placeholder="Write your code here..."
                    style={{ fontFamily: "'Fira Code', monospace" }}
                />

                <button onClick={handleRunCode}>Run Code</button>
            </div>

            <div className="output-wrapper">
                <label>Output:</label>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;