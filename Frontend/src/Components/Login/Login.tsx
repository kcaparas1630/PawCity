import { FC, useState } from 'react';
import { Formik } from 'formik';
import validationSchema from './Schema/LoginSchema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import loginUser from '../../Services/LoginService';
import { motion } from 'motion/react';
import {
  faGoogle as faGoogleBrand,
  faFacebookF as faFacebookBrand,
  faInstagram as faInstagramBrand,
} from '@fortawesome/free-brands-svg-icons';
import FormData from '../../Interface/LoginForm';
import PawCityPNG from '../../assets/PawCity-noText.png';
import DogBanner from '../../assets/dogPawCity.png';
import {
  Container,
  Banner,
  BannerContents,
  BannerH1,
  BannerH2,
  BannerUnder,
  Logo,
  DogPic,
  FormContainer,
  SubmitButton,
  ErrorMessage,
  InputWrapper,
  StyledForm,
  StyledInput,
  FormH2,
  SocialContainer,
  LeashUpText,
  UseAccountText,
} from './Styled-Components/StyledLogin';

const LoginForm: FC = () => {
  const [formData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [authRoute, setAuthRoute] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
    <Container>
      <Logo>
        <img
          src={PawCityPNG}
          alt="PawCity logo"
        />
        <h3>PawCity</h3>
      </Logo>
      <Banner>
        <BannerContents>
          <BannerH1>Sniffin for Matches?</BannerH1>
          <BannerH2>Collar up and Find a Match!</BannerH2>
        </BannerContents>
        <BannerUnder />
        <DogPic
          src={DogBanner}
          alt="Dog Smiling"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: -80 }}
          transition={{ duration: 0.8 }}
        />
      </Banner>
      <FormContainer>
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
                href="#"
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
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
