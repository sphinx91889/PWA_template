import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export function CameraCapture() {
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const photoUrl = canvas.toDataURL('image/jpeg');
      setPhoto(photoUrl);
      
      // Stop the camera stream
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    startCamera();
  };

  return (
    <div className="space-y-4">
      {!photo && !isStreaming && (
        <button
          onClick={startCamera}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Camera className="w-5 h-5 mr-2" />
          Open Camera
        </button>
      )}

      {isStreaming && (
        <div className="space-y-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={takePhoto}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Camera className="w-5 h-5 mr-2" />
            Take Photo
          </button>
        </div>
      )}

      {photo && (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={photo}
              alt="Captured photo"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <button
            onClick={retakePhoto}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ImageIcon className="w-5 h-5 mr-2" />
            Retake Photo
          </button>
        </div>
      )}
    </div>
  );
}