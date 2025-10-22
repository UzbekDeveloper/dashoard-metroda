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
  ThumbsUp,
  ThumbsDown,
  Trash2,
  MessageSquare,
  Heart,
  FileText,
  Video,
  Headphones,
  Image as ImageIcon,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Content, ContentType, ContentStatus } from "@/types";

// Mock data
const mockContent: Content[] = [
  {
    id: "1",
    title: "10 советов по программированию для начинающих",
    slug: "10-sovetov-po-programmirovaniyu",
    description: "Подробное руководство для тех, кто только начинает свой путь в IT",
    type: ContentType.TEXT,
    status: ContentStatus.PUBLISHED,
    authorId: "2",
    views: 1234,
    likes: 89,
    comments: 23,
    accessLevel: 0,
    createdAt: "2024-10-20T10:00:00Z",
    updatedAt: "2024-10-22T08:30:00Z",
    publishedAt: "2024-10-20T12:00:00Z",
  },
  {
    id: "2",
    title: "Обзор новых возможностей Next.js 15",
    slug: "obzor-novyh-vozmozhnostej-nextjs-15",
    description: "Детальный разбор всех новых фич в последней версии Next.js",
    type: ContentType.VIDEO,
    status: ContentStatus.MODERATION,
    authorId: "3",
    views: 0,
    likes: 0,
    comments: 0,
    accessLevel: 1,
    createdAt: "2024-10-22T09:00:00Z",
    updatedAt: "2024-10-22T09:00:00Z",
  },
  {
    id: "3",
    title: "Подкаст: Будущее веб-разработки",
    slug: "podcast-budushchee-veb-razrabotki",
    description: "Обсуждаем тренды и технологии будущего",
    type: ContentType.AUDIO,
    status: ContentStatus.PUBLISHED,
    authorId: "2",
    views: 567,
    likes: 45,
    comments: 12,
    accessLevel: 0,
    createdAt: "2024-10-18T14:00:00Z",
    updatedAt: "2024-10-21T16:00:00Z",
    publishedAt: "2024-10-18T15:00:00Z",
  },
  {
    id: "4",
    title: "Инфографика: Архитектура микросервисов",
    slug: "infografika-arhitektura-mikroservisov",
    type: ContentType.IMAGE,
    status: ContentStatus.MODERATION,
    authorId: "3",
    views: 0,
    likes: 0,
    comments: 0,
    accessLevel: 0,
    createdAt: "2024-10-22T11:00:00Z",
    updatedAt: "2024-10-22T11:00:00Z",
  },
  {
    id: "5",
    title: "Неприемлемый контент для удаления",
    slug: "inappropriate-content",
    description: "Контент нарушает правила платформы",
    type: ContentType.TEXT,
    status: ContentStatus.REJECTED,
    authorId: "5",
    views: 12,
    likes: 0,
    comments: 1,
    accessLevel: 0,
    createdAt: "2024-10-15T10:00:00Z",
    updatedAt: "2024-10-16T09:00:00Z",
  },
  {
    id: "6",
    title: "Как настроить Docker для разработки",
    slug: "kak-nastroit-docker-dlya-razrabotki",
    type: ContentType.TEXT,
    status: ContentStatus.DRAFT,
    authorId: "2",
    views: 0,
    likes: 0,
    comments: 0,
    accessLevel: 0,
    createdAt: "2024-10-22T12:00:00Z",
    updatedAt: "2024-10-22T12:30:00Z",
  },
];

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

const getContentTypeBadge = (type: ContentType) => {
  const icon = getContentTypeIcon(type);
  const labels = {
    [ContentType.TEXT]: "Статья",
    [ContentType.VIDEO]: "Видео",
    [ContentType.AUDIO]: "Аудио",
    [ContentType.IMAGE]: "Изображение",
  };

  return (
    <Badge variant="outline" className="gap-1">
      {icon}
      {labels[type]}
    </Badge>
  );
};

const getStatusBadge = (status: ContentStatus) => {
  switch (status) {
    case ContentStatus.PUBLISHED:
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Опубликовано
        </Badge>
      );
    case ContentStatus.MODERATION:
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="h-3 w-3" />
          На модерации
        </Badge>
      );
    case ContentStatus.REJECTED:
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Отклонено
        </Badge>
      );
    case ContentStatus.DRAFT:
      return (
        <Badge variant="muted" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          Черновик
        </Badge>
      );
  }
};

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredContent = mockContent.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || content.status === selectedStatus;
    const matchesType = selectedType === "all" || content.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: mockContent.length,
    published: mockContent.filter((c) => c.status === ContentStatus.PUBLISHED)
      .length,
    moderation: mockContent.filter((c) => c.status === ContentStatus.MODERATION)
      .length,
    rejected: mockContent.filter((c) => c.status === ContentStatus.REJECTED)
      .length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Модерация контента</h1>
        <p className="text-muted-foreground">
          Управление публикациями на платформе
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего публикаций
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Все типы контента
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Опубликовано
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {stats.published}
            </div>
            <p className="text-xs text-muted-foreground">
              Активный контент
            </p>
          </CardContent>
        </Card>

        <Card className="border-warning bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-warning">
              На модерации
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {stats.moderation}
            </div>
            <p className="text-xs text-muted-foreground">
              Требует проверки
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Отклонено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.rejected}
            </div>
            <p className="text-xs text-muted-foreground">
              Нарушения правил
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Контент</CardTitle>
              <CardDescription>
                {filteredContent.length} публикаций найдено
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Дополнительные фильтры
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and filters */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию или описанию..."
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
              <option value={ContentStatus.PUBLISHED}>Опубликовано</option>
              <option value={ContentStatus.MODERATION}>На модерации</option>
              <option value={ContentStatus.DRAFT}>Черновики</option>
              <option value={ContentStatus.REJECTED}>Отклонено</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">Все типы</option>
              <option value={ContentType.TEXT}>Статьи</option>
              <option value={ContentType.VIDEO}>Видео</option>
              <option value={ContentType.AUDIO}>Аудио</option>
              <option value={ContentType.IMAGE}>Изображения</option>
            </select>
          </div>

          {/* Content Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((content) => (
              <Card
                key={content.id}
                className={`overflow-hidden transition-all hover:shadow-md ${
                  content.status === ContentStatus.MODERATION
                    ? "border-warning"
                    : ""
                }`}
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    {getContentTypeBadge(content.type)}
                    {getStatusBadge(content.status)}
                  </div>
                  <CardTitle className="line-clamp-2 text-base">
                    {content.title}
                  </CardTitle>
                  {content.description && (
                    <CardDescription className="line-clamp-2">
                      {content.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {content.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {content.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {content.comments}
                    </div>
                  </div>

                  {/* Access Level */}
                  {content.accessLevel > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      Премиум (уровень {content.accessLevel})
                    </Badge>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {content.status === ContentStatus.MODERATION && (
                      <>
                        <Button
                          size="sm"
                          className="flex-1 gap-1 bg-success hover:bg-success/90"
                        >
                          <ThumbsUp className="h-3 w-3" />
                          Одобрить
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1 gap-1"
                        >
                          <ThumbsDown className="h-3 w-3" />
                          Отклонить
                        </Button>
                      </>
                    )}
                    {content.status !== ContentStatus.MODERATION && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Просмотр
                        </Button>
                        {content.status !== ContentStatus.REJECTED && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Date */}
                  <div className="text-xs text-muted-foreground">
                    Создано:{" "}
                    {new Date(content.createdAt).toLocaleDateString("ru-RU")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Контент не найден
              </h3>
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
