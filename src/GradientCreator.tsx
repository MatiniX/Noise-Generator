import { useState } from "react";
import { ChromePicker } from "react-color";
import { GradientPickerPopover } from "react-linear-gradient-picker";

type Props = {
  palette: { offset: string; color: string }[];
  setPalette: React.Dispatch<
    React.SetStateAction<
      {
        offset: string;
        color: string;
      }[]
    >
  >;
};

// refactor this part so it si more typescript commpilant

const rgbToRgba = (rgb: any, a = 1) => {
  return rgb.replace("rgb(", "rgba(").replace(")", `, ${a})`);
};

const WrappedColorPicker = ({ onSelect, ...rest }: any) => (
  <ChromePicker
    {...rest}
    color={rgbToRgba(rest.color, rest.opacity)}
    onChange={(c: any) => {
      const { r, g, b, a } = c.rgb;
      onSelect(`rgb(${r}, ${g}, ${b})`, a);
    }}
    disableAlpha={true}
  />
);

const GradientCreator = ({ palette, setPalette }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <GradientPickerPopover
      {...{
        open,
        setOpen,
        showAnglePicker: false,
        width: 320,
        paletteHeight: 32,
        palette,
        onPaletteChange: setPalette,
      }}
    >
      <WrappedColorPicker />
    </GradientPickerPopover>
  );
};

export default GradientCreator;
