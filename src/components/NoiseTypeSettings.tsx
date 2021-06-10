import { ChangeEvent, useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { NoiseType } from "../Noise/imageGenerator";
import { RiArrowDropDownFill } from "react-icons/ri";
import { CgEditNoise } from "react-icons/cg";
import Collapsible from "./Collapsible";

type Props = {
  openSidebar: (open: boolean) => void;
  isSidebarOpen: boolean;
};

const NoiseTypeSettings = ({ openSidebar, isSidebarOpen }: Props) => {
  const [open, setOpen] = useState(false);
  const { noiseType, setNoiseType, setDimension } = useGlobalContext();

  useEffect(() => {
    if (open && !isSidebarOpen) {
      setOpen(false);
    }
  }, [isSidebarOpen, open]);

  const handleNoiseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "value":
        setNoiseType(NoiseType.Value);
        break;
      case "perlin":
        setNoiseType(NoiseType.Perlin);
        break;
      case "simplex":
        setNoiseType(NoiseType.Simplex);
        break;
      case "worley":
        setNoiseType(NoiseType.Worley);
        break;

      default:
        throw new Error("Unknow noise type!");
    }
  };
  const handleDimensionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDimension(parseInt(e.target.value));
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
        <CgEditNoise className="nav-link-icon" />
        <span className="link-text">Noise Type</span>
        <RiArrowDropDownFill className={`link-dropdown ${open && "open"}`} />
      </button>

      <Collapsible open={open} setOpen={setOpen}>
        <div className="input-container">
          <label htmlFor="noiseType" className="label">
            Noise Type:
          </label>
          <div className="select">
            <select name="noiseType" id="noiseType" onChange={handleNoiseTypeChange}>
              <option value="value">Value</option>
              <option value="perlin">Perlin</option>
              <option value="simplex">Simplex</option>
              <option value="worley">Worley</option>
            </select>
            <span className="focus"></span>
          </div>
        </div>

        {noiseType !== NoiseType.Worley && (
          <div className="input-container">
            <label htmlFor="noiseType" className="label">
              Dimension:
            </label>
            <div className="select">
              <select name="dimension" id="dimesnion" onChange={handleDimensionChange}>
                <option value={1}>1D</option>
                <option value={2}>2D</option>
              </select>
              <span className="focus"></span>
            </div>
          </div>
        )}

        <div className="underline"></div>
      </Collapsible>
    </li>
  );
};

export default NoiseTypeSettings;
