import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import ChatApp from './components/chatapp';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const App = () => {
  return (
    <>
    <div>
      <h1>Welcome to the Chat App</h1>
      < ChatApp />
    </div>
    </>
  );
};

export default withAuthenticator(App, { hideSignUp: true });
