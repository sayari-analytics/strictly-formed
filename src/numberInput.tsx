import React, {
  PureComponent,
  ChangeEvent,
  KeyboardEvent
} from 'react';


export type Props = {
  value: number | undefined
  className?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  onChange: (value: number | undefined) => void
  onSubmit?: (value: number | undefined) => void
  onClear?: () => void
}

class NumberInput extends PureComponent<Props> {
  private onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const numberValue = parseFloat(value);
    this.props.onChange(isNaN(numberValue) ? undefined : numberValue);
  }

  // TODO - allow onKeyDown to be extended via incomming props,
  // so strictly-formed is composable with withHotKeys 
  private onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 27 && this.props.onClear) {
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
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
      />
    );
  }
}


export default NumberInput;
