


import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
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

export default function GroupsTab({ t }) {
  const [groups, setGroups] = useState([
    { id: 1, name: "Group A", members: 12, status: "Active" },
    { id: 2, name: "Group B", members: 8, status: "Inactive" },
    { id: 3, name: "Group C", members: 15, status: "Active" },
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({ name: "", members: "", status: "Active" });

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (form.name && form.members) {
      const newGroup = {
        id: groups.length + 1,
        name: form.name,
        members: parseInt(form.members),
        status: form.status,
      };
      setGroups((prev) => [...prev, newGroup]);
      setForm({ name: "", members: "", status: "Active" });
      setShowDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("admin.groups")}</h2>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button>
              + {t("admin.add_group")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("admin.add_group")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddGroup} className="space-y-4">
              <div>
                <Label htmlFor="groupName">{t("common.name")}</Label>
                <Input
                  id="groupName"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="groupMembers">{t("common.members")}</Label>
                <Input
                  id="groupMembers"
                  type="number"
                  value={form.members}
                  onChange={(e) => setForm((prev) => ({ ...prev, members: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="groupStatus">Status</Label>
                <Input
                  id="groupStatus"
                  value={form.status}
                  onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                />
              </div>
              <Button type="submit">{t("common.add")}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{t("common.name")}</TableHead>
                <TableHead>{t("common.members")}</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-mono">{group.id}</TableCell>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.members}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        group.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {group.status}
                    </Badge>
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