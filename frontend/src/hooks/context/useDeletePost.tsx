import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
} from 'react';

interface DeletePostData {
  deleteFn: (param: any) => any;
  handleDelete: (id: string) => void;
}

const DeletePost = createContext<DeletePostData>({} as DeletePostData);

export const DeletePostProvider: React.FC = ({ children }) => {
  const [postId, setPostId] = useState<null | string>(null);
  const deleteRef = useRef(null);

  const deleteFn = useCallback((deleteFn: Function) => {
    deleteRef.current = deleteFn;
  }, []);

  const handleDelete = useCallback((id: string) => {
    setPostId(id);

    deleteRef.current();
  }, []);

  return (
    <DeletePost.Provider value={{ deleteFn, handleDelete }}>
      {children}
    </DeletePost.Provider>
  );
};

export function useDeletePost(): DeletePostData {
  const context = useContext(DeletePost);

  return context;
}
