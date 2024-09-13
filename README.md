# Job Posting Portal

## Project Overview
This project is a job posting portal created using React and TypeScript. It provides a platform for recruiters to post job listings and for job seekers to browse and apply for jobs.

Live Demo: [Job Posting Portal](https://job-posting-portal-81502.web.app/)

## Technologies Used
- React with TypeScript
- Firebase
  - Hosting
  - Firestore (database)
  - Storage (file storage) - to store uploaded CV's
- Ant Design (UI component library)
- React Router (navigation)

## Features
The application is fully responsive across desktop and mobile devices, and consists of 5 main pages:

1. **Recruiters List**: 
   - View all created job postings
   - Create new job postings
   - Delete existing postings
   - Navigate to job edit page

2. **Create New Job Page**: 
   - Fill a form to create a new job posting
   - Save as draft or publish directly

3. **Job Details Page**: 
   - View full job posting details
   - Change job status (draft/posted)
   - Modify job details (if in draft status)
   - View applicants' information
   - Download applicants' CVs

4. **Job Seekers List Page**: 
   - Browse all available jobs (status == 'posted')
   - Filter jobs by currency, location, industry, or experience level
   - View full job details
   - Apply for jobs

5. **Application Page**: 
   - Apply for chosen job posting
   - Fill application form
   - Attach CV and cover letter (optional)

## Project Structure
All Firebase configurations and requests are located in the `shared/requests` directory.

## Challenges Faced
1. **UX/UI Design**: Creating a seamless and easy-to-understand user experience. Upwork's site was used as a reference.
2. **Firebase as Backend**: Configuring the database and requests presented challenges, particularly with search and pagination. While pagination was implemented, the search feature was removed due to indexing issues that require further configuration.
3. **Scope Management**: Balancing feature implementation with project timelines. The decision was made to stop at the current level of functionality to avoid overscoping.

## Future Improvements
- Enhance search functionality with proper indexing
- Styling using scss will be better
- Wrap some function to useCallback or useMemo for optimization
- 
