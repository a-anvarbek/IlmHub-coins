// Libraries
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Trash2, Mail, ArrowUpCircle } from "lucide-react";

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
import { Button } from "../../components/ui/button";

// Redux
import {
  getUserAsync,
  deleteUserAsync,
  postUserAsync,
  selectUser,
} from "../../utils/redux/userSlice";

export default function UsersTab({ t }) {
  const dispatch = useDispatch();
  const { userList = [], status, error } = useSelector(selectUser) || {};

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  // 🗑️ Delete handler
  const handleDelete = (id) => {
    dispatch(deleteUserAsync(id));
  };

  // 📤 Post User handler (ArrowUpCircle bosilganda)
  const handlePostUser = (user) => {
    const data = {
      fullName: user.fullName,
      email: user.email,
      password: "Default123!", // bu yerda kerakli parolni berasan yoki formdan olasan
    };

    dispatch(postUserAsync({ data, id: user.id }));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("admin.users")}</h2>
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
              {userList?.length > 0 ? (
                userList.map((user) => (
                  <TableRow key={user?.id}>
                    <TableCell className="font-medium">
                      {user?.fullName || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {user?.email || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {/* 📤 ArrowUpCircle — postUserAsync chaqiradi */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePostUser(user)}
                        >
                          <ArrowUpCircle className="w-4 h-4" />
                        </Button>

                        {/* 🗑️ Delete tugmasi */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    {t("admin.no_users")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
