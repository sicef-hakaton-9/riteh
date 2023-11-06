import type { ChangeEventHandler, DragEventHandler, ForwardedRef } from "react";
import { forwardRef } from "react";

export interface UploadFileProps {
  onBrowse: ChangeEventHandler<HTMLInputElement>;
  onDrop?: DragEventHandler<HTMLInputElement>;
  hidden?: boolean;
  accept?: string;
}

const UploadFile = forwardRef(
  (
    { accept, hidden, onBrowse, onDrop }: UploadFileProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        type="file"
        onChange={onBrowse}
        onDrop={onDrop}
        hidden={hidden}
        ref={ref}
        accept={accept}
      />
    );
  }
);

export default UploadFile;
