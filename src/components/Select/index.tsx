import { SelectProvider } from "@/contexts/Select";
import { useRef, useState } from "react";
import { DropDown } from "./DropDown";
import { SelectInput } from "./Input";
import "./index.css";

export type Option = { value: string; label: string };
export type Options = Array<Option>;

type SelectProps = {
  value?: string | null;
  options: Options | (() => Promise<Options>);
  onChange?: (value: string) => void;
  placeholder?: string;
  id: string;
};

export interface ISelectContext {
  inputValue?: string;
  selectedOption?: Option | null;
  optionIndex?: number | null;
}

export interface ISelectStore {
  value: ISelectContext;
  setValue: React.Dispatch<React.SetStateAction<ISelectContext>>;
}

const defaultSelectContextValue: ISelectContext = {
  inputValue: "",
  selectedOption: null,
  optionIndex: null,
};

const Select = (props: SelectProps) => {
  const [selectContext, setSelectContext] = useState<ISelectContext>(
    defaultSelectContextValue
  );
  const optionRef = useRef<HTMLUListElement>(null);

  const store: ISelectStore = {
    value: selectContext,
    setValue: setSelectContext,
  };

  const focusOption = (index: number | null) => {
    const liElements = optionRef.current.getElementsByTagName("li");
    if (index >= 0) {
      if (liElements.length < index) return;
      if (liElements[index]) {
        for (let c of liElements) c.classList.remove("isFocused");
        liElements[index].classList.add("isFocused");
        liElements[index].scrollIntoView();
      }
    } else {
      if (liElements[liElements.length + index]) {
        for (let c of liElements) c.classList.remove("isFocused");
        liElements[index].classList.add("isFocused");
        liElements[index].scrollIntoView();
      }
    }
  };

  const submitOption = () => {
    const liElements = optionRef.current.getElementsByTagName("li");
    for (let c of liElements) c.classList.remove("isFocused");
    setSelectContext({
      inputValue: liElements[selectContext.optionIndex].textContent,
      selectedOption: {
        label: liElements[selectContext.optionIndex].textContent,
        value: String(liElements[selectContext.optionIndex].value),
      },
      optionIndex: null,
    });
  };

  const selectOption = (newIndex: number | null) => {
    focusOption(newIndex);
    setSelectContext({
      ...selectContext,
      optionIndex: newIndex,
    });
  };

  const keyDownHandler = (event) => {
    const liElements = optionRef.current.getElementsByTagName("li");
    const totalOptions = liElements.length;
    let newIndex: number;
    if (event.keyCode === 13) {
      if (selectContext.optionIndex === null) return;
      submitOption();
    } else if (event.keyCode === 38) {
      if (selectContext.optionIndex === null) {
        return selectOption(0);
      }
      newIndex = (selectContext.optionIndex - 1 + totalOptions) % totalOptions;
      selectOption(newIndex);
    } else if (event.keyCode === 40) {
      if (selectContext.optionIndex === null) {
        return selectOption(0);
      }
      newIndex = (selectContext.optionIndex + 1) % totalOptions;
      selectOption(newIndex);
    } else {
      newIndex = (selectContext.optionIndex + 1) % totalOptions;
      selectOption(null);
    }
  };

  return (
    <>
      <SelectProvider value={store}>
        <div id={props.id} className="custom-select" onKeyDown={keyDownHandler}>
          <fieldset>
            <legend>{props.placeholder}</legend>
            <SelectInput placeholder={props.placeholder} id={props.id} />
          </fieldset>
          <DropDown options={props.options} ref={optionRef} id={props.id} />
        </div>
      </SelectProvider>
    </>
  );
};

export { Select };
