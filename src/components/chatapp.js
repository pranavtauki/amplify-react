// import { useState, useRef, useEffect } from 'react';
// import { Configuration, OpenAIApi } from 'openai'; // Import OpenAI classes

// import bot from './assets/bot.svg';
// import user from './assets/user.svg';
// import send from './assets/send.svg';
// import './chatapp.css';

// const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// function ChatApp() {
//   const [chatMessages, setChatMessages] = useState([]);
//   const promptInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//   }, [chatMessages]);

//   async function fetchChatCompletion(prompt) {
//     const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
//     const openai = new OpenAIApi(configuration);

//     const completion = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' },
//         { role: 'user', content: prompt },
//       ],
//     });

//   return completion.data.choices[0].message.content;
//   }

//   function loader(elementRef) {
//     const element = elementRef.current;
//     if (!element) return;

//     element.textContent = '';

//     const interval = setInterval(() => {
//       setChatMessages((prevMessages) => {
//         const lastMessage = prevMessages[prevMessages.length - 1];
//         const loadingDots = lastMessage.value + '.';
//         const updatedMessage = { ...lastMessage, value: loadingDots };
//         return [...prevMessages.slice(0, -1), updatedMessage];
//       });
//     }, 300);

//     return () => clearInterval(interval);
//   }

//   function typeText(element, text) {
//     let index = 0;

//     const interval = setInterval(() => {
//       if (index < text.length) {
//         setChatMessages((prevMessages) => {
//           const lastMessage = prevMessages[prevMessages.length - 1];
//           const updatedMessage = { ...lastMessage, value: lastMessage.value + text.charAt(index) };
//           return [...prevMessages.slice(0, -1), updatedMessage];
//         });
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 20);
//   }
// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const prompt = promptInputRef.current.value;
//     promptInputRef.current.value = '';
  
//     const prompt2 = `
//       If they provide code, explain what is wrong with it.  Do not provide new or corrected code,
//       just explain in words what's wrong with the code provided.  Do not solve the problem
//       for the student.
    
//       If they ask a question about Python, go ahead and answer it generally, but do not provide code as part of your answer.
//       code: \`\`\`${prompt}\`\`\`
//     `;
  
//     setChatMessages((prevMessages) => [
//       ...prevMessages,
//       { isAi: false, value: prompt },
//       { isAi: true, value: '...' }, // Add the loading indicator
//     ]);
  
//     const lastMessageIndex = chatMessages.length;
//     const messageDiv = document.getElementById(`message-${lastMessageIndex}`);
//     if (messageDiv) loader(messageDiv);
  
//     try {
//       const completion = await fetchChatCompletion(prompt2);
//       setChatMessages((prevMessages) => [
//         ...prevMessages.slice(0, -1),
//         { isAi: true, value: completion },
//       ]);
//       console.log('Updated chatMessages:', chatMessages);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   return (
//     <div id="app">
//       <div id="chat_container" ref={chatContainerRef}>
//         {chatMessages.map((message, index) => (
//           <div className={`wrapper ${message.isAi? 'ai' : ''}`} key={index}>
//             <div className="chat">
//               <div className="profile">
//                 <img src={message.isAi ? bot : user} alt={message.isAi ? 'bot' : 'user'} />
//               </div>
//               <div className="message" id={`message-${index}`}>
//                 {message.value}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit}>
//         <textarea
//           name="prompt"
//           rows="1"
//           cols="1"
//           placeholder="Ask Virtual TA..."
//           ref={promptInputRef}
//         ></textarea>
//         <button type="submit">
//           <img src={send} alt="send" />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ChatApp;



//Working with storing last message 
import { useState, useRef, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai'; // Import OpenAI classes

import bot from './assets/bot.svg';
import user from './assets/user.svg';
import send from './assets/send.svg';
import './chatapp.css';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

function ChatApp({ userProfile }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [userPrompts, setUserPrompts] = useState([]);
  const promptInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [typingText, setTypingText] = useState('');
  const typingTextRef = useRef('');

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatMessages]);

  async function fetchChatCompletion(message, context) {
    const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    console.log(context);
  
    const messages = [
      { role: 'system', content: context },
      { role: 'user', content: message },
    ];
  
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });
  
    return completion.data.choices[0].message.content;
  }
  
  function loader(elementRef) {
    const element = elementRef.current;
    if (!element) return;

    element.textContent = '';

    const interval = setInterval(() => {
      setChatMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const loadingDots = lastMessage.value + '.';
        const updatedMessage = { ...lastMessage, value: loadingDots };
        return [...prevMessages.slice(0, -1), updatedMessage];
      });
    }, 300);

    return () => clearInterval(interval);
  }

  // function typeText(text) {
  //   let index = 0;

  //   const interval = setInterval(() => {
  //     if (index < text.length) {
  //       setTypingText((prevTypingText) => prevTypingText + text.charAt(index));
  //       index++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 30);
  // } 

  function typeText(text) {
    typingTextRef.current = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        typingTextRef.current += text.charAt(index);
        setTypingText(typingTextRef.current);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }


  const userProfileOptions = {
  1: process.env.REACT_APP_USER_PROFILE_1,
  2: process.env.REACT_APP_USER_PROFILE_2,
  3: process.env.REACT_APP_USER_PROFILE_3,
    // Add more profiles and their corresponding prompt2 options if needed
  };
  useEffect(() => {
    if (typingText !== '') {
      setChatMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { isAi: true, value: typingText },
      ]);
    }
  }, [typingText]);
const handleSubmit = async (e) => {
    e.preventDefault();
  
    const prompt = promptInputRef.current.value;
    promptInputRef.current.value = '';

    //const promptTest = userProfileOptions[userProfile];
    // const promptTest = `
    // ${userProfileOptions[userProfile]}
    //  \`\`\`${prompt}\`\`\``;
    const promptTest = `
    ${userProfileOptions[userProfile]}
    ${prompt}`;
    console.log(promptTest);
    
    
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { isAi: false, value: prompt },
      { isAi: true, value: '...' }, // Add the loading indicator
    ]);
  
    const lastMessageIndex = chatMessages.length;
    const messageDiv = document.getElementById(`message-${lastMessageIndex}`);
    if (messageDiv) loader(messageDiv);

    // setUserPrompts((prevUserPrompts) => [...prevUserPrompts, prompt]);
    // const context = userPrompts.join('\n');
    // const context = chatMessages
    //   .map((message) => (message.isAi ? `AI: ${message.value}` : `User: ${message.value}`))
    //   .join('\n');
    
    //console.log(context);

  
    try {
      const lastAiResponse = chatMessages
      .slice()
      .reverse()
      .find((message) => message.isAi);
    
      const context = lastAiResponse ? `AI: ${lastAiResponse.value}` : '';
      const completion = await fetchChatCompletion(promptTest,context); // Pass the entire chatMessages array
      // setChatMessages((prevMessages) => [
      //   ...prevMessages.slice(0, -1),
      //   { isAi: true, value: completion },
      // ]);
      setTypingText(''); // Clear the typingText state

      // Call typeText to trigger the typing effect
      typeText(completion);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div id="app">
      <div id="chat_container" ref={chatContainerRef}>
        {chatMessages.map((message, index) => (
          <div className={`wrapper ${message.isAi? 'ai' : ''}`} key={index}>
            <div className="chat">
              <div className="profile">
                <img src={message.isAi ? bot : user} alt={message.isAi ? 'bot' : 'user'} />
              </div>
              <div className="message" id={`message-${index}`}>
                {message.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form class="custom-form" onSubmit={handleSubmit}>
        <textarea
          name="prompt"
          rows="1"
          cols="1"
          placeholder="Ask Virtual TA..."
          ref={promptInputRef}
        ></textarea>
        <button type="submit">
          <img src={send} alt="send" />
        </button>
      </form>
    </div>
  );
}

export default ChatApp;

// ----------------------------------------------------------------------------------------Experimenting with UI ---------------------------------------------------------------------------------------------------------------------------------------------------
// import { useState, useRef, useEffect } from 'react';
// import { Configuration, OpenAIApi } from 'openai'; // Import OpenAI classes

// import bot from './assets/bot.svg';
// import user from './assets/user.svg';
// import send from './assets/send.svg';
// import './chatapp.css';

// const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// function ChatApp({ userProfile }) {
//   const [chatMessages, setChatMessages] = useState([]);
//   const [userPrompts, setUserPrompts] = useState([]);
//   const promptInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//   }, [chatMessages]);

//   async function fetchChatCompletion(message, context) {
//     const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
//     const openai = new OpenAIApi(configuration);
//     //console.log(context);
  
//     const messages = [
//       { role: 'system', content: context },
//       { role: 'user', content: message },
//     ];
  
//     const completion = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: messages,
//     });

//   //   let aiResponse = completion.data.choices[0].message.content;

//   // // Check if the AI response contains code and wrap it in a Markdown code block
//   // if (aiResponse.includes('code:')) {
//   //   const codeStartIndex = aiResponse.indexOf('code:') + 'code:'.length;
//   //   const codeContent = aiResponse.substring(codeStartIndex).trim();
//   //   aiResponse = aiResponse.substring(0, codeStartIndex) + `\n\`\`\`python\n${codeContent}\n\`\`\``;
//   // }

//   // return aiResponse;
//   return completion.data.choices[0].message.content;
    
//   }
  
//   function loader(elementRef) {
//     const element = elementRef.current;
//     if (!element) return;

//     element.textContent = '';

//     const interval = setInterval(() => {
//       setChatMessages((prevMessages) => {
//         const lastMessage = prevMessages[prevMessages.length - 1];
//         const loadingDots = lastMessage.value + '.';
//         const updatedMessage = { ...lastMessage, value: loadingDots };
//         return [...prevMessages.slice(0, -1), updatedMessage];
//       });
//     }, 300);

//     return () => clearInterval(interval);
//   }

//   function typeText(element, text) {
//     let index = 0;

//     const interval = setInterval(() => {
//       if (index < text.length) {
//         setChatMessages((prevMessages) => {
//           const lastMessage = prevMessages[prevMessages.length - 1];
//           const updatedMessage = { ...lastMessage, value: lastMessage.value + text.charAt(index) };
//           return [...prevMessages.slice(0, -1), updatedMessage];
//         });
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 20);
//   }
//   const userProfileOptions = {
//     1: `
//     If they provide code, explain what is wrong with it.  Do not provide new or corrected code,
//     just explain in words what's wrong with the code provided.  Do not solve the problem
//     for the student.
  
//     If they ask a question about Python, go ahead and answer it generally, but do not provide code as part of your answer.
//     code:`,
//     2: 'You are a helpful thermodynamics teacher',
//     3: 'User 3'
//     // Add more profiles and their corresponding prompt2 options if needed
//   };
  
// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const prompt = promptInputRef.current.value;
//     promptInputRef.current.value = '';

//     //const promptTest = userProfileOptions[userProfile];
//     // const promptTest = `
//     // ${userProfileOptions[userProfile]}
//     //  \`\`\`${prompt}\`\`\``;
//     const promptTest = `
//     ${userProfileOptions[userProfile]}
//     ${prompt}`;
//     console.log(promptTest);
    
//     // const prompt2 = `
//     //   If they provide code, explain what is wrong with it.  Do not provide new or corrected code,
//     //   just explain in words what's wrong with the code provided.  Do not solve the problem
//     //   for the student.
    
//     //   If they ask a question about Python, go ahead and answer it generally, but do not provide code as part of your answer.
//     //   code: \`\`\`${prompt}\`\`\`
//     // `;
  
//     setChatMessages((prevMessages) => [
//       ...prevMessages,
//       { isAi: false, value: prompt },
//       { isAi: true, value: '...' }, // Add the loading indicator
//     ]);
  
//     const lastMessageIndex = chatMessages.length;
//     const messageDiv = document.getElementById(`message-${lastMessageIndex}`);
//     if (messageDiv) loader(messageDiv);

//     // setUserPrompts((prevUserPrompts) => [...prevUserPrompts, prompt]);
//     // const context = userPrompts.join('\n');
//     // const context = chatMessages
//     //   .map((message) => (message.isAi ? `AI: ${message.value}` : `User: ${message.value}`))
//     //   .join('\n');
    
//     //console.log(context);

  
//     try {
//       const lastAiResponse = chatMessages
//       .slice()
//       .reverse()
//       .find((message) => message.isAi);
    
//       const context = lastAiResponse ? `AI: ${lastAiResponse.value}` : '';
//       const completion = await fetchChatCompletion(promptTest,context); // Pass the entire chatMessages array
//       setChatMessages((prevMessages) => [
//         ...prevMessages.slice(0, -1),
//         { isAi: true, value: completion },
//       ]);

//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   return (
//     <div id="app">
//       <div id="chat_container" ref={chatContainerRef}>
//         {chatMessages.map((message, index) => (
//           <div className={`wrapper ${message.isAi? 'ai' : ''}`} key={index}>
//             <div className="chat">
//               <div className="profile">
//                 <img src={message.isAi ? bot : user} alt={message.isAi ? 'bot' : 'user'} />
//               </div>
//               <div className="message" id={`message-${index}`}>
//                 {message.value}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit}>
//         <textarea
//           name="prompt"
//           rows="1"
//           cols="1"
//           placeholder="Ask Virtual TA..."
//           ref={promptInputRef}
//         ></textarea>
//         <button type="submit">
//           <img src={send} alt="send" />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ChatApp;
