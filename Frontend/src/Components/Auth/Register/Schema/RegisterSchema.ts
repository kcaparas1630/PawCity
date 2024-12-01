import * as Yup from 'yup';

const locationValidationSchema = Yup.object().shape({
  streetAddress: Yup.string().required('Street Address is required'),
  apartmentUnit: Yup.string().notRequired(),
  city: Yup.string().required('City is required'),
  province: Yup.string().oneOf(['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT']).required('Province is required'),
  postalCode: Yup.string().matches(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/, 'Postal Code is structured as V8Z 1P3'),
});

const dogValidationSchema = Yup.object().shape({
  name: Yup.string().required(`Dog's name is required`),
  breed: Yup.string().required(`Dog's breed is required`),
  age: Yup.number().required(`Dog's age is required`),
  bio: Yup.string().notRequired(),
  quirks: Yup.string().notRequired(),
  photos: Yup.array().of(
    Yup.mixed().test('fileValidation', 'Invalid file format or size', function(value) {
      // If it's already an uploaded photo (has photoId and filename)
      if (value && typeof value === 'object' && 'photoId' in value) {
        return true;
      }
      
      // If it's a new file being uploaded
      if (value instanceof File) {
        const validTypes = ['image/jpeg', 'image/png'];
        const validSize = value.size <= 5 * 1024 * 1024;
        return validTypes.includes(value.type) && validSize;
      }
      
      return false;
    })
  ).max(3, 'Maximum 3 photos allowed')
}).required('Dog information is required');

const userValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password needs to be at least 8 characters')
    .max(128, 'Password needs to be a maximum of 128 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>\?])/,
      'Password must contain 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  location: locationValidationSchema,
  dogs: dogValidationSchema,
  createdAt: Yup.date().notRequired(),
});

export default userValidationSchema;
