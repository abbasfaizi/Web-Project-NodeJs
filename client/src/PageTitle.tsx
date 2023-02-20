import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface Props {
  title: string;
}

const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="display-4 text-center my-5">
      {title}
    </h1>
  );
};

export default PageTitle;
