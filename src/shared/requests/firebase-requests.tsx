import { notification, UploadFile } from 'antd';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc, getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  // @ts-ignore
} from 'firebase/firestore';
import {
  getDownloadURL, getStorage, ref, uploadBytes,
  // @ts-ignore
} from 'firebase/storage';

import dp from './firebase';
import {FiltersType, PostingType} from "../types/seeker";

const storage = getStorage();

export const fetchPostingsForSeekerList = (setLoading: (value:boolean) => void, filters:FiltersType, setPostings:(postings:PostingType[])=>void) => {
  const collectionRef = collection(dp, 'postings');
  let q = query(collectionRef, where('status', '==', 'posted'));

  if (filters.salary_currencyId && filters.salary_currencyId.length > 0) {
    q = query(q, where('salary_currencyId', 'in', filters.salary_currencyId));
  }
  if (filters.locationId && filters.locationId.length > 0) {
    q = query(q, where('locationId', 'in', filters.locationId));
  }
  if (filters.industryId && filters.industryId.length > 0) {
    q = query(q, where('industryId', 'in', filters.industryId));
  }
  if (filters.experienceId && filters.experienceId.length > 0) {
    q = query(q, where('experienceId', 'in', filters.experienceId));
  }

  const unsubscribe = onSnapshot(q, (snapshot:any) => {
    const postedJobs = snapshot.docs.map((doc:any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPostings(postedJobs);
    setLoading(false);
  }, () => {
    setLoading(false);
  });

  return unsubscribe;
};

export const fetchPostingsForRecruiterList = (setLoading:(value:boolean)=>void, filterStatus:string, setPostings: (values:PostingType[])=>void) => {
  let q = collection(dp, 'postings');

  if (filterStatus !== 'all') {
    // @ts-ignore
    q = query(q, where('status', '==', filterStatus));
  }

  const unsubscribe = onSnapshot(q, (snapshot:any) => {
    setPostings(snapshot.docs.map((doc:any) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }, () => {
    notification.error({
      message: 'Failed to fetch job postings. Please try again.',
    });
    setLoading(false);
  });
  return unsubscribe;
};

export const handlePostingDelete = async (id:string, setDeleting:(value:boolean)=>void) => {
  setDeleting(true);
  try {
    await deleteDoc(doc(dp, 'postings', id));
    notification.success({
      message: 'Job posting deleted successfully!',
    });
  } catch (error) {
    notification.error({
      message: 'Failed to delete job posting. Please try again.',
    });
  } finally {
    setDeleting(false);
  }
};

export const submitApplication = async (values: {
  first_name:string;
  last_name:string;
  email:string;
  phone_number:string;
  cover_letter:string;
}, fileList : UploadFile<any>[], application_id :string) => {
  const {
    first_name, last_name, email, phone_number, cover_letter,
  } = values;
  const cvFile = fileList[0].originFileObj;
  const cvRef = ref(storage, `cvs/${cvFile?.name}`);
  await uploadBytes(cvRef, cvFile);

  const cvUrl = await getDownloadURL(cvRef);
  const applicationData = {
    first_name,
    last_name,
    email,
    phone_number,
    cover_letter,
    uploaded_cv: cvUrl,
    created_at: serverTimestamp(),
    application_id,
  };

  await addDoc(collection(dp, 'applications'), applicationData);
};

export const publishJobPosting = async (values : PostingType, initialData: PostingType) => {
  const isUpdate = !!initialData;
  const postingData = {
    ...values,
    posted_at: serverTimestamp(),
    status: 'posted',
    [isUpdate ? 'updated_at' : 'created_at']: serverTimestamp(),
  };

  if (isUpdate) {
    await updateDoc(doc(dp, 'postings', initialData.id), postingData);
  } else {
    await addDoc(collection(dp, 'postings'), postingData);
  }

  return isUpdate ? 'updated' : 'published';
};

export const saveJobPostingAsDraft = async (values : PostingType, initialData: PostingType) => {
  const isUpdate = !!initialData;
  const postingData = {
    ...(isUpdate ? {} : values),
    status: 'draft',
    [isUpdate ? 'updated_at' : 'created_at']: serverTimestamp(),
  };

  if (isUpdate) {
    await updateDoc(doc(dp, 'postings', initialData.id), postingData);
  } else {
    await addDoc(collection(dp, 'postings'), postingData);
  }

  return isUpdate ? 'updated' : 'saved';
};

export const fetchJobData = async (id:string) => {
  const docRef = doc(dp, 'postings', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  throw new Error('No such job posting found!');
};

export const fetchApplications = async (applicationId:string) => {
  const q = query(
    collection(dp, 'applications'),
    where('application_id', '==', applicationId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc:any) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
