'use client';

import React, { createContext, useContext } from 'react';
import { cn } from '../../utils/cn';

// Form Context
interface FormContextType {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  values: Record<string, unknown>;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setFieldError: (name: string, error: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within a Form');
  }
  return context;
}

// Form Component
export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode;
  initialValues?: Record<string, unknown>;
  onSubmit?: (values: Record<string, unknown>) => void;
  validate?: (values: Record<string, unknown>) => Record<string, string>;
}

export const Form: React.FC<FormProps> = ({
  children,
  initialValues = {},
  onSubmit,
  validate,
  className,
  ...props
}) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const setFieldValue = (name: string, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const setFieldTouched = (name: string, touched: boolean) => {
    setTouched(prev => ({ ...prev, [name]: touched }));
  };

  const setFieldError = (name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    if (onSubmit) {
      onSubmit(values);
    }
  };

  const contextValue: FormContextType = {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        onSubmit={handleSubmit}
        className={cn('space-y-4', className)}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.displayName = 'Form';

// FormField Component
export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  required,
  children,
  className,
}) => {
  const { errors, touched } = useFormContext();
  const hasError = touched[name] && Boolean(errors[name]);

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label className='block text-sm font-medium text-neutral-700'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      {children}
      {hasError && <p className='text-sm text-red-600'>{errors[name] || ''}</p>}
    </div>
  );
};

// FormError Component
export interface FormErrorProps {
  name: string;
  className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ name, className }) => {
  const { errors, touched } = useFormContext();
  const error = touched[name] ? errors[name] || '' : '';

  if (!error) return null;

  return <p className={cn('text-sm text-red-600', className)}>{error}</p>;
};

// FormLabel Component
export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required,
  className,
  ...props
}) => {
  return (
    <label
      className={cn('block text-sm font-medium text-neutral-700', className)}
      {...props}
    >
      {children}
      {required && <span className='text-red-500 ml-1'>*</span>}
    </label>
  );
};

FormLabel.displayName = 'FormLabel';
