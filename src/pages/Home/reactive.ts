interface Effect {
  execute: () => void;
  deps?: Set<Set<Effect>>;
}

type Getter<T> = () => T;
type Setter<T> = (newValue: T) => any;

const effectStack: Effect[] = [];

function subscribe(runningEffect: Effect, observers: Set<Effect>) {
  observers.add(runningEffect);
  runningEffect.deps?.add(observers);
}
function cleanup(runningEffect: Effect) {
  if (runningEffect.deps) {
    for (const dep of runningEffect.deps) {
      dep.delete(runningEffect);
    }
    runningEffect.deps?.clear();
  }
}

export function createSignal<T>(value: T): [Getter<T>, Setter<T>] {
  const observers = new Set<Effect>();
  const getter = () => {
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      subscribe(effect, observers);
    }
    return value;
  };
  const setter = (newValue: T) => {
    value = newValue;
    for (const sub of [...observers]) {
      sub.execute();
    }
  };
  return [getter, setter];
}
export function createEffect(callback: (args?: any) => any) {
  const execute = () => {
    cleanup(effect);
    effectStack.push(effect);
    try {
      callback();
    } finally {
      effectStack.pop();
    }
  };
  const effect = { execute };
  execute();
}

export function createMemo<T>(callback: () => T, initValue: T) {
  const [get, set] = createSignal<T>(initValue);
  createEffect(() => set(callback()));
  return get;
}
