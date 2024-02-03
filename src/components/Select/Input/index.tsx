import { getSelectContext } from "@/contexts/Select";

interface ISelectInput {
  placeholder?: string;
}

const SelectInput = ({ placeholder }: ISelectInput) => {
  const selectContext = getSelectContext();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    selectContext.setValue({
      inputValue: newValue,
    });
  };
  const handleResetInput = () => {
    if (!selectContext.value.selectedIndex) {
      selectContext.setValue({
        inputValue: "",
      });
    }
  };

  return (
    <input
      type="text"
      value={selectContext.value.inputValue}
      onChange={handleInputChange}
      onBlur={handleResetInput}
      placeholder={placeholder}
    />
  );
};

export { SelectInput };
