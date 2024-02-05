import { Select } from "@/components/Select";
import top100Films from "@/mocks/top100Films.json";
import { fetchTop100Films } from "@/services/fetchTop100Films";
import "./App.css";

function App() {
  return (
    <>
      <Select
        options={fetchTop100Films}
        placeholder="lorem inpsum 어쩌구 저쩌구"
        id="select-1"
      />
      <Select
        options={top100Films}
        placeholder="lorem inpsum 어쩌구 저쩌구"
        id="select-2"
      />
    </>
  );
}

export default App;
