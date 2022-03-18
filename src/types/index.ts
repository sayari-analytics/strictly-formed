// Primitive
export type Status = 'complete' | 'pending' | 'error'

export type Value = string | number | boolean | undefined | Set<string>

// Redux
export type AbstractForm = { [name: string]: unknown }

export interface FormData<Form extends AbstractForm = AbstractForm> {
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

// Fields
export type Field = AbstractField | InputField | SelectField

export interface AbstractField<Value = unknown> {
  value: Value
}

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

export type SelectField = unknown

export interface SingleSelect {
  field: 'select'
  multiple: false
  value: string
  options: unknown //
}
