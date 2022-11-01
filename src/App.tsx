import type { Component } from "solid-js";
import { Switch, Match } from "solid-js";
import { createStore } from "solid-js/store";

import { Home } from "./pages/Home/home";
import { My } from "./pages/My/my";

const App: Component = () => {
  const initialValue = {
    route: "home",
  };
  const [store, setStore] = createStore(initialValue);

  return (
    <>
      <div
        onclick={() => {
          setStore({ route: store.route === "my" ? "home" : "my" });
        }}
      >
        change route
      </div>
      <Switch fallback={<div>Not Found</div>}>
        <Match when={store.route === "home"}>
          <Home />
        </Match>
        <Match when={store.route === "my"}>
          <My />
        </Match>
      </Switch>
    </>
  );
};

export default App;
