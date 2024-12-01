import { FC } from 'react';
import FormikProps from '../../../../Interface/FormikProps';
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
  StyledLabel,
} from '../../Styled-Components/StyledForms';
import RegisterFormData from '../../../../Interface/RegisterForm';
import { SubSection } from '../Styled-Components/StyledRegister';

const SecondSection: FC<FormikProps<RegisterFormData>> = ({
  values,
  errors,
  touched,
  handleChangeInput,
  handleBlurInput,
}) => (
  <>
    <SubSection>User Credentials</SubSection>
    <InputWrapper>
      <StyledLabel htmlFor="email">Email:</StyledLabel>
      <StyledInput
        type="email"
        name="email"
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
        error={errors.email && touched.email}
        value={values.email}
        placeholder="User@gmail.com"
      />
      {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
    </InputWrapper>
    <InputWrapper>
      <StyledLabel htmlFor="password">Password:</StyledLabel>
      <StyledInput
        type="password"
        name="password"
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
        error={errors.password && touched.password}
        value={values.password}
        placeholder="************"
      />
      {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}
    </InputWrapper>
    <InputWrapper>
      <StyledLabel htmlFor="confirmPassword">Confirm Password:</StyledLabel>
      <StyledInput
        type="password"
        name="confirmPassword"
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
        error={errors.confirmPassword && touched.confirmPassword}
        value={values.confirmPassword}
        placeholder="************"
      />
      {errors.confirmPassword && touched.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
    </InputWrapper>
  </>
);

export default SecondSection;
