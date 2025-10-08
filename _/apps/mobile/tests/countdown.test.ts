import { render } from '@testing-library/react-native';
import React from 'react';
import CountdownTimer from '../src/components/CountdownTimer';

test('renders countdown days', () => {
const future = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
const { getByText } = render(<CountdownTimer targetDate={future} />);
expect(getByText(/days left/i)).toBeTruthy();
});

