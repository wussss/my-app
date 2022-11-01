import { createSignal } from "solid-js";
import "./index.css";

export function My() {
  const [getCount, setCount] = createSignal(1);
  const add = () => {
    setCount(getCount() + 1);
  };
  const clear = () => {
    setCount(0);
  };
  return (
    <div class="root">
      <div style={{ "margin-bottom": "20px" }}>solidjs</div>
      <div id="text">{getCount()}</div>
      <div onClick={add} class="button add">
        add
      </div>
      <div onClick={clear} class="button clear">
        clear
      </div>
    </div>
  );
}
