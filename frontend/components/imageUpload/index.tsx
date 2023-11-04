"use client";

import type { ChangeEventHandler, DragEventHandler } from "react";
import { useRef, useState } from "react";
import UploadFile from "../uploadFile";
import Image from "next/image";

interface Props {
  className?: string;
}

export default function ImageUpload({ className }: Props) {
  const defaultImage = "/images/image-upload-default.svg";

  const [, setSelectedFile] = useState<File | undefined>();

  const [previewURL, setPreviewURL] = useState<string | null>(defaultImage);
  // defaultImage ? defaultImage : null
  const thumbnailUpload = useRef<HTMLInputElement>(null);

  const handleFileUrlChange = (fileUrl: File | undefined) => {
    setSelectedFile(fileUrl);
    if (fileUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string | null);
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
            "flex flex-col justify-center items-center relative h-[350px] border-solid border-2 rounded-md"
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
