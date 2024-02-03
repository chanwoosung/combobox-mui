import { ISelectContext } from "@/components/Select";
import { setCustomContext } from "@/utils/setCustomContext";

export const [SelectProvider, getSelectContext] =
  setCustomContext<ISelectContext>("Select");
