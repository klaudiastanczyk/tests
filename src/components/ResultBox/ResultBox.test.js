import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
  
describe('Component ResultBox', () => {

    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD”', () => {

      const amounts = [100, 200, 500];

      for (let amount of amounts) {
        render(<ResultBox from="PLN" to="USD" amount={amount} />);
        const output = screen.getByTestId('output');
        const dolars = amount/3.5;
        const dolarsFloat = dolars.toFixed(2);
        expect(output.textContent).toBe(`PLN ${amount}.00 = $${dolarsFloat}`);
        cleanup();
      }

    });

    it('should render proper info about conversion when USD -> PLN”', () => {

      const amounts = [100, 200, 250];

      for (let amount of amounts) {
        render(<ResultBox from="USD" to="PLN" amount={amount} />);
        const output = screen.getByTestId('output');
        const PLN = amount*3.5;
        const plnFloat = PLN.toFixed(2);
        expect(output.textContent).toBe(`$${amount}.00 = PLN ${plnFloat}`);
        cleanup();
      }

    });

    it('should render proper info about conversion when PLN -> PLN”', () => {

      const amounts = [100, 200, 250];

      for (let amount of amounts) {
        render(<ResultBox from="PLN" to="PLN" amount={amount} />);
        const output = screen.getByTestId('output');
        expect(output.textContent).toBe(`PLN ${amount.toFixed(2)} = PLN ${amount.toFixed(2)}`);
        cleanup();
      }

    });
    
    it('should render wrong value when negative value', () => {

      render(<ResultBox from="USD" to="PLN" amount={-1} />);
      const output = screen.getByTestId('output');
      expect(output.textContent).toBe(`Wrong value...`);
    });
    
});