import { forwardRef, useEffect, useMemo, useState } from "react";
import { getSelectContext } from "../../../contexts/Select";
import { Option, Options } from "../../../types/select";

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

    const field = document.querySelector(`#${props.id} fieldset`);

    const dropdownHeight = useMemo(() => {
      const windowHeight = window.innerHeight;
      const fieldHeight = field ? field.clientHeight : 0;
      return (windowHeight - fieldHeight) * (1 / 3);
    }, [props.id, field]);

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
        isFocused: false,
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

    useEffect(() => {
      const dropdown = document.getElementById(`${props.id}-dropdown`);
      function isPartiallyHidden(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        // 가려진 부분이 있는지 확인
        return rect.bottom > windowHeight || rect.top < 0;
      }

      const reverse = () => {
        const field = document.querySelector(`#${props.id} fieldset`);
        if (dropdown.classList.contains("down")) {
          dropdown.classList.add("top");
          dropdown.classList.remove("down");
          dropdown.style.transform = `translate(0, -${
            ref.current.offsetHeight + field.clientHeight
          }px)`;
        } else {
          dropdown.classList.add("down");
          dropdown.classList.remove("top");
          dropdown.style.transform = "";
        }
      };

      window.addEventListener("scroll", () => {
        if (isPartiallyHidden(dropdown)) {
          reverse();
        }
      });
    }, [props.id]);

    return (
      <>
        <ul
          ref={ref}
          id={`${props.id}-dropdown`}
          style={{
            maxHeight: field ? `${dropdownHeight}px` : "auto",
            // transform: field ? `translate(0, ${2 * field.offsetHeight}px)` : "",
          }}
          className="down"
        >
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
