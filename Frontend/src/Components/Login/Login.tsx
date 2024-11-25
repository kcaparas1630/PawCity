import { FC, FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  faGoogle as faGoogleBrand,
  faFacebookF as faFacebookBrand,
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
} from './Styled-Components/StyledLogin';

const LoginForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form Submitted', formData);
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
        <DogPic src={DogBanner} alt="Dog Smiling" />
      </Banner>
    </Container>
  );
};

export default LoginForm;
