import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { HiChevronDoubleRight } from "react-icons/hi";
import NoiseTypeSettings from "./NoiseTypeSettings";
import OffsetAndScaleSettings from "./OffsetAndScaleSettings";
import FractalSettings from "./FractalSettings";
import GradientSettings from "./GradientSettings";

type Props = {
  downloadImage: () => void;
};

const Sidebar = ({ downloadImage }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`navbar ${isOpen && "navbar-open"}`}>
      <ul className="navbar-nav">
        <li className="logo" onClick={() => setIsOpen(!isOpen)}>
          <div className="nav-link">
            <span className="link-text">Noise Generator</span>
            <HiChevronDoubleRight className="nav-link-icon" />
          </div>
        </li>

        <NoiseTypeSettings openSidebar={setIsOpen} isSidebarOpen={isOpen} />
        <OffsetAndScaleSettings openSidebar={setIsOpen} isSidebarOpen={isOpen} />
        <FractalSettings openSidebar={setIsOpen} isSidebarOpen={isOpen} />

        <GradientSettings openSidebar={setIsOpen} isSidebarOpen={isOpen} />

        {/* TODO: Style download button */}
        <li className="nav-item">
          <button className="nav-link" onClick={downloadImage}>
            <FiDownload className="nav-link-icon" />
            <span className="link-text download-text">Download</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
