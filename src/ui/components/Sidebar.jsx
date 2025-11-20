import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Sparkles, BarChart3, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Bảng điều khiển' },
  { to: '/quizzes', icon: FileText, label: 'Bài thi' },
  { to: '/ai-generate', icon: Sparkles, label: 'Tạo câu hỏi AI' },
  { to: '/participants', icon: Users, label: 'Học viên' },
  { to: '/reports', icon: BarChart3, label: 'Thống kê' },
  { to: '/profile', icon: User, label: 'Hồ sơ' }
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-sidebar">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-foreground">MyQuizz</h1>
        <p className="text-sm text-sidebar-foreground/80 mt-1">Quản lý bài thi trực tuyến</p>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
