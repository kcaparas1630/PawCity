import { FC, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import initialValues from './RegisterInitialValues';
import registerUser from '../../../Services/RegisterService';
import {
  faGoogle as faGoogleBrand,
  faFacebookF as faFacebookBrand,
  faInstagram as faInstagramBrand,
} from '@fortawesome/free-brands-svg-icons';
import {
  Line,
  ProgressContainer,
  ProgressItem,
  ProgressHr,
  SectionContainers,
} from './Styled-Components/StyledRegister';
import {
  SubmitButton,
  StyledForm,
  FormH2,
  SocialContainer,
  LeashUpText,
  UseAccountText,
  ErrorMessage,
} from '../Styled-Components/StyledForms';
import RegisterFormData from '../../../Interface/RegisterForm';
import userValidationSchema from './Schema/RegisterSchema';
import FirstSection from './Components/FirstSection';
import SecondSection from './Components/SecondSection';
import sectionVariants from './Motion/SectionVariants';
import ThirdSection from './Components/ThirdSection';
import Auth from '../../../Interface/AuthInterface';
import { uploadPhotos } from '../../../Services/UploadService';

const RegisterForm: FC<Auth> = ({ changeRoute, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
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
    dogs: {
      name: '',
      breed: '',
      age: 0,
      bio: '',
      quirks: '',
      photos: [],
    },
  });
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string[]>(['start', 'start', 'start']);
  const [direction, setDirection] = useState(1);

  const handleNextSection = (values: RegisterFormData) => {
    setDirection(1);
    setProgress((prev) => {
      const updatedProgress = [...prev];
      updatedProgress[currentSection - 1] = 'done';
      return updatedProgress;
    });

    setFormData((prev) => {
      switch (currentSection) {
        case 1:
          return {
            ...prev,
            firstName: values.firstName,
            lastName: values.lastName,
            location: {
              streetAddress: values.location.streetAddress,
              apartmentUnit: values.location.apartmentUnit,
              city: values.location.city,
              province: values.location.province,
              postalCode: values.location.postalCode,
            },
          };
        case 2:
          return {
            ...prev,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          };
        default:
          return prev;
      }
    });
    setCurrentSection((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevSection = () => {
    setDirection(-1);
    setCurrentSection((prev) => Math.min(prev - 1));
  };

  const onSubmit = async (
    values: RegisterFormData,
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

      // First upload photos if they exist
      let photoFilenames: string[] = [];
      if (values.dogs.photos?.length) {
        const files = values.dogs.photos.filter((p): p is File => p instanceof File);
        if (files.length) {
          photoFilenames = await uploadPhotos(files);
        }
      }

      // Then send registration data with filenames
      const completeRegistrationData: RegisterFormData = {
        ...formData,
        dogs: {
          name: values.dogs.name,
          breed: values.dogs.breed,
          age: Number(values.dogs.age),
          bio: values.dogs.bio,
          quirks: values.dogs.quirks || undefined,
          photos: photoFilenames,
        },
      };

      const response = await registerUser(completeRegistrationData);
      console.log('Register Successfully', response);
      changeRoute();
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data?.message;
        setError(serverError || 'Registration failed');

        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <FormH2>Leash Up!</FormH2>
      <Line />
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
      <UseAccountText>or register your account</UseAccountText>
      <ProgressContainer>
        <ProgressHr />
        {progress.map((status, index) => (
          <ProgressItem
            key={index}
            progress={status}
          >
            {index + 1}
          </ProgressItem>
        ))}
      </ProgressContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          getFieldProps,
          isSubmitting,
          setFieldValue,
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <AnimatePresence
              mode="wait"
              initial={false}
              custom={direction}
            />
            {currentSection === 1 && (
              <SectionContainers
                key="section-1"
                custom={direction}
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <FirstSection
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChangeInput={handleChange}
                  handleBlurInput={handleBlur}
                  getFieldProps={getFieldProps}
                />
              </SectionContainers>
            )}
            {currentSection === 2 && (
              <SectionContainers
                key="section-2"
                custom={direction}
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <SecondSection
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChangeInput={handleChange}
                  handleBlurInput={handleBlur}
                />
              </SectionContainers>
            )}
            {currentSection === 3 && (
              <SectionContainers
                key="section-3"
                custom={direction}
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ThirdSection
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChangeInput={handleChange}
                  handleBlurInput={handleBlur}
                  handleBlurTextArea={handleBlur}
                  handleChangeTextArea={handleChange}
                  setFieldValue={setFieldValue}
                />
              </SectionContainers>
            )}
            <LeashUpText
              type="button"
              onClick={changeRoute}
              whileHover={{ color: '#E5989B' }}
            >
              Already have a leash? Leash in!
            </LeashUpText>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {currentSection >= 2 && (
              <SubmitButton
                type="button"
                onClick={handlePrevSection}
              >
                Previous
              </SubmitButton>
            )}
            {currentSection < 3 && (
              <SubmitButton
                type="button"
                onClick={() => handleNextSection(values)}
              >
                Next
              </SubmitButton>
            )}
            {currentSection === 3 && (
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Leashing up...' : 'Submit'}
              </SubmitButton>
            )}
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
