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
  BLOCKED = "blocked", // Заблокирован модератором
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
  blockedAt?: string;
  blockedReason?: string;
}

// Report types (система жалоб)
export enum ReportReason {
  SPAM = "spam",
  PORNOGRAPHY = "pornography",
  VIOLENCE = "violence",
  TERRORISM = "terrorism",
  HATE_SPEECH = "hate_speech",
  COPYRIGHT = "copyright",
  MISINFORMATION = "misinformation",
  OTHER = "other",
}

export enum ReportStatus {
  PENDING = "pending",
  REVIEWING = "reviewing",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export interface ContentReport {
  id: string;
  contentId: string;
  content?: Content;
  reporterId: string;
  reporter?: User;
  reason: ReportReason;
  description?: string;
  status: ReportStatus;
  reviewerId?: string;
  reviewer?: User;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
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
export enum SupportTicketStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  WAITING_USER = "waiting_user",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

export enum SupportTicketPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum SupportTicketCategory {
  TECHNICAL = "technical",
  PAYMENT = "payment",
  CONTENT = "content",
  SUBSCRIPTION = "subscription",
  ACCOUNT = "account",
  OTHER = "other",
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  content: string;
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  user?: User;
  subject: string;
  category: SupportTicketCategory;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  assignedToId?: string;
  assignedTo?: User;
  messagesCount: number;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface ChatConversation {
  id: string;
  ticketId?: string;
  ticket?: SupportTicket;
  participants: User[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
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
