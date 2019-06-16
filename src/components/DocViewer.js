import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import Popover from "react-tiny-popover";

import "./DocViewer.css";
import Button from "../common/Button";

function DocViewer({ document, onHighlightClick, addSelectedTextAsEntity }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const onDoubleClick = () => {
    if (window.getSelection().toString().length) {
      setIsPopoverOpen(true);
      setSelectedText(window.getSelection().toString());
    } else {
      setSelectedText(window.getSelection().toString());
      setIsPopoverOpen(false);
    }
  };
  useEffect(() => {
    setIsPopoverOpen(false);
  }, [document]);
  function HighlightedEntity({ children }) {
    return (
      <mark
        className="HighlightClassName"
        onClick={() => onHighlightClick(children)}
      >
        {children}
      </mark>
    );
  }
  return (
    <Popover
      isOpen={isPopoverOpen}
      position={"top"} // preferred position
      content={
        <Button
          onClick={() => addSelectedTextAsEntity(selectedText)}
          background="lightgreen"
        >
          Add as Named Entity
        </Button>
      }
    >
      <Highlighter
        className="HighlightedEmail"
        highlightClassName="HighlightClassName"
        caseSensitive={true}
        searchWords={document.searchWords}
        autoEscape={true}
        textToHighlight={document.text}
        highlightTag={HighlightedEntity}
        onDoubleClick={onDoubleClick}
        onMouseUp={onDoubleClick}
      />
    </Popover>
  );
}

export default DocViewer;
