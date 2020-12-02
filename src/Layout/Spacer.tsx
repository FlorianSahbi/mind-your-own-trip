import React from "react";

interface SpacerInterface {
  spacing: number;
  unit?: "px" | "em" | "rem";
  orientation?: "vertical" | "horizontal";
}

function Spacer({ spacing, unit = "px", orientation = "vertical" }: SpacerInterface) {
  return (
    <span style={{
      margin: `${orientation === "vertical" ? spacing / 2 : 0}${unit} ${orientation === "vertical" ? 0 : spacing / 2}${unit}` }} />
      // border: "3px solid blue", 
  )
}

export default Spacer;
