import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeComponent = ({ url }) => {
  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <QRCodeCanvas value={url} size={128} bgColor="#ffffff" fgColor="#000000" />
      <p className="text-sm text-gray-600 break-words">{url}</p>
    </div>
  );
};

export default QRCodeComponent;
