// redirect.ts
import { NavigateFunction } from 'react-router-dom';

const createRedirect = (navigate: NavigateFunction) => (url: string) => {
  navigate(url);
};

export default createRedirect;
