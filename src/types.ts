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
export type Field = InputField | SelectField

export type FieldProps = {
  [name: string]: InputProps | SelectProps
}

export type StrictForm<Props extends FieldProps> = {
  [Name in keyof Props]: Props[Name] extends { field: 'input'; type: 'number' }
    ? NumberInput
    : Props[Name] extends { field: 'input'; type: 'checked' }
    ? CheckedInput
    : Props[Name] extends { field: 'input' }
    ? TextInput
    : Props[Name] extends { field: 'select'; multiple: true }
    ? MultipleSelect<Props[Name]['options'][number]>
    : Props[Name] extends { field: 'select' }
    ? SingleSelect<Props[Name]['options'][number]>
    : unknown
}

// Input
export type InputType = 'text' | 'number' | 'checked' | undefined
export type InputField = TextInput | CheckedInput | NumberInput

export type TextInput = {
  field: 'input'
  type: 'text'
  name: string
  value: string
}

export type NumberInput = {
  field: 'input'
  type: 'number'
  name: string
  value: number | undefined
}

export type CheckedInput = {
  field: 'input'
  type: 'checked'
  value: boolean
  name: string
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
  name: string
  multiple: false
  selected: string | undefined
  options: SelectOption<Opt>[]
}

export type MultipleSelect<Opt extends Option> = {
  field: 'select'
  name: string
  multiple: true
  selected: Set<string>
  options: SelectOption<Opt>[]
}

export type SelectedKey = string | 'SELECT_ALL' | 'SELECT_NONE'

// Props
export type InputProps = {
  field: 'input'
} & (
  | { type?: 'text'; initialValue?: string }
  | { type: 'number'; initialValue?: number }
  | { type: 'checked'; initialValue?: boolean }
)

export type SelectProps<Opt extends Option = Option> = {
  field: 'select'
  options: Opt[]
} & (
  | { multiple?: false; initialSelection?: string }
  | { multiple: true; initialSelection?: Set<string> }
)
