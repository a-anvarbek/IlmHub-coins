import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemAsync, selectRewardItem } from "../../redux/rewardItemSlice";
import { postRedemptionAsync } from "../../redux/redemptionSlice";
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { CheckCircle2 } from "lucide-react";

const ShopTab = ({ user, t }) => {
  const dispatch = useDispatch();
  const rewardItemList = useSelector(selectRewardItem).rewardItemList;

  const [modalItem, setModalItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // success popap

  useEffect(() => {
    dispatch(getItemAsync());
  }, [dispatch]);

  const openModal = (item) => {
    setModalItem(item);
    setQuantity(1);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (modalItem) {
      // Redemption API chaqirish
      await dispatch(
        postRedemptionAsync({ data: { rewardItemId: modalItem.id, quantity } })
      );

      setOpen(false);
      setModalItem(null);

      // Success popap
      setSuccessMessage(
        "Siz ushbu mahsulotni sotib oldingiz va admin ushbu so‘rovni ko‘rib chiqqandan so‘ng habar beradi!"
      );
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setModalItem(null);
  };

  const handleCloseSuccess = () => {
    setSuccessMessage("");
  };

  const canAfford = (item) => user?.coins >= item.cost;

  return (
    <div className="p-4">
      {/* Coin Balance */}
      <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded flex items-center space-x-2">
        <Badge type="info" />
        <span>
          {"Sizning tanga miqdoringiz"}: <b>{user?.coins ?? 0}</b>
        </span>
      </div>

      {/* Reward Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rewardItemList.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">
                {item.description ?? "Tavsif mavjud emas"}
              </p>
              <p className="mt-2 text-sm text-gray-500">Stock: {item.stock}</p>
            </CardContent>
            <div className="p-4 pt-0">
              <Button
                disabled={!canAfford(item)}
                onClick={() => openModal(item)}
                className={`w-full ${
                  !canAfford(item) ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
              >
                {canAfford(item)
                  ? `Sotib olish narxi ${item.cost} tanga`
                  : "Tangalar yetarli emas"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Purchase Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle>Xaridni tasdiqlang</DialogTitle>
            <DialogDescription>
              Mahsulotni sotib olishdan oldin miqdorni kiriting.
            </DialogDescription>
          </DialogHeader>
          {modalItem && (
            <div className="mt-4 space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold">{modalItem.title}</h3>
                <p className="text-gray-600">{modalItem.description ?? "Tavsif mavjud emas"}</p>
                <p className="mt-2 text-sm text-gray-500">Omborda mavjud: {modalItem.stock}</p>
              </div>
              <div className="flex flex-col items-center">
                <label htmlFor="quantity" className="mb-2 font-medium">
                  Miqdor kiriting:
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  max={modalItem?.stock || 1}
                  value={quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1 && val <= (modalItem?.stock || 1)) setQuantity(val);
                    else if (val < 1) setQuantity(1);
                    else if (val > (modalItem?.stock || 1)) setQuantity(modalItem?.stock || 1);
                  }}
                  className="w-24 text-center"
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-end space-x-2 mt-6">
            <Button onClick={handleCancel} variant="outline">
              Bekor qilish
            </Button>
            <Button onClick={handleConfirm}>Tasdiqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Popap */}
      <Dialog open={!!successMessage} onOpenChange={() => setSuccessMessage("")}>
        <DialogContent className="max-w-sm w-full text-center bg-white/90 backdrop-blur-md rounded-2xl p-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-gray-800 mb-4">{successMessage}</p>
            <Button onClick={handleCloseSuccess} className="bg-green-600 hover:bg-green-700 text-white">
              Yopish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopTab;
