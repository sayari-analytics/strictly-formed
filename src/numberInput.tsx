import React, {
  PureComponent,
  ChangeEvent,
  KeyboardEvent
} from 'react';
import { defaultTo, isNil } from './utils';


type Props = {
  value: number | null
  className?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  onChange: (value: number | null) => void
  onSubmit?: (value: number | null) => void
  onClear?: () => void
}

class NumberInput extends PureComponent<Props> {
  onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const numberValue = parseFloat(value);
    this.props.onChange(isNaN(numberValue) ? null : numberValue);
  }

  // TODO - allow onKeyDown to be extended via incomming props,
  // so strictly-formed is composable with withHotKeys 
  onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isNil(this.props.value)) {
      return;
    } else if (e.which === 13) {
      // enter key
      this.props.onSubmit && this.props.onSubmit(this.props.value);
    } else if (e.which === 27) {
      // esc key
      this.props.onClear && this.props.onClear();
    }
  }

  render() {
    return (
      <input
        value={defaultTo('', this.props.value)}
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
