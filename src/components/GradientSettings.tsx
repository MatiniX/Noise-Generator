import { useEffect, useState } from "react";
import { MdGradient } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import GradientCreator from "../GradientCreator";
import Collapsible from "./Collapsible";

// TODO: style this somehow and make gradient picker appear at reasonable position

type Props = {
  isSidebarOpen: boolean;
  openSidebar: (open: boolean) => void;
};

const GradientSettings = ({ isSidebarOpen, openSidebar }: Props) => {
  const [open, setOpen] = useState(false);

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
        <GradientCreator />
      </Collapsible>
    </li>
  );
};

export default GradientSettings;
