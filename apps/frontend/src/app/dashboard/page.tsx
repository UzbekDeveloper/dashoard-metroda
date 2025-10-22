import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  UserCheck,
  Eye,
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

// Mock data - will be replaced with real API calls
const stats = [
  {
    name: "Всего пользователей",
    value: "2,543",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Активные авторы",
    value: "342",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: UserCheck,
  },
  {
    name: "Публикаций",
    value: "1,289",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    name: "Просмотры",
    value: "45.2K",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: Eye,
  },
  {
    name: "Доход (месяц)",
    value: "15.2M UZS",
    change: "+18.7%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    name: "Рост подписок",
    value: "+234",
    change: "+9.4%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
];

const recentActivity = [
  {
    id: 1,
    user: "Абдулазиз Абдулазизов",
    action: "создал новую публикацию",
    time: "5 минут назад",
  },
  {
    id: 2,
    user: "Азиза Каримова",
    action: "подписался на автора",
    time: "12 минут назад",
  },
  {
    id: 3,
    user: "Шохрух Содиков",
    action: "оставил комментарий",
    time: "1 час назад",
  },
  {
    id: 4,
    user: "Нодира Юсупова",
    action: "оформил премиум подписку",
    time: "2 часа назад",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <p className="text-muted-foreground">
          Обзор ключевых метрик платформы METRODA
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} от прошлого месяца
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity and top authors */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Последняя активность</CardTitle>
            <CardDescription>
              Недавние действия пользователей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 rounded-lg border p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {activity.user[0]}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>
              Часто используемые операции
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full rounded-lg border border-dashed p-4 text-left hover:bg-accent transition-colors">
                <div className="font-medium">Создать задачу</div>
                <div className="text-sm text-muted-foreground">
                  Добавить новую задачу в систему
                </div>
              </button>
              <button className="w-full rounded-lg border border-dashed p-4 text-left hover:bg-accent transition-colors">
                <div className="font-medium">Модерировать контент</div>
                <div className="text-sm text-muted-foreground">
                  Проверить ожидающие публикации
                </div>
              </button>
              <button className="w-full rounded-lg border border-dashed p-4 text-left hover:bg-accent transition-colors">
                <div className="font-medium">Просмотреть отчеты</div>
                <div className="text-sm text-muted-foreground">
                  Финансовые отчеты за период
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
