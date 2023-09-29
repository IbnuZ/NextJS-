"use client"

import React, { useEffect, useState } from "react";
import RectangleScore from "@/app/components/rectangle/rectangleScore";
import Link from "next/link";

interface Score {
  quiz_name: string;
  score: number;
  name: string;
}

async function getLeaderboard(id: string) {
  const res = await fetch(`http://localhost:8081/api/leaderboard/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Leaderboard({
  params,
}: {
  params: { id: string };
}) {
  const [leaderboardData, setLeaderboardData] = useState<Score[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLeaderboard(params.id);
        setLeaderboardData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [params.id]);

  const totalTables = Math.ceil(leaderboardData.length / pageSize);

  const getDataForPage = (page: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return leaderboardData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const generateTable = (start: number, end: number) => {
    return (
      <table className="w-[600px] max-w-screen-xl bg-[#D2EBF4] rounded-lg shadow-lg mt-3">
        <thead>
          <tr className="bg-[#096A88] text-white">
            <th className="p-2">Nama</th>
            <th className="p-2">Nama Quiz</th>
            <th className="p-2">Skor</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.slice(start, end).map((data, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-[#D2EBF4]"}
            >
              <td className="p-2">{data.name}</td>
              <td className="p-2">{data.quiz_name}</td>
              <td className="p-2">{data.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ backgroundColor: "#096a88", minHeight: "100vh" }}>
      <div className="py-20 bg-cover bg-center h-screen overflow-hidden">
        <div className="relative mb-16 flex justify-center items-center h-screen">
          <RectangleScore />

          <div className="absolute top-32" style={{ overflowX: "auto" }}>
            <table className="w-[600px] max-w-screen-xl bg-[#D2EBF4] rounded-lg shadow-lg mt-3">
              <thead>
                <tr className="bg-[#096A88] text-white">
                  <th className="p-2">Nama</th>
                  <th className="p-2">Nama Quiz</th>
                  <th className="p-2">Skor</th>
                </tr>
              </thead>
              <tbody>
                {getDataForPage(currentPage).map((data, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#D2EBF4]"}
                  >
                    <td className="p-2">{data.name}</td>
                    <td className="p-2">{data.quiz_name}</td>
                    <td className="p-2">{data.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
          href="/homepage"
          className="block mt-10 text-[#096A88] hover:text-[#FF9C41] font-bold"
        >
          Lanjut Ke Quiz
        </Link>
        <div className="flex justify-center mt-20 space-x-2">
          {Array.from({ length: totalTables }, (_, index) => (
            <div
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`cursor-pointer rounded-full w-6 h-6 ${
                index + 1 === currentPage ? "bg-[#FF9C41]" : "bg-gray-400"
              }`}
            ></div>
          ))}
          </div>
        </div>
      
        </div>
      </div>
    </div>
  );
}
