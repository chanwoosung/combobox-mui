import { getSelectContext } from "@/contexts/Select";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { Option, Options } from "..";

const DropDown = forwardRef(
  (
    props: {
      options: Options | (() => Promise<Options>);

      id: string;
    },
    ref: React.RefObject<HTMLUListElement>
  ) => {
    const [selectOptions, setSelectOptions] = useState<Options>([]);

    const selectContext = getSelectContext();

    const filteredOptions = useMemo(() => {
      return selectOptions.filter((option) =>
        option.label
          .toLowerCase()
          .includes(selectContext.value.inputValue.toLowerCase())
      );
    }, [selectContext.value.inputValue, selectOptions]);

    const handleClickOption = (option: Option) => {
      selectContext.setValue({
        inputValue: option.label,
        selectedOption: option,
        optionIndex: null,
      });
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          let fetchedOptions: Options;

          if (typeof props.options === "function") {
            fetchedOptions = await props.options();
          } else {
            fetchedOptions = props.options;
          }

          setSelectOptions(fetchedOptions);
        } catch (error) {
          alert("데이터 호출 중 에러가 발생했습니다.");
          console.error(error);
          setSelectOptions([]);
        }
      };

      fetchData();
    }, [props.options]);

    return (
      <>
        <ul ref={ref} id={`${props.id}-dropdown`}>
          {filteredOptions.length === 0 ? <li>No option.</li> : null}
          {filteredOptions.map((option) => (
            <li
              role="option"
              key={option.value}
              onMouseDown={() => handleClickOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </>
    );
  }
);

export { DropDown };
