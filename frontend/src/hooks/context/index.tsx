import { ReactNode } from 'react';

import { DeletePostProvider } from '@/hooks/context/useDeletePost';
import { UpdatePostProvider } from '@/hooks/context/useUpdatePost';

interface Props {
  children: ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <>
      <DeletePostProvider>
        <UpdatePostProvider>{children}</UpdatePostProvider>
      </DeletePostProvider>
    </>
  );
}

export default ContextProvider;
