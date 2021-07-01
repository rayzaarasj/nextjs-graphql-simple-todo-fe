/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('has navigations', () => {
    render(<Header />);

    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Todos by Categories')).toBeInTheDocument();
  });
});
