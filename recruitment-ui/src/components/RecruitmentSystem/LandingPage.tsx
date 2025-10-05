import React from 'react';
import { Briefcase, Users, Clock, Building2, MapPin, FileText, ChevronRight } from 'lucide-react';
import type { Job } from './types';

type Props = {
  jobs: Job[];
  onApply: (jobId?: number) => void;
  onOpenHR: () => void;
};

export default function LandingPage({ jobs, onApply, onOpenHR }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Building2 className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-6">Gia nhập đội ngũ của chúng tôi</h1>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Khám phá cơ hội nghề nghiệp tuyệt vời và phát triển sự nghiệp cùng chúng tôi
            </p>
            <button
              onClick={() => onApply()}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              Ứng tuyển ngay <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-20 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold text-gray-800 mb-2">{jobs.length}</div>
            <div className="text-gray-600">Vị trí đang tuyển</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold text-gray-800 mb-2">500+</div>
            <div className="text-gray-600">Nhân viên</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold text-gray-800 mb-2">10+</div>
            <div className="text-gray-600">Năm kinh nghiệm</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Vị trí đang tuyển dụng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{job.type}</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span className="text-sm">{job.department}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm font-semibold text-green-600">{job.salary}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
              {job.jdFile && (
                <div className="flex items-center text-blue-600 text-sm mb-4">
                  <FileText className="w-4 h-4 mr-2" />
                  <a href={`/files/${job.jdFile}`} target="_blank" rel="noopener noreferrer" className="hover:underline">Xem Job Description</a>
                </div>
              )}
              <button
                onClick={() => onApply(job.id)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Ứng tuyển ngay
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <button onClick={onOpenHR} className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-all flex items-center">
          <Users className="w-5 h-5 mr-2" />
          HR Dashboard
        </button>
      </div>
    </div>
  );
}
