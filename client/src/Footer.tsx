import React from 'react';

interface FooterProps {
  companyName: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({ companyName, year }) => {
    return (
      <footer style={{ padding: '8rem 0' }}>
        <p>&copy; {year} {companyName}</p>
      </footer>
    );
  };

export default Footer;
