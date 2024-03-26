import { useState } from "react";

export default function useTemplateInput(defaultState = []) {
  const [input, setInput] = useState(defaultState);

  const handleChangeComponentSetting = ({
    key,
    value,
    componentIndex,
    id,
  }: {
    key: string;
    value: any;
    componentIndex: number;
    id: string;
  }) => {
    setInput((prev: any) => {
      return prev.map((x: any) => {
        const template = { ...x };
        if (template.id !== id) return template;
        template.components[componentIndex][key] = {...template.components[componentIndex][key], ...value};
        return template;
      });
    });
  };

  return { input, handleChangeComponentSetting, setInput };
}
