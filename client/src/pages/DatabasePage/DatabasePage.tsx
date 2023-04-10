import { useState } from 'react';
import { DatabaseItem, Spiner } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useGetDB, addItemToDB } from '../../features';
import { setList } from '../../store/dbSlice';
import './DatabasePage.scss';



export function DatabasePage () {

  const dbList = useAppSelector(state => state.db.list);
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();

  useGetDB();

  return dbList ? (
    <section className='database__page'>
      {
        dbList.map(item => 
          <DatabaseItem 
            key={item.id}
            id={item.id}
            text={item.text}
          />
        )
      }

      <div className="db__add__item">

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button onClick={() => {
          addItemToDB(value);
          setValue('');
          dispatch(setList(null)) }}>Add item</button>
          
      </div>
    </section>
  ) : ( <Spiner /> );
}