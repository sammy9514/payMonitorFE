import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface iDash {
  active: string;
  setActive: (tab: string) => void;
}

const DashBoardContext = createContext<iDash | undefined>(undefined);

export const DashBoardProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<string>("Overview");

  const value = useMemo(() => ({ active, setActive }), [active]);

  return (
    <DashBoardContext.Provider value={value}>
      {children}
    </DashBoardContext.Provider>
  );
};

export const useDash = () => {
  const ctx = useContext(DashBoardContext);
  if (!ctx)
    throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};
