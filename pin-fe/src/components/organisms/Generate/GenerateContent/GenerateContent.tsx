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
  const currentSelectedElemnt = templateRef.current[selectedKey]

  const handleDrag = (e: any) => {
    handleChangeComponentSetting({
      ...componentSettingProps,
      key: "wrapperStyles",
      value: {
        top: e.top,
        right: e.right,
        bottom: e.bottom,
        left: e.left,
      },
    });
  };

  const handleResize = (e: any) => {
    console.log("resize",{ e });

    // handleChangeComponentSetting({
    //   ...componentSettingProps,
    //   key: "wrapperStyles",
    //   // value: {
    //   //   width: `${e.width}px`,
    //   //   height: `${e.height}px`,
    //   // },
    // });
  };

  const handleRotate = (e: any) => {

    handleChangeComponentSetting({
      ...componentSettingProps,
      key: "wrapperStyles",
      value: {
        transform: e.drag.transform
      },
    });
  };

  return (
    <Box sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
      <Moveable
        ref={moveableRef}
        target={currentSelectedElemnt}
        draggable={true}
        throttleDrag={1}
        edgeDraggable={false}
        startDragRotate={0}
        throttleDragRotate={0}
        resizable={true}
        keepRatio={false}
        throttleResize={1}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        rotatable={true}
        throttleRotate={0}
        rotationPosition={"top"}
        onDrag={handleDrag}
        onResize={handleResize}
        onRotate={handleRotate}
      />
      {input.map((template: any) => {
        return (
          <Template
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
