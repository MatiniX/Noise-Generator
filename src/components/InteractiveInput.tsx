import { useEffect, useState } from "react";

type Props = {
  label: string;
  id: string;
  defaultValue: number;
  setParameter: (n: number) => void;
};

const InteractiveInput = ({ label, id, defaultValue, setParameter }: Props) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setParameter(value);
  }, [value]);

  let dragStartX: number;
  let prevDeltaX: number;

  const dragStart = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // console.log("mouse drag start");
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragStop);

    dragStartX = e.screenX;
    prevDeltaX = dragStartX;
  };
  const dragStop = () => {
    // console.log("dragStop");
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragStop);
  };
  const dragMove = (e: MouseEvent) => {
    const deltaX = e.screenX - prevDeltaX;
    // console.log(deltaX);
    setValue((prevValue) => {
      return prevValue + deltaX * 0.01;
    });
    prevDeltaX = e.screenX;
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        onMouseDown={dragStart}
        value={value}
        onChange={(e) => {
          setValue(parseFloat(e.target.value));
        }}
      />
    </>
  );
};

export default InteractiveInput;
