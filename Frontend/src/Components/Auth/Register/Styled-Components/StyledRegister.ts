import styled from '@emotion/styled';
import { motion } from 'motion/react';

const SubSection = styled.h3`
  font-size: 1.8rem;
  opacity: 0.8;
  color: #333333;
  margin: 24px 0 0 0;
  text-align: center;
`;

const Line = styled.hr`
  border: none;
  height: 1px;
  background-color: #ccc;
`;

const ProgressContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 24px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProgressItem = styled.p<{ progress: string }>`
  border: 1px solid ${(props) => (props.progress === 'done' ? '#6a994e' : '#dddddd')};
  background-color: ${(props) => (props.progress === 'done' ? '#99d98c' : 'white')};
  border-radius: 50%;
  color: #333333;
  margin: 0 5px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
`;

const ProgressHr = styled.hr`
  position: absolute;
  top: 40%;
  transform: translateY(-40%);
  width: calc(100% - 48px);
  height: 2px;
  background-color: #dddddd;
  border: none;
  z-index: -2;
`;

const SectionContainers = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export { SubSection, Line, ProgressContainer, ProgressItem, ProgressHr, SectionContainers };
