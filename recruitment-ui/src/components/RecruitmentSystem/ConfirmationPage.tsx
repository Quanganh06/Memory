import React from 'react';
import { CheckCircle, Eye, ArrowLeft } from 'lucide-react';
import type { CandidateApplication } from './types';

type Props = {
  application: CandidateApplication | null;
  onBackHome: () => void;
  onApplyAnother: () => void;
};

export default function ConfirmationPage({ application, onBackHome, onApplyAnother }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Nộp CV thành công!</h2>
          <p className="text-gray-600">Cảm ơn bạn đã ứng tuyển. Chúng tôi sẽ xem xét hồ sơ và liên hệ sớm.</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Thông tin đã nộp
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-600">Vị trí:</span><span className="font-semibold text-gray-800">{application?.jobTitle}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Họ tên:</span><span className="font-semibold text-gray-800">{application?.fullName}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Email:</span><span className="font-semibold text-gray-800">{application?.email}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Số điện thoại:</span><span className="font-semibold text-gray-800">{application?.phone}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Địa chỉ:</span><span className="font-semibold text-gray-800">{application?.address}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">CV:</span><span className="font-semibold text-gray-800">{application?.cvFile?.name}</span></div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onBackHome} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">Về trang chủ</button>
          <button onClick={onApplyAnother} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all">Ứng tuyển vị trí khác</button>
        </div>
      </div>
    </div>
  );
}
