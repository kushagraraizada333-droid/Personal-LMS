import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw } from 'lucide-react';

interface HSBLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  allowUpload?: boolean;
  showText?: boolean;
}

export const HSBLogo: React.FC<HSBLogoProps> = ({
  size = 'md',
  className = '',
  allowUpload = false,
  showText = false,
}) => {
  const [logoSrc, setLogoSrc] = useState<string>('/hsb.jpg');
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user uploaded a custom logo in localStorage
    const savedLogo = localStorage.getItem('hsb_custom_logo');
    if (savedLogo) {
      setLogoSrc(savedLogo);
      setHasError(false);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          localStorage.setItem('hsb_custom_logo', base64);
          setLogoSrc(base64);
          setHasError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('hsb_custom_logo');
    setLogoSrc('/hsb.jpg');
    setHasError(false);
  };

  // Dimensions based on size
  const sizeMap = {
    xs: { h: 'h-6', w: 'w-6', imgH: 'h-5', text: 'text-xs' },
    sm: { h: 'h-8', w: 'w-8', imgH: 'h-7', text: 'text-sm' },
    md: { h: 'h-11', w: 'w-11', imgH: 'h-9', text: 'text-base' },
    lg: { h: 'h-16', w: 'w-16', imgH: 'h-14', text: 'text-lg' },
    xl: { h: 'h-20', w: 'w-20', imgH: 'h-16', text: 'text-xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center space-x-2.5 ${className}`}>
      {/* Hidden File Input for Custom Upload */}
      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      )}

      {/* Crisp White Rounded Container */}
      <div
        onClick={() => allowUpload && fileInputRef.current?.click()}
        title={allowUpload ? "Click to upload / change HSB Logo" : "HSB Jaipur"}
        className={`group relative flex items-center justify-center bg-white rounded-xl p-1.5 shadow-sm border border-slate-200/90 transition-all duration-200 ${
          allowUpload ? 'cursor-pointer hover:border-[#004B93] hover:shadow-md' : ''
        } ${currentSize.h}`}
      >
        {!hasError ? (
          <img
            src={logoSrc}
            alt="HSB — Harishankar Singhania School of Business"
            className={`${currentSize.imgH} w-auto object-contain transition-transform group-hover:scale-[1.02]`}
            onError={() => setHasError(true)}
          />
        ) : (
          /* High-Fidelity SVG Monogram Replica */
          <svg
            viewBox="0 0 320 160"
            className={`${currentSize.imgH} w-auto`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* HSB Monogram in #004B93 */}
            {/* 'H' Left & Right Vertical Stems */}
            <rect x="20" y="20" width="24" height="120" rx="3" fill="#004B93" />
            <rect x="76" y="20" width="24" height="120" rx="3" fill="#004B93" />
            {/* 'H' Crossbar flowing smoothly into 'S' top curve */}
            <path
              d="M32 78 H134 C146 78 152 72 152 60 V42 C152 30 160 22 172 22 H214"
              stroke="#004B93"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 'S' Bottom Curve flowing smoothly into 'B' center crossbar */}
            <path
              d="M136 138 H178 C190 138 198 130 198 118 V100 C198 88 206 82 218 82 H256"
              stroke="#004B93"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 'B' Vertical Stem */}
            <rect x="238" y="20" width="24" height="120" rx="3" fill="#004B93" />
            {/* 'B' Top Loop */}
            <path
              d="M250 20 H284 C298 20 308 30 308 45 C308 60 298 70 284 70 H250"
              stroke="#004B93"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 'B' Bottom Loop */}
            <path
              d="M250 70 H286 C302 70 312 82 312 99 C312 116 302 128 286 128 H250"
              stroke="#004B93"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Hover Upload Indicator */}
        {allowUpload && (
          <div className="absolute inset-0 bg-[#004B93]/80 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-extrabold tracking-tight text-[#004B93] text-sm leading-tight">
            HSB JAIPUR
          </span>
          <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
            Study Portal
          </span>
        </div>
      )}
    </div>
  );
};
