import { FormikErrors, FormikTouched } from 'formik';

interface FormikProps<T> {
  values: T;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlurInput: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlurTextArea?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  getFieldProps?: (field: keyof T | string) => {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  };
}

export default FormikProps;
