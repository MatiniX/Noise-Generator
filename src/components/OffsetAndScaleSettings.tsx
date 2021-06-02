import { useRef, useState } from "react";
import { RiRuler2Fill, RiArrowDropDownFill } from "react-icons/ri";
import InteractiveInput from "./InteractiveInput";

type Props = {
  collapse: (content: HTMLDivElement) => void;
  setFrequency: (n: number) => void;
  setOffsetX: (n: number) => void;
  setOffsetY: (n: number) => void;
  openSidebar: (open: boolean) => void;
};

const OffsetAndScaleSettings = ({
  collapse,
  setFrequency,
  setOffsetX,
  setOffsetY,
  openSidebar,
}: Props) => {
  const dimension = 2;
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a
        href="#"
        className="nav-link"
        onClick={() => {
          collapse(contentRef.current!);
          setOpen(!open);
          openSidebar(true);
        }}
      >
        <RiRuler2Fill className="nav-link-icon" />
        <span className="link-text">Offset and Scale</span>
        <RiArrowDropDownFill className={`link-dropdown ${open && "open"}`} />
      </a>

      <div ref={contentRef} className={`settings-panel`}>
        <InteractiveInput
          label="Frequency"
          id="frequency"
          defaultValue={4}
          setParameter={setFrequency}
        />

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
        <div className="underline"></div>
      </div>
    </li>
  );
};

export default OffsetAndScaleSettings;
