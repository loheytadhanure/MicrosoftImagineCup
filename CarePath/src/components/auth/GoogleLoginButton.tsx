import React, { useEffect, useRef } from 'react';
import type { CredentialResponse } from '@react-oauth/google';

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: CredentialResponse) => void;
  onError: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !buttonRef.current) return;

    try {
      window.google.accounts.id.renderButton(
        buttonRef.current,
        {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          width: buttonRef.current.offsetWidth,
          logo_alignment: 'left'
        }
      );

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
        callback: onSuccess,
        error_callback: onError
      });
    } catch (error) {
      console.error('Google button render error:', error);
    }
  }, [onSuccess, onError]);

  return (
    <div>
      {/* Custom styled button */}
      <div ref={buttonRef} className="w-full"></div>
    </div>
  );
};

export default GoogleLoginButton;

// Extend the Window interface to include google
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            error_callback?: () => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: string;
              theme?: string;
              size?: string;
              text?: string;
              width?: number;
              logo_alignment?: string;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}
