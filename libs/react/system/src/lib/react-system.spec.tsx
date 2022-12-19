import { render } from '@testing-library/react';

import ReactSystem from './react-system';

describe('ReactSystem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactSystem />);
    expect(baseElement).toBeTruthy();
  });
});
