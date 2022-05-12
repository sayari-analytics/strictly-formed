# Strictly Formed

Component state bindings for redux and typescript

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


### useComponentState
- an unopinionated state hook bound to redux.
- the interface is modeled after `React.useState`
- the `createId` utility will generate an ID that is bound to the component type. This will enable you to access the component state from redux without needing type assertions.

```typescript
export const useComponentState: <Component>(id: Id<Component>, initial: Component) => [
  Component,
  (value?: Component | ((state: Component) => Component)) => void,
  boolean
]
```

- example:
```typescript
import { useComponentState, createId } from 'strictly-formed'

type State = {
  name: string
  age?: number
}

const COMPONENT_ID = createId<State>('COMPONENT_ID')

const Component = (props) => {
  const [state, set, exists] = useComponentState(COMPONENT_ID, { name: '' })
  // ...
}

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
