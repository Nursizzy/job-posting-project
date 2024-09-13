import { Dayjs } from 'dayjs';

export interface JobCardProps {
  posting: PostingType;
}

export type PostingType = {
  id: string;
  title: string;
  company_name: string;
  locationId: number;
  experienceId: number;
  industryId: number;
  salary_currencyId: number;
  posted_at: Dayjs;
  description: string;
  salary_range: {
    from: number;
    to: number;
  };
  status: string;
};

export interface JobFiltersProps {
  updateFilters: (filters: FiltersType) => void;
  currentFilters: FiltersType;
}

export type FiltersType = {
  salary_currencyId: number[];
  locationId: number[];
  industryId: number[];
  experienceId: number[];
};
