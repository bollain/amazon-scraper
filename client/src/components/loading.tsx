import styled, { keyframes} from 'react-emotion';
import { size } from 'polished';

import { ReactComponent as Logo } from '../assets/loader.svg';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled(Logo)(size(64), {
  display: 'block',
  margin: 'auto',
  fill: 'grey',
  path: {
    transformOrigin: 'center',
    animation: `${spin} 1s linear infinite`,
  },
});

export default Loading;