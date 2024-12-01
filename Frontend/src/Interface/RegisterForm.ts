interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  location: {
    streetAddress: string,
    apartmentUnit: string,
    city: string,
    province: string,
    postalCode: string,
  };
  dogs: {
    name: string;
    breed: string;
    age: number;
    bio?: string;
    quirks?: string;
    photos: File[] | string[] | undefined;
  };
}

export default RegisterFormData;
