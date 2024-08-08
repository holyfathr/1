import { forwardRef, useEffect, useRef, useState } from "react";
import { mergeRefs } from "react-merge-refs";
import FileUpload from "components/ui/FileUpload";
import ImageCrop from "components/ui/ImageCrop";
import useModal from "hooks/use-modal";
import {
  getFileName,
  getFilePreview,
  isCroppableFile,
  isImage,
  isImageURL,
  isPreview,
} from "helpers/files";

const MAX_FILE_NAME_LENGTH = 20;

const FileUploadContainer = ({ onChange, value, description, title, key, ...props }, ref) => {
  const innerRef = useRef();
  const [preview, setPreview] = useState();

  const { Modal: CropModal, open: openCrop, close: closeCrop } = useModal();

  const preChange = (event) => {
    const [file] = event.target.files;
    if (file) onChange(file);
  };

  const onClear = () => {
    innerRef.current.value = "";
    innerRef.current._valueTracker?.setValue("");
    innerRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    onChange(null);
  };

  const onCrop = (file) => {
    onChange(file);
    closeCrop();
  };

  useEffect(() => {
    if (isImage(value)) {
      getFilePreview(value).then(setPreview);
    } else if (isImageURL(value) || isPreview(value)) {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  return (
    <>
      <FileUpload
        preview={preview}
        onChange={preChange}
        onClear={value ? onClear : undefined}
        description={value ? "Загружено" : description}
        onCrop={isCroppableFile(value) ? openCrop : undefined}
        title={value ? getFileName(value, MAX_FILE_NAME_LENGTH) : title}
        {...props}
        ref={mergeRefs([ref, innerRef])}
      />
      <CropModal shouldCloseOnOverlayClick={false}>
        <ImageCrop image={preview} onCancel={closeCrop} onSave={onCrop} />
      </CropModal>
    </>
  );
};

export default forwardRef(FileUploadContainer);
