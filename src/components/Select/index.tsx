import { OptionContainer } from "./OptionContainer";
import "./index.css";
export type Options = Array<{ value: string; label: string }>;

type SelectProps = {
  value?: string | null;
  options: Options | (() => Promise<Options>);
  onChange?: (value: string) => void;
  placeholder?: string;
};

const Select = (props: SelectProps) => {
  return (
    <>
      <div className="custom-select">
        <fieldset>
          <legend>{props.placeholder}</legend>
          <input type="text" placeholder={props.placeholder} />
        </fieldset>
        <OptionContainer options={props.options} />
      </div>
    </>
  );
};

export { Select };
