import React, { useEffect, useState } from "react";
import { RiRuler2Fill, RiArrowDropDownFill } from "react-icons/ri";
import { useGlobalContext } from "../context";
import Collapsible from "./Collapsible";
import InteractiveInput from "./InteractiveInput";

type Props = {
  openSidebar: (open: boolean) => void;
  isSidebarOpen: boolean;
};

const OffsetAndScaleSettings = ({ openSidebar, isSidebarOpen }: Props) => {
  const [open, setOpen] = useState(false);
  const { setFrequency, setOffsetX, setOffsetY, dimension, resolution, setResolution } =
    useGlobalContext();

  useEffect(() => {
    if (open && !isSidebarOpen) {
      setOpen(false);
    }
  }, [isSidebarOpen, open]);

  const handleResolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRes = Number(e.target.value);
    setResolution(newRes);
  };
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
        <div className="input-container">
          <label htmlFor="noiseType" className="label">
            Resolution (px):
          </label>
          <div className="select">
            <select
              name="resolution"
              id="resolution"
              onChange={(e) => handleResolutionChange(e)}
              value={resolution}
            >
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
              <option value="128">128</option>
              <option value="256">256</option>
              <option value="512">512</option>
              <option value="1024">1024</option>
              <option value="2048">2048</option>
            </select>
            <span className="focus"></span>
          </div>
        </div>
        <div className="underline"></div>
      </Collapsible>
    </li>
  );
};

export default OffsetAndScaleSettings;
