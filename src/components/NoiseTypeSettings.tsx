import { useRef } from "react";
import { FiSettings } from "react-icons/fi";

type Props = {
  collapse: (content: HTMLDivElement) => void;
  handleNoiseTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDimensionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const NoiseTypeSettings = ({ collapse, handleNoiseTypeChange, handleDimensionChange }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <li className="nav-item">
      <a href="#" className="nav-link" onClick={() => collapse(contentRef.current!)}>
        <FiSettings />
        <span className="link-text">Noise Type</span>
      </a>
      <div ref={contentRef} className={`settings-panel`}>
        <select name="noiseType" id="noiseType" onChange={handleNoiseTypeChange}>
          <option value="value">Value</option>
          <option value="perlin">Perlin</option>
          <option value="simplex">Simplex</option>
          <option value="worley">Worley</option>
        </select>
        <select name="dimension" id="dimesnion" onChange={handleDimensionChange}>
          <option value={1}>1D</option>
          <option value={2}>2D</option>
        </select>
      </div>
    </li>
  );
};

export default NoiseTypeSettings;
