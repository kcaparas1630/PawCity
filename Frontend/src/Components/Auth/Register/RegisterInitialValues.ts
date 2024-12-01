import RegisterFormData from '../../../Interface/RegisterForm';

const initialValues: RegisterFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  location: {
    streetAddress: '',
    apartmentUnit: '',
    city: '',
    province: '',
    postalCode: '',
  },
  dogs: 
    {
      name: '',
      breed: '',
      age: 0,
      bio: '',
      quirks: '',
      photos: [],
    },
};

export default initialValues;
