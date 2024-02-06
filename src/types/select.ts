import { CSSProperties } from "react";

export type Option = { value: string; label: string };
export type Options = Array<Option>;

export type SelectProps = {
  value?: string | null;
  options: Options | (() => Promise<Options>);
  placeholder?: string;
  id: string;
  style?: CSSProperties;
  maxWidth?: string;
};

export interface ISelectContext {
  inputValue?: string;
  selectedOption?: Option | null;
  optionIndex?: number | null;
  isFocused?: boolean;
}

export interface ISelectStore {
  value: ISelectContext;
  setValue: React.Dispatch<React.SetStateAction<ISelectContext>>;
}
