import {
  merge,
} from 'ramda';
import { createElement, ComponentType, PureComponent, SFC } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Status, FormStateMap, AbstractForm } from '../types';
import { getForm, getFormStatus, getFormError, clearForm, updateForm } from '../stores/redux';


/* utils */
export type FormProps<Form extends AbstractForm> = {
  formId: string
  form: Form
  status: Status
  error?: string
}


export type FormHandler<Form extends AbstractForm> = {
  setForm: (props: Partial<Form>) => void
  clearForm: () => void
};


export type WithForm<Form extends AbstractForm> = FormProps<Form> & FormHandler<Form>


/* inject FormProps */
export const withReduxFormProps = <OutterProps, Form extends AbstractForm, State extends { formState: FormStateMap }>(
  formId: string | ((props: OutterProps) => string),
  defaultProps: Form | ((props: OutterProps) => Form)
) => connect<FormProps<Form>, {}, OutterProps, State>((state, props) => {
  // tslint:disable-next-line:variable-name
  const _formId = typeof formId === 'function' ? formId(props) : formId;
  return {
    formId: _formId,
    form: getForm(
      state,
      _formId,
      defaultProps instanceof Function ? defaultProps(props) : defaultProps,
    ),
    status: getFormStatus(state, _formId),
    error: getFormError(state, _formId),
  };
});


/* inject FormHandlers */
export const withReduxFormHandlers = () => <OutterProps extends FormProps<Form>, Form extends AbstractForm>(
  WrappedComponent: ComponentType<OutterProps & FormHandler<Form>>
): SFC<OutterProps> => {
  class WithReduxFormHandlers extends PureComponent<OutterProps> {
    constructor(props: OutterProps) {
      super(props);

      if (typeof this.props.formId !== 'string') {
        throw new Error(`formId must be a string. received: ${this.props.formId}`);
      }

      if (!this.context.store) {
        throw new Error('store must be available in context');
      }

      // throw an error if another component has the same formId
      // if a component unmounts + remounts, wait until the clearForm action has dispatched
      // alternatively, maintain a module-level set of formIds, and add/remove synchronously
      // if the id doesn't need to be public, and form state doesn't ever need to be persisted across mount/unmount, and no need to support SSR,
      // then it can just be created internally as a uuid
      // to allow state to persist across re-mounts, make it optional and compute on mount
      setTimeout(() => {
        if (this.context.store.getState().formState[this.props.formId]) {
          throw new Error(`registered two different forms with the id: ${this.props.formId}`);
        }
      }, 0);
    }

    private setForm = (form: Partial<Form>) => this.context.store.dispatch(updateForm({
      formId: this.props.formId, form,
    }))

    private clearForm = () => this.context.store.dispatch(clearForm({ formId: this.props.formId }))

    public componentWillUnmount() {
      if (this.context.store.getState().formState[this.props.formId]) {
        this.context.store.dispatch(clearForm({ formId: this.props.formId })); // TODO - batch
      }
    }

    public render() {
      return createElement<OutterProps & FormHandler<Form>>(
        WrappedComponent,
        Object.assign({}, this.props, { setForm: this.setForm, clearForm: this.clearForm })
      );
    }
  }

  // ensure form gets re-initialized when formId changes
  return (props: OutterProps) => createElement(WithReduxFormHandlers, Object.assign({}, props, { key: props.formId }));
};


export const withReduxForm = <OutterProps, Form extends AbstractForm, State extends { formState: FormStateMap }>(
  formId: string | ((props: OutterProps) => string),
  defaultProps: Form | ((props: OutterProps) => Form)
) => compose<OutterProps & WithForm<Form>, OutterProps>(
  withReduxFormProps<OutterProps, Form, State>(formId, defaultProps),
  withReduxFormHandlers()
);
