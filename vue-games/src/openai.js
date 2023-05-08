// import axios from 'axios';
// const API_ENDPOINT = 'openai-key/';

// async function getOpenAIKey() {
//   const response = await axios.get(API_ENDPOINT);
//   console.log(response.data.openai_key);
//   return response.data.openai_key;
// }

// const API_KEY = getOpenAIKey();

// const getMessage = async () => {
//   console.log('getMessage call success')
//   const options = {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${API_KEY}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: "What are you?" }],
//       max_tokens: 50
//     }),

//   }
//   try {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', options);
//     const { choices } = await response.json();
//     const content = choices[0].message.content;
//     console.log(content);
//     return content;
//   } catch (error) {
//     console.error(error);
//   }
// };

// getMessage()