import React from 'react';
import Button, { LoadingButton } from '@atlaskit/button';

interface ButtonInterface {
  appearance: 'primary' | 'subtle' | 'link' | 'subtle-link';
  onClick?: () => void;
  className?: any;
  children: any;
  loading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
}
function ButtonWrapper({
  appearance,
  onClick,
  className,
  children,
  loading,
  type,
  isDisabled,
}: ButtonInterface) {
  return (
    <>
      {loading ? (
        <LoadingButton
          appearance={appearance}
          onClick={onClick}
          className={className}
          isLoading={loading}
        >
          {children}
        </LoadingButton>
      ) : (
        <Button
          type={type}
          appearance={appearance}
          onClick={onClick}
          className={className}
          isDisabled={isDisabled}
        >
          {children}
        </Button>
      )}
    </>
  );
}

export default ButtonWrapper;
