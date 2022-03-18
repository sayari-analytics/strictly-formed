export interface UseFormOptions {

}

export interface UseFormReturn {

}

export interface UseForm {
  (formId: string, options?: UseFormOptions
  ): UseFormReturn
}

export const useForm: UseForm = (formId, options = {}) => {

  return {}
}