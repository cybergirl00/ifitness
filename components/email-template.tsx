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
    Welcome, <span className="text-primary">New message:</span>!
  </h1>
  
  <h3>
    Your message: <span className="text-gray-500 font-extralight">{firstName}  said:  {message}</span>
  </h3>

  <h2>
   You've recieved a message from your contact form view in the dashboard for more!
  </h2>
</div>
);
