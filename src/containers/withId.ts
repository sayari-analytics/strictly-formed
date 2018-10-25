import { createElement, ComponentType, PureComponent, SFC, Attributes } from 'react';


const id = () => '123'; // TODO

const withID = <Props extends Attributes & { id?: string | ((props: Props) => string) }>(
  WrappedComponent: ComponentType<Props & { id: string }>
): SFC<Props> => {
  class WithID extends PureComponent<Props> {
    constructor(props: Props) {
      super(props);
      this.id = props.id === undefined ? id() :
        typeof props.id === 'function' ? props.id(props) :
        props.id;
    }

    private id: string

    public render() {
      return createElement<Props & { id: string }>(
        WrappedComponent,
        Object.assign({}, this.props, { id: this.id })
      );
    }
  }

  return (props: Props) => createElement(WithID, props);
};
