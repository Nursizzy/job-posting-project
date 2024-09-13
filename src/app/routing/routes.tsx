import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { RootLayout } from '../layout/RootLayout';
import {Spin} from "antd";

const lazyLoad = <T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T } | { [key: string]: T }>,
    name?: string
) =>
    lazy(() =>
        importFunc().then((module) => ({ default: (module as any)[name || 'default'] }))
    );

const JobPage = lazyLoad(() => import('../../pages/job/JobPage'), 'JobPage');
const JobApplyPage = lazyLoad(() => import('../../pages/job-apply/JobApplyPage'), 'JobApplyPage');
const JobListingRecruiterPage = lazyLoad(() => import('../../pages/job-listing-recruiter/JobListingRecruiterPage'), 'JobListingRecruiterPage');
const JobListingSeekerPage = lazyLoad(() => import('../../pages/job-listing-seeker/JobListingSeekerPage'), 'JobListingSeekerPage');
const JobPostingPage = lazyLoad(() => import('../../pages/job-posting/JobPostingPage'), 'JobPostingPage');

const Loading= () =>  <Spin
    size="large"
    className={'spinner'}
/>

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Navigate to="/job-listing-seeker" replace /> },
      {
        path: '/job-listing-seeker',
        element: (
            <Suspense fallback={<Loading />}>
              <JobListingSeekerPage />
            </Suspense>
        )
      },
      {
        path: '/job-listing-recruiter',
        element: (
            <Suspense fallback={<Loading />}>
              <JobListingRecruiterPage />
            </Suspense>
        )
      },
      {
        path: '/job-posting',
        element: (
            <Suspense fallback={<Loading />}>
              <JobPostingPage />
            </Suspense>
        )
      },
      {
        path: '/application/:id',
        element: (
            <Suspense fallback={<Loading />}>
              <JobApplyPage />
            </Suspense>
        )
      },
      {
        path: '/job/:id',
        element: (
            <Suspense fallback={<Loading />}>
              <JobPage />
            </Suspense>
        )
      },
    ],
  },
];

export const router = createBrowserRouter(routes);