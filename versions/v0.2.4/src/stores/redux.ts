// import {
//   pipe,
//   assocPath,
//   dissoc,
//   dissocPath,
//   pathOr,
//   path,
//   over,
//   lensPath,
// } from 'ramda';
// import { Status, FormStateMap, AbstractForm } from '../types';
// import { mergeLeft } from '../utils';


// /* types */
// // TODO - use types from redux?
// export type Reducer<State, A extends Action> = (state: State | undefined, action: A) => State;
// export type Action<Type extends string = string> = { type: Type }
// export type ActionWithProps<Type extends string, Props> = Action<Type> & { props: Props }
// export type ActionCreator<Type extends string, Props = {}> = (props: Props) => ActionWithProps<Type, Props>

// export type FormAction = UpdateFormAction
//   | ClearFormAction
//   | SubmitFormAction
//   | SubmitFormSuccessAction
//   | SubmitFormErrorAction


// /* selectors */
// export const getFormStatus = <State extends { formState: FormStateMap } = { formState: FormStateMap }>(
//   state: State, formId: string
// ): Status => pathOr('complete', ['formState', formId, 'status'], state);

// export const getFormError = <State extends { formState: FormStateMap } = { formState: FormStateMap }>(
//   state: State, formId: string
// ): string | undefined => path(['formState', formId, 'error'], state);

// export const getForm = <State extends { formState: FormStateMap } = { formState: FormStateMap }, Form extends AbstractForm = {}>(
//   state: State,
//   formId: string,
//   defaultForm: Form,
// ): Form => pathOr(defaultForm, ['formState', formId, 'form'], state);


// /* constants */
// export const UPDATE_FORM = 'UPDATE_FORM';
// export const CLEAR_FORM = 'CLEAR_FORM';
// export const SUBMIT_FORM = 'SUBMIT_FORM';
// export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
// export const SUBMIT_FORM_ERROR = 'SUBMIT_FORM_ERROR';


// /* action creators */
// export const updateForm: ActionCreator<
//   typeof UPDATE_FORM,
//   { formId: string, form: AbstractForm }
// > = (props) => ({ type: UPDATE_FORM, props });
// export type UpdateFormAction = ReturnType<typeof updateForm>

// export const clearForm: ActionCreator<
//   typeof CLEAR_FORM,
//   { formId: string }
// > = (props) => ({ type: CLEAR_FORM, props });
// export type ClearFormAction = ReturnType<typeof clearForm>

// export const submitForm: ActionCreator<
//   typeof SUBMIT_FORM,
//   { formId: string }
// > = (props) => ({ type: SUBMIT_FORM, props });
// export type SubmitFormAction = ReturnType<typeof submitForm>

// export const submitFormSuccess: ActionCreator<
//   typeof SUBMIT_FORM_SUCCESS,
//   { formId: string }
// > = (props) => ({ type: SUBMIT_FORM_SUCCESS, props });
// export type SubmitFormSuccessAction = ReturnType<typeof submitFormSuccess>

// export const submitFormError: ActionCreator<
//   typeof SUBMIT_FORM_ERROR,
//   { formId: string, error: string }
// > = (props) => ({ type: SUBMIT_FORM_ERROR, props });
// export type SubmitFormErrorAction = ReturnType<typeof submitFormError>



// /* reducer */
// const reducer: Reducer<FormStateMap, FormAction> = (
//   state = {},
//   action
// ) => {
//   if (action.type === UPDATE_FORM) {
//     return pipe<FormStateMap, FormStateMap, FormStateMap, FormStateMap>(
//       over(lensPath([action.props.formId, 'form']), mergeLeft(action.props.form)),
//       assocPath([action.props.formId, 'status'], 'complete'),
//       dissocPath([action.props.formId, 'error']),
//     )(state);
//   } else if (action.type === CLEAR_FORM) {
//     return dissoc(action.props.formId, state);
//   } else if (action.type === SUBMIT_FORM) {
//     return pipe<FormStateMap, FormStateMap, FormStateMap>(
//       assocPath([action.props.formId, 'status'], 'pending'),
//       dissocPath([action.props.formId, 'error']),
//     )(state);
//   } else if (action.type === SUBMIT_FORM_SUCCESS) {
//     return dissoc(action.props.formId, state);
//   } else if (action.type === SUBMIT_FORM_ERROR) {
//     return pipe<FormStateMap, FormStateMap, FormStateMap>(
//       assocPath([action.props.formId, 'status'], 'error'),
//       assocPath([action.props.formId, 'error'], action.props.error),
//     )(state);
//   }

//   return state;
// };

// export default reducer;
