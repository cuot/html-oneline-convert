import React, { useState, useEffect } from "react";
import "../css/ConvertToHTML.css";
// import useScript from "../hook/useScript";

export default function ConvertToHTML() {
  const [val, setVal] = useState("");
  const [codeInput, setcodeInput] = useState("");
  const status = "../js/CleanHTML.js";

  useEffect(() => {
    if (status === "ready") {
    }
  }, [val]);

  const changeValue = (props) => {
    // 9 = '/t', 10 = '\n', 13 = 'r'
    let v = props.target.value;
    let tmp = "";

    setVal(tmp);
    if (v === "") {
      setVal("");
      return;
    }
    for (let i = 0; v.length > i; i++) {
      if (!(v.charCodeAt(i) === 9 || v.charCodeAt(i) === 10 || v.charCodeAt(i) === 13)) {
        tmp += v.charAt(i);
        setVal(tmp);
      }
    }
    document.getElementById("HTML_ConvertArea").value = tmp;
    setcodeInput(props.currentTarget.value);
  };

  const copy = () => {
    navigator.clipboard.writeText(val);
    console.log(val);
    document.getElementById("bar").textContent = "Copy Complite";
    setTimeout(() => {
      document.getElementById("bar").textContent = "";
    }, 2000);
  };

  return (
    <div className="container">
      <div className="main">
        <fieldset className="fd_s_TextArea">
          <legend>&nbsp;HTML&nbsp;</legend>
          <textarea value={codeInput} onChange={changeValue} id="HTML_TextArea"></textarea>
        </fieldset>
        <div id="progress">
          <div id="bar"></div>
        </div>
        <fieldset onClick={copy} className="fd_s_convertArea">
          <legend>&nbsp;Convert&nbsp;</legend>
          <textarea tabIndex="1" id="HTML_ConvertArea"></textarea>
        </fieldset>
      </div>
    </div>
  );
}
