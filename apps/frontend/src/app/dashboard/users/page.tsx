"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  UserPlus,
  Filter,
  Download,
  MoreVertical,
  Ban,
  CheckCircle,
  Shield,
} from "lucide-react";
import { User, UserRole, UserStatus } from "@/types";

// Mock data - will be replaced with API calls
const mockUsers: User[] = [
  {
    id: "1",
    email: "abdulaziz@example.com",
    username: "abdulaziz",
    fullName: "Абдулазиз Абдулазизов",
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-10-20T15:30:00Z",
  },
  {
    id: "2",
    email: "aziza.k@example.com",
    username: "aziza_author",
    fullName: "Азиза Каримова",
    role: UserRole.AUTHOR,
    status: UserStatus.ACTIVE,
    createdAt: "2024-02-20T09:15:00Z",
    updatedAt: "2024-10-21T12:00:00Z",
  },
  {
    id: "3",
    email: "shohruh@example.com",
    username: "shohruh_s",
    fullName: "Шохрух Содиков",
    role: UserRole.AUTHOR,
    status: UserStatus.ACTIVE,
    createdAt: "2024-03-10T14:30:00Z",
    updatedAt: "2024-10-22T08:45:00Z",
  },
  {
    id: "4",
    email: "nodira@example.com",
    username: "nodira_y",
    fullName: "Нодира Юсупова",
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    createdAt: "2024-04-05T11:20:00Z",
    updatedAt: "2024-10-22T10:15:00Z",
  },
  {
    id: "5",
    email: "blocked@example.com",
    username: "blocked_user",
    fullName: "Заблокированный Пользователь",
    role: UserRole.USER,
    status: UserStatus.BLOCKED,
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-09-15T16:00:00Z",
  },
];

const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return <Badge variant="destructive">Администратор</Badge>;
    case UserRole.MODERATOR:
      return <Badge variant="warning">Модератор</Badge>;
    case UserRole.AUTHOR:
      return <Badge variant="info">Автор</Badge>;
    case UserRole.USER:
      return <Badge variant="muted">Пользователь</Badge>;
  }
};

const getStatusBadge = (status: UserStatus) => {
  switch (status) {
    case UserStatus.ACTIVE:
      return <Badge variant="success">Активен</Badge>;
    case UserStatus.BLOCKED:
      return <Badge variant="destructive">Заблокирован</Badge>;
    case UserStatus.PENDING:
      return <Badge variant="warning">На проверке</Badge>;
  }
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === "all" || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Управление пользователями</h1>
          <p className="text-muted-foreground">
            Список всех пользователей платформы
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Добавить пользователя
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего пользователей
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-success">+12.5% от прошлого месяца</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Авторы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-success">+8.2% от прошлого месяца</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Активные сегодня
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">48.5% от всех</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Заблокировано
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-destructive">0.9% от всех</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Пользователи</CardTitle>
              <CardDescription>
                {filteredUsers.length} пользователей найдено
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Экспорт
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, email или username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">Все роли</option>
              <option value={UserRole.ADMIN}>Администраторы</option>
              <option value={UserRole.MODERATOR}>Модераторы</option>
              <option value={UserRole.AUTHOR}>Авторы</option>
              <option value={UserRole.USER}>Пользователи</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Пользователь
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Роль
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Статус
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Дата регистрации
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {user.fullName[0]}
                        </div>
                        <div>
                          <div className="font-medium">{user.fullName}</div>
                          <div className="text-sm text-muted-foreground">
                            @{user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="py-4">{getRoleBadge(user.role)}</td>
                    <td className="py-4">{getStatusBadge(user.status)}</td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.status === UserStatus.ACTIVE ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive"
                          >
                            <Ban className="h-4 w-4" />
                            Блокировать
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-success hover:text-success"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Разблокировать
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Показано {filteredUsers.length} из {mockUsers.length}{" "}
              пользователей
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Назад
              </Button>
              <Button variant="outline" size="sm">
                Далее
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
