"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function MyComponent() {
  const [pacarsaya, setPacarsaya] = useState(0);

  const tambahPacar = () => {
    setPacarsaya(pacarsaya + 1);
  };

  useEffect (() => {
    alert ("ibnu ganteng")
  }) 

  return (
    <div>
      <p>Jumlah pacar: {pacarsaya}</p>
      <button onClick={tambahPacar}>Tambah pacar</button>
    </div>
  );
}




// tampilkanlah angka dari 1-50 dan jika angka tersebut kelipatan 3 maka tampilkan aku sayang donat

// tmapikan lah angka 1-20 jika kelipatan nilai + 7

// tmapikan lah angka dari 50 sampai - 50 dan jika angka bernilai 50 tampilkan awal,jika angka berilai 0 tampilkan tengah ,jika angka bernilai -50 tampilkan akhir

 