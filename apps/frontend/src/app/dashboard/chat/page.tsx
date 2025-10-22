"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Hash,
  Lock,
  Users,
  Plus,
  Settings,
  Archive,
  Star,
  Pin,
  Smile,
  AtSign,
} from "lucide-react";
import {
  SupportTicket,
  SupportTicketStatus,
  SupportTicketPriority,
  SupportTicketCategory,
  ChatMessage,
  UserRole,
  TeamMember,
  Channel,
  Department,
  OnlineStatus,
} from "@/types";
import { cn } from "@/lib/utils";

// Mock team members data
const mockTeamMembers: TeamMember[] = [
  {
    id: "tm1",
    email: "admin@metroda.uz",
    username: "admin",
    fullName: "Администратор",
    role: UserRole.ADMIN,
    status: "active" as any,
    department: Department.MANAGEMENT,
    position: "CEO",
    onlineStatus: OnlineStatus.ONLINE,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "tm2",
    email: "bekzod@metroda.uz",
    username: "bekzod_dev",
    fullName: "Бекзод Каримов",
    role: UserRole.ADMIN,
    status: "active" as any,
    department: Department.DEVELOPMENT,
    position: "Senior Developer",
    onlineStatus: OnlineStatus.ONLINE,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "tm3",
    email: "malika@metroda.uz",
    username: "malika_support",
    fullName: "Малика Азимова",
    role: UserRole.MODERATOR,
    status: "active" as any,
    department: Department.SUPPORT,
    position: "Support Lead",
    onlineStatus: OnlineStatus.AWAY,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "tm4",
    email: "sardor@metroda.uz",
    username: "sardor_mod",
    fullName: "Сардор Усманов",
    role: UserRole.MODERATOR,
    status: "active" as any,
    department: Department.MODERATION,
    position: "Content Moderator",
    onlineStatus: OnlineStatus.BUSY,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "tm5",
    email: "dilnoza@metroda.uz",
    username: "dilnoza_marketing",
    fullName: "Дильноза Рахимова",
    role: UserRole.ADMIN,
    status: "active" as any,
    department: Department.MARKETING,
    position: "Marketing Manager",
    onlineStatus: OnlineStatus.OFFLINE,
    lastSeen: "2024-10-22T15:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// Mock channels
const mockChannels: Channel[] = [
  {
    id: "ch1",
    name: "general",
    description: "Общий канал для всей команды",
    isPrivate: false,
    members: mockTeamMembers,
    unreadCount: 3,
    lastMessageAt: "2024-10-22T14:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "ch2",
    name: "development",
    description: "Обсуждение разработки",
    department: Department.DEVELOPMENT,
    isPrivate: false,
    members: mockTeamMembers.filter((m) => m.department === Department.DEVELOPMENT),
    unreadCount: 0,
    lastMessageAt: "2024-10-22T12:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "ch3",
    name: "support-team",
    description: "Команда поддержки",
    department: Department.SUPPORT,
    isPrivate: true,
    members: mockTeamMembers.filter((m) => m.department === Department.SUPPORT),
    unreadCount: 7,
    lastMessageAt: "2024-10-22T14:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "ch4",
    name: "moderation",
    description: "Модерация контента",
    department: Department.MODERATION,
    isPrivate: true,
    members: mockTeamMembers.filter((m) => m.department === Department.MODERATION),
    unreadCount: 2,
    lastMessageAt: "2024-10-22T13:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

// Mock support tickets
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
    assignedToId: "tm3",
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
    assignedToId: "tm3",
    messagesCount: 5,
    lastMessageAt: "2024-10-22T09:00:00Z",
    createdAt: "2024-10-21T08:00:00Z",
    updatedAt: "2024-10-22T09:00:00Z",
  },
];

// Mock messages for general channel
const mockChannelMessages: Record<string, ChatMessage[]> = {
  ch1: [
    {
      id: "msg1",
      conversationId: "ch1",
      senderId: "tm1",
      sender: mockTeamMembers[0],
      content: "Доброе утро, команда! Сегодня у нас важная встреча в 15:00",
      isRead: true,
      createdAt: "2024-10-22T09:00:00Z",
      updatedAt: "2024-10-22T09:00:00Z",
    },
    {
      id: "msg2",
      conversationId: "ch1",
      senderId: "tm2",
      sender: mockTeamMembers[1],
      content: "Доброе утро! Будем обсуждать новый функционал?",
      isRead: true,
      createdAt: "2024-10-22T09:05:00Z",
      updatedAt: "2024-10-22T09:05:00Z",
    },
    {
      id: "msg3",
      conversationId: "ch1",
      senderId: "tm3",
      sender: mockTeamMembers[2],
      content: "Привет всем! Да, и также обсудим статистику по тикетам за неделю",
      isRead: true,
      createdAt: "2024-10-22T09:10:00Z",
      updatedAt: "2024-10-22T09:10:00Z",
    },
    {
      id: "msg4",
      conversationId: "ch1",
      senderId: "tm1",
      sender: mockTeamMembers[0],
      content: "Отлично! Не забудьте подготовить отчёты",
      isRead: false,
      createdAt: "2024-10-22T14:30:00Z",
      updatedAt: "2024-10-22T14:30:00Z",
    },
  ],
};

// Mock messages for tickets
const mockTicketMessages: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "t1m1",
      conversationId: "1",
      senderId: "u1",
      content: "Здравствуйте! Я пытаюсь оплатить подписку через Payme, но постоянно получаю ошибку. Помогите пожалуйста!",
      isRead: true,
      createdAt: "2024-10-22T10:05:00Z",
      updatedAt: "2024-10-22T10:05:00Z",
    },
    {
      id: "t1m2",
      conversationId: "1",
      senderId: "tm3",
      sender: mockTeamMembers[2],
      content: "Здравствуйте, Алишер! Подскажите пожалуйста, какую именно ошибку вы видите? Можете прислать скриншот?",
      isRead: true,
      createdAt: "2024-10-22T11:00:00Z",
      updatedAt: "2024-10-22T11:00:00Z",
    },
    {
      id: "t1m3",
      conversationId: "1",
      senderId: "u1",
      content: 'Ошибка такая: "Транзакция отклонена банком". Что это значит?',
      isRead: false,
      createdAt: "2024-10-22T14:30:00Z",
      updatedAt: "2024-10-22T14:30:00Z",
    },
  ],
};

const getOnlineStatusColor = (status: OnlineStatus) => {
  switch (status) {
    case OnlineStatus.ONLINE:
      return "bg-green-500";
    case OnlineStatus.AWAY:
      return "bg-yellow-500";
    case OnlineStatus.BUSY:
      return "bg-red-500";
    case OnlineStatus.OFFLINE:
      return "bg-gray-400";
  }
};

const getDepartmentLabel = (dept: Department) => {
  const labels = {
    [Department.DEVELOPMENT]: "Разработка",
    [Department.SUPPORT]: "Поддержка",
    [Department.MODERATION]: "Модерация",
    [Department.MARKETING]: "Маркетинг",
    [Department.MANAGEMENT]: "Управление",
  };
  return labels[dept];
};

const getPriorityColor = (priority: SupportTicketPriority) => {
  switch (priority) {
    case SupportTicketPriority.URGENT:
      return "text-red-600";
    case SupportTicketPriority.HIGH:
      return "text-orange-600";
    case SupportTicketPriority.MEDIUM:
      return "text-blue-600";
    case SupportTicketPriority.LOW:
      return "text-gray-600";
  }
};

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<"support" | "team">("team");
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(
    mockChannels[0]
  );
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentMessages =
    activeTab === "team"
      ? selectedChannel
        ? mockChannelMessages[selectedChannel.id] || []
        : []
      : selectedTicket
      ? mockTicketMessages[selectedTicket.id] || []
      : [];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // API call here
    setMessageInput("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-card">
          <h2 className="font-bold text-lg mb-3">Мессенджер</h2>
          <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="team" active={activeTab === "team"}>
                Команда
              </TabsTrigger>
              <TabsTrigger value="support" active={activeTab === "support"}>
                Поддержка
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search */}
        <div className="p-3 border-b bg-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "team" ? (
            <div className="p-2">
              {/* Channels */}
              <div className="mb-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Каналы
                  </span>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-0.5">
                  {mockChannels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        selectedChannel?.id === channel.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      {channel.isPrivate ? (
                        <Lock className="h-4 w-4 shrink-0" />
                      ) : (
                        <Hash className="h-4 w-4 shrink-0" />
                      )}
                      <span className="flex-1 text-left truncate">
                        {channel.name}
                      </span>
                      {channel.unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="h-5 min-w-5 px-1 text-xs"
                        >
                          {channel.unreadCount}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Команда ({mockTeamMembers.filter((m) => m.onlineStatus === OnlineStatus.ONLINE).length} онлайн)
                  </span>
                </div>
                <div className="space-y-0.5">
                  {mockTeamMembers.map((member) => (
                    <button
                      key={member.id}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted"
                    >
                      <div className="relative">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                          {member.fullName.charAt(0)}
                        </div>
                        <div
                          className={cn(
                            "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                            getOnlineStatusColor(member.onlineStatus)
                          )}
                        />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-medium truncate">
                          {member.fullName}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {member.position}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-0.5 p-2">
              {mockTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={cn(
                    "w-full p-3 rounded-md text-left transition-colors",
                    selectedTicket?.id === ticket.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  )}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      {ticket.ticketNumber}
                    </span>
                    <span className={cn("text-xs font-semibold", getPriorityColor(ticket.priority))}>
                      •
                    </span>
                  </div>
                  <p className="font-medium text-sm line-clamp-2 mb-1">
                    {ticket.subject}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{ticket.user?.fullName}</span>
                    <span>•</span>
                    <span>{ticket.messagesCount} сообщений</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {(selectedChannel || selectedTicket) && (
          <div className="h-16 border-b bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {activeTab === "team" && selectedChannel && (
                <>
                  {selectedChannel.isPrivate ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Hash className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-semibold">{selectedChannel.name}</h3>
                    {selectedChannel.description && (
                      <p className="text-xs text-muted-foreground">
                        {selectedChannel.description}
                      </p>
                    )}
                  </div>
                </>
              )}
              {activeTab === "support" && selectedTicket && (
                <>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {selectedTicket.user?.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {selectedTicket.user?.fullName}
                      <span className="text-xs font-mono text-muted-foreground">
                        {selectedTicket.ticketNumber}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTicket.subject}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeTab === "team" && (
                <>
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Users className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="icon">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/20">
          {currentMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">
                  {activeTab === "team"
                    ? "Выберите канал для начала общения"
                    : "Выберите тикет для просмотра"}
                </p>
              </div>
            </div>
          ) : (
            currentMessages.map((message, idx) => {
              const isCurrentUser = message.sender?.role === UserRole.ADMIN;
              const showAvatar =
                idx === 0 ||
                currentMessages[idx - 1].senderId !== message.senderId;
              const showTimestamp =
                idx === currentMessages.length - 1 ||
                currentMessages[idx + 1].senderId !== message.senderId;

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 group",
                    !showAvatar && "ml-11"
                  )}
                >
                  {showAvatar ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {message.sender?.fullName?.charAt(0) || "U"}
                    </div>
                  ) : (
                    <div className="w-10 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    {showAvatar && (
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {message.sender?.fullName || "Пользователь"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="text-sm leading-relaxed break-words">
                      {message.content}
                    </div>
                    {!message.isRead && activeTab === "support" && (
                      <Badge variant="destructive" className="mt-1 text-xs">
                        Новое
                      </Badge>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Smile className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Message Input */}
        {(selectedChannel || selectedTicket) && (
          <div className="border-t bg-card p-4">
            <div className="flex items-end gap-3">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Plus className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder={
                    activeTab === "team"
                      ? `Сообщение в #${selectedChannel?.name}`
                      : "Ответить на тикет..."
                  }
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AtSign className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSendMessage} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
