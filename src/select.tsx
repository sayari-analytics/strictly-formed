import React, {
  PureComponent,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react';


export type Props<Option> = {
  value: string | undefined
  options: Option[] // can options be an enum: enum{ key1 = 'label one', key2 = 'label two' }
  className?: string
  placeholder?: string
  nullable?: boolean
  // forwardedRef?: Ref<HTMLSelectElement>
  onChange: (value: Option) => void
  onClear?: () => void
  onKeyDown?: (e: KeyboardEvent<HTMLSelectElement>) => void
  onFocus?: (e: FocusEvent<HTMLSelectElement>) => void
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void
}


class Select<Option extends string> extends PureComponent<Props<Option>> {
  private onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => this.props.onChange(value as Option)

  private onKeyDown = (e: KeyboardEvent<HTMLSelectElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    } else if (e.which === 27 && this.props.onClear) {
      // esc key
       this.props.onClear();
    }
    // no implementation for onSubmit, as change event is the same as submit for select element
  }

  public render() {
    return (
      <select
        value={this.props.value === undefined ? '' : this.props.value}
        className={this.props.className}
        placeholder={this.props.placeholder}
        tabIndex={0}
        // ref={this.props.forwardedRef}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
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


// TODO - how to use forwardRef w/ generic components
export default Select;
