# Strictly Formed

Component state bindings for redux and statically typed forms for typescript

### Install

```bash
npm install strictly-formed
```

# API

### Redux Store

- **strictly-formed** state expects to be mapped under the reducer key `components`.

```typescript
  import { combineReducers, createStore } from 'redux'
  import { componentStateReducer, ComponentState, ComponentStateAction } from 'strictly-formed'

  export type Action = ComponentStateAction // ...
  export type State = {
    // ...
    components: ComponentState
  }

  export const store = createStore(
    combineReducers({
      // ...
      components: componentStateReducer,
    }),
    // ...
  )
```

### Hooks API
- state hooks require unique id's. This id will be included in the returned value casted as `Id<Component>`. This allows better typing across selectors.

#### useComponentState
- an unopinionated state hook bound to redux.
- the interface is modeled after `React.useState`

```typescript
export const useComponentState: <Component>(id: string, initial: Component) => [
  Component,
  (value?: Component | ((state: Component) => Component)) => void,
  {
    exists: boolean;
    id: Id<Component>;
  }
]
```

#### useTextInput
- state binding with validation feedback for text inputs
- for the `autoFocus` feature to work, you must past the provided ref object to the input element

```typescript
export const useTextInput: (id: string, {
  value?: string; // initial value
  pattern?: RegExp;
  required?: boolean;
  length?: [number, number]; // [minlength, maxlength]
  autoFocus?: boolean;
}) => [
  string,
  (value?: string | ((state: string) => string)) => void,
  {
    id: Id<TextInput>;
    ref: React.RefObject<HTMLInputElement>;
    valid: boolean;
    exists: boolean;
    validate: () => boolean;
    error?: 'required' | 'minlength' | 'maxlength' | 'pattern';
  }
]
```

#### Action Creators

**setComponent**

```typescript
export const setComponent: <Component>(id: Id<Component>, value: Component) => {
    type: 'SET_COMPONENT';
    id: Id<Component>;
    value: Component;
};
```

**clearComponent**

```typescript
export const clearComponent: <Component>(id: Id<Component>) => {
    type: 'CLEAR_COMPONENT';
    id: Id<Component>;
};
```

#### Selectors

**getComponentState** requires an "initial" argument, this will be returned if the component's state has not yet been initialized in redux. The returned value will always be typeof Component

```typescript
export const getComponentState: <Component>(state: State, id: Id<Component>, initial: Component) => Component
```

**getComponent** will return undefined if the state has not been initialized in redux

```typescript
export const getComponent: <Component>(state: State, id: Id<Component>) => Component | undefined
```

**componentExists** will return boolean value determining whether the component's state exists within redux

```typescript
export const componentExists: <Component>(state: State, id: Id<Component>) => boolean
```


### License

[ISC](https://opensource.org/licenses/ISC)
