import { useEffect, useState } from "react";
import { Options } from "..";

const OptionContainer = (props: {
  options: Options | (() => Promise<Options>);
}) => {
  const [selectOptions, setSelectOptions] = useState<Options>([]);

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
      <ul>
        {selectOptions.map((option, index) => (
          <li key={index}>{option.label}</li>
        ))}
      </ul>
    </>
  );
};

export { OptionContainer };