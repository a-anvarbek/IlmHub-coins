import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "../../components/ui/table";

function GroupsTab() {
  const [students, setStudents] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      info: "Excellent student",
      groupIds: ["1", "2"]
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      info: "Needs improvement in math",
      groupIds: ["2"]
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      info: "Participates actively",
      groupIds: ["1", "3"]
    }
  ]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    info: "",
    groupIds: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (
      newStudent.firstName.trim() !== "" &&
      newStudent.lastName.trim() !== ""
    ) {
      setStudents([
        ...students,
        {
          firstName: newStudent.firstName.trim(),
          lastName: newStudent.lastName.trim(),
          info: newStudent.info.trim(),
          groupIds: newStudent.groupIds
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id !== "")
        }
      ]);
      setNewStudent({
        firstName: "",
        lastName: "",
        info: "",
        groupIds: ""
      });
      setDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Students</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="primary">Add Student</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
                <Input
                  type="text"
                  value={newStudent.firstName}
                  onChange={(e) =>
                    setNewStudent((s) => ({
                      ...s,
                      firstName: e.target.value
                    }))
                  }
                  placeholder="First name"
                  autoFocus
                  required
                />
                <Input
                  type="text"
                  value={newStudent.lastName}
                  onChange={(e) =>
                    setNewStudent((s) => ({
                      ...s,
                      lastName: e.target.value
                    }))
                  }
                  placeholder="Last name"
                  required
                />
                <Input
                  type="text"
                  value={newStudent.info}
                  onChange={(e) =>
                    setNewStudent((s) => ({
                      ...s,
                      info: e.target.value
                    }))
                  }
                  placeholder="Info"
                />
                <Input
                  type="text"
                  value={newStudent.groupIds}
                  onChange={(e) =>
                    setNewStudent((s) => ({
                      ...s,
                      groupIds: e.target.value
                    }))
                  }
                  placeholder="Group IDs (comma separated)"
                />
                <Button type="submit" variant="primary">
                  Add Student
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Info</TableHead>
              <TableHead>Group IDs</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.info}</TableCell>
                <TableCell>
                  {Array.isArray(student.groupIds)
                    ? student.groupIds.join(", ")
                    : ""}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" disabled>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" disabled>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default GroupsTab;
