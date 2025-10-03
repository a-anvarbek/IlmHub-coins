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

  const [addStudentDialogOpenGroupId, setAddStudentDialogOpenGroupId] = useState(null);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    info: "",
    groupId: "",
  });

  const [giveCoinDialogOpenStudentId, setGiveCoinDialogOpenStudentId] = useState(null);
  const [giveCoinData, setGiveCoinData] = useState({
    amount: "",
    reason: "",
  });

  const [studentListDialogOpenGroupId, setStudentListDialogOpenGroupId] = useState(null);

  const [passwordVisibility, setPasswordVisibility] = useState({});

  useEffect(() => {
    dispatch(getMyGroupsAsync());
  }, [dispatch]);

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.groupId) return;
    dispatch(postStudentAsync({ ...newStudent, groupIds: [newStudent.groupId] }));
    setNewStudent({ firstName: "", lastName: "", info: "", groupId: "" });
    setAddStudentDialogOpenGroupId(null);
  };

  const handleGiveCoinSubmit = (e, studentId) => {
    e.preventDefault();
    if (!giveCoinData.amount || !giveCoinData.reason) return;

    const referenceId = `${giveCoinData.amount}${giveCoinData.reason}`;
    const transactionPayload = {
      amount: Number(giveCoinData.amount),
      reason: giveCoinData.reason,
      referenceId,
    };

    dispatch(postTransactionAsync({ studentId, data: transactionPayload })).then(() => {
      dispatch(getStudentTransactionsAsync(studentId));
    });

    setGiveCoinDialogOpenStudentId(null);
    setGiveCoinData({ amount: "", reason: "" });
  };

  const getStudentTotalCoins = (studentId) => {
    const studentTransactions = transactionList[studentId] || [];
    return studentTransactions.reduce((sum, t) => sum + t.amount, 0);
  };

  useEffect(() => {
    groupList.forEach((group) => {
      group.students?.forEach((student) => {
        dispatch(getStudentTransactionsAsync(student.id));
      });
    });
  }, [groupList, dispatch]);

  const togglePasswordVisibility = (studentId) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
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
                onClick={() => setStudentListDialogOpenGroupId(group.id)}
              >
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell className="text-center">
                  <Dialog
                    open={addStudentDialogOpenGroupId === group.id}
                    onOpenChange={(open) =>
                      setAddStudentDialogOpenGroupId(open ? group.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={(e) => e.stopPropagation()}
                      >
                        + Add Student
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Student to {group.name}</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleAddStudentSubmit}
                        className="space-y-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Input
                          required
                          placeholder="First Name"
                          value={newStudent.firstName}
                          onChange={(e) =>
                            setNewStudent((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                              groupId: group.id,
                            }))
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Input
                          required
                          placeholder="Last Name"
                          value={newStudent.lastName}
                          onChange={(e) =>
                            setNewStudent((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                              groupId: group.id,
                            }))
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Input
                          placeholder="Info"
                          value={newStudent.info}
                          onChange={(e) =>
                            setNewStudent((prev) => ({
                              ...prev,
                              info: e.target.value,
                              groupId: group.id,
                            }))
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Button type="submit">Add Student</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {studentListDialogOpenGroupId && (
          <Dialog
            open={true}
            onOpenChange={(open) =>
              setStudentListDialogOpenGroupId(open ? studentListDialogOpenGroupId : null)
            }
          >
            <DialogContent className="w-[1800px]">
              <DialogHeader>
                <DialogTitle>
                  Students in{" "}
                  {groupList.find((g) => g.id === studentListDialogOpenGroupId)?.name || ""}
                </DialogTitle>
              </DialogHeader>
              {groupList
                .find((g) => g.id === studentListDialogOpenGroupId)
                ?.students?.length > 0 ? (
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupList
                      .find((g) => g.id === studentListDialogOpenGroupId)
                      .students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.firstName}</TableCell>
                          <TableCell>{student.lastName}</TableCell>
                          <TableCell>{student.username ?? "-"}</TableCell>
                          <TableCell>{student.code ?? "-"}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <input
                              type={passwordVisibility[student.id] ? "text" : "password"}
                              value={student.password ?? ""}
                              readOnly
                              className="border px-2 py-1 rounded w-full"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(student.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {passwordVisibility[student.id] ? "Hide" : "Show"}
                            </button>
                          </TableCell>
                          <TableCell className="text-center">
                            <Dialog
                              open={giveCoinDialogOpenStudentId === student.id}
                              onOpenChange={(open) => {
                                if (open) {
                                  setGiveCoinDialogOpenStudentId(student.id);
                                  setGiveCoinData({ amount: "", reason: "" });
                                } else {
                                  setGiveCoinDialogOpenStudentId(null);
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Give Coin
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-[700px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Give Coin to {student.firstName} {student.lastName}
                                  </DialogTitle>
                                </DialogHeader>
                                <form
                                  onSubmit={(e) => handleGiveCoinSubmit(e, student.id)}
                                  className="space-y-4"
                                >
                                  <Input
                                    required
                                    type="number"
                                    min="1"
                                    placeholder="Amount"
                                    value={giveCoinData.amount}
                                    onChange={(e) =>
                                      setGiveCoinData((prev) => ({
                                        ...prev,
                                        amount: e.target.value,
                                      }))
                                    }
                                  />
                                  <Input
                                    required
                                    placeholder="Reason"
                                    value={giveCoinData.reason}
                                    onChange={(e) =>
                                      setGiveCoinData((prev) => ({
                                        ...prev,
                                        reason: e.target.value,
                                      }))
                                    }
                                  />
                                  <Button type="submit">Give Coin</Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="mt-4">No students in this group.</p>
              )}
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}

export default GroupsTab;
