import React, { useState } from 'react';

function App() {
  // State to store answers for each question
  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
  });
  // State to store the recommendation text
  const [recommendation, setRecommendation] = useState('');
  // State to control visibility of the results section
  const [showResults, setShowResults] = useState(false);

  // Array of quiz questions for easier rendering
  const questionsData = [
    { id: 'q1', text: 'Do you have difficulty with portion control?' },
    { id: 'q2', text: 'Have you engaged in binge eating?' },
    { id: 'q3', text: 'Have your binge eating episodes lasted longer than an hour, or even a whole day or more?' },
    { id: 'q4', text: 'Do you find it hard to say no to food, even when you\'re not hungry?' },
    { id: 'q5', text: 'Are there times when you\'ve found it extremely difficult to stop eating once you\'ve started?' },
    { id: 'q6', text: 'Have you continued eating even when you were full, or even when your stomach hurt from being full?' },
    { id: 'q7', text: 'Have you felt ashamed of your eating habits or done something eating-related that caused you shame (e.g., eating from the trash)?' },
    { id: 'q8', text: 'Have you canceled work or social plans to engage in an eating activity alone?' },
  ];

  // Handle change for radio buttons
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let yesCount = 0;
    // Iterate through answers to count 'yes'
    for (const key in answers) {
      if (answers[key] === 'yes') {
        yesCount++;
      }
    }

    let currentRecommendation = '';
    if (yesCount >= 7) { // 7 or 8 'Yes' answers
      currentRecommendation = `
        <p class="font-semibold text-red-600 mb-2">High Risk:</p>
        <p>Stick to a regular OMAD meal. This meal should be something you genuinely look forward to, making it feel more special than your usual daily meals.</p>
      `;
    } else if (yesCount >= 5) { // 5 to 6 'Yes' answers
      currentRecommendation = `
        <p class="font-semibold text-yellow-600 mb-2">Medium Risk:</p>
        <p>Your OMAD meal can be more flexible than a regular OMAD day. You don't need to worry about it being a perfectly balanced healthy meal, but it should still be planned in advance. You don't have to strictly adhere to a "one-plate" rule, but you should aim to finish eating within an hour.</p>
      `;
    } else { // 4 or fewer 'Yes' answers
      currentRecommendation = `
        <p class="font-semibold text-green-600 mb-2">Low Risk - Replenish Day:</p>
        <p>You can enjoy a full day of eating. The key is to plan your meals and stick to them.</p>
      `;
    }

    setRecommendation(currentRecommendation);
    setShowResults(true);
    // Scroll to results section (optional, but good for UX)
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle quiz reset
  const handleReset = () => {
    setAnswers({
      q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
    });
    setRecommendation('');
    setShowResults(false);
    // Scroll back to introduction
    setTimeout(() => {
      document.getElementById('introduction')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg py-4 px-6 md:px-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-3xl font-bold rounded-md px-3 py-1 bg-blue-800">Replenish</h1>
            <span className="ml-3 text-xl font-semibold">Day Risk Assessment</span>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 text-lg">
            <a href="#" className="hover:text-blue-200 transition duration-300 rounded-md px-3 py-1">Home</a>
            <a href="#" className="hover:text-blue-200 transition duration-300 rounded-md px-3 py-1">About OMAD</a>
            <a href="#" className="hover:text-blue-200 transition duration-300 rounded-md px-3 py-1">Contact</a>
            <a href="#" className="hover:text-blue-200 transition duration-300 rounded-md px-3 py-1">Sign In</a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-3xl">
          {/* Introduction Section */}
          <section id="introduction" className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Replenish Day Risk Assessment!</h2>
            <p className="text-gray-600 leading-relaxed">
              This quiz is designed to help you evaluate your eating habits and determine the most suitable approach for your OMAD (One Meal A Day) journey. Please answer each question honestly by selecting "Yes" or "No."
            </p>
          </section>

          {/* Quiz Section */}
          <section id="quiz-section" className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Eating Habits Assessment</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {questionsData.map((question, index) => (
                <div key={question.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-gray-800 mb-3">{index + 1}. {question.text}</p>
                  <div className="flex items-center space-x-6">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value="yes"
                        checked={answers[question.id] === 'yes'}
                        onChange={handleChange}
                        className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 rounded-full"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value="no"
                        checked={answers[question.id] === 'no'}
                        onChange={handleChange}
                        className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 rounded-full"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              ))}

              <div className="flex justify-center space-x-4 mt-8">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Get My Recommendation
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Reset Quiz
                </button>
              </div>
            </form>
          </section>

          {/* Results Section */}
          <section
            id="results-section"
            className={`mt-10 p-6 bg-blue-50 rounded-xl shadow-inner ${showResults ? '' : 'hidden'}`}
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">Your Recommendation:</h3>
            <div
              id="recommendation-text"
              className="text-lg text-gray-700 leading-relaxed text-center"
              dangerouslySetInnerHTML={{ __html: recommendation }}
            >
              {/* Recommendation will be displayed here */}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

