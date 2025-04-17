import { createContext, ReactNode, useContext, useMemo } from "react";
import { Hotkey } from "./types";

type BoundHotkeysProxyProviderType = {
  addHotkey: (hotkey: Hotkey) => void;
  removeHotkey: (hotkey: Hotkey) => void;
};

const BoundHotkeysProxyProvider = createContext<BoundHotkeysProxyProviderType | undefined>(undefined);
BoundHotkeysProxyProvider.displayName = "BoundHotkeysProxyProvider";

export const useBoundHotkeysProxy = () => {
  return useContext(BoundHotkeysProxyProvider);
};

interface Props {
  children: ReactNode;
  addHotkey: (hotkey: Hotkey) => void;
  removeHotkey: (hotkey: Hotkey) => void;
}

export default function BoundHotkeysProxyProviderProvider({ addHotkey, removeHotkey, children }: Props) {
  const contextValue = useMemo(() => ({ addHotkey, removeHotkey }), [addHotkey, removeHotkey]);

  return <BoundHotkeysProxyProvider.Provider value={contextValue}>{children}</BoundHotkeysProxyProvider.Provider>;
}
