import React from 'react';
import { Users, Briefcase, CheckCircle, Edit2, Trash2 } from 'lucide-react';
import type { Job, CandidateApplication } from './types';

type Props = {
  jobs: Job[];
  applications: CandidateApplication[];
  onBackToLanding: () => void;
  onCreateJob: () => void;
  onEditJob: (job: Job) => void;
  onDeleteJob: (jobId: number) => void;
};

export default function HRDashboard({ jobs, applications, onBackToLanding, onCreateJob, onEditJob, onDeleteJob }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="w-8 h-8 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">HR Dashboard</h1>
                <p className="text-gray-300 text-sm">Quản lý tuyển dụng</p>
              </div>
            </div>
            <button onClick={onBackToLanding} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all">Về trang ứng viên</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng số vị trí</p>
                <p className="text-3xl font-bold text-gray-800">{jobs.length}</p>
              </div>
              <Briefcase className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng ứng viên</p>
                <p className="text-3xl font-bold text-gray-800">{applications.length}</p>
              </div>
              <Users className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ứng viên mới</p>
                <p className="text-3xl font-bold text-gray-800">{applications.filter(a => a.status === 'Mới').length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Danh sách công việc</h2>
          <button onClick={onCreateJob} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center shadow-lg">
            Tạo Job mới
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vị trí</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phòng ban</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Địa điểm</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số CV</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.type}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{job.department}</td>
                  <td className="px-6 py-4 text-gray-700">{job.location}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">{job.applications} CV</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => onEditJob(job)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => onDeleteJob(job.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
