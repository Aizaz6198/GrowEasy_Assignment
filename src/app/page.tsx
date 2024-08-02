"use client";
import { useState, useEffect } from "react";
import BannerImage from "../components/BannerImage";
import EditTemplate from "../components/EditTemplate";
import adBannersData from "../data/adBanners.json";
import Navbar from "@/components/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;

  background: string;
}

export default function Home() {
  const [adBanners, setAdBanners] = useState<Banner[]>([]);
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);

  useEffect(() => {
    setAdBanners(adBannersData);
  }, []);

  const handleEdit = (id: number) => {
    setEditingBannerId(id);
  };

  const handleSave = (updatedBanner: Banner) => {
    setAdBanners((prev) =>
      prev.map((banner) =>
        banner.id === updatedBanner.id ? updatedBanner : banner
      )
    );
    setEditingBannerId(null);
    toast.success("Banner updated successfully!"); // Display success toast
  };

  const handleClose = () => {
    setEditingBannerId(null);
  };

  const editingBanner = adBanners.find(
    (banner) => banner.id === editingBannerId
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adBanners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <BannerImage
                {...banner}
                onEdit={() => handleEdit(banner.id)}
              />
            </div>
          ))}
        </div>
        {editingBanner && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <EditTemplate
                banner={editingBanner}
                onSave={handleSave}
                onClose={handleClose}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
