// Libraries
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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

// Redux
import { getStudentAsync, selectStudent } from "../../utils/redux/studentSlice";

export default function StudentsTab({ t }) {
  const dispatch = useDispatch();
  const { studentList, status, error } = useSelector(selectStudent);

  useEffect(() => {
    dispatch(getStudentAsync());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("teacher.students")}</h2>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.name")}</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>{t("common.coins")}</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentList?.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.firstName} {student.lastName}</TableCell>
                  <TableCell className="font-mono">
                    {student.studentId}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={student.coins > 20 ? "default" : "secondary"}
                    >
                      {student.coins} coins
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Active</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
