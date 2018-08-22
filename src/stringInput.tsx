import React, {
  PureComponent,
  ChangeEvent,
  KeyboardEvent,
  Ref,
  FocusEvent,
} from 'react';


export type Props = {
  value: string | undefined
  className?: string
  placeholder?: string
  disabled?: boolean
  forwardedRef?: Ref<HTMLInputElement>
  onChange: (value: string | undefined) => void
  onSubmit?: (value: string | undefined) => void
  onClear?: () => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

class StringInput extends PureComponent<Props> {
  private onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => this.props.onChange(value === '' ? undefined : value)

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
        type="string"
        className={this.props.className}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
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


export default StringInput;
