import React, {
  PureComponent,
  ChangeEvent,
  KeyboardEvent
} from 'react';


type Props = {
  value: string | null // TODO - expand to other primitive types
  options: string[]
  className?: string
  placeholder?: string
  onChange: (value: string | null) => void
  onSubmit?: (value: string | null) => void
  onClear?: () => void
}

class Select extends PureComponent<Props> {
  onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => this.props.onChange(value === '' ? null : value)

  // TODO - allow onKeyDown to be extended via incomming props,
  // so strictly-formed is composable with withHotKeys 
  onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.which === 13) {
      // enter key
      e.preventDefault();
      e.stopPropagation();
      // TODO - typecast to String Literal Type
      this.props.onSubmit && this.props.onSubmit(this.props.value);
    } else if (e.which === 27) {
      // esc key
      e.preventDefault();
      e.stopPropagation();
      this.props.onClear && this.props.onClear();
    }
  }

  render() {
    return (
      <select
        value={this.props.value === null ? '' : this.props.value}
        className={this.props.className}
        placeholder={this.props.placeholder}
      >
        {
          (this.props.value === null || this.props.options.indexOf(this.props.value)) &&
            <option
              value={this.props.value || ''}
              disabled={true}
            >
              {this.props.value}
            </option>
        }

        {this.props.options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    );
  }
}


export default Select;
