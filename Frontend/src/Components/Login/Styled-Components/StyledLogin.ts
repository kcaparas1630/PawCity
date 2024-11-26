import styled from '@emotion/styled';
import { Form } from 'formik';
import { motion } from 'motion/react';

const Container = styled.section`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5
    position: relative;
    @media (min-width: 1024px) {
        flex-direction: row;

    }
`;

const Logo = styled.div`
  position: absolute;
  top: 10;
  left: 10;
  width: 250px;
  height: 100px;
  padding: 5px;
  display: flex;
  justify-content: center;
  gap: 5px;
  img {
    width: 100%;
    height: 100%;
  }
  h3 {
    font-size: 1.75rem;
    font-weight: 800;
    color: #f5f5f5;
  }
`;

/* Banner Left Side */
const Banner = styled.div`
  display: none;
  @media (min-width: 1024px) {
    padding: 2rem;
    width: 50vw;
    background-color: #e5989b;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: -2;
  }
`;

const BannerContents = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b5838d;
  padding: 10%;
  border-radius: 79% 21% 55% 45% / 44% 41% 59% 56%;
`;

const BannerUnder = styled.div`
  height: 25%;
  width: 50%;
  background-color: #f5f5f5;
  border-radius: 15% 85% 56% 44% / 14% 63% 37% 86%;
  z-index: -1;
  padding: 10%;
  position: absolute;
`;

const BannerH1 = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #f5f5f5;
  text-shadow: 2px 0px 4px #6d6875;
  margin: 0;
`;

const BannerH2 = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #f5f5f5;
  text-shadow: 2px 0px 4px #6d6875;
  margin: 0 0 0 50px;
`;

const DogPic = styled(motion.img)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 50%;
  object-fit: cover;
  z-index: 10;
`;

/* Form Right Side */
const FormContainer = styled.div`
  @media (min-width: 1024px) {
    padding: 2rem;
    width: 50vw;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 50%;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

const StyledInput = styled.input<{ error: boolean | undefined | string }>`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #b5838d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
    &:hover {
        background-color: #6d6875;
    }
`;

const FormH2 = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333333;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 24px;

  a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    color: #333333;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }
`;

const LeashUpText = styled.a`
    font-size: 1rem;
    color: #333333;
    text-align: right;
    text-decoration: none;
`;

const UseAccountText = styled.p`
    font-size: 1rem;
    color: #333333;
    text-align: center;
`;


export {
  Container,
  Banner,
  BannerContents,
  BannerUnder,
  BannerH1,
  BannerH2,
  Logo,
  DogPic,
  FormContainer,
  StyledForm,
  StyledInput,
  ErrorMessage,
  InputWrapper,
  SubmitButton,
  FormH2,
  SocialContainer,
  LeashUpText,
  UseAccountText
};
