import { FC, useRef } from 'react';
import FormikProps from '../../../../Interface/FormikProps';
import { SubmitButton } from '../../Styled-Components/StyledForms';
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledTextArea,
  RowInputFieldWrapper,
} from '../../Styled-Components/StyledForms';
import RegisterFormData from '../../../../Interface/RegisterForm';
import { FormikHelpers } from 'formik';
import { SubSection } from '../Styled-Components/StyledRegister';

interface PhotoUploadProps extends FormikProps<RegisterFormData> {
  setFieldValue: FormikHelpers<RegisterFormData>['setFieldValue'];
  maxPhotos?: number;
  maxFileSize?: number; // in MB
}

const ThirdSection: FC<PhotoUploadProps> = ({
  values,
  errors,
  touched,
  handleChangeInput,
  handleBlurInput,
  handleChangeTextArea,
  handleBlurTextArea,
  setFieldValue,
  maxPhotos = 3,
  maxFileSize = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Validate number of files
      if (fileArray.length + (values.dogs.photos?.length || 0) > maxPhotos) {
        alert(`Maximum ${maxPhotos} photos allowed`);
        return;
      }

      // Validate file sizes
      const invalidFiles = fileArray.filter((file) => file.size > maxFileSize * 1024 * 1024);
      if (invalidFiles.length > 0) {
        alert(`Files must be smaller than ${maxFileSize}MB`);
        return;
      }

      // Update Formik values
      const currentPhotos = values.dogs.photos || [];
      setFieldValue('dogs.photos', [...currentPhotos, ...fileArray]);
    }
  };

  return (
    <>
      <SubSection>Dog Details</SubSection>
      <InputWrapper>
        <StyledLabel>Dog Photos</StyledLabel>

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <SubmitButton
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={(values.dogs.photos?.length || 0) >= maxPhotos}
        >
          Upload Photos
        </SubmitButton>

        {/* Error Handling */}
        {errors.dogs?.photos && touched.dogs?.photos && (
          <ErrorMessage>{errors.dogs.photos as string}</ErrorMessage>
        )}
      </InputWrapper>
      <RowInputFieldWrapper>
        <InputWrapper width="35%">
          <StyledLabel htmlFor="dogs.name">Dog's Name:</StyledLabel>
          <StyledInput
            type="text"
            name="dogs.name"
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
            error={errors.dogs?.name && touched.dogs?.name}
            value={values.dogs.name}
            placeholder="Sudo"
          />
          {errors.dogs?.name && touched.dogs?.name && (
            <ErrorMessage>{errors.dogs?.name}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper width="35%">
          <StyledLabel htmlFor="dogs.breed">Breed:</StyledLabel>
          <StyledInput
            type="text"
            name="dogs.breed"
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
            error={errors.dogs?.breed && touched.dogs?.breed}
            value={values.dogs.breed}
            placeholder="Shitzu"
          />
          {errors.dogs?.breed && touched.dogs?.breed && (
            <ErrorMessage>{errors.dogs.breed}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper width="25%">
          <StyledLabel htmlFor="dogs.age">Age:</StyledLabel>
          <StyledInput
            type="text"
            name="dogs.age"
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
            error={errors.dogs?.age && touched.dogs?.age}
            value={values.dogs.age}
            placeholder="5"
          />
          {errors.dogs?.age && touched.dogs?.age && <ErrorMessage>{errors.dogs.age}</ErrorMessage>}
        </InputWrapper>
      </RowInputFieldWrapper>

      <InputWrapper>
        <StyledLabel htmlFor="dogs.breed">Bio:</StyledLabel>
        <StyledTextArea
          name="dogs.bio"
          onChange={handleChangeTextArea}
          onBlur={handleBlurTextArea}
          error={errors.dogs?.bio && touched.dogs?.bio}
          value={values.dogs.bio}
          placeholder="Write a description of your dog."
        />
        {errors.dogs?.breed && touched.dogs?.breed && (
          <ErrorMessage>{errors.dogs.breed}</ErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <StyledLabel htmlFor="dogs.quirks">Quirks:</StyledLabel>
        <StyledInput
          type="text"
          name="dogs.quirks"
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
          error={errors.dogs?.quirks && touched.dogs?.quirks}
          value={values.dogs.quirks}
          placeholder="Chill, Playful, Expressive, Hilarious"
        />
        {errors.dogs?.quirks && touched.dogs?.quirks && (
          <ErrorMessage>{errors.dogs.quirks}</ErrorMessage>
        )}
      </InputWrapper>
    </>
  );
};

export default ThirdSection;
