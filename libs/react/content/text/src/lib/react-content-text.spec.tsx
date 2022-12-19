import { render } from '@testing-library/react';

import ReactContentText from './react-content-text';

describe('ReactContentText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactContentText />);
    expect(baseElement).toBeTruthy();
  });
});
