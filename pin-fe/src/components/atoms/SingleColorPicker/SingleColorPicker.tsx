import "./SingleColorPicker.scss";
import React, { useRef, useState } from "react";
import { SketchPicker } from "react-color";
import useClickOutside from "../../../hooks/useClickOutside";
import { createPortal } from "react-dom";

/**
 *
 * @param {function} handlePick
 * @param {string} initialColor
 * @param {boolean} isSelect
 *
 * @returns {Element}
 */
const SingleColorPicker = ({
  handlePick,
  selectedColor,
  initialColor = "",
}) => {
  const [color, setColor] = useState(initialColor);
  const [open, setOpen] = useState(false);

  const isSelected = selectedColor === color;

  const colorWrapperClassName = [
    "Pin-Color__Wrapper",
    isSelected && "--Selected",
  ]
    .filter(Boolean)
    .join(" ");
  const containerRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  useClickOutside(containerRef, handleClose);

  return (
    <div
      className="Pin-Color__Container"
      onClick={() => isSelected && setOpen(true)}
    >
      <div
        className={colorWrapperClassName}
        onClick={() => {
          handlePick(color);
        }}
      >
        <div
          className="Pin-Color__Item"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <>
        {open &&
          createPortal(
            <div className="Pin-Sketch__Wrapper" ref={containerRef}>
              <SketchPicker
                color={color}
                onChange={(val: any) => {
                  handlePick(val.hex);
                  setColor(val.hex);
                }}
                onChangeComplete={(val: any) => {
                  handlePick(val.hex);
                }}
              ></SketchPicker>
            </div>,
            document.querySelector(".Pin-ColorContainer__Wrapper") as Element
          )}
      </>
    </div>
  );
};

export default SingleColorPicker;
