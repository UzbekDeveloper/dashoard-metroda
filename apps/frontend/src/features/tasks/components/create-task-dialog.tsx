"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TaskPriority, TaskStatus } from "@/types";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTask: (task: {
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    tags: string[];
    dueDate?: string;
  }) => void;
}

export function CreateTaskDialog({
  open,
  onOpenChange,
  onCreateTask,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onCreateTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      dueDate: dueDate || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority(TaskPriority.MEDIUM);
    setStatus(TaskStatus.TODO);
    setTags("");
    setDueDate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogClose onClose={() => onOpenChange(false)} />
        <DialogHeader>
          <DialogTitle>Создать новую задачу</DialogTitle>
          <DialogDescription>
            Заполните информацию о задаче для команды
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название задачи*</Label>
            <Input
              id="title"
              placeholder="Например: Настроить CI/CD pipeline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Подробное описание задачи..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Приоритет</Label>
              <select
                id="priority"
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
              <Label htmlFor="status">Статус</Label>
              <select
                id="status"
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
            <Label htmlFor="dueDate">Дедлайн</Label>
            <Input
              id="dueDate"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Теги (через запятую)</Label>
            <Input
              id="tags"
              placeholder="Backend, DevOps, High Priority"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="submit">Создать задачу</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
