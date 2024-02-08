import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Que1 from "../components/que1";

function QuePage() {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  useEffect(() => {
    fetch("https://vibes-api.onrender.com/isanswers", {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if(data === true) {
        navigate("/home");
      }
    })
  })

  const questionData = [
    {
      number: "01",
      text: "Choose one:",
      options: ["Introvert", "Extrovert"],
    },
    {
      number: "02",
      text: "Choose one",
      options: ["Tea", "Coffee"],
    },
    {
      number: "03",
      text: "Choose one",
      options: ["Mountains", "Beaches"],
    },
    {
      number: "04",
      text: "Choose one",
      options: ["Urban", "Remote area"],
    },
    {
      number: "05",
      text: "More inclined towards",
      options: ["Taking Risks", "Playing it Safe"],
    },
    {
      number: "06",
      text: "While making decisions, It's best to listen to your",
      options: ["Heart", "Brain"],
    },
    {
      number: "07",
      text: "Your favourite Weather",
      options: ["Summer", "Winter", "Autumn", "Spring"],
    },
    {
      number: "08",
      text: "Your career choice after Graduation",
      options: [
        "Higher Education",
        "Government Job",
        "Private Job",
        "Business",
      ],
    },
    {
      number: "09",
      text: "What is the word though which people describe you often?",
      options: ["Smart", "Kind", "Impulsive", "Quite"],
    },
    {
      number: "10",
      text: "Your least favourite Emotion",
      options: ["Guilt", "Anger", "Fear", "Surprise"],
    },
    {
      number: "11",
      text: "What's your go to refreshments in raining",
      options: [
        "Tea and Samosa",
        "Jalebi / Sweet Dish",
        "FilterCoffee",
        "Ice-Cream",
      ],
    },
    {
      number: "12",
      text: "What do you prefer in Entertainment Industry",
      options: ["Hollywood", "Bollywood", "Tollywood", "Anime"],
    },
    {
      number: "13",
      text: "Your favourite Place in College",
      options: ["Library", "Stadium", "Cafeteria", "Hostel"],
    },
    {
      number: "14",
      text: "What do you do when you are free",
      options: [
        "Reading Books",
        "Social Media",
        "Theatre",
        "Movies/Web Series",
      ],
    },
    {
      number: "15",
      text: "Do you believe in giving second chance",
      options: ["Yes", "No"],
    },
  ];

  const saveAnswers = () => {
    fetch("https://vibes-api.onrender.com/answers", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        answers: Object.entries(selectedOptions).map(
          ([questionNumber, selectedOption]) => ({
            questionNumber,
            selectedOption,
          })
        ),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        navigate("/uploadphoto")
      })
      .catch((error) => {
        console.error("Error saving answers:", error);
      });
  };

  const handleNextQuestion = (questionNumber, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionNumber]: selectedOption,
      // selectedOption,
    }));

    // Move to the next question
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  useEffect(() => {
    // Check if all questions have been answered
    if (currentQuestion > questionData.length) {
      // console.log("All questions answered. Selected options:", selectedOptions);
      saveAnswers(); // Trigger saveAnswers when all questions are answered
    }
  }, [currentQuestion, questionData.length, selectedOptions]);

  // Check if there are more questions to display
  if (currentQuestion <= questionData.length) {
    const currentQuestionData = questionData[currentQuestion - 1];

    return (
      <div>
        <Que1
          number={currentQuestionData.number}
          text={currentQuestionData.text}
          options={currentQuestionData.options}
          onNextQuestion={(selectedOption) =>
            handleNextQuestion(currentQuestionData.number, selectedOption)
          }
        />
      </div>
    );
  } else {
    // All questions have been answered, display the selected options
    // navigate("/")
  }
}

export default QuePage;
