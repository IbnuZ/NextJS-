"use client";

import RectangleQuiz from "@/app/components/rectangle/rectangleQuiz";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import swal from 'sweetalert';
import Link from "next/link";



async function getQuestion(id: string) {
  const response = await fetch(`http://localhost:8081/api/quizs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default function SoalQuiz({ params }: { params: { id: string } }) {
  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSwal, setShowSwal] = useState(false);
  const [currentPage, setCurrentPage] = useState<'quiz' | 'name'>('quiz'); // Deklarasikan currentPage



  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8081/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: null,
        quiz_id: params.id,
        score: score,
        name: name,
      }),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      console.error("Gagal mengirim data score:", response.statusText);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getQuestion(params.id);
        setQuizData(data);
      } catch (error) {
        console.error("Gagal mengambil data kuis:", error);
      }
    }

    fetchData();
  }, [params.id]);

  const checkAnswer = (selectedOptionIndex: number) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const correctAnswerLetter = currentQuestion.answer.toLowerCase();
    const userSelectedLetter = ["a", "b", "c"][selectedOptionIndex];

    if (userSelectedLetter === correctAnswerLetter) {
      console.log(quizData)
      setScore(score + 10);
    }

    const audio = new Audio("/audio/quiz.mp3");
    audio.play();

    if (currentQuestionIndex === quizData.length -1 ) {
      swal({
        title: "Quiz selesai!",
        text: `Skore Kamu: ${score}`,
        icon: "success",
        timer: 2000,
        buttons: {
          confirm: false,
        },
      }).then(() => {
        setSubmitted(true);
        setShowSwal(true);
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }


  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div style={{ backgroundColor: "#096a88", minHeight: "100vh" }}>
      <div
        className="py-20 bg-cover bg-center h-screen overflow-hidden"
        style={{ backgroundImage: "url(/img/background.png)" }}
      >
        {!showSwal ? (
          <div className="relative flex justify-center mt-11">
            <RectangleQuiz />
            <div className="absolute">
              <div>
                <p
                  className="font-semibold mt-5 flex justify-center text-[#096a88]"
                  style={{ fontSize: "20px" }}
                >
                  {`Soal.${currentQuestionIndex + 1}/${quizData.length}`}
                </p>
                <p
                  className="font-semibold mt-9 flex justify-center text-[#096a88]"
                  style={{ fontSize: "20px" }}
                >
                  {currentQuestion.question_text}
                </p>
                <div>
                  {currentQuestion.options.map(
                    (option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          checkAnswer(index);
                        }}
                        className="font-bold mt-10 rounded-xl min-w-full h-9 bg-[#FF9C41] hover:bg-slate-300 text-white"
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center">
              <RectangleQuiz />
              <div className="absolute flex justify-center my-14">
                <div className="bg-[#D2EBF4] rounded-lg p-28 shadow-xl w-96">
                  <h2 className="mb-6 mt-2 font-bold flex justify-center text-[#096A88] text-xl">
                    Input Nama Anda
                  </h2>
                  <div className="mb-4 flex justify-center">
                    <Image
                      className="absolute"
                      src="/img/icon/pensil.png"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex justify-center items-center w-96 h-7 p-2 mt-2 border border-[#096A88] rounded-md"
                    />
                    <div className="flex justify-center">
                      <Link href={'/homepage'}>
                      <button
                        onClick={handleSubmit}
                        className="w-52 h-11 mt-5 bg-[#FF9C41] hover:bg-orange-400 text-white font-bold rounded-md"
                      >
                        Submit
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




