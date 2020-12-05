export interface SignUpVariables {
  name: string;
  email: string;
  password: string;
}

export interface DeletePostVariables {
  id: string;
}

export interface SessionVariables {
  email: string;
  password: string;
}

export interface CreatePostVariables {
  title: string;
  content: string;
}

export interface UpdatePostVariables {
  id?: string;
  title: string;
  content: string;
}
