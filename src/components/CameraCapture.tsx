import React, { useRef, useState } from 'react';
import { Camera, RotateCcw } from 'lucide-react';

export function CameraCapture() {
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  React.useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    try {
      if (videoRef.current) {
        if (stream?.active === false) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0);
          const photoUrl = canvas.toDataURL('image/jpeg');
          setPhoto(photoUrl);
        }
      }
    } catch (err) {
      console.error('Error taking photo:', err);
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded-2xl shadow-lg bg-gray-100"
      />
      
      <button
        onClick={photo ? retakePhoto : takePhoto}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-10"
      >
        {photo ? (
          <RotateCcw className="w-6 h-6 text-indigo-600" />
        ) : (
          <Camera className="w-6 h-6 text-indigo-600" />
        )}
      </button>
      
      {photo && (
        <div
          className="absolute inset-0 rounded-2xl z-0"
          style={{
            backgroundImage: `url(${photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
    </div>
  );
}