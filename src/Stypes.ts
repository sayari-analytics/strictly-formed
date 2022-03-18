export type Literal = string | number | boolean | null | undefined | symbol
export type Nullish = null | undefined

export type Status = 'complete' | 'pending' | 'error'

export type SelectOption<Opt extends Option = Option> = Opt | OptionGroup<Opt>

export interface Option {
  id: string
  label: string
}

export interface OptionGroup<Opt extends Option> {
  id: string
  label: string
  children: Opt[]
}

export type Field = AbstractField | InputField | SelectField

export interface AbstractField<Value = unknown> {
  value: Value
}

type InputType = `${'text' | 'number'}.input`
export interface InputField {
  type: 'input'
  value: string | number
}
export interface InputField2 {
  type: InputType
}

export interface SelectField<
  Opt extends Option = Option,
  Variant extends 'checkbox' | 'radio' = 'checkbox'
> {
  type: 'select'
  options: SelectOption<Opt>[]
  value: Variant extends 'checkbox' ? Set<string> : string | undefined
}

export interface AbstractForm {
  [name: string]: unknown
}

export interface FormData {
  status: Status
  error?: string
  fields: {
    [name: string]: Field
  }
}

export interface FormState {
  [formId: string]: FormData
}

export interface FormStateMap {
  formState: FormState
}
