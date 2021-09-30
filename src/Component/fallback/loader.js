import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const Fallback = () => (
  <FallbackContainer>
    <Loader
      type='ThreeDots'
      color='red'
      height={120}
      width={120}
      timeout={3000}
    />
  </FallbackContainer>
);

export default Fallback;

const FallbackContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0.5turn);
  border-radius: 50px;
`;
