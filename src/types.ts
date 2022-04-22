declare const idType: unique symbol

export type Id<Component = unknown> = string & { readonly [idType]: Component }

export type ComponentState<Component = unknown> = Record<Id<Component>, Component>

export type ReduxState<Component = unknown> = {
  components: ComponentState<Component>
}

export type SetHandler<Component = unknown> = (
  value?: Component | ((state: Component) => Component)
) => void

export type ValidationError = 'required' | 'minlength' | 'maxlength' | 'pattern'

export type TextInput = {
  value: string
  valid: boolean
  error?: ValidationError
}
