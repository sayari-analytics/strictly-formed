import React, {
  PureComponent,
  ChangeEvent,
} from 'react';


export type Props<Option> = {
  value: string | undefined
  options: Option[] // can options be an enum: enum{ key1 = 'label one', key2 = 'label two' }
  className?: string
  placeholder?: string
  nullable?: boolean
  onChange: (value: Option | undefined) => void
}


class Select<Option extends string> extends PureComponent<Props<Option>> {
  private onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => this.props.onChange(value === '' ? undefined : value as Option)

  public render() {
    return (
      <select
        value={this.props.value === undefined ? '' : this.props.value}
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
      >
        {
          this.props.nullable && <option value="" />
        }

        {
          this.props.options.indexOf(this.props.value as Option) === -1 &&
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
