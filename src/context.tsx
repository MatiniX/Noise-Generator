import React, { useContext, useState } from "react";
import { NoiseType } from "./Noise/imageGenerator";

interface AppContextInterface {
  noiseType: NoiseType;
  setNoiseType: (type: NoiseType) => void;
  dimension: number;
  setDimension: (n: number) => void;
  frequency: number;
  setFrequency: (n: number) => void;
  offsetX: number;
  setOffsetX: (n: number) => void;
  offsetY: number;
  setOffsetY: (n: number) => void;
  octaves: number;
  setOctaves: (n: number) => void;
  lacunarity: number;
  setLacunarity: (n: number) => void;
  persistance: number;
  setPersistance: (n: number) => void;
  palette: { offset: string; color: string }[];
  setPalette: (pallete: { offset: string; color: string }[]) => void;
  resolution: number;
  setResolution: (n: number) => void;
  useGradient: boolean;
  setUseGradient: (use: boolean) => void;
}

const AppContext = React.createContext<AppContextInterface>(undefined!);

const AppProvider = ({ children }: any) => {
  const [noiseType, setNoiseType] = useState(NoiseType.Value);
  const [dimension, setDimension] = useState(1);
  const [frequency, setFrequency] = useState(4);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [octaves, setOctaves] = useState(1);
  const [lacunarity, setLacunarity] = useState(2.0);
  const [persistance, setPersistance] = useState(0.5);
  const [resolution, setResolution] = useState(512);
  const [useGradient, setUseGradient] = useState(false);
  const [palette, setPalette] = useState([
    { offset: "0.00", color: "rgb(0, 0, 0)" },
    { offset: "1.00", color: "rgb(255, 255, 255)" },
  ]);

  return (
    <AppContext.Provider
      value={{
        noiseType,
        setNoiseType,
        dimension,
        setDimension,
        frequency,
        setFrequency,
        offsetX,
        setOffsetX,
        offsetY,
        setOffsetY,
        octaves,
        setOctaves,
        lacunarity,
        setLacunarity,
        persistance,
        setPersistance,
        palette,
        setPalette,
        resolution,
        setResolution,
        useGradient,
        setUseGradient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
