import React, {
  PureComponent,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  Ref,
} from 'react';


export type Props = {
  value: number | undefined
  className?: string
  placeholder?: string
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  forwardedRef?: Ref<HTMLInputElement>
  onChange: (value: number | undefined) => void
  onSubmit?: (value: number | undefined) => void
  onClear?: () => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

class NumberInput extends PureComponent<Props> {
  private onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const numberValue = parseFloat(value);
    this.props.onChange(isNaN(numberValue) ? undefined : numberValue);
  }

  private onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    } else if (e.which === 27 && this.props.onClear) {
      // esc key
      this.props.onClear();
    } else if (e.which === 13 && this.props.value !== undefined && this.props.onSubmit) {
      // enter key
      this.props.onSubmit(this.props.value);
    }
  }

  public render() {
    return (
      <input
        value={this.props.value === undefined ? '' : this.props.value}
        type="number"
        className={this.props.className}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        tabIndex={0}
        ref={this.props.forwardedRef}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />
    );
  }
}


export default NumberInput;
