import React, { useMemo } from 'react';
import { FileText, ArrowLeft, Upload, User, Mail, Phone, MapPin } from 'lucide-react';
import type { Job, CandidateApplication } from './types';

export type ApplicationFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  jobId: number | null;
  cvFile: File | null;
};

type Props = {
  jobs: Job[];
  formData: ApplicationFormData;
  setFormData: (updater: (prev: ApplicationFormData) => ApplicationFormData) => void;
  onBack: () => void;
  onSubmitted: (application: CandidateApplication, updatedJobs: Job[]) => void;
};

export default function ApplicationForm({ jobs, formData, setFormData, onBack, onSubmitted }: Props) {
  const selectedJob = useMemo(() => jobs.find(j => j.id === formData.jobId) || null, [jobs, formData.jobId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobId) return;

    const application: CandidateApplication = {
      id: Date.now(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      jobId: formData.jobId,
      cvFile: formData.cvFile,
      jobTitle: selectedJob?.title,
      submittedAt: new Date().toISOString(),
      status: 'Mới',
    };

    const updatedJobs = jobs.map(job => job.id === formData.jobId ? { ...job, applications: job.applications + 1 } : job);

    onSubmitted(application, updatedJobs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại trang chủ
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Đơn ứng tuyển</h2>
            <p className="text-gray-600">Điền thông tin để ứng tuyển vị trí mơ ước</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Vị trí ứng tuyển *</label>
              <select
                required
                value={formData.jobId ?? ''}
                onChange={(e) => setFormData(prev => ({ ...prev, jobId: Number(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Chọn vị trí</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} - {job.department}
                  </option>
                ))}
              </select>
            </div>

            {selectedJob && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center text-blue-700">
                  <FileText className="w-5 h-5 mr-2" />
                  <span className="font-medium">Tải Job Description: {selectedJob.jdFile}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2"><User className="w-4 h-4 inline mr-1" />Họ và tên *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2"><Mail className="w-4 h-4 inline mr-1" />Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2"><Phone className="w-4 h-4 inline mr-1" />Số điện thoại (Zalo) *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2"><MapPin className="w-4 h-4 inline mr-1" />Địa chỉ *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Số nhà, đường, quận, thành phố"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2"><Upload className="w-4 h-4 inline mr-1" />Upload CV (PDF/DOCX) *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    if (file && file.size > 5 * 1024 * 1024) {
                      alert('File quá 5MB');
                      return;
                    }
                    setFormData(prev => ({ ...prev, cvFile: file }));
                  }}
                  className="hidden"
                  id="cv-upload"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">{formData.cvFile ? formData.cvFile.name : 'Nhấn để chọn file CV'}</p>
                  <p className="text-sm text-gray-500 mt-1">PDF hoặc DOCX, tối đa 5MB</p>
                </label>
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg">
              Nộp đơn ứng tuyển
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
