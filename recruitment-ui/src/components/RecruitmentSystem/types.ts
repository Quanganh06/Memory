export type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  description: string;
  requirements: string;
  benefits: string;
  applications: number;
  jdFile: string | null;
};

export type CandidateApplication = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  jobId: number | null;
  cvFile: File | null;
  jobTitle?: string;
  submittedAt?: string;
  status: 'Mới' | 'Đã xem' | 'Đang phỏng vấn' | 'Từ chối' | 'Nhận offer';
};

export type ViewKey = 'landing' | 'apply' | 'confirmation' | 'hr-dashboard' | 'hr-job-form';
