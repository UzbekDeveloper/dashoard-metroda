"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Task, TaskPriority, TaskStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag, Clock } from "lucide-react";

interface TaskDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onUpdateTask: (
    taskId: string,
    updates: {
      title: string;
      description: string;
      priority: TaskPriority;
      status: TaskStatus;
      tags: string[];
      dueDate?: string;
    }
  ) => void;
}

export function TaskDetailsDialog({
  open,
  onOpenChange,
  task,
  onUpdateTask,
}: TaskDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority);
      setStatus(task.status);
      setTags(task.tags.join(", "));
      setDueDate(task.dueDate || "");
      setIsEditing(false);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !title.trim()) return;

    onUpdateTask(task.id, {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      dueDate: dueDate || undefined,
    });

    setIsEditing(false);
    onOpenChange(false);
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT:
        return "bg-destructive text-destructive-foreground";
      case TaskPriority.HIGH:
        return "bg-warning text-warning-foreground";
      case TaskPriority.MEDIUM:
        return "bg-info text-info-foreground";
      case TaskPriority.LOW:
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT:
        return "Срочно";
      case TaskPriority.HIGH:
        return "Высокий";
      case TaskPriority.MEDIUM:
        return "Средний";
      case TaskPriority.LOW:
        return "Низкий";
      default:
        return priority;
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "To Do";
      case TaskStatus.IN_PROGRESS:
        return "In Progress";
      case TaskStatus.REVIEW:
        return "Review";
      case TaskStatus.DONE:
        return "Done";
      default:
        return status;
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Редактировать задачу" : "Детали задачи"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Внесите изменения в задачу"
              : "Просмотр информации о задаче"}
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Название задачи*</Label>
              <Input
                id="edit-title"
                placeholder="Например: Настроить CI/CD pipeline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Описание</Label>
              <Textarea
                id="edit-description"
                placeholder="Подробное описание задачи..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-priority">Приоритет</Label>
                <select
                  id="edit-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value={TaskPriority.LOW}>Низкий</option>
                  <option value={TaskPriority.MEDIUM}>Средний</option>
                  <option value={TaskPriority.HIGH}>Высокий</option>
                  <option value={TaskPriority.URGENT}>Срочно</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Статус</Label>
                <select
                  id="edit-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value={TaskStatus.TODO}>To Do</option>
                  <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                  <option value={TaskStatus.REVIEW}>Review</option>
                  <option value={TaskStatus.DONE}>Done</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dueDate">Дедлайн</Label>
              <Input
                id="edit-dueDate"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tags">Теги (через запятую)</Label>
              <Input
                id="edit-tags"
                placeholder="Backend, DevOps, High Priority"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Отмена
              </Button>
              <Button type="submit">Сохранить изменения</Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <Badge className={getPriorityColor(task.priority)}>
                {getPriorityLabel(task.priority)}
              </Badge>
            </div>

            {task.description && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Описание
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  Статус
                </div>
                <p className="text-sm">{getStatusLabel(task.status)}</p>
              </div>

              {task.dueDate && (
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Дедлайн
                  </div>
                  <p className="text-sm">
                    {new Date(task.dueDate).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
            </div>

            {task.assignees && task.assignees.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4" />
                  Исполнители
                </div>
                <div className="flex gap-2">
                  {task.assignees.map((assignee) => (
                    <Badge key={assignee.id} variant="secondary">
                      {assignee.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {task.tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  Теги
                </div>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Создано:{" "}
                {new Date(task.createdAt).toLocaleDateString("ru-RU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Закрыть
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                Редактировать
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
