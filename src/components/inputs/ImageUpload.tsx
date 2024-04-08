"use client";
import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { LuImagePlus } from "react-icons/lu";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ngil2zxz"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
        relative
        cursor-pointer
        hover:opacity-70
        transition
        border-dashed
        border-2
        p-20
        border-neutral-300
        flex
        flex-col
        justify-center
        items-center
        gap-4
        text-neutral-600
        
        "
          >
            <LuImagePlus size={50} />
            <div className="font-semibold text-lg">Click To Upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  src={value}
                  style={{ objectFit: "cover" }}
                  fill
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
