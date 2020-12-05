import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
} from 'react';

interface UpdatePostData {
  setOpenUpdateModal: (func: any) => any;
  handleUpdate: (id: string) => void;
  postId: string | null;
  setPostId: (value: null) => void;
}

const UpdatePost = createContext<UpdatePostData>({} as UpdatePostData);

export const UpdatePostProvider: React.FC = ({ children }) => {
  const [postId, setPostId] = useState<null | string>(null);
  const modalUpdateRef = useRef(null);

  const setOpenUpdateModal = useCallback((func: Function) => {
    modalUpdateRef.current = func;
  }, []);

  const handleUpdate = useCallback((id: string) => {
    setPostId(id);

    modalUpdateRef.current();
  }, []);

  return (
    <UpdatePost.Provider
      value={{ setOpenUpdateModal, handleUpdate, postId, setPostId }}
    >
      {children}
    </UpdatePost.Provider>
  );
};

export function useUpdatePost(): UpdatePostData {
  const context = useContext(UpdatePost);

  return context;
}
