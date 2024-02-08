import "./App.css";
import { Select } from "./components/Select";
import { fetchTop100Films } from "./services/fetchTop100Films";

function App() {
  return (
    <>
      <Select
        options={fetchTop100Films}
        placeholder="lorem inpsum 어쩌구 저쩌구"
        id="select-1"
        style={{
          maxWidth: "300px",
          width: "300px",
        }}
      />
      {/* <Select
        options={top100Films}
        placeholder="lorem inpsum 어쩌구 저쩌구"
        id="select-2"
      /> */}
    </>
  );
}

export default App;
