import { useState } from 'react';
import './UploadImagePage.scss';



export function UploadImagePage () {

  const [file, setFile] = useState<FileList[0] | null>(null);
  const [classes, setClasses] = useState<string>('');

  return(

    <form
      className='upload__image__form' method='POST'
      action={`http://${window.location.hostname}:3001/upload-image`}
      encType='multipart/form-data'
    >
      
      <label
        className={classes}
        htmlFor='upload__image__input'
        onDragOver={e => { e.preventDefault(); setClasses('drag--over'); } }
        onDragLeave={() => setClasses('')}
        onDrop={e => {
          e.preventDefault();
          setFile(e.dataTransfer.files[0]);
          setClasses('');
          const input = document.getElementById('upload__image__input') as HTMLInputElement;
          input.files = e.dataTransfer.files;
        }}
      >
        Select a file or drag and drop it here.

        <input 
          id='upload__image__input'
          type='file'
          name='uploaded-file'
          accept='.png, .jpg, .jpeg'
          onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
        />
      </label>

      <input type='submit' value='Upload image' />

      <img src={file ? URL.createObjectURL(file) : ''} />

    </form>

  )
}