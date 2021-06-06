import { useEffect, useState } from "react";
import { MdGradient } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useGlobalContext } from "../context";
import Collapsible from "./Collapsible";

type Props = {
  isSidebarOpen: boolean;
  openSidebar: (open: boolean) => void;
};

const GradientSettings = ({ isSidebarOpen, openSidebar }: Props) => {
  const [open, setOpen] = useState(false);
  const { useGradient, setUseGradient } = useGlobalContext();

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
        <MdGradient className="nav-link-icon" />
        <span className="link-text">Gradient Settings</span>
        <RiArrowDropDownFill className={`link-dropdown ${open && "open"}`} />
      </button>
      <Collapsible open={open} setOpen={setOpen}>
        <div className="input-container">
          <label htmlFor="useGradient" className="label">
            Use Gradient:
          </label>
          <input
            type="checkbox"
            checked={useGradient}
            onChange={() => setUseGradient(!useGradient)}
          />
        </div>
        <div className="underline"></div>
      </Collapsible>
    </li>
  );
};

export default GradientSettings;
