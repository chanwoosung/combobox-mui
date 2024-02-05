import { getSelectContext } from "@/contexts/Select";

interface ISelectInput {
  id: string;
  placeholder?: string;
}

const SelectInput = ({ id, placeholder }: ISelectInput) => {
  const selectContext = getSelectContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    selectContext.setValue({
      ...selectContext.value,
      inputValue: newValue,
      optionIndex: null,
    });
  };

  const handleResetInput = () => {
    if (!selectContext.value.selectedOption) {
      selectContext.setValue({
        inputValue: "",
        selectedOption: null,
        optionIndex: null,
      });
    } else {
      if (!selectContext.value.inputValue) {
        selectContext.setValue({
          inputValue: "",
          selectedOption: null,
          optionIndex: null,
        });
        return;
      }
      selectContext.setValue({
        ...selectContext.value,
        inputValue: selectContext.value.selectedOption.label,
      });
    }
  };

  const handleFocus = () => {
    selectContext.setValue({
      ...selectContext.value,
    });
  };

  return (
    <input
      id={`${id}-input`}
      type="text"
      value={selectContext.value.inputValue}
      onChange={handleInputChange}
      onBlur={handleResetInput}
      placeholder={placeholder}
      onFocus={handleFocus}
    />
  );
};

export { SelectInput };
