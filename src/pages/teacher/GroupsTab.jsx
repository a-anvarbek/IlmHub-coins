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

  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    info: "",
    groupId: "",
  });

  const [giveCoinDialogOpenStudentId, setGiveCoinDialogOpenStudentId] = useState(null);
  const [giveCoinData, setGiveCoinData] = useState({ amount: "", reason: "" });

  const [studentListDialogOpenGroupId, setStudentListDialogOpenGroupId] = useState(null);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  useEffect(() => {
    dispatch(getMyGroupsAsync());
  }, [dispatch]);

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.groupId) return;
    dispatch(postStudentAsync({ ...newStudent, groupIds: [newStudent.groupId] }));
    setNewStudent({ firstName: "", lastName: "", info: "", groupId: "" });
    setShowAddStudentForm(false);
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
              <TableRow
                key={group.id}
                className="cursor-pointer"
                onClick={() => setStudentListDialogOpenGroupId(group.id)}
              >
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStudentListDialogOpenGroupId(group.id);
                      setNewStudent((prev) => ({ ...prev, groupId: group.id }));
                    }}
                  >
                    + Add Student
                  </Button>
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
            <DialogContent className="max-w-4xl w-full max-h-[80vh] flex flex-col overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">
                  {groupList.find((g) => g.id === studentListDialogOpenGroupId)?.name || ""}
                </DialogTitle>
              </DialogHeader>

              {groupList.find((g) => g.id === studentListDialogOpenGroupId)?.students?.length > 0 ? (
                <>
                  {/* SCROLL faqat jadvalga */}
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
                          .find((g) => g.id === studentListDialogOpenGroupId)
                          .students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.firstName}</TableCell>
                              <TableCell>{student.lastName}</TableCell>
                              <TableCell>{student.username ?? "-"}</TableCell>
                              <TableCell>{student.studentCode ?? "-"}</TableCell>
                              <TableCell>{student.balance}</TableCell>
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
                  </div>

                  <div className="mt-4 flex-shrink-0">
                    {/* FORM jadval tashqarisida turadi */}
                    {showAddStudentForm && (
                      <form onSubmit={handleAddStudentSubmit} className="mt-6 space-y-4">
                        <h3 className="text-lg font-semibold">Add New Student</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            required
                            placeholder="First Name"
                            value={newStudent.firstName}
                            onChange={(e) =>
                              setNewStudent((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                                groupId: studentListDialogOpenGroupId,
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
                                groupId: studentListDialogOpenGroupId,
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
                                groupId: studentListDialogOpenGroupId,
                              }))
                            }
                          />
                        </div>
                        <Button type="submit">+ Add Student</Button>
                      </form>
                    )}

                    <div className="mt-4 flex justify-center">
                      {showAddStudentForm ? (
                        <Button
                          onClick={() => setShowAddStudentForm(false)}
                          size="sm"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button onClick={() => setShowAddStudentForm(true)} size="sm">
                          Add Student
                        </Button>
                      )}
                    </div>
                  </div>
                  
                </>
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
