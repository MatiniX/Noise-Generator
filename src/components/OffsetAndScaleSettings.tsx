import { useEffect, useState } from "react";
import { RiRuler2Fill, RiArrowDropDownFill } from "react-icons/ri";
import { useGlobalContext } from "../context";
import Collapsible from "./Collapsible";
import InteractiveInput from "./InteractiveInput";

type Props = {
  openSidebar: (open: boolean) => void;
  isSidebarOpen: boolean;
};

const OffsetAndScaleSettings = ({ openSidebar, isSidebarOpen }: Props) => {
  const dimension = 2;
  const [open, setOpen] = useState(false);
  const { setFrequency, setOffsetX, setOffsetY } = useGlobalContext();

  useEffect(() => {
    if (open && !isSidebarOpen) {
      setOpen(false);
    }
  }, [isSidebarOpen, open]);

  return (
    <li className="nav-item">
      <button
        className="nav-link"
        onClick={() => {
          setOpen(!open);
          openSidebar(true);
        }}
      >
        <RiRuler2Fill className="nav-link-icon" />
        <span className="link-text">Offset and Scale</span>
        <RiArrowDropDownFill className={`link-dropdown ${open && "open"}`} />
      </button>

      <Collapsible open={open} setOpen={setOpen}>
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
      </Collapsible>
    </li>
  );
};

export default OffsetAndScaleSettings;
