import {Helmet} from 'react-helmet';

interface MetaHelmetProps {
  title: string;
  description?: string;
}

export const MetaHelmet= ({ title, description }:MetaHelmetProps) => (
  <Helmet>
    <title>{title}</title>

    {description && <meta name="description" content={description} />}

  </Helmet>
);
