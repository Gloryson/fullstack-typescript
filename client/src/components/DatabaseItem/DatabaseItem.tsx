import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { deleteItemInDB, editItemInDB } from '../../features/dbFunctions';
import { setList } from '../../store/dbSlice';
import './DatabaseItem.scss';


interface DatabaseItemProps {
  id: string;
  text: string;
}


export function DatabaseItem ( { id, text }: DatabaseItemProps ) {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);
  const dispatch = useAppDispatch();

  return(
    <div className='db__item'>

      <div className={isEdit ? 'off' : 'db__item__title'}>{value}</div>

      <input
        className={isEdit ? '' : 'off'}
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <button
        className={`db__item__edit${isEdit ? '__with__input' : ''}`}
        onClick={() => {
          if (isEdit) {
            editItemInDB(id, value);
          }
          setIsEdit(!isEdit)
        }}
      />

      <button
        className='db__item__delete'
        onClick={() => {
          deleteItemInDB(id);
          dispatch(setList(null));
        }}
      />
      
    </div>
  )
}