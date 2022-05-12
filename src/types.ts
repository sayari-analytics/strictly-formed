declare const idType: unique symbol

export type Id<Component = unknown> = string & { readonly [idType]: Component }

export type ComponentState = Record<Id, unknown>

export type ReduxState = { components: ComponentState }

export type SetHandler<Component = unknown> = (
  value?: Component | ((state: Component) => Component)
) => void
