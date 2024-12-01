import { FC } from 'react';
import provinces from '../LocationOptions';
import FormikProps from '../../../../Interface/FormikProps';
import {
  ErrorMessage,
  InputWrapper,
  RowInputFieldWrapper,
  StyledSelect,
  StyledInput,
  StyledLabel,
} from '../../Styled-Components/StyledForms';
import RegisterFormData from '../../../../Interface/RegisterForm';
import { SubSection } from '../Styled-Components/StyledRegister';

const FirstSection: FC<FormikProps<RegisterFormData>> = ({
  values,
  errors,
  touched,
  handleChangeInput,
  handleBlurInput,
  getFieldProps,
}) => (
  <>
    <SubSection>Personal Details</SubSection>
    <InputWrapper>
      <StyledLabel htmlFor="firstName">First Name:</StyledLabel>
      <StyledInput
        type="text"
        name="firstName"
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
        error={errors.firstName && touched.firstName}
        value={values.firstName}
        placeholder="Sudo"
      />
      {errors.firstName && touched.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
    </InputWrapper>
    <InputWrapper>
      <StyledLabel htmlFor="lastName">Last Name:</StyledLabel>
      <StyledInput
        type="text"
        name="lastName"
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
        error={errors.lastName && touched.lastName}
        value={values.lastName}
        placeholder="Pip"
      />
      {errors.lastName && touched.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
    </InputWrapper>
    <RowInputFieldWrapper>
      <InputWrapper width="20%">
        <StyledLabel htmlFor="apartmentUnit">Apt. Unit</StyledLabel>
        <StyledInput
          type="text"
          name="location.apartmentUnit"
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
          error={errors.location?.apartmentUnit && touched.location?.apartmentUnit}
          value={values.location.apartmentUnit}
          placeholder="120"
        />
        {errors.location?.apartmentUnit && touched.location?.apartmentUnit && (
          <ErrorMessage>{errors.location?.apartmentUnit}</ErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <StyledLabel htmlFor="streetAddress">Street Address:</StyledLabel>
        <StyledInput
          type="text"
          name="location.streetAddress"
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
          error={errors.location?.streetAddress && touched.location?.streetAddress}
          value={values.location.streetAddress}
          placeholder="183 Somewhere St."
        />
        {errors.location?.streetAddress && touched.location?.streetAddress && (
          <ErrorMessage>{errors.location?.streetAddress}</ErrorMessage>
        )}
      </InputWrapper>
    </RowInputFieldWrapper>
    <RowInputFieldWrapper>
      <InputWrapper width="20%">
        <StyledLabel htmlFor="city">City:</StyledLabel>
        <StyledInput
          type="text"
          name="location.city"
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
          error={errors.location?.city && touched.location?.city}
          value={values.location.city}
          placeholder="Victoria"
        />
        {errors.location?.city && touched.location?.city && (
          <ErrorMessage>{errors.location?.city}</ErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper width="30%">
        <StyledLabel>Province:</StyledLabel>
        <StyledSelect
          {...(getFieldProps ? getFieldProps('location.province') : {})}
          error={errors.location?.province && touched.location?.province}
        >
          {provinces.map((province) => (
            <option
              key={province.value}
              value={province.value}
            >
              {province.label}
            </option>
          ))}
        </StyledSelect>

        {errors.location?.province && touched.location?.province && (
          <ErrorMessage>{errors.location?.province}</ErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper width="50%">
        <StyledLabel>Postal Code:</StyledLabel>
        <StyledInput
          type="text"
          name="location.postalCode"
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
          error={errors.location?.postalCode && touched.location?.postalCode}
          value={values.location.postalCode}
          placeholder="V8Q 4E2"
        />
        {errors.location?.postalCode && touched.location?.postalCode && (
          <ErrorMessage>{errors.location?.postalCode}</ErrorMessage>
        )}
      </InputWrapper>
    </RowInputFieldWrapper>
  </>
);

export default FirstSection;
