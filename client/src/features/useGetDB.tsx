import { useEffect } from "react";
import { setList } from "../store/dbSlice";
import { useAppDispatch, useAppSelector } from "../store/store";




export function useGetDB () {

  const dispatch = useAppDispatch();
  const dbList = useAppSelector(state => state.db.list);

  useEffect(() => {
    if (!dbList) {
      fetch(`http://${window.location.hostname}:3001/db/get`)
        .then(response => response.json())
        .then((data) => {
          const db = data.map((item: any) => ({id: item._id, text: item.text}));
          dispatch(setList(db));
        })
        .catch((error) => console.error(error));
    }
  }, [dbList])
}