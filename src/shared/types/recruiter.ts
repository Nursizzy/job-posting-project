import {PostingType} from "./seeker";


export interface ApplicationsListProps {
  id: string;
}

export type ApplicationType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  cover_letter: string;
  uploaded_cv: string;
};

export interface JobCreateProps {
  initialData: PostingType | null;
}
