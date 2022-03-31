// Redux
export type Status = 'complete' | 'pending' | 'error'

export type AbstractForm = { [name: string]: unknown }

export type FormData<Form extends AbstractForm = AbstractForm> = {
  status: Status
  error?: string
  form: Form
}

export type FormState = {
  [formId: string]: FormData
}

export type FormStateMap = {
  formState: FormState
}

// Fields
// Input
export type InputField = TextInput | NumberInput | CheckedInput

export interface TextInput {
  field: 'input'
  type: 'text'
  value: string
}

export interface NumberInput {
  field: 'input'
  type: 'number'
  value: number | undefined
}

export interface CheckedInput {
  field: 'input'
  type: 'checked'
  value: boolean
}

// Select
export type SelectField<Opt extends Option = Option> =
  | SingleSelect<Opt>
  | MultipleSelect<Opt>

export type SelectOption<Opt extends Option = Option> = Opt | OptionGroup<Opt>

export type Option = {
  id: string
  label: string
}

export type OptionGroup<Opt extends Option> = {
  id: string
  label: string
  children: Opt[]
}

export type SingleSelect<Opt extends Option> = {
  field: 'select'
  multiple: false
  value: string
  options: SelectOption<Opt>
}

export type MultipleSelect<Opt extends Option> = {
  field: 'select'
  multiple: true
  value: Set<string>
  options: SelectOption<Opt>
}
