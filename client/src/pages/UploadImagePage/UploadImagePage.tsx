import { useState } from 'react';
import './UploadImagePage.scss';



interface FileState {
  path: string | null;
  data: FormData | null;
}


export function UploadImagePage () {

  const [file, setFile] = useState<FileState>({path: null, data: null});
  const [classes, setClasses] = useState<string>('');


  function submitUploadImage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`http://${window.location.hostname}:3001/upload-image`, { method: 'POST', body: file.data })
      .then((response) => response.json())
      .then(() => setFile(() => ({path: null, data: null})))
      .catch((error) => console.error(error));
  }

  
  function handleInputFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const img = event.target.files ? event.target.files[0] : null;
    if (img) {
      const formData = new FormData();
      formData.append('image', img);
      setFile(() => ({path: URL.createObjectURL(img), data: formData}));
    }
  }


  function handleDragAndDropFileChange(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    const img = event.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('image', img);
    setFile(() => ({path: URL.createObjectURL(img), data: formData}));
    setClasses('');
  }


  return(
    <form className='upload__image__form' onSubmit={submitUploadImage} >
      
      <label
        className={classes}
        htmlFor='upload__image__input'
        onDragOver={e => {
          e.preventDefault();
          setClasses('drag--over'); 
        }}
        onDragLeave={() => setClasses('')}
        onDrop={handleDragAndDropFileChange}
      >
        Select a file or drag and drop it here.

        <input 
          id='upload__image__input'
          type='file'
          accept='.png, .jpg, .jpeg, .svg, .webp'
          onChange={handleInputFileChange}
        />
      </label>

      <input type='submit' value='Upload image'/>

      <img src={file.path ? file.path : ''} />
    </form>
  )
}