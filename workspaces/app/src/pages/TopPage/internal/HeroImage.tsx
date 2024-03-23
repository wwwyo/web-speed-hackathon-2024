import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <picture>
        <source media="(max-width: 599px)" srcSet="/assets/hero-sp.avif" />
        <_Image alt="Cyber TOON" src="/assets/hero-pc.avif" />
      </picture>
    </_Wrapper>
  );
};
