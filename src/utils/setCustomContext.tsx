import { ReactNode, createContext, useContext } from "react";

export function setCustomContext<Store>(contextName: string) {
  const CustomContext = createContext<Store | null>(null);

  const getCustomContext = (): Store => {
    const context = useContext(CustomContext);
    if (context === null) {
      throw new Error(
        `${contextName} 컨텍스트에 접근했으나 ${contextName}Provider가 없습니다.`
      );
    }
    return context;
  };

  const CustomContextProvider = ({
    children,
    value,
  }: {
    children: ReactNode;
    value: Store;
  }) => {
    CustomContext.displayName = contextName + "Provider";
    return (
      <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
    );
  };

  return [CustomContextProvider, getCustomContext] as const;
}
