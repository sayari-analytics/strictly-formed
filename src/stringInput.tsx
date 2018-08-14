import React, {
  PureComponent,
  ChangeEvent,
  KeyboardEvent
} from 'react';


type Props = {
  value: string | undefined
  className?: string
  placeholder?: string
  onChange: (value: string | undefined) => void
  onSubmit?: (value: string | undefined) => void
  onClear?: () => void
}

class StringInput extends PureComponent<Props> {
  onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => this.props.onChange(value === '' ? undefined : value)

  // TODO - allow onKeyDown to be extended via incomming props,
  // so strictly-formed is composable with withHotKeys 
  onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 27) {
      // esc key
      this.props.onClear && this.props.onClear();
    } else if (e.which === 13 && this.props.value !== undefined) {
      // enter key
      this.props.onSubmit && this.props.onSubmit(this.props.value);
    }
  }

  render() {
    return (
      <input
        value={this.props.value === undefined ? '' : this.props.value}
        type="string"
        className={this.props.className}
        placeholder={this.props.placeholder}
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
      />
    );
  }
}


export default StringInput;
