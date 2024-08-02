import React from "react";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BannerProps {
  id: number;
  title: string;
  description: string;
  cta: string;
  background: string;
  onEdit: () => void;
}

const BannerImage: React.FC<BannerProps> = ({
  id,
  title,
  description,
  cta,
  background,
  onEdit,
}) => {
  const handleDownload = async () => {
    const element = document.getElementById(`banner-${id}`);
    if (element) {
      // Temporarily hide the edit and download buttons
      const editButton = element.querySelector(".edit-button");
      const downloadButton = element.querySelector(".download-button");
      if (editButton) editButton.classList.add("hidden");
      if (downloadButton) downloadButton.classList.add("hidden");

      try {
        toast.info("Preparing download...");
        // Capture the element
        const canvas = await html2canvas(element, {
          useCORS: true,
          scale: window.devicePixelRatio, // Adjust scale for higher resolution
        });
        const data = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");

        link.href = data;
        link.download = `banner-${id}.jpg`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Download successful!");
      } catch (error) {
        toast.error("Download failed. Please try again.");
      } finally {
        if (editButton) editButton.classList.remove("hidden");
        if (downloadButton) downloadButton.classList.remove("hidden");
      }
    }
  };

  return (
    <div
      id={`banner-${id}`}
      className="relative w-full h-[100px] md:h-[300px] text-white p-6 flex flex-col justify-end bg-cover bg-center rounded-lg overflow-hidden shadow-lg"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
    >
      <div className="relative z-10 bg-gradient-to-t from-black via-transparent to-transparent p-6 rounded-lg">
        <h2 className="text-3xl font-semibold mb-2">{title}</h2>
        <p className="text-lg mb-4">{description}</p>
        <button className="bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
          {cta}
        </button>
      </div>
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          onClick={onEdit}
          className="edit-button bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleDownload}
          className="download-button bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default BannerImage;
