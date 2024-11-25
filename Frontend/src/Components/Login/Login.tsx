import { FC, useState } from 'react';
import { Formik } from 'formik';
import validationSchema from './Schema/LoginSchema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faGoogle as faGoogleBrand,
  faFacebookF as faFacebookBrand,
  faInstagram as faInstagramBrand
} from '@fortawesome/free-brands-svg-icons';
import FormData from '../../Interface/LoginForm';
import PawCityPNG from '../../assets/PawCity.png';
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
} from './Styled-Components/StyledLogin';

const LoginForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const onSubmit = (
    values: FormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ): void => {
    setTimeout(() => {
      setFormData(values);
      setSubmitting(false);
    }, 400);
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
        />
      </Banner>
      <FormContainer>
        <FormH2>Leash In!</FormH2>
        <SocialContainer>
          <a href="#">
            <FontAwesomeIcon icon={faFacebookBrand} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faGoogleBrand} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagramBrand} />
          </a>
        </SocialContainer>
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
              <LeashUpText href="#">Don't have a leash yet? Leash up!</LeashUpText>
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </SubmitButton>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
