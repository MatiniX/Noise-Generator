import { useRef, useState } from "react";
import { FiSettings } from "react-icons/fi";
import GradientCreator from "../GradientCreator";

// TODO: style this somehow and make gradient picker appear at reasonable position

type Props = {
  collapse: (content: HTMLDivElement) => void;
  palette: { offset: string; color: string }[];
  setPalette: React.Dispatch<
    React.SetStateAction<
      {
        offset: string;
        color: string;
      }[]
    >
  >;
  openSidebar: (open: boolean) => void;
};

const GradientSettings = ({ collapse, palette, setPalette, openSidebar }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <li className="nav-item">
      <a
        href="#"
        className="nav-link"
        onClick={() => {
          collapse(contentRef.current!);
          openSidebar(true);
        }}
      >
        <FiSettings className="nav-link-icon" />
        <span className="link-text">Gradient Settings</span>
      </a>
      <div ref={contentRef} className={`settings-panel`}>
        <GradientCreator palette={palette} setPalette={setPalette} />
      </div>
    </li>
  );
};

export default GradientSettings;
