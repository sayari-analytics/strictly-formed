type Literal = string | number | boolean | null | undefined | symbol;
type Nullish = null | undefined

type Status = 'complete' | 'pending' | 'error';

interface AbstractForm {
  [key: string]: any;
}

interface FormState<Form extends AbstractForm = AbstractForm> {
  form?: Form;
  status: Status;
  error?: string;
}

interface FormStateMap {
  [form: string]: FormState;
}
