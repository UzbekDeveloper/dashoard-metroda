// User types
export enum UserRole {
  USER = "user",
  AUTHOR = "author",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

export enum UserStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
  PENDING = "pending",
}

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

// Content types
export enum ContentType {
  TEXT = "text",
  VIDEO = "video",
  AUDIO = "audio",
  IMAGE = "image",
}

export enum ContentStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  MODERATION = "moderation",
  REJECTED = "rejected",
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  description?: string;
  type: ContentType;
  status: ContentStatus;
  authorId: string;
  author?: User;
  views: number;
  likes: number;
  comments: number;
  accessLevel: number; // 0 = free, 1+ = subscription tier
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Subscription types
export interface SubscriptionPlan {
  id: string;
  authorId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // in days
  benefits: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan?: SubscriptionPlan;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  createdAt: string;
}

// Payment types
export enum PaymentMethod {
  PAYME = "payme",
  CLICK = "click",
  UZUM = "uzum",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  subscriptionId?: string;
  createdAt: string;
  completedAt?: string;
}

// Task types (for internal task management)
export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  DONE = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assignee?: User;
  creatorId: string;
  creator?: User;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Chat types
export interface ChatMessage {
  id: string;
  senderId: string;
  sender?: User;
  recipientId: string;
  recipient?: User;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  participants: User[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
}

// Analytics types
export interface DashboardStats {
  totalUsers: number;
  activeAuthors: number;
  totalPosts: number;
  totalViews: number;
  monthlyRevenue: number;
  subscriptionGrowth: number;
  userGrowth: number;
  contentGrowth: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  subscriptions: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
