"use client";

import React, { useState, useEffect, useCallback } from "react";
import RectangleQuiz from "@/app/components/rectangle/rectangleQuiz";
import Loading from "@/app/components/animation/loading";
import { FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon } from "react-share";
import Image from "next/image";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

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
  const [showSwal, setShowSwal] = useState(false);
  const [showSharePage, setShowSharePage] = useState(false);
  const [showNameInputPage, setShowNameInputPage] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();

  function CountdownTimer({ countdown }: { countdown: number }) {
    const updateCountdown = useCallback(async () => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
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
        if (countdown == 0) {
          swal({
            title: "Selamat Skor Tersimpan!",
            text: `Skor Kamu: ${score}`,
            icon: "success",
            buttons: {
              confirm: true,
            },
          }).then(() => {
            setShowSwal(true);
            router.push('/homepage')
          });
        } else {
          console.error("Gagal mengirim data score:", response.statusText);
        }
      
    }, [countdown]);


    useEffect(() => {
      const intervalId = setInterval(updateCountdown, 1000);
      return () => clearInterval(intervalId);
    }, [countdown, updateCountdown]);
    
    
    return (
      <p className="text-[20px] font-extrabold text-[#096A88]">{countdown}</p>
    );
  }

  const handleSubmit = async () => {
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tolong isi nama anda!",
        footer: "Apakah Anda Tidak Punya Nama!",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowNameInputPage(true);
        }
      });
      return;
    }

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
      swal({
        title: "Selamat Skor Tersimpan!",
        text: `Skor Kamu: ${score}`,
        icon: "success",
        buttons: {
          confirm: true,
        },
      }).then(() => {
        setShowSwal(true);
        router.push("/homepage");
      });
    } else {
      console.error("Gagal mengirim data score:", response.statusText);
    }
  };

  const handleSharePageContinue = () => {
    setShowSharePage(false);
    setShowNameInputPage(true);
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
      setScore(score + 10);
    }

    const audio = new Audio("/audio/quiz.mp3");
    audio.play();

    if (currentQuestionIndex === quizData.length - 1) {
      console.log(score);

      Swal.fire({
        title: "Quiz Selesai!",
        text: `Skor Kamu: ${score}`,
        icon: "success",
        showCancelButton: false,
      }).then(() => {
        setShowSwal(true);
        setShowSharePage(true);
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (quizData.length === 0) {
    return <Loading />;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div style={{ backgroundColor: "#096a88", minHeight: "100vh" }}>
      <div
        className="py-20 bg-cover bg-center h-screen overflow-hidden"
        style={{ backgroundImage: "url(/img/background.png)" }}
      >
        {!showSwal ? (
          <div className="relative flex justify-center my-10 mx-10">
            <div className="relative bg-white w-[950px] h-[600px] rounded-xl ">
              <div className="absolute right-28 top-16">
                <div className="absolute -top-8 ">
                  <div className="w-14 h-14 relative rounded-full border-4 border-[rgb(255,126,6)] border-solid">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center absolute top-4 right-4">
                        <CountdownTimer countdown={countdown} />

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute">
              <p
                className="font-bold mt-14 flex justify-center text-[#096a88]"
                style={{ fontSize: "20px" }}
              >
                {`Soal ${currentQuestionIndex + 1}/${quizData.length}`}
              </p>

              <p
                className="font-extrabold max-w-xl text-center mt-auto mb-auto text-[#096a88]"
                style={{ fontSize: "20px" }}
              >
                {quizData[currentQuestionIndex] && quizData[currentQuestionIndex].question_text}
              </p>

              <div>
                {quizData[currentQuestionIndex] && quizData[currentQuestionIndex].options.map(
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
        ) : showSharePage ? (
              <div className="flex justify-center">
                <div className="relative bg-white w-[600px] h-[400px] rounded-xl flex justify-center">
                  <div className="absolute  ">
                    <Image src="/img/logo2.png" alt="" width={250} height={150} />
                  </div>
                  <div className="flex flex-col items-center mt-48 space-y-4">
                    <div className="flex justify-around items-center space-x-4">
                      <FacebookShareButton
                        url="https://barny-fun.vercel.app/homepage"
                        title="Ayo Bermain Di BarnyFun!"
                      >
                        <div className="flex items-center space-x-2">
                          <FacebookIcon size={62} round />
                          <span className="font-semibold">Bagikan ke Facebook</span>
                        </div>
                      </FacebookShareButton>

                      <WhatsappShareButton
                        url="https://barny-fun.vercel.app/homepage"
                        title="Ayo Bermain Di Barnyfun!"
                      >
                        <div className="flex items-center space-x-2">
                          <WhatsappIcon size={62} round />
                          <span className="font-semibold">Bagikan ke Whatsapp</span>
                        </div>
                      </WhatsappShareButton>
                    </div>
                    <button
                      className="w-48 h-9 bg-[#FF9C41] hover:bg-orange-400 text-white font-bold rounded-lg"
                      onClick={handleSharePageContinue}
                    >
                      Lanjut
                    </button>
                  </div>
                </div>
              </div>
        ) : showNameInputPage ? (
          <div>
            <div className="flex justify-center ">
              <RectangleQuiz />
              <div className="absolute flex flex-col items-center my-16 ">
                <div className="relative bg-[#D2EBF4] rounded-lg p-28 shadow-xl w-96">
                  <div className="absolute top-7 items-center ">
                    <h1 className="mt-4 font-bold text-[#096A88] ">Masukan Nama Anda</h1>
                  </div>
                  <div className=" flex justify-center">
                    <Image className="absolute mt- " src="/img/icon/pensil.png" alt="" width={100} height={100} />
                  </div>
                  <div className="mt-36">
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex justify-center items-center w-96 h-7 p-2 mt-2 border border-[#096A88] rounded-md"
                    />
                    <div className="flex justify-center">
                      <button
                        onClick={handleSubmit}
                        className="w-52 h-11 mt-5 bg-[#FF9C41] hover-bg-orange-400 text-white font-bold rounded-md"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
