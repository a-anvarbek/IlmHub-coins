// Libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

// Redux
import {
  getRedemptionAsync,
  selectRedemption,
  putRedemptionAsync,
} from "../../utils/redux/redemptionSlice";

export default function RedemptionTab({ t }) {
  const dispatch = useDispatch();
  const { redemptionList = [], status, error } = useSelector(selectRedemption);

  // Modal state
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newStatus, setNewStatus] = useState(0); // 0=Pending, 1=Approved, 2=Delivered, 3=Canceled

  // Fetch redemption data on mount
  useEffect(() => {
    dispatch(getRedemptionAsync());
  }, [dispatch]);

  // Loading/Error states
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const statusOptions = [
    { value: 0, label: "Pending" },
    { value: 1, label: "Approved" },
    { value: 2, label: "Delivered" },
    { value: 3, label: "Canceled" },
  ];

  const statusStringToNumber = {
    Pending: 0,
    Approved: 1,
    Delivered: 2,
    Canceled: 3,
  };

  const statusNumberToString = ["Pending", "Approved", "Delivered", "Canceled"];

  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setNewStatus(statusStringToNumber[entry.status] ?? 0);
  };

  const handleStatusUpdate = () => {
    if (selectedEntry) {
      dispatch(
        putRedemptionAsync({
          redemptionId: selectedEntry.id,
          data: { newStatus: newStatus }, // backend kutadigan format
        })
      );
      setSelectedEntry(null); // close modal
    }
  };

  // Badge ranglari
  const getBadgeColor = (statusNum) => {
    switch (statusNum) {
      case 0:
        return "bg-yellow-400 text-black"; // Pending
      case 1:
        return "bg-green-500 text-white"; // Approved
      case 2:
        return "bg-blue-500 text-white"; // Delivered
      case 3:
        return "bg-red-500 text-white"; // Canceled
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("admin.redemption")}</h2>
      </div>

      {/* Redemption Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Reward Title</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {redemptionList.length > 0 ? (
                redemptionList.map((entry) => {
                  const statusNum = statusStringToNumber[entry.status] ?? 0;

                  return (
                    <TableRow
                      key={entry.id}
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => handleRowClick(entry)}
                    >
                      <TableCell>{entry.studentName}</TableCell>
                      <TableCell>{entry.rewardTitle}</TableCell>
                      <TableCell>{entry.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          variant={entry.totalCost > 50 ? "default" : "secondary"}
                        >
                          {entry.totalCost} coins
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getBadgeColor(statusNum)}>
                          {statusNumberToString[statusNum]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No redemption records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal/Dialog */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              Update Status for "{selectedEntry.rewardTitle}"
            </h3>

            <div className="space-y-2 mb-4">
              {statusOptions.map((option) => (
                <div key={option.value}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={newStatus === option.value}
                      onChange={(e) =>
                        setNewStatus(Number(e.target.value))
                      }
                      className="accent-primary"
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setSelectedEntry(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleStatusUpdate}>Update</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
