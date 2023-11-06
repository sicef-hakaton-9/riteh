"use client";

import type { ChangeEventHandler, DragEventHandler } from "react";
import { useRef, useState } from "react";
import UploadFile from "../uploadFile";
import Image from "next/image";

interface Props {
  className?: string;
  setFileBase64: (fileBase64: string) => void;
}

export default function ImageUpload({ className, setFileBase64 }: Props) {
  const defaultImage = "/images/image-upload-default.svg";

  const [previewURL, setPreviewURL] = useState<string | null>(defaultImage);
  // defaultImage ? defaultImage : null
  const thumbnailUpload = useRef<HTMLInputElement>(null);

  const handleFileUrlChange = (fileUrl: File | undefined) => {
    if (fileUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string | null);
        setFileBase64(reader.result as string);
      };

      reader.readAsDataURL(fileUrl);
    } else {
      setPreviewURL(null);
    }
  };

  const handleDragOver: DragEventHandler<
    HTMLFormElement | HTMLInputElement | HTMLDivElement
  > = (event) => {
    event.preventDefault();
  };

  const handleDrop: DragEventHandler<
    HTMLFormElement | HTMLInputElement | HTMLDivElement
  > = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUrlChange(file);
  };

  const handleBrowse: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    handleFileUrlChange(event.target.files ? event.target.files[0] : undefined);
    // onFileUploaded(event.target.files ? event.target.files[0] : undefined);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => {
          if (thumbnailUpload.current) {
            thumbnailUpload.current.click();
          }
        }}
      >
        <div
          className={
            className ||
            "m-[16px] flex flex-col justify-center items-center relative min-h-[150px] max-h-[350px] border-solid border-2 rounded-md"
          }
        >
          <Image
            src={previewURL ?? ""}
            alt="Preview"
            fill={previewURL !== defaultImage}
            width={previewURL === defaultImage ? 75 : undefined}
            height={previewURL === defaultImage ? 75 : undefined}
            className="object-contain"
          />
          {previewURL === defaultImage && (
            <p>Please drag and drop an image or click to browse</p>
          )}
        </div>
        <UploadFile
          hidden
          onDrop={handleDrop}
          onBrowse={handleBrowse}
          ref={thumbnailUpload}
        />
      </div>
    </>
  );
}
