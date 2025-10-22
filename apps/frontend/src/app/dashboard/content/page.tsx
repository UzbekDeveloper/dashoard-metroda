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
  Eye,
  Ban,
  X,
  FileText,
  Video,
  Headphones,
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShieldAlert,
  User,
} from "lucide-react";
import {
  Content,
  ContentType,
  ContentStatus,
  ContentReport,
  ReportReason,
  ReportStatus
} from "@/types";
import { cn } from "@/lib/utils";

// Mock data для жалоб
const mockReports: ContentReport[] = [
  {
    id: "r1",
    contentId: "c1",
    content: {
      id: "c1",
      title: "Подозрительная публикация о заработке",
      slug: "suspicious-earning-post",
      description: "Обещает легкий заработок без вложений",
      type: ContentType.TEXT,
      status: ContentStatus.PUBLISHED,
      authorId: "u5",
      views: 523,
      likes: 12,
      comments: 45,
      accessLevel: 0,
      createdAt: "2024-10-20T10:00:00Z",
      updatedAt: "2024-10-22T08:30:00Z",
      publishedAt: "2024-10-20T12:00:00Z",
    },
    reporterId: "u2",
    reason: ReportReason.SPAM,
    description: "Это типичная спам-схема, обещают быстрый заработок",
    status: ReportStatus.PENDING,
    createdAt: "2024-10-22T09:00:00Z",
    updatedAt: "2024-10-22T09:00:00Z",
  },
  {
    id: "r2",
    contentId: "c2",
    content: {
      id: "c2",
      title: "Неприемлемое видео",
      slug: "inappropriate-video",
      type: ContentType.VIDEO,
      status: ContentStatus.PUBLISHED,
      authorId: "u6",
      views: 1234,
      likes: 5,
      comments: 89,
      accessLevel: 0,
      createdAt: "2024-10-21T14:00:00Z",
      updatedAt: "2024-10-21T14:00:00Z",
      publishedAt: "2024-10-21T14:30:00Z",
    },
    reporterId: "u3",
    reason: ReportReason.PORNOGRAPHY,
    description: "Видео содержит неприемлемый контент для нашей платформы",
    status: ReportStatus.REVIEWING,
    reviewerId: "u1",
    createdAt: "2024-10-21T16:00:00Z",
    updatedAt: "2024-10-22T10:00:00Z",
  },
  {
    id: "r3",
    contentId: "c3",
    content: {
      id: "c3",
      title: "Статья с экстремистским контентом",
      slug: "extremist-content",
      type: ContentType.TEXT,
      status: ContentStatus.BLOCKED,
      authorId: "u7",
      views: 234,
      likes: 2,
      comments: 12,
      accessLevel: 0,
      createdAt: "2024-10-18T10:00:00Z",
      updatedAt: "2024-10-19T15:00:00Z",
      publishedAt: "2024-10-18T11:00:00Z",
      blockedAt: "2024-10-19T15:00:00Z",
      blockedReason: "Терроризм и экстремизм",
    },
    reporterId: "u4",
    reason: ReportReason.TERRORISM,
    description: "Пропагандирует экстремистские идеи",
    status: ReportStatus.RESOLVED,
    reviewerId: "u1",
    resolution: "Контент заблокирован. Автор предупрежден.",
    createdAt: "2024-10-18T12:00:00Z",
    updatedAt: "2024-10-19T15:00:00Z",
    resolvedAt: "2024-10-19T15:00:00Z",
  },
  {
    id: "r4",
    contentId: "c4",
    content: {
      id: "c4",
      title: "Обзор нового смартфона",
      slug: "smartphone-review",
      type: ContentType.TEXT,
      status: ContentStatus.PUBLISHED,
      authorId: "u2",
      views: 891,
      likes: 67,
      comments: 23,
      accessLevel: 0,
      createdAt: "2024-10-19T09:00:00Z",
      updatedAt: "2024-10-20T11:00:00Z",
      publishedAt: "2024-10-19T10:00:00Z",
    },
    reporterId: "u8",
    reason: ReportReason.MISINFORMATION,
    description: "Неточная информация о характеристиках устройства",
    status: ReportStatus.REJECTED,
    reviewerId: "u1",
    resolution: "Проверено. Информация корректна, жалоба отклонена.",
    createdAt: "2024-10-20T14:00:00Z",
    updatedAt: "2024-10-21T09:00:00Z",
    resolvedAt: "2024-10-21T09:00:00Z",
  },
  {
    id: "r5",
    contentId: "c5",
    content: {
      id: "c5",
      title: "Контент с оскорблениями",
      slug: "hate-speech-content",
      type: ContentType.TEXT,
      status: ContentStatus.PUBLISHED,
      authorId: "u9",
      views: 156,
      likes: 3,
      comments: 34,
      accessLevel: 0,
      createdAt: "2024-10-22T08:00:00Z",
      updatedAt: "2024-10-22T08:00:00Z",
      publishedAt: "2024-10-22T08:30:00Z",
    },
    reporterId: "u3",
    reason: ReportReason.HATE_SPEECH,
    description: "Содержит оскорбления на национальной почве",
    status: ReportStatus.PENDING,
    createdAt: "2024-10-22T11:00:00Z",
    updatedAt: "2024-10-22T11:00:00Z",
  },
];

const getReasonLabel = (reason: ReportReason): string => {
  const labels = {
    [ReportReason.SPAM]: "Спам",
    [ReportReason.PORNOGRAPHY]: "Порнография",
    [ReportReason.VIOLENCE]: "Насилие",
    [ReportReason.TERRORISM]: "Терроризм",
    [ReportReason.HATE_SPEECH]: "Hate Speech",
    [ReportReason.COPYRIGHT]: "Авторские права",
    [ReportReason.MISINFORMATION]: "Дезинформация",
    [ReportReason.OTHER]: "Другое",
  };
  return labels[reason];
};

const getReasonBadge = (reason: ReportReason) => {
  const config = {
    [ReportReason.SPAM]: { variant: "warning" as const },
    [ReportReason.PORNOGRAPHY]: { variant: "destructive" as const },
    [ReportReason.VIOLENCE]: { variant: "destructive" as const },
    [ReportReason.TERRORISM]: { variant: "destructive" as const },
    [ReportReason.HATE_SPEECH]: { variant: "destructive" as const },
    [ReportReason.COPYRIGHT]: { variant: "warning" as const },
    [ReportReason.MISINFORMATION]: { variant: "warning" as const },
    [ReportReason.OTHER]: { variant: "muted" as const },
  };

  return (
    <Badge variant={config[reason].variant} className="gap-1">
      <AlertTriangle className="h-3 w-3" />
      {getReasonLabel(reason)}
    </Badge>
  );
};

const getStatusBadge = (status: ReportStatus) => {
  switch (status) {
    case ReportStatus.PENDING:
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="h-3 w-3" />
          Ожидает
        </Badge>
      );
    case ReportStatus.REVIEWING:
      return (
        <Badge variant="info" className="gap-1">
          <Eye className="h-3 w-3" />
          На проверке
        </Badge>
      );
    case ReportStatus.RESOLVED:
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Решено
        </Badge>
      );
    case ReportStatus.REJECTED:
      return (
        <Badge variant="muted" className="gap-1">
          <X className="h-3 w-3" />
          Отклонено
        </Badge>
      );
  }
};

const getContentTypeIcon = (type: ContentType) => {
  switch (type) {
    case ContentType.TEXT:
      return <FileText className="h-4 w-4" />;
    case ContentType.VIDEO:
      return <Video className="h-4 w-4" />;
    case ContentType.AUDIO:
      return <Headphones className="h-4 w-4" />;
    case ContentType.IMAGE:
      return <ImageIcon className="h-4 w-4" />;
  }
};

export default function ContentModerationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedReason, setSelectedReason] = useState<string>("all");

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.content?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || report.status === selectedStatus;

    const matchesReason =
      selectedReason === "all" || report.reason === selectedReason;

    return matchesSearch && matchesStatus && matchesReason;
  });

  const stats = {
    total: mockReports.length,
    pending: mockReports.filter((r) => r.status === ReportStatus.PENDING).length,
    reviewing: mockReports.filter((r) => r.status === ReportStatus.REVIEWING).length,
    resolved: mockReports.filter((r) => r.status === ReportStatus.RESOLVED).length,
    rejected: mockReports.filter((r) => r.status === ReportStatus.REJECTED).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Модерация контента</h1>
        <p className="text-muted-foreground">
          Рассмотрение жалоб пользователей и контроль качества контента
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего жалоб
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="border-warning bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-warning">
              Ожидают
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground">
              Требуют проверки
            </p>
          </CardContent>
        </Card>

        <Card className="border-info bg-info/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-info">
              На проверке
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              {stats.reviewing}
            </div>
          </CardContent>
        </Card>

        <Card className="border-success bg-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">
              Решено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {stats.resolved}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Отклонено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Жалобы пользователей</CardTitle>
              <CardDescription>
                {filteredReports.length} жалоб найдено
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and filters */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по контенту или описанию жалобы..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">Все статусы</option>
              <option value={ReportStatus.PENDING}>Ожидают</option>
              <option value={ReportStatus.REVIEWING}>На проверке</option>
              <option value={ReportStatus.RESOLVED}>Решено</option>
              <option value={ReportStatus.REJECTED}>Отклонено</option>
            </select>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">Все причины</option>
              <option value={ReportReason.SPAM}>Спам</option>
              <option value={ReportReason.PORNOGRAPHY}>Порнография</option>
              <option value={ReportReason.VIOLENCE}>Насилие</option>
              <option value={ReportReason.TERRORISM}>Терроризм</option>
              <option value={ReportReason.HATE_SPEECH}>Hate Speech</option>
              <option value={ReportReason.COPYRIGHT}>Авторские права</option>
              <option value={ReportReason.MISINFORMATION}>Дезинформация</option>
            </select>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className={cn(
                  "transition-all hover:shadow-md",
                  report.status === ReportStatus.PENDING && "border-warning",
                  report.content?.status === ContentStatus.BLOCKED && "bg-destructive/5"
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {getReasonBadge(report.reason)}
                        {getStatusBadge(report.status)}
                        {report.content?.status === ContentStatus.BLOCKED && (
                          <Badge variant="destructive" className="gap-1">
                            <Ban className="h-3 w-3" />
                            Заблокирован
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {getContentTypeIcon(report.content?.type!)}
                        <CardTitle className="text-base">
                          {report.content?.title}
                        </CardTitle>
                      </div>

                      <CardDescription>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-3 w-3" />
                            <span className="font-medium">Жалоба:</span>
                            {report.description}
                          </div>
                          {report.content?.description && (
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">Контент:</span>{" "}
                              {report.content.description}
                            </div>
                          )}
                        </div>
                      </CardDescription>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xs text-muted-foreground">
                        {new Date(report.createdAt).toLocaleString("ru-RU")}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {report.content?.views}
                    </div>
                    <div className="flex items-center gap-1">
                      💬 {report.content?.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      ❤️ {report.content?.likes}
                    </div>
                  </div>

                  {/* Resolution */}
                  {report.resolution && (
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      <div className="font-medium mb-1">Решение:</div>
                      <div className="text-muted-foreground">{report.resolution}</div>
                    </div>
                  )}

                  {/* Blocked reason */}
                  {report.content?.blockedReason && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive p-3 text-sm">
                      <div className="font-medium mb-1 text-destructive">
                        Причина блокировки:
                      </div>
                      <div>{report.content.blockedReason}</div>
                    </div>
                  )}

                  {/* Actions */}
                  {report.status === ReportStatus.PENDING ||
                  report.status === ReportStatus.REVIEWING ? (
                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Просмотреть контент
                      </Button>
                      {report.content?.status !== ContentStatus.BLOCKED && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-2"
                        >
                          <Ban className="h-4 w-4" />
                          Заблокировать контент
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="gap-2">
                        <X className="h-4 w-4" />
                        Отклонить жалобу
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Просмотреть детали
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ShieldAlert className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Жалоб не найдено</h3>
              <p className="text-sm text-muted-foreground">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
