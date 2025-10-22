"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
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
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  MoreVertical,
  Clock,
  Flag,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import { Task, TaskStatus, TaskPriority } from "@/types";
import { cn } from "@/lib/utils";
import { CreateTaskDialog } from "@/features/tasks/components/create-task-dialog";
import { TaskDetailsDialog } from "@/features/tasks/components/task-details-dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Настроить CI/CD pipeline",
    description: "Добавить GitHub Actions для автоматической сборки и деплоя",
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    creatorId: "1",
    tags: ["DevOps", "Backend"],
    createdAt: "2024-10-20T10:00:00Z",
    updatedAt: "2024-10-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Реализовать систему уведомлений",
    description: "WebSocket для real-time уведомлений",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.URGENT,
    assigneeId: "2",
    creatorId: "1",
    dueDate: "2024-10-25T23:59:59Z",
    tags: ["Backend", "Real-time"],
    createdAt: "2024-10-18T09:00:00Z",
    updatedAt: "2024-10-22T11:00:00Z",
  },
  {
    id: "3",
    title: "Дизайн мобильного приложения",
    description: "Создать макеты для iOS и Android версий",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    assigneeId: "3",
    creatorId: "1",
    tags: ["Design", "Mobile"],
    createdAt: "2024-10-19T14:00:00Z",
    updatedAt: "2024-10-21T16:00:00Z",
  },
  {
    id: "4",
    title: "Code review: Payment Service",
    description: "Проверить интеграцию с Payme и Click",
    status: TaskStatus.REVIEW,
    priority: TaskPriority.HIGH,
    assigneeId: "1",
    creatorId: "2",
    dueDate: "2024-10-23T18:00:00Z",
    tags: ["Review", "Payment"],
    createdAt: "2024-10-21T10:00:00Z",
    updatedAt: "2024-10-22T09:00:00Z",
  },
  {
    id: "5",
    title: "Написать unit тесты для Auth Service",
    description: "Покрытие минимум 80%",
    status: TaskStatus.DONE,
    priority: TaskPriority.MEDIUM,
    assigneeId: "2",
    creatorId: "1",
    tags: ["Testing", "Backend"],
    createdAt: "2024-10-15T08:00:00Z",
    updatedAt: "2024-10-19T17:00:00Z",
  },
  {
    id: "6",
    title: "Оптимизация базы данных",
    description: "Добавить индексы, оптимизировать запросы",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    creatorId: "1",
    tags: ["Database", "Performance"],
    createdAt: "2024-10-22T08:00:00Z",
    updatedAt: "2024-10-22T08:00:00Z",
  },
  {
    id: "7",
    title: "Документация API endpoints",
    description: "Swagger/OpenAPI спецификация",
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    creatorId: "1",
    tags: ["Documentation"],
    createdAt: "2024-10-21T15:00:00Z",
    updatedAt: "2024-10-21T15:00:00Z",
  },
];

const columns: { id: TaskStatus; title: string; icon: any }[] = [
  { id: TaskStatus.TODO, title: "To Do", icon: Circle },
  { id: TaskStatus.IN_PROGRESS, title: "In Progress", icon: Clock },
  { id: TaskStatus.REVIEW, title: "Review", icon: AlertCircle },
  { id: TaskStatus.DONE, title: "Done", icon: CheckCircle2 },
];

const getPriorityBadge = (priority: TaskPriority) => {
  const config = {
    [TaskPriority.URGENT]: { variant: "destructive" as const, label: "Срочно" },
    [TaskPriority.HIGH]: { variant: "warning" as const, label: "Высокий" },
    [TaskPriority.MEDIUM]: { variant: "info" as const, label: "Средний" },
    [TaskPriority.LOW]: { variant: "muted" as const, label: "Низкий" },
  };

  const { variant, label } = config[priority];

  return (
    <Badge variant={variant} className="gap-1">
      <Flag className="h-3 w-3" />
      {label}
    </Badge>
  );
};

function DraggableTaskCard({
  task,
  onOpenDetails,
  onEdit,
  onDelete,
}: {
  task: Task;
  onOpenDetails: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-50")}
    >
      <Card
        className={cn(
          "transition-all hover:shadow-md",
          isOverdue && "border-destructive"
        )}
      >
        <div
          {...listeners}
          {...attributes}
          className="cursor-move"
          onClick={() => onOpenDetails(task)}
        >
          <CardHeader className="space-y-2 pb-3">
            <div className="flex items-start justify-between gap-2">
              {getPriorityBadge(task.priority)}
              <DropdownMenu
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                }
              >
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpenDetails(task)}>
                  Посмотреть детали
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(task.id)}
                >
                  Удалить
                </DropdownMenuItem>
              </DropdownMenu>
            </div>
            <CardTitle className="text-sm font-semibold leading-tight">
              {task.title}
            </CardTitle>
            {task.description && (
              <CardDescription className="line-clamp-2 text-xs">
                {task.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {task.assigneeId && (
                <div className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    A
                  </div>
                </div>
              )}
              {task.dueDate && (
                <div
                  className={cn(
                    "flex items-center gap-1",
                    isOverdue && "text-destructive font-medium"
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {new Date(task.dueDate).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE;

  return (
    <Card
      className={cn(
        "cursor-move transition-all hover:shadow-md",
        isOverdue && "border-destructive"
      )}
    >
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-2">
          {getPriorityBadge(task.priority)}
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-sm font-semibold leading-tight">
          {task.title}
        </CardTitle>
        {task.description && (
          <CardDescription className="line-clamp-2 text-xs">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {task.assigneeId && (
            <div className="flex items-center gap-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                A
              </div>
            </div>
          )}
          {task.dueDate && (
            <div
              className={cn(
                "flex items-center gap-1",
                isOverdue && "text-destructive font-medium"
              )}
            >
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short",
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function DroppableColumn({
  column,
  tasks,
  onOpenDetails,
  onEdit,
  onDelete,
}: {
  column: { id: TaskStatus; title: string; icon: any };
  tasks: Task[];
  onOpenDetails: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const Icon = column.icon;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-w-[300px] flex-1 flex-col rounded-lg border bg-muted/30 transition-colors",
        isOver && "border-primary bg-primary/5"
      )}
    >
      <div className="flex items-center gap-2 border-b bg-card p-4">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">{column.title}</h3>
        <Badge variant="secondary" className="ml-auto">
          {tasks.length}
        </Badge>
      </div>
      <div className="flex-1 space-y-3 p-4 min-h-[400px]">
        {tasks.map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            onOpenDetails={onOpenDetails}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed text-sm text-muted-foreground">
            Перетащите задачу сюда
          </div>
        )}
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    setActiveId(null);
  };

  const handleCreateTask = (newTask: {
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    tags: string[];
    dueDate?: string;
  }) => {
    const task: Task = {
      id: String(tasks.length + 1),
      ...newTask,
      creatorId: "1", // Mock creator
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleUpdateTask = (
    taskId: string,
    updates: {
      title: string;
      description: string;
      priority: TaskPriority;
      status: TaskStatus;
      tags: string[];
      dueDate?: string;
    }
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const handleOpenDetails = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsDialogOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsDialogOpen(true);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTasksByStatus = (status: TaskStatus) =>
    filteredTasks.filter((task) => task.status === status);

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === TaskStatus.TODO).length,
    inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
    review: tasks.filter((t) => t.status === TaskStatus.REVIEW).length,
    done: tasks.filter((t) => t.status === TaskStatus.DONE).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Задачи</h1>
          <p className="text-muted-foreground">
            Kanban доска для управления задачами команды
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Создать задачу
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего задач
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              To Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todo}</div>
          </CardContent>
        </Card>
        <Card className="border-info bg-info/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-info">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              {stats.inProgress}
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-warning">
              Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {stats.review}
            </div>
          </CardContent>
        </Card>
        <Card className="border-success bg-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">
              Done
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.done}</div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск задач..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Фильтры
        </Button>
        <Button variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          Исполнители
        </Button>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <DroppableColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              onOpenDetails={handleOpenDetails}
              onEdit={handleEdit}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Modals */}
      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTask={handleCreateTask}
      />

      <TaskDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}
