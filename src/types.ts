declare const idType: unique symbol

export type Id<Component = unknown> = string & { readonly [idType]: Component }

export type ComponentState = Record<Id, unknown>

export type ReduxState = { components: ComponentState }

export type SetHandler<Component = unknown> = (
  value?: Component | ((state: Component) => Component)
) => void

export type ValidationError = 'required' | 'minlength' | 'maxlength' | 'pattern'

export type TextInput = {
  value: string
  valid: boolean
  error?: ValidationError
}

export type StrictForm<Form extends object> = {
  form: Form
  valid: boolean
  errors: Set<string>
}

export type ValidationModel<Form extends object> = {
  [Property in keyof Form]+?: (value: Form[Property]) => string | undefined
}
