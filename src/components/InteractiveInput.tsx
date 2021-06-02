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

  const dragStart = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragStop);

    dragStartX = e.screenX;
    prevDeltaX = dragStartX;
  };
  const dragStop = () => {
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragStop);
  };
  const dragMove = (e: MouseEvent) => {
    const deltaX = e.screenX - prevDeltaX;

    setValue((prevValue) => {
      return prevValue + deltaX * 0.01;
    });
    prevDeltaX = e.screenX;
  };

  return (
    <div className="input-container">
      <label htmlFor={id} className="interactive-input-label" onMouseDown={dragStart}>
        {label}:
      </label>
      <input
        id={id}
        type="number"
        value={Math.round((value + Number.EPSILON) * 100) / 100}
        onChange={(e) => {
          setValue(parseFloat(e.target.value));
        }}
        className="interactive-input-field"
      />
    </div>
  );
};

export default InteractiveInput;
