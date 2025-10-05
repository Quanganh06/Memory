import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ApplicationForm, { type ApplicationFormData } from './ApplicationForm';
import ConfirmationPage from './ConfirmationPage';
import HRDashboard from './HRDashboard';
import HRJobForm, { type JobFormData } from './HRJobForm';
import type { CandidateApplication, Job, ViewKey } from './types';

export default function RecruitmentSystem() {
  const [view, setView] = useState<ViewKey>('landing');

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Hà Nội',
      type: 'Full-time',
      salary: '25-35 triệu',
      description: 'Chúng tôi đang tìm kiếm Frontend Developer có kinh nghiệm với React, TypeScript...',
      requirements: '3+ năm kinh nghiệm với React\nThành thạo TypeScript\nKinh nghiệm với REST API',
      benefits: 'Lương cạnh tranh\n13-15 tháng lương/năm\nBảo hiểm đầy đủ',
      applications: 12,
      jdFile: 'frontend-developer-jd.pdf',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'TP.HCM',
      type: 'Full-time',
      salary: '30-40 triệu',
      description: 'Tìm kiếm Product Manager có tư duy chiến lược và kỹ năng lãnh đạo tốt...',
      requirements: '5+ năm kinh nghiệm PM\nKỹ năng phân tích tốt\nKinh nghiệm quản lý team',
      benefits: 'Lương thưởng hấp dẫn\nCơ hội thăng tiến\nMôi trường năng động',
      applications: 8,
      jdFile: 'product-manager-jd.pdf',
    },
  ]);

  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [submittedApplication, setSubmittedApplication] = useState<CandidateApplication | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    jobId: null,
    cvFile: null,
  });

  const [jobFormData, setJobFormData] = useState<JobFormData>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    jdFile: null,
  });

  const openApply = (jobId?: number) => {
    setView('apply');
    if (jobId) {
      setFormData(prev => ({ ...prev, jobId }));
    }
  };

  return (
    <div>
      {view === 'landing' && (
        <LandingPage
          jobs={jobs}
          onApply={openApply}
          onOpenHR={() => setView('hr-dashboard')}
        />
      )}

      {view === 'apply' && (
        <ApplicationForm
          jobs={jobs}
          formData={formData}
          setFormData={(updater) => setFormData(prev => updater(prev))}
          onBack={() => setView('landing')}
          onSubmitted={(application, updatedJobs) => {
            setApplications(prev => [...prev, application]);
            setSubmittedApplication(application);
            setJobs(updatedJobs);
            setView('confirmation');
          }}
        />
      )}

      {view === 'confirmation' && (
        <ConfirmationPage
          application={submittedApplication}
          onBackHome={() => {
            setFormData({ fullName: '', email: '', phone: '', address: '', jobId: null, cvFile: null });
            setView('landing');
          }}
          onApplyAnother={() => setView('apply')}
        />
      )}

      {view === 'hr-dashboard' && (
        <HRDashboard
          jobs={jobs}
          applications={applications}
          onBackToLanding={() => setView('landing')}
          onCreateJob={() => {
            setEditingJob(null);
            setJobFormData({ title: '', department: '', location: '', type: 'Full-time', salary: '', description: '', requirements: '', benefits: '', jdFile: null });
            setView('hr-job-form');
          }}
          onEditJob={(job) => {
            setEditingJob(job);
            setJobFormData({
              title: job.title,
              department: job.department,
              location: job.location,
              type: job.type,
              salary: job.salary,
              description: job.description,
              requirements: job.requirements,
              benefits: job.benefits,
              jdFile: null,
            });
            setView('hr-job-form');
          }}
          onDeleteJob={(jobId) => {
            if (window.confirm('Bạn có chắc muốn xóa vị trí này?')) {
              setJobs(prev => prev.filter(j => j.id !== jobId));
            }
          }}
        />
      )}

      {view === 'hr-job-form' && (
        <HRJobForm
          jobs={jobs}
          editingJob={editingJob}
          jobFormData={jobFormData}
          setJobFormData={(updater) => setJobFormData(prev => updater(prev))}
          onBack={() => setView('hr-dashboard')}
          onSubmit={(updatedJobs) => {
            setJobs(updatedJobs);
            setView('hr-dashboard');
          }}
        />
      )}
    </div>
  );
}
