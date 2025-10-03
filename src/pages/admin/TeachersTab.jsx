import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Users } from "lucide-react";

// Components
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

// Redux
import { getTeacherAsync, selectUser } from "../../utils/redux/userSlice";
import { postGroupAsync } from "../../utils/redux/groupSlice";

export default function TeachersTab({ t }) {
  const dispatch = useDispatch();
  const { userList: teachers = [], status, error } = useSelector(selectUser) || {};

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [groupForm, setGroupForm] = useState({ name: "", description: "" });
  const [showCreatedMsg, setShowCreatedMsg] = useState(false);

  useEffect(() => {
    dispatch(getTeacherAsync());
  }, [dispatch]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!selectedTeacher?.id || !groupForm.name) return;

    const payload = {
      name: groupForm.name,
      description: groupForm.description,
      teacherId: selectedTeacher.id,
    };

    const resultAction = await dispatch(postGroupAsync(payload));

    if (postGroupAsync.fulfilled.match(resultAction)) {
      setGroupForm({ name: "", description: "" });

      // ✅ show "Group Created!" message for 3 seconds
      setShowCreatedMsg(true);
      setTimeout(() => setShowCreatedMsg(false), 3000);
    } else {
      console.error("❌ Group yaratishda xatolik:", resultAction.payload);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("admin.teachers")}</h2>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.name")}</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers?.length > 0 ? (
                teachers.map((teacher) => (
                  <TableRow key={teacher?.id}>
                    <TableCell className="font-medium">{teacher?.fullName || "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {teacher?.email || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedTeacher(teacher)}
                        className="flex items-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        Create Group
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    {t("admin.no_teachers")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={!!selectedTeacher} onOpenChange={setSelectedTeacher}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Group for{" "}
              <span className="font-semibold">
                {selectedTeacher?.fullName || "Teacher"}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {showCreatedMsg ? (
              // ✅ 3 soniyalik xabar
              <div className="text-center text-green-600 font-semibold text-lg">
                Group Created!
              </div>
            ) : (
              // ✅ Form
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <Label htmlFor="groupName">{t("common.name")}</Label>
                  <Input
                    id="groupName"
                    value={groupForm.name}
                    onChange={(e) =>
                      setGroupForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter group name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="groupDescription">Description</Label>
                  <Textarea
                    id="groupDescription"
                    value={groupForm.description}
                    onChange={(e) =>
                      setGroupForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Enter group description"
                  />
                </div>

                <Button type="submit" className="w-full">
                  {t("common.add")}
                </Button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
