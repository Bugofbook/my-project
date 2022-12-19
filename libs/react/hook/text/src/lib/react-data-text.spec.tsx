import { render } from '@testing-library/react';

import ReactDataText from './react-data-text';

describe('ReactDataText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDataText />);
    expect(baseElement).toBeTruthy();
  });
});
