import styled from '@emotion/styled';
import { Form } from 'formik';
import { motion } from 'motion/react';
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 50%;
`;

const InputWrapper = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  gap: 5px;
  flex-direction: column;
  width: ${(props) => props.width || '100%'};
`;

const StyledInput = styled.input<{ error: boolean | undefined | string }>`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
  border-radius: 4px;
`;

const StyledSelect = styled.select<{ error: boolean | undefined | string}>`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
  border-radus: 4px;
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
  transition: all 0.5s;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:hover {
    background-color: #6d6875;
    scale: 1.05;
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

const LeashUpText = styled(motion.button)`
  font-size: 1rem;
  color: #333333;
  text-align: right;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
`;

const UseAccountText = styled.p`
  font-size: 1rem;
  color: #333333;
  text-align: center;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: #333333;
  opacity: 0.8;
`;

const RowInputFieldWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledTextArea = styled.textarea<{ error: boolean | undefined | string}>`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
  border-radius: 4px;
  height: 50px;
  resize: none;
`

export {
  StyledForm,
  StyledInput,
  ErrorMessage,
  InputWrapper,
  SubmitButton,
  FormH2,
  SocialContainer,
  LeashUpText,
  UseAccountText,
  StyledLabel,
  RowInputFieldWrapper,
  StyledSelect,
  StyledTextArea
};
