import React, { useContext, useEffect, useRef, useState } from "react";
import Template from "../../Template";
import { Box } from "@mui/material";
import { GenerateContext } from "../../../../contexts/GenerateContext";
import Moveable from "react-moveable";

export default function GenerateContent() {
  const { input, handleChangeComponentSetting } = useContext(GenerateContext);
  const [selectedKey, setSelectedKey] = useState("");
  const moveableRef = useRef<Moveable>(null);
  const templateRef = useRef<any>({});
  const [templateId, componentIndex] = selectedKey.split("-");

  const setComponentRef = (el: any, key: string) => {
    templateRef.current[key] = el;
  };
  const componentSettingProps = { componentIndex, id: templateId };
  const currentSelectedElement = templateRef.current[selectedKey];

  const handleDrag = (e: any) => {
    currentSelectedElement.style.top = `${e.top}px`;
    currentSelectedElement.style.left = `${e.left}px`;
    currentSelectedElement.style.bottom = `${e.bottom}px`;
    currentSelectedElement.style.right = `${e.right}px`;
  };

  const handleDragEnd = (e: any) => {
    if (!e.lastEvent) return;
    handleChangeComponentSetting({
      ...componentSettingProps,
      key: "wrapperStyles",
      value: {
        top: `${e.lastEvent.top}px`,
        right: `${e.lastEvent.right}px`,
        bottom: `${e.lastEvent.bottom}px`,
        left: `${e.lastEvent.left}px`,
      },
    });
  };

  const handleResize = (e: any) => {
    const [xAxis, yAxis] = e.delta;
    currentSelectedElement.style.width = `${
      parseFloat(currentSelectedElement.style.width) + xAxis
    }px`;
    currentSelectedElement.style.height = `${
      parseFloat(currentSelectedElement.style.height) + yAxis
    }px`;
    currentSelectedElement.style.transform = e.drag.transform;
  };

  const handleResizeEnd = (e: any) => {
    if (!e.lastEvent) return;
    handleChangeComponentSetting({
      ...componentSettingProps,
      key: "wrapperStyles",
      value: {
        width: `${e.lastEvent.width}px`,
        height: `${e.lastEvent.height}px`,
      },
    });
  };

  const handleRotate = (e: any) => {
    handleChangeComponentSetting({
      ...componentSettingProps,
      key: "wrapperStyles",
      value: {
        transform: e.drag.transform,
      },
    });
  };

  return (
    <Box sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
      <Moveable
        ref={moveableRef}
        target={currentSelectedElement}
        draggable={true}
        throttleDrag={1}
        edgeDraggable={false}
        startDragRotate={0}
        throttleDragRotate={0}
        resizable={true}
        keepRatio={false}
        throttleResize={0}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        rotatable={true}
        throttleRotate={1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
        onRotate={handleRotate}
      />
      {input.map((template: any) => {
        return (
          <Template
            key={template.id}
            template={template}
            setComponentRef={setComponentRef}
            onSelectComponent={(key: any) => setSelectedKey(key)}
            onChange={({
              key,
              value,
              componentIndex,
            }: {
              key: string;
              value: any;
              componentIndex: any;
            }) =>
              handleChangeComponentSetting({
                id: template.id,
                key,
                value,
                componentIndex,
              })
            }
          />
        );
      })}
    </Box>
  );
}
