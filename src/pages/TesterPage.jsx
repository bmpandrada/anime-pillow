import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const routesToTest = [
  "/",
  "/anime",
  "/movies",
  "/movies/1",
  "/anime/1",
  "/about",
];

const AutoTesterPage = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const testRoutes = async () => {
      for (const route of routesToTest) {
        try {
          setLogs((prev) => [...prev, `➡ Navigating to ${route}`]);
          navigate(route);

          // Wait a bit to let the page render
          await new Promise((r) => setTimeout(r, 500));

          // Query all images on the page
          const images = Array.from(document.querySelectorAll("img"));
          const altTexts = images.map((img) => img.alt || "no alt").join(", ");

          setLogs((prev) => [
            ...prev,
            `✅ ${route} rendered successfully`,
            altTexts ? `🖼 Images alt: ${altTexts}` : "🖼 No images found",
          ]);
        } catch (err) {
          console.error(`❌ Error at ${route}:`, err);
          setLogs((prev) => [...prev, `❌ Error at ${route}: ${err.message}`]);
        }
      }
    };

    testRoutes();
  }, [navigate]);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Automatic App Tester</h1>
      <div className='bg-base-200 p-4 rounded shadow max-h-80 overflow-auto'>
        <h2 className='font-bold mb-2'>Logs:</h2>
        <ul className='text-sm font-mono'>
          {logs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
      </div>
      <p className='mt-2 text-gray-500'>
        Check the logs above for alt attributes.
      </p>
    </div>
  );
};

export default AutoTesterPage;
