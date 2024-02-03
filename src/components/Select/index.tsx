import { SelectProvider } from "@/contexts/Select";
import { useState } from "react";
import { SelectInput } from "./Input";
import { OptionContainer } from "./OptionContainer";
import "./index.css";

export type Options = Array<{ value: string; label: string }>;

type SelectProps = {
  value?: string | null;
  options: Options | (() => Promise<Options>);
  onChange?: (value: string) => void;
  placeholder?: string;
};

export interface ISelectContext {
  inputValue?: string;
  selectedIndex?: number | null;
}

export interface ISelectStore {
  value: ISelectContext;
  setValue: React.Dispatch<React.SetStateAction<ISelectContext>>;
}

const defaultSelectContextValue = {
  inputValue: "",
  selectedIndex: null,
};

const Select = (props: SelectProps) => {
  const [selectContext, setSelectContext] = useState<ISelectContext>(
    defaultSelectContextValue
  );
  const store: ISelectStore = {
    value: selectContext,
    setValue: setSelectContext,
  };
  return (
    <>
      <SelectProvider value={store}>
        <div className="custom-select">
          <fieldset>
            <legend>{props.placeholder}</legend>
            <SelectInput placeholder={props.placeholder} />
          </fieldset>
          <OptionContainer options={props.options} />
        </div>
      </SelectProvider>
    </>
  );
};

export { Select };
