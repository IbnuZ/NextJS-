"use client"

import RectangleScore from "@/app/components/rectangle/rectangleScore";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  return (
    <>
      <div>
        <div style={{ backgroundColor: "#096a88", minHeight: "100vh" }}>
          <div
            className="py-20 bg-cover bg-center h-screen overflow-hidden"
            style={{ backgroundImage: "url(/img/background.png)" }}
          >
            <div className="relative mb-16 flex justify-center items-center h-screen">
              <RectangleScore />
           
              <div className="absolute top-40">
  <table className="w-[600px] bg-[#D2EBF4] rounded-lg shadow-lg">
    <thead>
      <tr className="bg-[#096A88] text-white">
        <th className="p-2">Nama</th>
        <th className="p-2">Nama Quiz</th>
        <th className="p-2">Skor</th>
      </tr>
    </thead>
    <tbody>
      {leaderboardData?.map((data, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#D2EBF4]'}>
          <td className="p-2">{data.name}</td>
          <td className="p-2">{data.quiz_name}</td>
          <td className="p-2">{data.score}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <Link href="/homepage" className="block mt-4 text-[#096A88] hover:text-[#FF9C41] font-bold">
          Lanjut ke quiz
        </Link>

</div>
            </div>
              </div>
              </div>

           

          </div>
    </>
  );
}
