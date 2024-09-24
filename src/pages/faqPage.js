import React, { useState } from "react";

function FaqPage() {
    const faqData = [
        { question: 'What is Vibes ?', answer: 'Vibes is an online platform where you can find people with similar interests. it gives you specifications such as chatting and matching people from your campus & you can right and left-swipe people of your choice.' },
        { question: 'How does matching works?', answer: 'An algorithm is used to work based on the answers provided during the sign-in process.' },
        { question: 'Is vibes only for my campus?', answer: 'Yes, you can only find people from your campus.' },
        { question: 'How do i create an account on the dating site?', answer: `The process of creating an account on Vibes involves the following steps.\n
        Step 1: Click on the link to our web app. 

        Step 2: Involves logging in using your Gmail account.

        Step 3:Complete all the questions that are asked after completing the portfolio

        Step 4: Fill in all the information in your profile and upload a square photo that shows your face.
        ` },
        { question: 'Is it safe to use Vibes?', answer: 'We ensure the safety of all your data through the use of robust security measures.' },
        { question: 'What features does the vibes offer for communication with other users?', answer: 'We offer the feature of chatting with people who have accepted your match request.' },
        { question: 'How do i report or block users who behave inappropriately', answer: 'You can simply report the user name and other information to our email vibes.incampus@gmail.com or our Instagram handle- vibes.incampus. Our priority is to resolve the issue as soon as possible.' },
        { question: 'Is my personal information kept private and secure on the site?', answer: 'Yes, We ensure the safety of all your data through the use of robust security measures' },
        { question: 'How can I improve my chances of finding a compatible match on the site?', answer: 'To improve your chances of finding a compatible match, it is important to answer the question honestly and be true to yourself.' },
        { question: 'What steps does the site take to verify', answer: 'For verification of users, we use our Instagram handle vibes.incampus. Where the user will enter their name, course, branch, and other information.' },
        { question: 'Is there a limit to the number of messages i can send or recieve each day', answer:'Sending or receiving messages in a day is unlimited until you match with another user.' }
        // Add more FAQ items as needed
      ];
    
      const [expandedIndex, setExpandedIndex] = useState(null);
    
      const handleToggle = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
      };
    
      return (
        <div className="container w-[90vw] lg:w-full mt-16 mx-[5vw] lg:mx-2">
        <h2 className="text-left font-r text-2xl my-8 tracking-wide text-gray-700 px-4">Frequently Asked Questions</h2>
          {faqData.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => handleToggle(index)}
                className="flex items-center justify-between w-[90vw] p-3 rounded-md cursor-pointer focus:outline-none"
              >
                <div className="font-normal font-r text-lg text-gray-800 text-left">{item.question}</div>
                <span>{expandedIndex === index ? '▼' : '▶'}</span>
              </button>
              <hr />
              {expandedIndex === index && (
                <div className="mt-2 w-full p-6 bg-purple-100 text-gray-600 rounded-md text-justify whitespace-pre-line" 
                // dangerouslySetInnerHTML={{ __html: item.answer }}
                >{item.answer}</div>
              )}
            </div>
          ))}
          <br />
          <br />
          <br />
        </div>
      );
    };

    export default FaqPage;