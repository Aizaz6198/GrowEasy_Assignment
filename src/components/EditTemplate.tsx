import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  background: string;
}

interface EditBannerProps {
  banner: Banner;
  onSave: (updatedBanner: Banner) => void;
  onClose: () => void;
}

const EditTemplate: React.FC<EditBannerProps> = React.memo(({ banner, onSave, onClose }) => {
  const [editedBanner, setEditedBanner] = useState<Banner>(banner);
  const [backgroundType, setBackgroundType] = useState<"url" | "file">("url");

  useEffect(() => {
    setEditedBanner(banner);
  }, [banner]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedBanner((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: "image" | "background") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedBanner((prev) => ({
          ...prev,
          [type]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!editedBanner.title.trim() || !editedBanner.description.trim() || !editedBanner.cta.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    onSave(editedBanner);
    toast.success("Banner updated successfully!");
  }, [editedBanner, onSave]);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-sans">
        <div className="bg-blue-100 p-8 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg transform transition-all sm:max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Edit Banner</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-blue-800"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={editedBanner.title}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-blue-300 rounded-full shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-blue-800"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={editedBanner.description}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-blue-300 rounded-full shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="cta"
                className="block text-sm font-medium text-blue-800"
              >
                CTA
              </label>
              <input
                id="cta"
                type="text"
                name="cta"
                value={editedBanner.cta}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-blue-300 rounded-full shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800">
                Background
              </label>
              <select
                value={backgroundType}
                onChange={(e) =>
                  setBackgroundType(e.target.value as "url" | "file")
                }
                className="mt-2 block w-full p-3 border border-blue-300 rounded-full shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="url">URL</option>
                <option value="file">File</option>
              </select>
              {backgroundType === "url" ? (
                <input
                  type="text"
                  name="background"
                  value={editedBanner.background}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-blue-300 rounded-full shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "background")}
                  className="mt-2 block w-full p-3 border border-blue-300 rounded-full shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 bg-gray-200 text-blue-800 rounded-full hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
});

export default EditTemplate;
