import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AsideFigure from "../components/AsideFigure";

export default function Character() {
  const { id } = useParams();
  const [char, setChar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/characters/${id}`);
        if (!res.ok) throw new Error("Data fetch failed");
        const data = await res.json();
        setChar(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className='max-w-7xl mx-auto rounded-2xl sm:shadow p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
      <div className='grid sm:grid-cols-4'>
        <div className='col-span-1'>
          <AsideFigure anime={char} />
        </div>
        <div className='rounded px-5 sm:col-span-3'>
          {char?.about?.length === 0 ? (
            <h1 className='text-2xl font-semibold flex justify-center items-center bg-black'>
              {" "}
              Unknown
            </h1>
          ) : (
            <h1>{char?.about}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
