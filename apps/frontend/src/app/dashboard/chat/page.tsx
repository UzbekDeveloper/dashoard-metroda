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
  Filter,
  Send,
  Paperclip,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  User,
  MessageSquare,
} from "lucide-react";
import {
  SupportTicket,
  SupportTicketStatus,
  SupportTicketPriority,
  SupportTicketCategory,
  ChatMessage,
  UserRole,
} from "@/types";
import { cn } from "@/lib/utils";

// Mock data
const mockTickets: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "TKT-1001",
    userId: "u1",
    user: {
      id: "u1",
      email: "alisher@example.com",
      username: "alisher_dev",
      fullName: "Алишер Каримов",
      role: UserRole.USER,
      status: "active" as any,
      createdAt: "2024-10-20T10:00:00Z",
      updatedAt: "2024-10-20T10:00:00Z",
    },
    subject: "Не могу оплатить подписку через Payme",
    category: SupportTicketCategory.PAYMENT,
    priority: SupportTicketPriority.HIGH,
    status: SupportTicketStatus.OPEN,
    messagesCount: 3,
    lastMessageAt: "2024-10-22T14:30:00Z",
    createdAt: "2024-10-22T10:00:00Z",
    updatedAt: "2024-10-22T14:30:00Z",
  },
  {
    id: "2",
    ticketNumber: "TKT-1002",
    userId: "u2",
    user: {
      id: "u2",
      email: "dilnoza@example.com",
      username: "dilnoza_author",
      fullName: "Дильноза Рахимова",
      role: UserRole.AUTHOR,
      status: "active" as any,
      createdAt: "2024-10-19T09:00:00Z",
      updatedAt: "2024-10-19T09:00:00Z",
    },
    subject: "Как загрузить видео контент?",
    category: SupportTicketCategory.TECHNICAL,
    priority: SupportTicketPriority.MEDIUM,
    status: SupportTicketStatus.IN_PROGRESS,
    assignedToId: "admin1",
    messagesCount: 8,
    lastMessageAt: "2024-10-22T12:15:00Z",
    createdAt: "2024-10-21T15:00:00Z",
    updatedAt: "2024-10-22T12:15:00Z",
  },
  {
    id: "3",
    ticketNumber: "TKT-1003",
    userId: "u3",
    user: {
      id: "u3",
      email: "jasur@example.com",
      username: "jasur_99",
      fullName: "Жасур Усманов",
      role: UserRole.USER,
      status: "active" as any,
      createdAt: "2024-10-18T11:00:00Z",
      updatedAt: "2024-10-18T11:00:00Z",
    },
    subject: "Вопрос по отмене подписки",
    category: SupportTicketCategory.SUBSCRIPTION,
    priority: SupportTicketPriority.LOW,
    status: SupportTicketStatus.WAITING_USER,
    assignedToId: "admin1",
    messagesCount: 5,
    lastMessageAt: "2024-10-22T09:00:00Z",
    createdAt: "2024-10-21T08:00:00Z",
    updatedAt: "2024-10-22T09:00:00Z",
  },
  {
    id: "4",
    ticketNumber: "TKT-1004",
    userId: "u4",
    user: {
      id: "u4",
      email: "madina@example.com",
      username: "madina_writes",
      fullName: "Мадина Азимова",
      role: UserRole.AUTHOR,
      status: "active" as any,
      createdAt: "2024-10-17T13:00:00Z",
      updatedAt: "2024-10-17T13:00:00Z",
    },
    subject: "Проблема с выплатами",
    category: SupportTicketCategory.PAYMENT,
    priority: SupportTicketPriority.URGENT,
    status: SupportTicketStatus.OPEN,
    messagesCount: 2,
    lastMessageAt: "2024-10-22T13:45:00Z",
    createdAt: "2024-10-22T13:00:00Z",
    updatedAt: "2024-10-22T13:45:00Z",
  },
  {
    id: "5",
    ticketNumber: "TKT-1005",
    userId: "u5",
    user: {
      id: "u5",
      email: "otabek@example.com",
      username: "otabek_tech",
      fullName: "Отабек Тошматов",
      role: UserRole.USER,
      status: "active" as any,
      createdAt: "2024-10-15T16:00:00Z",
      updatedAt: "2024-10-15T16:00:00Z",
    },
    subject: "Не приходят уведомления",
    category: SupportTicketCategory.TECHNICAL,
    priority: SupportTicketPriority.MEDIUM,
    status: SupportTicketStatus.RESOLVED,
    assignedToId: "admin2",
    messagesCount: 6,
    lastMessageAt: "2024-10-21T17:00:00Z",
    createdAt: "2024-10-20T10:00:00Z",
    updatedAt: "2024-10-21T17:00:00Z",
    resolvedAt: "2024-10-21T17:00:00Z",
  },
];

const mockMessages: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "m1",
      conversationId: "1",
      senderId: "u1",
      sender: mockTickets[0].user,
      content:
        "Здравствуйте! Я пытаюсь оплатить подписку через Payme, но постоянно получаю ошибку. Помогите пожалуйста!",
      isRead: true,
      createdAt: "2024-10-22T10:05:00Z",
      updatedAt: "2024-10-22T10:05:00Z",
    },
    {
      id: "m2",
      conversationId: "1",
      senderId: "admin1",
      content:
        "Здравствуйте, Алишер! Подскажите пожалуйста, какую именно ошибку вы видите? Можете прислать скриншот?",
      isRead: true,
      createdAt: "2024-10-22T11:00:00Z",
      updatedAt: "2024-10-22T11:00:00Z",
    },
    {
      id: "m3",
      conversationId: "1",
      senderId: "u1",
      sender: mockTickets[0].user,
      content: 'Ошибка такая: "Транзакция отклонена банком". Что это значит?',
      isRead: true,
      createdAt: "2024-10-22T14:30:00Z",
      updatedAt: "2024-10-22T14:30:00Z",
    },
  ],
  "2": [
    {
      id: "m4",
      conversationId: "2",
      senderId: "u2",
      sender: mockTickets[1].user,
      content:
        "Добрый день! Я автор и хочу начать загружать видео контент. Подскажите как это сделать?",
      isRead: true,
      createdAt: "2024-10-21T15:05:00Z",
      updatedAt: "2024-10-21T15:05:00Z",
    },
    {
      id: "m5",
      conversationId: "2",
      senderId: "admin1",
      content:
        "Здравствуйте! Для загрузки видео перейдите в раздел 'Мой контент' → 'Загрузить' → выберите тип 'Видео'. Максимальный размер файла - 500 МБ.",
      isRead: true,
      createdAt: "2024-10-21T16:00:00Z",
      updatedAt: "2024-10-21T16:00:00Z",
    },
    {
      id: "m6",
      conversationId: "2",
      senderId: "u2",
      sender: mockTickets[1].user,
      content: "Спасибо! А какие форматы видео поддерживаются?",
      isRead: true,
      createdAt: "2024-10-22T12:15:00Z",
      updatedAt: "2024-10-22T12:15:00Z",
    },
  ],
};

const getStatusIcon = (status: SupportTicketStatus) => {
  switch (status) {
    case SupportTicketStatus.OPEN:
      return <AlertCircle className="h-4 w-4" />;
    case SupportTicketStatus.IN_PROGRESS:
      return <Clock className="h-4 w-4" />;
    case SupportTicketStatus.WAITING_USER:
      return <MessageSquare className="h-4 w-4" />;
    case SupportTicketStatus.RESOLVED:
      return <CheckCircle2 className="h-4 w-4" />;
    case SupportTicketStatus.CLOSED:
      return <XCircle className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: SupportTicketStatus) => {
  const config = {
    [SupportTicketStatus.OPEN]: {
      variant: "destructive" as const,
      label: "Открыт",
    },
    [SupportTicketStatus.IN_PROGRESS]: {
      variant: "info" as const,
      label: "В работе",
    },
    [SupportTicketStatus.WAITING_USER]: {
      variant: "warning" as const,
      label: "Ждём ответа",
    },
    [SupportTicketStatus.RESOLVED]: {
      variant: "success" as const,
      label: "Решён",
    },
    [SupportTicketStatus.CLOSED]: { variant: "muted" as const, label: "Закрыт" },
  };

  const { variant, label } = config[status];

  return (
    <Badge variant={variant} className="gap-1">
      {getStatusIcon(status)}
      {label}
    </Badge>
  );
};

const getPriorityBadge = (priority: SupportTicketPriority) => {
  const config = {
    [SupportTicketPriority.URGENT]: {
      variant: "destructive" as const,
      label: "Срочно",
    },
    [SupportTicketPriority.HIGH]: { variant: "warning" as const, label: "Высокий" },
    [SupportTicketPriority.MEDIUM]: { variant: "info" as const, label: "Средний" },
    [SupportTicketPriority.LOW]: { variant: "muted" as const, label: "Низкий" },
  };

  const { variant, label } = config[priority];

  return <Badge variant={variant}>{label}</Badge>;
};

const getCategoryLabel = (category: SupportTicketCategory) => {
  const labels = {
    [SupportTicketCategory.TECHNICAL]: "Технические",
    [SupportTicketCategory.PAYMENT]: "Оплата",
    [SupportTicketCategory.CONTENT]: "Контент",
    [SupportTicketCategory.SUBSCRIPTION]: "Подписки",
    [SupportTicketCategory.ACCOUNT]: "Аккаунт",
    [SupportTicketCategory.OTHER]: "Другое",
  };

  return labels[category];
};

export default function ChatPage() {
  const [tickets] = useState<SupportTicket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    mockTickets[0]
  );
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMessages = selectedTicket
    ? mockMessages[selectedTicket.id] || []
    : [];

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedTicket) return;
    // В реальности здесь будет API запрос
    setMessageInput("");
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === SupportTicketStatus.OPEN).length,
    inProgress: tickets.filter(
      (t) => t.status === SupportTicketStatus.IN_PROGRESS
    ).length,
    resolved: tickets.filter((t) => t.status === SupportTicketStatus.RESOLVED)
      .length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Поддержка</h1>
          <p className="text-muted-foreground">
            Управление обращениями пользователей
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего тикетов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-destructive bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">
              Открытые
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.open}
            </div>
          </CardContent>
        </Card>
        <Card className="border-info bg-info/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-info">
              В работе
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              {stats.inProgress}
            </div>
          </CardContent>
        </Card>
        <Card className="border-success bg-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">
              Решённые
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {stats.resolved}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Tickets List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Тикеты</CardTitle>
            <CardDescription>
              Список обращений в техническую поддержку
            </CardDescription>
            <div className="flex gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              {filteredTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={cn(
                    "w-full border-b p-4 text-left transition-colors hover:bg-muted/50",
                    selectedTicket?.id === ticket.id && "bg-muted"
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">
                            {ticket.ticketNumber}
                          </span>
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <p className="font-medium text-sm line-clamp-1">
                          {ticket.subject}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span className="truncate">{ticket.user?.fullName}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      {getStatusBadge(ticket.status)}
                      <span className="text-xs text-muted-foreground">
                        {new Date(ticket.lastMessageAt).toLocaleDateString(
                          "ru-RU",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          {selectedTicket ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">
                        {selectedTicket.ticketNumber}
                      </CardTitle>
                      {getStatusBadge(selectedTicket.status)}
                      {getPriorityBadge(selectedTicket.priority)}
                    </div>
                    <CardDescription className="text-base font-medium text-foreground">
                      {selectedTicket.subject}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {selectedTicket.user?.fullName}
                      </div>
                      <div>
                        Категория: {getCategoryLabel(selectedTicket.category)}
                      </div>
                      <div>Сообщений: {selectedTicket.messagesCount}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-4">
                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                  {selectedMessages.map((message) => {
                    const isAdmin = message.senderId.startsWith("admin");
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          isAdmin ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                            isAdmin
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {isAdmin
                            ? "A"
                            : message.sender?.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div
                          className={cn(
                            "flex-1 space-y-1",
                            isAdmin ? "items-end" : "items-start"
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center gap-2 text-xs",
                              isAdmin
                                ? "flex-row-reverse justify-start"
                                : "flex-row"
                            )}
                          >
                            <span className="font-medium">
                              {isAdmin ? "Поддержка" : message.sender?.fullName}
                            </span>
                            <span className="text-muted-foreground">
                              {new Date(message.createdAt).toLocaleString(
                                "ru-RU",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  day: "numeric",
                                  month: "short",
                                }
                              )}
                            </span>
                          </div>
                          <div
                            className={cn(
                              "rounded-lg px-4 py-2 text-sm",
                              isAdmin
                                ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                                : "bg-muted mr-auto max-w-[80%]"
                            )}
                          >
                            {message.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Введите сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Отправить
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex h-[600px] items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Выберите тикет для просмотра сообщений</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
