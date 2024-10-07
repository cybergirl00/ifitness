import * as React from 'react';


interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message
}) => (
  <div>
  <h1 className="font-bold text-2xl">
    Welcome, <span className="text-primary">{firstName}</span>!
  </h1>
  
  <h3>
    Your message: <span className="text-gray-500 font-extralight">{message}</span>
  </h3>

  <h2>
    We’ve received your message and will get back to you as soon as possible. Thank you for reaching out to us!
  </h2>
</div>
);
