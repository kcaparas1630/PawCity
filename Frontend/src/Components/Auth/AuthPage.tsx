import { FC, useState } from 'react';
import RegisterForm from './Register/Register';
import LoginForm from './Login/Login';
import PawCityPNG from '../../assets/PawCity-noText.png';
import DogBanner from '../../assets/dogPawCity.png';
import sectionVariants from './Register/Motion/SectionVariants';
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
  AuthContainers,
} from './Styled-Components/StyledAuth';
import { AnimatePresence } from 'motion/react';

const AuthPage: FC = () => {
  const [authRoute, setAuthRoute] = useState<string | null>('Login');
  const [, setIsRegistered] = useState<boolean>(false);
  const [direction, setDirection] = useState(1);

  // control when going to register or login.
  const changeRoute = () => {
    setDirection(authRoute === 'Login' ? 1 : -1);
    if (authRoute === 'Login') {
      setAuthRoute('Register');
    } else {
      setAuthRoute('Login');
    }
  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
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
        <AnimatePresence
          mode="wait"
          custom={direction}
        >
          {(authRoute === 'Login') && (
            <AuthContainers
              key="login"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoginForm changeRoute={changeRoute} />
            </AuthContainers>
          )}
          {authRoute === 'Register' && (
            <AuthContainers
              key="register"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <RegisterForm
                changeRoute={changeRoute}
                onRegistrationSuccess={handleRegistrationSuccess}
              />
            </AuthContainers>
          )}
        </AnimatePresence>
      </FormContainer>
    </Container>
  );
};

export default AuthPage;
