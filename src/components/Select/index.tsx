import { useRef, useState } from "react";
import { SelectProvider } from "../../contexts/Select";
import { ISelectContext, ISelectStore, SelectProps } from "../../types/select";
import { DropDown } from "./DropDown";
import { SelectInput } from "./Input";
import "./index.css";

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

  const scrollToIndex = (index: number | null) => {
    const ulElement = optionRef.current;
    const liElements = ulElement.getElementsByTagName("li");
    if (index !== null && index >= 0 && index < liElements.length) {
      const liElement = liElements[index];
      ulElement.scrollTop = liElement.offsetTop - ulElement.offsetTop;
    }
  };

  const focusOption = (index: number | null) => {
    const liElements = optionRef.current.getElementsByTagName("li");
    if (liElements[index]) {
      for (let c of liElements) c.classList.remove("isFocused");
      liElements[index].classList.add("isFocused");
    }
    scrollToIndex(index);
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
    setSelectContext({
      ...selectContext,
      optionIndex: newIndex,
    });
    focusOption(newIndex);
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
        <div
          id={props.id}
          style={props.style}
          className={`custom-select ${
            selectContext.isFocused ? "on-focus" : ""
          }`}
          onKeyDown={keyDownHandler}
        >
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
