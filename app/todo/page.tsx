'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckSquare, Settings, LogOut, ChevronLeft, ChevronRight, Menu,
  NotebookPen, PenLine, Trash2
} from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
}

interface TodoItem {
  id: string;
  text: string;
  checked: boolean;
}

export default function TodoPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [newTodoItem, setNewTodoItem] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const savedActivities = JSON.parse(localStorage.getItem('activities') || '[]');
    
    if (savedActivities.length === 0) {
      const defaultActivities: Activity[] = [
        { id: '1', title: 'Gym Session Week 3', subtitle: 'Day for biceps, legs, and back. The target is 20 for biceps, 10 for legs, and 15 for back', category: 'Work', categoryColor: 'bg-purple-100' },
        { id: '2', title: 'Advanced Piano Class', subtitle: 'Practicing melody with Mrs. Angelina', category: 'Learning', categoryColor: 'bg-blue-100' },
        { id: '3', title: 'Product Design Webinar', subtitle: 'Takeaways Product Design Webinar', category: 'Learning', categoryColor: 'bg-pink-100' }
      ];
      setActivities(defaultActivities);
      localStorage.setItem('activities', JSON.stringify(defaultActivities));
    } else {
      setActivities(savedActivities);
    }
    
    setUser(savedUser || { name: 'Guest' });
    setLoading(false);
  }, []);

  const saveActivities = (updatedActivities: Activity[]) => {
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
  };

  const deleteActivity = (id: string) => {
    const updated = activities.filter(a => a.id !== id);
    saveActivities(updated);
    if (selectedActivity?.id === id) {
      setSelectedActivity(null);
      setTodoItems([]);
    }
  };

  const addTodoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoItem.trim()) return;
    
    const newItem: TodoItem = {
      id: Date.now().toString(),
      text: newTodoItem,
      checked: false
    };
    
    setTodoItems([...todoItems, newItem]);
    setNewTodoItem('');
  };

  const toggleTodoItem = (id: string) => {
    setTodoItems(todoItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteTodoItem = (id: string) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  const markAllAsDone = () => {
    setTodoItems(todoItems.map(item => ({ ...item, checked: true })));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/register');
  };

  const folders = [
    { id: 1, name: 'My Notes', icon: NotebookPen, active: false, path: '/dashboard' },
    { id: 2, name: 'To-do list', icon: CheckSquare, active: true, path: '/todo' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFAF2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CD5C5C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FFFAF2] overflow-hidden">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#CD5C5C] flex flex-col overflow-hidden transition-[width] duration-300 ease-in-out`}>
        {/* Logo/Brand */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#CD5C5C]">
                <span className="text-2xl font-bold">𔓘</span>
              </div>
              {isSidebarOpen && (
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white">Keio</h2>
                </div>
              )}
            </div>
            {isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                aria-label="Toggle sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-full mt-3 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              aria-label="Open sidebar"
            >
              <ChevronRight className="w-4 h-4 mx-auto" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => router.push(folder.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                folder.active
                  ? 'bg-white text-[#CD5C5C] font-semibold shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              } ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <folder.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{folder.name}</span>}
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="p-3 space-y-1 border-t border-white/20">
          <button
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all ${
              !isSidebarOpen ? 'justify-center' : ''
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:bg-white/20 hover:text-white transition-all ${
              !isSidebarOpen ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Section - Activities */}
        <div className="flex-1 bg-white p-8 overflow-y-auto">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-2">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 -ml-2 rounded-md hover:bg-gray-100"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
              )}
              <h1 className="text-3xl font-bold text-gray-900">Halo, {user?.name}!</h1>
              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                + New Activity
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-8">Manage your reminders, events, activities.</p>

            {/* Activity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activities.map(activity => (
                <div
                  key={activity.id}
                  onClick={() => setSelectedActivity(activity)}
                  className="relative bg-white rounded-lg border border-gray-200 cursor-pointer transition-all hover:shadow-lg hover:border-[#CD5C5C] group p-3 hover:bg-[#CD5C5C]/5"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteActivity(activity.id);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-md text-red-600 bg-white/90 backdrop-blur-sm hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Delete activity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  
                  <div className="flex items-center justify-between mb-2 text-[10px] text-gray-400">
                    <span className={`${activity.categoryColor.replace('bg-', 'bg-[#134686]/')} px-1.5 py-0.5 text-[#134686] text-[10px] rounded`}>
                      {activity.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5">{activity.title}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-3">{activity.subtitle}</p>
                </div>
              ))}
            </div>

            {activities.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm">No activities yet. Click "New Activity" to add one.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Activity Detail */}
        <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          {selectedActivity ? (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedActivity.title}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {selectedActivity.subtitle}
              </p>

              {/* Activity Details */}
              <div className="mb-6">
                <span className={`${selectedActivity.categoryColor} px-3 py-1 rounded text-xs font-medium inline-block`}>
                  📋 {selectedActivity.category}
                </span>
              </div>

              {/* To Do Section */}
              <h4 className="text-sm font-semibold text-gray-900 mb-3">To Do</h4>

              {/* Add To Do Input */}
              <form onSubmit={addTodoItem} className="mb-3">
                <input
                  type="text"
                  value={newTodoItem}
                  onChange={(e) => setNewTodoItem(e.target.value)}
                  placeholder="+ Add To Do"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]"
                />
              </form>

              {/* Todo Items */}
              <div className="space-y-2 mb-6">
                {todoItems.map(item => (
                  <div key={item.id} className="flex items-center gap-2 text-sm text-gray-700 group">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={item.checked}
                      onChange={() => toggleTodoItem(item.id)}
                    />
                    <span className={`flex-1 ${item.checked ? 'line-through text-gray-400' : ''}`}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => deleteTodoItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Mark as Done Button */}
              <button
                onClick={markAllAsDone}
                className="w-full bg-[#CD5C5C] text-white py-3 rounded-xl font-medium hover:bg-[#CD5C5C]/90 transition"
              >
                Mark as Done
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <CheckSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-sm">Select an activity to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
