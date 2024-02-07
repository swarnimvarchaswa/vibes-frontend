import React from "react";

function NumberPlate() {

  function calculateMatchingPercentage(array1, array2) {
    // Ensure both arrays have the same length
    if (array1.length !== array2.length) {
      throw new Error("Arrays must have the same length");
    }
  
    // Count the number of matching elements
    let matchingCount = 0;
  
    // Iterate through each element and compare
    for (let i = 0; i < array1.length; i++) {
      const answer1 = array1[i];
      const answer2 = array2[i];
  
      // Compare questionNumber and selectedOption
      if (
        answer1.questionNumber === answer2.questionNumber &&
        answer1.selectedOption === answer2.selectedOption
      ) {
        matchingCount++;
      }
    }
  
    // Calculate the percentage of matching elements
    const percentage = (matchingCount / array1.length) * 100;
  
    return percentage;
  }
  
  // Example usage:
  const answers1 = [
    {
      "questionNumber": "10",
      "selectedOption": "Surprise",
      "_id": "65c3960ed77332e97f3efac9"
    },
    {
      "questionNumber": "11",
      "selectedOption": "Ice-Cream",
      "_id": "65c3960ed77332e97f3efaca"
    },
    {
      "questionNumber": "12",
      "selectedOption": "Hollywood",
      "_id": "65c3960ed77332e97f3efacb"
    },
    {
      "questionNumber": "13",
      "selectedOption": "Stadium",
      "_id": "65c3960ed77332e97f3efacc"
    },
    {
      "questionNumber": "14",
      "selectedOption": "Theatre",
      "_id": "65c3960ed77332e97f3efacd"
    },
    {
      "questionNumber": "15",
      "selectedOption": "Yes",
      "_id": "65c3960ed77332e97f3eface"
    },
    {
      "questionNumber": "01",
      "selectedOption": "Extrovert",
      "_id": "65c3960ed77332e97f3efacf"
    },
    {
      "questionNumber": "02",
      "selectedOption": "Coffee",
      "_id": "65c3960ed77332e97f3efad0"
    },
    {
      "questionNumber": "03",
      "selectedOption": "Beaches",
      "_id": "65c3960ed77332e97f3efad1"
    },
    {
      "questionNumber": "04",
      "selectedOption": "Urban",
      "_id": "65c3960ed77332e97f3efad2"
    },
    {
      "questionNumber": "05",
      "selectedOption": "Taking Risks",
      "_id": "65c3960ed77332e97f3efad3"
    },
    {
      "questionNumber": "06",
      "selectedOption": "Brain",
      "_id": "65c3960ed77332e97f3efad4"
    },
    {
      "questionNumber": "07",
      "selectedOption": "Summer",
      "_id": "65c3960ed77332e97f3efad5"
    },
    {
      "questionNumber": "08",
      "selectedOption": "Government Job",
      "_id": "65c3960ed77332e97f3efad6"
    },
    {
      "questionNumber": "09",
      "selectedOption": "Impulsive",
      "_id": "65c3960ed77332e97f3efad7"
    }
  ]
  
  const answers2 = [
    {
      "questionNumber": "10",
      "selectedOption": "Fear",
      "_id": "65c39f2f1b8f54637c5a18fe"
    },
    {
      "questionNumber": "11",
      "selectedOption": "Jalebi / Sweet Dish",
      "_id": "65c39f2f1b8f54637c5a18ff"
    },
    {
      "questionNumber": "12",
      "selectedOption": "Bollywood",
      "_id": "65c39f2f1b8f54637c5a1900"
    },
    {
      "questionNumber": "13",
      "selectedOption": "Cafeteria",
      "_id": "65c39f2f1b8f54637c5a1901"
    },
    {
      "questionNumber": "14",
      "selectedOption": "Theatre",
      "_id": "65c39f2f1b8f54637c5a1902"
    },
    {
      "questionNumber": "15",
      "selectedOption": "No",
      "_id": "65c39f2f1b8f54637c5a1903"
    },
    {
      "questionNumber": "01",
      "selectedOption": "Introvert",
      "_id": "65c39f2f1b8f54637c5a1904"
    },
    {
      "questionNumber": "02",
      "selectedOption": "Tea",
      "_id": "65c39f2f1b8f54637c5a1905"
    },
    {
      "questionNumber": "03",
      "selectedOption": "Beaches",
      "_id": "65c39f2f1b8f54637c5a1906"
    },
    {
      "questionNumber": "04",
      "selectedOption": "Remote area",
      "_id": "65c39f2f1b8f54637c5a1907"
    },
    {
      "questionNumber": "05",
      "selectedOption": "Taking Risks",
      "_id": "65c39f2f1b8f54637c5a1908"
    },
    {
      "questionNumber": "06",
      "selectedOption": "Heart",
      "_id": "65c39f2f1b8f54637c5a1909"
    },
    {
      "questionNumber": "07",
      "selectedOption": "Winter",
      "_id": "65c39f2f1b8f54637c5a190a"
    },
    {
      "questionNumber": "08",
      "selectedOption": "Private Job",
      "_id": "65c39f2f1b8f54637c5a190b"
    },
    {
      "questionNumber": "09",
      "selectedOption": "Impulsive",
      "_id": "65c39f2f1b8f54637c5a190c"
    }
  ]
  
  const matchingPercentage = calculateMatchingPercentage(answers1, answers2);
  console.log(`Matching Percentage: ${matchingPercentage}%`);

  return <h1>heello</h1>;
}

export default NumberPlate;
