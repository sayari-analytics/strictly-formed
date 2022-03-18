export type Status = 'complete' | 'pending' | 'error';

export type Literal = string | number | boolean | null | undefined | symbol;

export type AbstractForm = { [key: string]: any };

export type FormState<Form extends AbstractForm = AbstractForm> = {
  form?: Form,
  status: Status,
  error?: string  
}

export type FormStateMap = {
  [formKey: string]: FormState
}
