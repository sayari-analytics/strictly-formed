declare const idType: unique symbol

export type Id<Component = unknown> = string & { readonly [idType]: Component }

export type ComponentState<Component = unknown> = Record<Id<Component>, Component>

export type ReduxState<Component = unknown> = {
  components: ComponentState<Component>
}
