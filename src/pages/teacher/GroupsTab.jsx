// Libraries
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "../../components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getMyGroupsAsync, selectGroup } from "../../utils/redux/groupSlice";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { postStudentAsync } from "../../utils/redux/studentSlice";
import {
  postTransactionAsync,
  getStudentTransactionsAsync,
  selectTransaction,
} from "../../utils/redux/transactionSlice";

function GroupsTab() {
  const dispatch = useDispatch();
  const { groupList, status, error } = useSelector(selectGroup);
  const { transactionList } = useSelector(selectTransaction);

  const [activeGroupForStudents, setActiveGroupForStudents] = useState(null);
  const [activeGroupForAddStudent, setActiveGroupForAddStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    info: "",
  });

  const [activeStudentForGiveCoin, setActiveStudentForGiveCoin] = useState(null);
  const [giveCoinData, setGiveCoinData] = useState({ amount: "", reason: "" });

  useEffect(() => {
    dispatch(getMyGroupsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (activeGroupForStudents) {
      const group = groupList.find((g) => g.id === activeGroupForStudents);
      group?.students?.forEach((student) => {
        dispatch(getStudentTransactionsAsync(student.id));
      });
    }
  }, [activeGroupForStudents, groupList, dispatch]);

  const refreshGroupsAndStudents = async (groupId) => {
    await dispatch(getMyGroupsAsync());
    setActiveGroupForStudents(groupId);
  };

  const handleAddStudentSubmit = async (e) => {
    e.preventDefault();
    if (!activeGroupForAddStudent) return;
    await dispatch(
      postStudentAsync({
        ...newStudent,
        groupIds: [activeGroupForAddStudent],
      })
    );
    setNewStudent({ firstName: "", lastName: "", info: "" });
    setActiveGroupForAddStudent(null);
    refreshGroupsAndStudents(activeGroupForAddStudent);
  };

  const handleGiveCoinSubmit = async (e) => {
    e.preventDefault();
    if (!activeStudentForGiveCoin) return;
    if (!giveCoinData.amount || !giveCoinData.reason) return;

    const referenceId = `${giveCoinData.amount}${giveCoinData.reason}`;
    const transactionPayload = {
      amount: Number(giveCoinData.amount),
      reason: giveCoinData.reason,
      referenceId,
    };

    await dispatch(
      postTransactionAsync({
        studentId: activeStudentForGiveCoin.id,
        data: transactionPayload,
      })
    );
    await dispatch(getStudentTransactionsAsync(activeStudentForGiveCoin.id));

    setGiveCoinData({ amount: "", reason: "" });
    const currentGroupId = activeGroupForStudents;
    setActiveStudentForGiveCoin(null);
    if (currentGroupId) {
      refreshGroupsAndStudents(currentGroupId);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Groups</h2>
        </div>

        {status === "loading" && <p>Loading groups...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-32 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupList.map((group) => (
              <TableRow
                key={group.id}
                className="cursor-pointer"
                onClick={() => setActiveGroupForStudents(group.id)}
              >
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGroupForAddStudent(group.id);
                      setNewStudent({ firstName: "", lastName: "", info: "" });
                    }}
                  >
                    + Add Student
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Students List Dialog */}
        <Dialog
          open={!!activeGroupForStudents}
          onOpenChange={(open) => {
            if (!open) setActiveGroupForStudents(null);
          }}
        >
          <DialogOverlay />
          <DialogContent className="max-w-4xl w-full max-h-[80vh] flex flex-col overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">
                {groupList.find((g) => g.id === activeGroupForStudents)?.name || ""}
              </DialogTitle>
            </DialogHeader>

            {groupList.find((g) => g.id === activeGroupForStudents)?.students?.length > 0 ? (
              <div className="flex-1 overflow-y-auto mt-4 border rounded max-h-[400px]">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Student Code</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupList
                      .find((g) => g.id === activeGroupForStudents)
                      .students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.firstName}</TableCell>
                          <TableCell>{student.lastName}</TableCell>
                          <TableCell>{student.username ?? "-"}</TableCell>
                          <TableCell>{student.studentCode ?? "-"}</TableCell>
                          <TableCell>{student.balance}</TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveStudentForGiveCoin(student);
                                setGiveCoinData({ amount: "", reason: "" });
                              }}
                            >
                              Give Coin
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="mt-4">No students in this group.</p>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Student Dialog */}
        <Dialog
          open={!!activeGroupForAddStudent}
          onOpenChange={(open) => {
            if (!open) setActiveGroupForAddStudent(null);
          }}
        >
          <DialogOverlay />
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">
                Add Student to{" "}
                {groupList.find((g) => g.id === activeGroupForAddStudent)?.name || ""}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddStudentSubmit} className="space-y-4 mt-2">
              <Input
                required
                placeholder="First Name"
                value={newStudent.firstName}
                onChange={(e) =>
                  setNewStudent((prev) => ({ ...prev, firstName: e.target.value }))
                }
              />
              <Input
                required
                placeholder="Last Name"
                value={newStudent.lastName}
                onChange={(e) =>
                  setNewStudent((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
              <Input
                placeholder="Info"
                value={newStudent.info}
                onChange={(e) =>
                  setNewStudent((prev) => ({ ...prev, info: e.target.value }))
                }
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveGroupForAddStudent(null)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">+ Add Student</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Give Coin Dialog */}
        <Dialog
          open={!!activeStudentForGiveCoin}
          onOpenChange={(open) => {
            if (!open) setActiveStudentForGiveCoin(null);
          }}
        >
          <DialogOverlay />
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">
                Give Coin to{" "}
                {activeStudentForGiveCoin
                  ? `${activeStudentForGiveCoin.firstName} ${activeStudentForGiveCoin.lastName}`
                  : ""}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleGiveCoinSubmit} className="space-y-4 mt-2">
              <Input
                required
                type="number"
                min="1"
                placeholder="Amount"
                value={giveCoinData.amount}
                onChange={(e) =>
                  setGiveCoinData((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <Input
                required
                placeholder="Reason"
                value={giveCoinData.reason}
                onChange={(e) =>
                  setGiveCoinData((prev) => ({ ...prev, reason: e.target.value }))
                }
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveStudentForGiveCoin(null)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">Give Coin</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default GroupsTab;
