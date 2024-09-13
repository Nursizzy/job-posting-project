import {
  BookOutlined,
  CrownOutlined,
  DollarOutlined,
  FireOutlined,
  HeartOutlined,
  MergeOutlined, SettingOutlined, ShoppingCartOutlined,
  SmileOutlined,
} from '@ant-design/icons';

export const experiences = [
  {
    id: 1,
    name: 'Entry level',
    icon: <SmileOutlined />,
  },
  {
    id: 2,
    name: 'Mid Level',
    icon: <FireOutlined />,
  },
  {
    id: 3,
    name: 'Expert Level',
    icon: <CrownOutlined />,
  },
];

export const currencies = [
  {
    id: 1,
    name: 'USD',
    symbol: '$',
  },
  {
    id: 2,
    name: 'EUR',
    symbol: '€',
  },
  {
    id: 3,
    name: 'GBP',
    symbol: '£',
  },
  {
    id: 4,
    name: 'JPY',
    symbol: '¥',
  },
  {
    id: 5,
    name: 'KZT',
    symbol: '₸',
  },
];

const FlagIcon = ({ countryCode } : { countryCode:string }) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
  // @ts-ignore
    .map((char) => 127397 + char.charCodeAt());

  return String.fromCodePoint(...codePoints);
};

export const locations = [
  {
    id: 1,
    name: 'New York, USA',
    icon: <FlagIcon countryCode="us" />,
  },
  {
    id: 2,
    name: 'London, UK',
    icon: <FlagIcon countryCode="gb" />,
  },
  {
    id: 3,
    name: 'Tokyo, Japan',
    icon: <FlagIcon countryCode="jp" />,
  },
  {
    id: 4,
    name: 'Paris, France',
    icon: <FlagIcon countryCode="fr" />,
  },
  {
    id: 5,
    name: 'Berlin, Germany',
    icon: <FlagIcon countryCode="de" />,
  },
  {
    id: 6,
    name: 'Almaty, Kazakhstan',
    icon: <FlagIcon countryCode="kz" />,
  },
];

export const industries = [
  {
    id: 1,
    name: 'Technology',
    icon: <MergeOutlined />,
  },
  {
    id: 2,
    name: 'Finance',
    icon: <DollarOutlined />,
  },
  {
    id: 3,
    name: 'Healthcare',
    icon: <HeartOutlined />,
  },
  {
    id: 4,
    name: 'Education',
    icon: <BookOutlined />,
  },
  {
    id: 5,
    name: 'Manufacturing',
    icon: <SettingOutlined />,
  },
  {
    id: 6,
    name: 'Retail',
    icon: <ShoppingCartOutlined />,
  },
];
