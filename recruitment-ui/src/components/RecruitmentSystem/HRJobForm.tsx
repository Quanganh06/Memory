import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import type { Job } from './types';

export type JobFormData = {
  title: string;
  department: string;
  location: string;
  type: Job['type'];
  salary: string;
  description: string;
  requirements: string;
  benefits: string;
  jdFile: File | null;
};

type Props = {
  editingJob: Job | null;
  jobFormData: JobFormData;
  setJobFormData: (updater: (prev: JobFormData) => JobFormData) => void;
  onBack: () => void;
  onSubmit: (updatedJobs: Job[]) => void;
  jobs: Job[];
};

export default function HRJobForm({ editingJob, jobFormData, setJobFormData, onBack, onSubmit, jobs }: Props) {
  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingJob) {
      const updated = jobs.map(job => job.id === editingJob.id
        ? { ...job, ...jobFormData, jdFile: jobFormData.jdFile?.name || job.jdFile }
        : job);
      onSubmit(updated);
    } else {
      const newJob: Job = {
        id: Date.now(),
        title: jobFormData.title,
        department: jobFormData.department,
        location: jobFormData.location,
        type: jobFormData.type,
        salary: jobFormData.salary,
        description: jobFormData.description,
        requirements: jobFormData.requirements,
        benefits: jobFormData.benefits,
        applications: 0,
        jdFile: jobFormData.jdFile?.name || null,
      };
      onSubmit([...jobs, newJob]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{editingJob ? 'Chỉnh sửa Job' : 'Tạo Job mới'}</h2>
            <p className="text-gray-600">Điền thông tin chi tiết về vị trí tuyển dụng</p>
          </div>

          <form onSubmit={handleJobSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tên vị trí *</label>
                <input
                  type="text"
                  required
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Senior Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phòng ban *</label>
                <input
                  type="text"
                  required
                  value={jobFormData.department}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Địa điểm *</label>
                <input
                  type="text"
                  required
                  value={jobFormData.location}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hà Nội"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loại hình *</label>
                <select
                  required
                  value={jobFormData.type}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, type: e.target.value as Job['type'] }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mức lương *</label>
                <input
                  type="text"
                  required
                  value={jobFormData.salary}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, salary: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25-35 triệu"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả công việc *</label>
                <textarea
                  required
                  rows={4}
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mô tả chi tiết về công việc..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Yêu cầu *</label>
                <textarea
                  required
                  rows={4}
                  value={jobFormData.requirements}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mỗi yêu cầu trên một dòng..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quyền lợi *</label>
                <textarea
                  required
                  rows={4}
                  value={jobFormData.benefits}
                  onChange={(e) => setJobFormData(prev => ({ ...prev, benefits: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mỗi quyền lợi trên một dòng..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Job Description (PDF)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setJobFormData(prev => ({ ...prev, jdFile: e.target.files?.[0] ?? null }))}
                    className="hidden"
                    id="jd-upload"
                  />
                  <label htmlFor="jd-upload" className="cursor-pointer">
                    <FileText className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">{jobFormData.jdFile ? jobFormData.jdFile.name : 'Nhấn để chọn file JD'}</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, tối đa 5MB</p>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                {editingJob ? 'Cập nhật Job' : 'Tạo Job'}
              </button>
              <button type="button" onClick={onBack} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all">
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
