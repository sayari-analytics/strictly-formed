import React, {
  PureComponent,
  ChangeEvent,
} from 'react';


type Props<Option> = {
  value: string | null
  options: Option[] // can options be an enum: enum{ key1 = 'label one', key2 = 'label two' }
  className?: string
  placeholder?: string
  nullable?: boolean
  onChange: (value: Option | null) => void
}


class Select<Option extends string> extends PureComponent<Props<Option>> {
  onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => this.props.onChange(value === '' ? null : value as Option)

  render() {
    return (
      <select
        value={this.props.value === null ? '' : this.props.value}
        className={this.props.className}
        placeholder={this.props.placeholder}
      >
        {
          this.props.nullable && <option value="" />
        }

        {
          !this.props.nullable && this.props.options.indexOf(this.props.value as Option) === -1 &&
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
