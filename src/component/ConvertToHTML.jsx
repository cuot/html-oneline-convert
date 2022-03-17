import React, { useState } from "react";
import "../css/ConvertToHTML.css";

export default function ConvertToHTML() {
  const [val, setVal] = useState("");

  const click = (props) => {
    // props.target.value = "";
  };

  const changeValue = (props) => {
    // 9 = '/t', 10 = '\n', 13 = 'r'
    const v = props.target.value;
    let tmp = "";
    let sw = true;

    if (v === "") {
      setVal("");
      return;
    }
    for (let i = 0; v.length > i; i++) {
      if (v.charCodeAt(i) === 60) sw = true;
      if (
        !(
          v.charCodeAt(i) === 9 ||
          v.charCodeAt(i) === 10 ||
          v.charCodeAt(i) === 13
        ) &&
        sw
      ) {
        tmp += v.charAt(i);
        setVal(tmp);
        console.log(v.charCodeAt(i));
        if (v.charCodeAt(i) === 60) sw = true;
        if (v.charCodeAt(i) === 62) sw = false;
      }
    }
  };

  return (
    <div className="container">
      <div className="main">
        <fieldset className="fd_s_TextArea">
          <legend>&nbsp;HTML&nbsp;</legend>
          <textarea
            onChange={changeValue}
            onClick={click}
            className="HTML_TextArea"></textarea>
        </fieldset>
        <fieldset className="fd_s_convertArea">
          <legend>&nbsp;Convert&nbsp;</legend>
          <textarea className="HTML_ConvertArea" value={val}></textarea>
        </fieldset>
      </div>
    </div>
  );
}
