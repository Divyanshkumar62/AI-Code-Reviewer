import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor'
import prism from 'prismjs'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/atom-one-dark.css"
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("")

  useEffect(()=> {
    prism.highlightAll();
  }, [])

  async function reviewCode(){
    const response = await axios.post("http://localhost:5000/ai/get-review", {code})
    setReview(response.data)
  } 

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
      <header className="w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg shadow-lg">
        AI Code Reviewer
      </header>
      <div className="flex flex-row gap-6 w-full max-w-6xl">
        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-auto">
          <input
            type="file"
            accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
            className="text-sm mb-4 rounded-lg cursor-pointer text-gray-400 p-2 bg-gray-700"
            onChange={handleFileUpload}
          />
          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900">
            <Editor value={code} onValueChange={(code)=> setCode(code)} highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")} padding={10} style={{fontFamily: 'Fire Code, monospace', fontSize: 16}}></Editor>
          </div>
          <button onClick={reviewCode} className="w-full text-lg font-semibold bg-gradient-to-r from-blue-600 to-orange-600 hover:from-orange-600 hover:to-blue-600 cursor-pointer mt-4 py-2 rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl">
            Review Code
          </button>
        </div>
        <div className="w-1/2 h-full bg-gray-800 text-gray-300 p-6 rounded-lg border border-gray-700 overflow-auto">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default App;
