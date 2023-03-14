import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import MainScreen from '../../MainScreen';
import App from "../../App";

describe('MainScreen', () => {
   it ("", async () => {
      const { getByText } = render(<MainScreen  goToCreateGroupPage={jest.fn} goToJoinGroupPage={jest.fn} goToMatchesPage={jest.fn}/>);
      expect(screen.getByLabelText('Swipe your favorite food')).toBeInTheDocument();
   })
});
