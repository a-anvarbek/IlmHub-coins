import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemAsync, selectRewardItem } from "../../redux/rewardItemSlice";
import { postRedemptionAsync } from "../../redux/redemptionSlice";
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

const ShopTab = ({ user, t }) => {
  const dispatch = useDispatch();
  const rewardItemList = useSelector(selectRewardItem).rewardItemList;

  const [modalItem, setModalItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getItemAsync());
  }, [dispatch]);

  const openModal = (item) => {
    setModalItem(item);
    setQuantity(1);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (modalItem) {
      dispatch(postRedemptionAsync({ data: { rewardItemId: modalItem.id, quantity } }));
      setOpen(false);
      setModalItem(null);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setModalItem(null);
  };

  const canAfford = (item) => user?.coins >= item.cost;

  return (
    <div className="p-4">
      <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded flex items-center space-x-2">
        <Badge type="info" />
        <span>
          {t("Your coin balance")}: <b>{user?.coins ?? 0}</b>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rewardItemList.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description ?? "No description available"}</p>
              <p className="mt-2 text-sm text-gray-500">Stock: {item.stock}</p>
            </CardContent>
            <div className="p-4 pt-0">
              <Button
                disabled={!canAfford(item)}
                onClick={() => openModal(item)}
                className={`w-full ${!canAfford(item) ? "bg-gray-400 cursor-not-allowed" : ""}`}
              >
                {canAfford(item) ? `${t("Buy for")} ${item.cost} ${t("coins")}` : t("Insufficient Coins")}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          onClick={handleCancel}
        >
          <div
            className="bg-white rounded p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-lg z-10"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xl font-bold">{modalItem?.title}</div>
            <div className="mt-4">
              <label htmlFor="quantity" className="block mb-2 font-medium">
                {t("Enter quantity")}:
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                max={modalItem?.stock || 1}
                value={quantity}
                autoFocus
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 1 && val <= (modalItem?.stock || 1)) {
                    setQuantity(val);
                  } else if (val < 1) {
                    setQuantity(1);
                  } else if (val > (modalItem?.stock || 1)) {
                    setQuantity(modalItem?.stock || 1);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded mb-6 text-lg"
              />
              <div className="flex justify-end space-x-3">
                <Button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
                  {t("Cancel")}
                </Button>
                <Button type="primary" onClick={handleConfirm}>
                  {t("Confirm")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopTab;