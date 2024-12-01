import styled from '@emotion/styled';
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
  z-index: 10;
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
  z-index: 1;
`;

const BannerUnder = styled.div`
  height: 25%;
  width: 50%;
  background-color: #f5f5f5;
  border-radius: 15% 85% 56% 44% / 14% 63% 37% 86%;
  z-index: 0;
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

const AuthContainers = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  AuthContainers,
};
