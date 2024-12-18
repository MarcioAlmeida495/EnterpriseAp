import { useState } from "react";

function ResizableDiv() {
  const [width, setWidth] = useState(200); // Largura inicial da div
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(!isResizing);
  };

  const handleMouseMove = (event) => {
    if (isResizing) {
      const newWidth = event.clientX + 5;
      console.log(newWidth)
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  return (
    <div
      style={{
        width: `${width}px`,
        height: "100px",
        backgroundColor: "lightblue",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          width: "10px",
          height: "100%",
          backgroundColor: "darkblue",
          cursor: "ew-resize",
          position: "absolute",
          right: 0,
          top: 0,
        }}
        onClick={handleMouseDown}
      />
    </div>
  );
}

export default ResizableDiv;
