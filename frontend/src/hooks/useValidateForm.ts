import { FormHandles, SubmitHandler } from '@unform/core';
import { RefObject, useCallback, useState } from 'react';
import { ObjectSchema, ValidationError } from 'yup';

import getValidationError from '@/utils/getValidationErros';

type Hook = <T>(
  args: Props<T>,
) => {
  validating: boolean;
  handleSubmit: SubmitHandler<T>;
};

interface Props<T> {
  formRef: RefObject<FormHandles>;
  schema: ObjectSchema;
  extraData?: any;
  onSuccess: (data: T) => void;
}

export const useValidateForm: Hook = ({
  formRef,
  schema,
  onSuccess,
  extraData = [],
}) => {
  const [validating, setValidating] = useState(false);

  const extraDataArray = Array.isArray(extraData) ? extraData : [extraData];
  const success = useCallback(onSuccess, [...extraDataArray, onSuccess]);

  const handleSubmit = useCallback(
    async formData => {
      formRef.current?.setErrors({});

      try {
        setValidating(true);

        const data: any = await schema.validate(formData, {
          abortEarly: false,
        });

        success(data);
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationError(error);

          formRef.current?.setErrors(errors);
        }
      } finally {
        setValidating(false);
      }
    },
    [formRef, schema, success],
  );

  return {
    handleSubmit,
    validating,
  };
};
