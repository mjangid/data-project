import * as React from 'react';
//import { MemoryRouter, Router } from 'react-router-dom'
//import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react';
import { getNodeText } from '@testing-library/dom';

import DatasetGChart from "./DatasetGChart"

test('renders Chart Title', () => {
    const { getByText } = render(<DatasetGChart title="Test Title" />);
    const linkElement = getByText(/Test Title/i);
    expect(linkElement).toBeInTheDocument();
  });


test('renders Chart Description', () => {
    const { getByText } = render(<DatasetGChart description="Descrption Description Description" />);
    const linkElement = getByText(/Descrption Description Description/i);
    expect(linkElement).toBeInTheDocument();
  });
