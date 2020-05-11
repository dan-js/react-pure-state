# `𝌪 react-pure-state`

## Intuitive, unopinionated and lightweight global state manager for React

- ⚡ Zero dependencies and 2.3kB gzipped bundle means lightning fast performance
- 📝 Leverages the power of [ES6 Proxy objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to allow safe and simple changes to state
- 🛠 Single provider and hook exports make for minimal learning curve
- 🔍 Intuitive selectors make preventing unnecessary rerendering easy
- 🙅‍♂️ Basic middleware adds support for validation, logging and more

### Get Started

- `yarn add react-pure-state`

### Basic Example

```jsx
import { StateProvider, useRps } from 'react-pure-state';

const Introduction = () => {
    // Read from the state with ease
    const { name } = useRps();

    return <div>Hello from {name}!</div>;
}

const NameInput = () => {
    const state = useRps();

    // Update state the way you know and love
    const onChange = e => (state.name = e.target.value);

    return <input value={state.name} onChange={onChange} />;
};

const App = () => (
    <StateProvider initialState={{ name: 'Dan' }}>
        <NameInput />
        <Introduction />
    <StateProvider/>
)
```

### Using Selectors

```jsx
const initialState = {
    animal: "penguin",
    traits: ["loyal", "slippery", "majestic"],
};

const TraitList = () => {
    // This will only rerender when `state.traits` value changes
    const traits = useRps(state => state.traits);

    return <div>{traits.join(", ")}</div>;
};
```

### Middleware

```jsx
const validTypes = ["emperor", "adelie", "gentoo"];

const initialState = {
    type: "gentoo",
};

const typeValidator = ({ prop, value }) => {
    // Return `true` to allow the update, `false` to cancel
    return prop !== "type" || validTypes.includes(value);
};

const App = () => (
    <StateProvider initialState={initialState} middleware={[typeValidator]}>
        ...
    </StateProvider>
);
```

### Updating arrays / abstracting with hooks

```jsx
const initialState = {
    penguins: ['dan', 'val', 'tom']
};

const usePenguins = () => {
    const { penguins } = useRps();

    /* All mutating array methods are supported, such as push,
       splice, shift, pop etc. */
    const addPenguin = penguin => penguins.push(penguin);

    return { 
        penguinCount: penguins.length, 
        addPenguin
    };
};

```

### Motivation

There are a number of options for managing state in a React application, and arguably most well-known is `react-redux`. Redux is great at what it does and offers a very complete solution, but adds a fair amount of boilerplate and a non-negligible learning curve for developers.

On the other hand, `react-pure-state` attempts to conform as much as possible to traditional JS syntax, meaning it can be picked up by anyone and adds minimal extra code to your application.

I've seen other packages using `Proxy` in a similar way in the past, but after experimenting none have felt to me as minimal, fast and intuitive as this.
