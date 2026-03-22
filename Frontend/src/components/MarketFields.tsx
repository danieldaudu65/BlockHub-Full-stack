import React, { useState, useEffect } from "react";
import { jobKitItems } from "../data/jobKit";
import MarketForm from "./Market_Form";
import ModalWrapper from "./modalParent";
import Countdown from "./Countdown";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

interface JobKitItem {
  id: string;
  category: string;
  title: string;
  description: string[];
  fileType: string;
  isCall?: boolean;
  originalPrice?: string;
  price: string;
  image?: string;
  expiresAt?: string;
}

const MarketFields: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [selectedItem, setSelectedItem] = useState<JobKitItem | null>(null);
  const [modal, setModal] = useState(false);

  // ✅ grab id from query string
  const id = searchParams.get("id");

  // ✅ open modal if id exists in URL
  useEffect(() => {
    if (id) {
      const found = jobKitItems.find((i) => i.id === id); // <-- fixed (no parseInt)
      if (found) {
        setSelectedItem(found);
        setModal(true);
      }
    }
  }, [id]);

  const openModal = (item: JobKitItem) => {
    setSelectedItem(item);
    setModal(true);
    // ✅ append ?id=xx to current URL without reloading
    navigate(`${location.pathname}?id=${item.id}`, { replace: false });
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModal(false);
    // ✅ remove query param when closing
    navigate(location.pathname, { replace: false });
  };

  return (
    <div>
      <div className="flex shadow-xl border-t border-gray-800 bg-[linear-gradient(180deg,_#181819_0,_#181819_100%)] z-20 -mt-14 rounded-t-[60px] flex-col items-center p-6 py-8 text-white">
        <h3 className="text-2xl font-semibold mb-6 heading-color">Market Place</h3>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {jobKitItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 bg-[#232323] relative rounded-2xl p-2 shadow-md cursor-pointer"
              onClick={() => openModal(item)}
            >
              <img src={item.image} className="w-full rounded" alt={item.title} />
              <div className="p-3">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-md font-semibold text-gray-300">{item.title}</h3>
                  <button className="bg-blue-main px-6 py-2 rounded-lg text-xs">Buy</button>
                </div>
                <ul className="my-4 text-sm list-disc list-inside text-gray-500">
                  {item.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="mt-2 text-gray-300 text-sm">
                  <span className="font-medium">File Type:</span> {item.fileType}
                </div>
                <div className="text-sm text-gray-300">
                  <span className="font-medium">Price:</span>
                  <b> {item.price}</b>
                  {item.originalPrice && (
                    <b className="line-through text-red-400 text-xs ml-2">{item.originalPrice}</b>
                  )}
                </div>
              </div>
              {item.expiresAt && <Countdown expiresAt={item.expiresAt} />}
            </div>
          ))}

          {modal && selectedItem && (
            <ModalWrapper isOpen onClose={closeModal}>
              <MarketForm selectedItem={selectedItem} onClose={closeModal} />
            </ModalWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketFields;
