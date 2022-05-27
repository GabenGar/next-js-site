/**
 * @link https://css-tricks.com/drag-and-drop-file-uploading/
 */
export function isAdvancedUpload() {
  const div = document.createElement("div");
  return (
    ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
    "FormData" in window &&
    "FileReader" in window
  );
}
