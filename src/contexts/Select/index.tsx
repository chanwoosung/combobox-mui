import { ISelectStore } from "../..//types/select";
import { setCustomContext } from "../..//utils/setCustomContext";

export const [SelectProvider, getSelectContext] =
  setCustomContext<ISelectStore>("Select");
