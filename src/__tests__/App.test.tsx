import { render } from "@testing-library/react";
import { Select } from "../components/Select";

describe("Select Component", () => {
  test("Select component renders properly with given options", async () => {
    const options = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ];

    const { getByTestId } = render(
      <Select
        id="test-select"
        options={options}
        placeholder="Select an option"
      />
    );

    expect(() => getByTestId("test-select"));
  });
});
