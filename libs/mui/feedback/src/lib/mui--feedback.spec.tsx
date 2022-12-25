import { render } from '@testing-library/react';

import MuiFeedback from './mui--feedback';

describe('MuiFeedback', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuiFeedback />);
    expect(baseElement).toBeTruthy();
  });
});
