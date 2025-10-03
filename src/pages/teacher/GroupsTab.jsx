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

  const [expandedGroupId, setExpandedGroupId] = useState(null);
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

  useEffect(() => {
    dispatch(getMyGroupsAsync());
  }, [dispatch]);

  const handleToggleExpand = (groupId) => {
    setExpandedGroupId((prev) => (prev === groupId ? null : groupId));
  };

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
              <React.Fragment key={group.id}>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleToggleExpand(group.id)}
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
                        <Button onClick={(e) => e.stopPropagation()}>+ Add Student</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Student to {group.name}</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleAddStudentSubmit}
                          className="space-y-4"
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
                          />
                          <Button type="submit">Add Student</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>

                {expandedGroupId === group.id && (
                  <TableRow>
                    <TableCell colSpan={3} className="bg-gray-50">
                      <div className="mt-4 space-y-4">
                        <h3 className="font-semibold mb-2">Students:</h3>
                        {group.students && group.students.length > 0 ? (
                          group.students.map((student) => (
                            <Card
                              key={student.id}
                              className="p-4 flex items-center justify-between"
                            >
                              <div>
                                <p className="font-medium">
                                  {student.firstName} {student.lastName} - Coins: {getStudentTotalCoins(student.id)}
                                </p>
                                {student.info && (
                                  <p className="text-sm text-gray-600">{student.info}</p>
                                )}
                              </div>
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
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Give Coin to {student.firstName} {student.lastName}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <form
                                    onSubmit={(e) =>
                                      handleGiveCoinSubmit(e, student.id)
                                    }
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
                            </Card>
                          ))
                        ) : (
                          <p>No students in this group.</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default GroupsTab;
