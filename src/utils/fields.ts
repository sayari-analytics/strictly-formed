import { isString, isNumber, isBool, filterSet, pushSet } from '~/src/utils'
import type {
  InputProps,
  SelectProps,
  SelectField,
  FieldProps,
  StrictForm,
  InputField,
  Option,
  Field,
  SelectedKey,
} from '~/src/types'
import { SELECT_ALL, SELECT_NONE } from './constants'
import { prop } from 'ramda'

export const isInputProps = (
  value: InputProps | SelectProps
): value is InputProps => value.field === 'input'
export const isSelectProps = (
  value: InputProps | SelectProps
): value is SelectProps => value.field === 'select'

export const createInputField = (
  name: string,
  { field, type, initialValue }: InputProps
): InputField => {
  if (type === 'number') {
    return {
      name,
      field,
      type: 'number',
      value: isNumber(initialValue) ? initialValue : undefined,
    }
  } else if (type === 'checked') {
    return {
      name,
      field,
      type: 'checked',
      value: isBool(initialValue) ? initialValue : false,
    }
  } else {
    return {
      name,
      field,
      type: 'text',
      value: isString(initialValue) ? initialValue : '',
    }
  }
}

export const createSelectField = <Opt extends Option>(
  name: string,
  { multiple, initialSelection, ...select }: SelectProps<Opt>
): SelectField<Opt> => {
  if (multiple === true) {
    return {
      ...select,
      name,
      multiple: true,
      selected:
        initialSelection instanceof Set ? initialSelection : new Set<string>(),
    }
  } else {
    return {
      ...select,
      name,
      multiple: false,
      selected: isString(initialSelection) ? initialSelection : undefined,
    }
  }
}

export const createFields = <Props extends FieldProps>(props: Props) => {
  const fields = Object.entries(props).reduce<Record<string, Field>>(
    (acc, [key, value]) => {
      if (isInputProps(value)) {
        acc[key] = createInputField(key, value)
      } else if (isSelectProps(value)) {
        acc[key] = createSelectField(key, value)
      }

      return acc
    },
    {}
  )

  return fields as StrictForm<Props>
}

export const handleInput = <Field extends InputField>(
  field: Field,
  value: string
): Field => {
  if (field.type === 'number') {
    return {
      ...field,
      value: !isNaN(+value) ? +value : undefined,
    }
  } else if (field.type === 'checked') {
    return {
      ...field,
      value: value === 'on' ? true : false,
    }
  } else {
    return {
      ...field,
      value,
    }
  }
}

export const handleSelect = <Field extends SelectField>(
  field: Field,
  selectedKey?: SelectedKey
): Field => {
  if (field.multiple) {
    let { selected } = field
    if (selectedKey === SELECT_ALL) {
      selected = new Set<string>(field.options.map(prop('id')))
    } else if (selectedKey === SELECT_NONE) {
      selected = new Set<string>()
    } else if (selectedKey !== undefined) {
      selected = selected.has(selectedKey)
        ? filterSet((id) => id !== selectedKey, selected)
        : pushSet(selected, selectedKey)
    }
    return {
      ...field,
      selected,
    }
  } else {
    return {
      ...field,
      selected:
        selectedKey === SELECT_ALL ||
        selectedKey === SELECT_NONE ||
        selectedKey === undefined
          ? undefined
          : selectedKey,
    }
  }
}
