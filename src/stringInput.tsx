import React, {
  PureComponent,
  ChangeEvent,
  KeyboardEvent
} from 'react';


type Props = {
  value: string | null
  className?: string
  placeholder?: string
  onChange: (value: string | null) => void
  onSubmit?: (value: string | null) => void
  onClear?: () => void
}

class StringInput extends PureComponent<Props> {
  onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => this.props.onChange(value === '' ? null : value)

  // TODO - allow onKeyDown to be extended via incomming props,
  // so strictly-formed is composable with withHotKeys 
  onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (this.props.value === null || this.props.value === '') {
      return;
    } else if (e.which === 13) {
      // enter key
      e.preventDefault();
      e.stopPropagation();
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
      <input
        // TODO - will placeholder display w/ ''?  if not, should these take undefined | string?
        value={this.props.value === null ? '' : this.props.value}
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
