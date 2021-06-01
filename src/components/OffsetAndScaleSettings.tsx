import { useRef } from "react";
import { FiSettings } from "react-icons/fi";
import InteractiveInput from "./InteractiveInput";

type Props = {
  collapse: (content: HTMLDivElement) => void;
  setFrequency: (n: number) => void;
  setOffsetX: (n: number) => void;
  setOffsetY: (n: number) => void;
};

const OffsetAndScaleSettings = ({ collapse, setFrequency, setOffsetX, setOffsetY }: Props) => {
  const dimension = 2;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <li className="nav-item">
      <a href="#" className="nav-link" onClick={() => collapse(contentRef.current!)}>
        <FiSettings />
        <span className="link-text">Offset and Scale</span>
      </a>

      <div ref={contentRef} className={`settings-panel`}>
        <div>
          <InteractiveInput
            label="Frequency"
            id="frequency"
            defaultValue={4}
            setParameter={setFrequency}
          />
        </div>
        <div>
          <InteractiveInput
            label="Offset X"
            id="ofssetX"
            defaultValue={0}
            setParameter={setOffsetX}
          />
          {dimension > 1 && (
            <InteractiveInput
              label="Offset Y"
              id="offsetY"
              defaultValue={0}
              setParameter={setOffsetY}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default OffsetAndScaleSettings;
