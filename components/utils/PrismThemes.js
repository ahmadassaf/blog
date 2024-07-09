
import '@/css/prism.css';

const PrismThemeProvider = ({ theme }) => (
  <link rel='stylesheet' href={ `/static/prism/${theme}.css` }></link>
);

export default PrismThemeProvider;
