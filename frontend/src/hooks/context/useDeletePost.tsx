import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
} from 'react';

interface DeletePostData {
  setOpenAlertConfirmation: (func: any) => any;
  handleDelete: (id: string) => void;
  postId: null | string;
  setPostId: (value: null) => void;
}

const DeletePost = createContext<DeletePostData>({} as DeletePostData);

export const DeletePostProvider: React.FC = ({ children }) => {
  const [postId, setPostId] = useState<null | string>(null);
  const alertConfirmationRef = useRef(null);

  const setOpenAlertConfirmation = useCallback((func: Function) => {
    alertConfirmationRef.current = func;
  }, []);

  const handleDelete = useCallback((id: string) => {
    setPostId(id);

    alertConfirmationRef.current();
  }, []);

  return (
    <DeletePost.Provider
      value={{ setOpenAlertConfirmation, handleDelete, postId, setPostId }}
    >
      {children}
    </DeletePost.Provider>
  );
};

export function useDeletePost(): DeletePostData {
  const context = useContext(DeletePost);

  return context;
}
