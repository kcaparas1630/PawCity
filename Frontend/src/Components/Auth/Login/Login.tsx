import { FC, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import validationSchema from './Schema/LoginSchema';
import FormData from '../../../Interface/LoginForm';
import Auth from '../../../Interface/AuthInterface';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginUser from '../../../Services/LoginService';
import { useNavigate } from 'react-router-dom';
import {
  faGoogle as faGoogleBrand,
  faFacebookF as faFacebookBrand,
  faInstagram as faInstagramBrand,
} from '@fortawesome/free-brands-svg-icons';
import {
  SubmitButton,
  ErrorMessage,
  InputWrapper,
  StyledForm,
  StyledInput,
  FormH2,
  SocialContainer,
  LeashUpText,
  UseAccountText,
  StyledLabel,
} from '../Styled-Components/StyledForms';

const LoginForm: FC<Auth> = ({ changeRoute }) => {
  const navigate = useNavigate();
  const [formData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (
    values: FormData,
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: object) => void;
    },
  ): Promise<void> => {
    try {
      setError(null);
      setSubmitting(true);

      const response = await loginUser({
        email: values.email,
        password: values.password,
      });

      console.log('Login successful', response);

      // Optional: Store token in localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/main');
      }
    } catch (error) {
      // Handle login error
      if (axios.isAxiosError(error)) {
        // Handle specific Axios error
        const serverError = error.response?.data?.message;
        setError(serverError || 'Login failed');

        // If server returns field-specific errors
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      } else {
        // Handle generic error
        setError('An unexpected error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <FormH2>Leash In!</FormH2>
      <SocialContainer>
        <motion.a
          href="#"
          whileHover={{
            scale: 1.05,
            backgroundColor: '#6d6875',
            color: '#F5F5F5',
            borderColor: 'transparent',
          }}
        >
          <FontAwesomeIcon icon={faFacebookBrand} />
        </motion.a>
        <motion.a
          href="#"
          whileHover={{
            scale: 1.05,
            backgroundColor: '#6d6875',
            color: '#F5F5F5',
            borderColor: 'transparent',
          }}
        >
          <FontAwesomeIcon icon={faGoogleBrand} />
        </motion.a>
        <motion.a
          href="#"
          whileHover={{
            scale: 1.05,
            backgroundColor: '#6d6875',
            color: '#F5F5F5',
            borderColor: 'transparent',
          }}
        >
          <FontAwesomeIcon icon={faInstagramBrand} />
        </motion.a>
      </SocialContainer>
      <UseAccountText>or use your account</UseAccountText>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <StyledForm onSubmit={handleSubmit}>
            <InputWrapper>
              <StyledLabel>Email:</StyledLabel>
              <StyledInput
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                value={values.email}
                placeholder="you@gmail.com"
              />
              {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputWrapper>
            <InputWrapper>
              <StyledLabel>Password:</StyledLabel>
              <StyledInput
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                value={values.password}
                placeholder="**********"
              />
              {errors.password && touched.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </InputWrapper>
            <LeashUpText
              type="button"
              onClick={changeRoute}
              whileHover={{ color: '#E5989B' }}
            >
              Don't have a leash yet? Leash up!
            </LeashUpText>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Submit'}
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
