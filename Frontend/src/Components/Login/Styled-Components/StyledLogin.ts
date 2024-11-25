import styled from '@emotion/styled';

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

const Banner = styled.div`
  padding: 2rem;
`;

const BannerContents = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BannerH1 = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const BannerH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export { Container, Banner, BannerContents, BannerH1, BannerH2 };
