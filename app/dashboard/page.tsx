'use client';

import { useState, useEffect } from 'react';
import {
  NotebookPen, Search, Plus, MoreHorizontal, Settings, CheckSquare,
  Briefcase, BookOpen, PenLine, X, Calendar, ChevronLeft,
  ChevronRight, Menu, Save, Upload, LogOut
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isListVisible, setIsListVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isPaneEntering, setIsPaneEntering] = useState(false);
  const [isListEntering, setIsListEntering] = useState(false);

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [newNoteFolder, setNewNoteFolder] = useState('My Notes');
  const [images, setImages] = useState<Array<{ id: string; url: string; name: string }>>([]);

  // load from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setUser(savedUser || { name: 'Guest' });
    setNotes(savedNotes);
    setLoading(false);
  }, []);

  const saveNotes = (updatedNotes: any[]) => {
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleNoteClick = (note: any) => {
    setSelectedNote(note);
    // Prepare enter animation for the detail pane
    setIsPaneEntering(true);
    setIsListEntering(true);
    setIsDetailOpen(true);
    setIsListVisible(true);
    setTimeout(() => setIsPaneEntering(false), 300);
    setTimeout(() => setIsListEntering(false), 300);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setIsListVisible(true);
    setTimeout(() => setSelectedNote(null), 500);
  };

  const openCreateNote = () => {
    setIsPaneEntering(true);
    setIsListEntering(true);
    setIsCreateNoteOpen(true);
    setIsDetailOpen(false);
    setIsListVisible(true);
    setTimeout(() => setIsPaneEntering(false), 300);
    setTimeout(() => setIsListEntering(false), 300);
  };

  const closeCreateNote = () => {
    setIsCreateNoteOpen(false);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags([]);
    setTagInput('');
    setImages([]);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newNoteTags.includes(tagInput.trim())) {
      setNewNoteTags([...newNoteTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewNoteTags(newNoteTags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage = {
            id: Math.random().toString(36).substr(2, 9),
            url: event.target?.result as string,
            name: file.name,
          };
          setImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (imageId: string) => {
    setImages(images.filter((img) => img.id !== imageId));
  };

  const handleSaveNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: newNoteContent,
      tags: newNoteTags,
      images: images,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updatedNotes = [newNote, ...notes];
    saveNotes(updatedNotes);
    closeCreateNote();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Logged out (frontend only)');
  };

  const folders = [
    { id: 1, name: 'My Notes', icon: NotebookPen, active: true },
    { id: 2, name: 'To-do list', icon: CheckSquare, active: false },
    { id: 3, name: 'Projects', icon: Briefcase, active: false },
    { id: 4, name: 'Journal', icon: PenLine, active: false },
    { id: 5, name: 'Reading List', icon: BookOpen, active: false },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase();
  };

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
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 flex flex-col transition-all`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#CD5C5C] flex items-center justify-center text-white font-semibold">
              {user?.name?.substring(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <button
            onClick={openCreateNote}
            className="w-full flex items-center justify-center gap-2 py-2 bg-[#CD5C5C] hover:bg-[#CD5C5C]/80 text-white text-sm rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add new note
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {folders.map((folder) => (
            <button
              key={folder.id}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                folder.active
                  ? 'bg-[#CD5C5C]/10 text-[#CD5C5C] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <folder.icon
                className={`w-4 h-4 ${folder.active ? 'text-[#CD5C5C]' : 'text-gray-500'}`}
              />
              <span className="text-sm">{folder.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 mt-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-sm font-semibold text-gray-700 flex-1">
            {isCreateNoteOpen ? 'Create New Note' : isDetailOpen ? 'Note Detail' : 'Dashboard'}
          </h2>
        </div>
        
        {/* When NOT in detail/create mode, show card grid */}
        {!(isDetailOpen || isCreateNoteOpen) ? (
          <div className="flex-1 bg-white overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Notes</h1>
            <p className="text-sm text-gray-500 mb-6">{notes.length} notes</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleNoteClick(note)}
                  className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer transition-all hover:border-[#CD5C5C] hover:bg-[#CD5C5C]/5"
                >
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                    <span>{formatDate(note.created_at)}</span>
                  </div>
                  {note.images?.length > 0 && (
                    <div className="mb-3 grid grid-cols-3 gap-1">
                      {note.images.slice(0, 3).map((img: any, idx: number) => (
                        <div key={img.id || idx} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <img src={img.url} alt={img.name || `image-${idx}`} className="w-full h-full object-cover" />
                          {idx === 2 && note.images.length > 3 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-semibold">
                              +{note.images.length - 3}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <h3 className="text-base font-bold text-gray-900 mb-2">{note.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-3">{note.content}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {note.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-[#134686]/10 text-[#134686] text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Detail/Create mode: show two-pane with sliding list
          <div className="flex-1 flex overflow-hidden min-w-0">
            {/* Sliding My Notes list (width-based animation to avoid overlap) */}
            <div
              className={`
                h-full shrink-0 bg-white ${isListVisible ? 'border-r border-gray-200' : ''}
                transition-[width,opacity] duration-300 ease-in-out overflow-hidden
                ${isListVisible ? 'w-[300px] opacity-100' : 'w-0 opacity-0'}
              `}
            >
              <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 transition-all duration-300 ${
                isListEntering ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">My Notes</h3>
                  <p className="text-xs text-gray-500">{notes.length} notes</p>
                </div>
                <button
                  onClick={() => setIsListVisible(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  aria-label="Hide notes list"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="p-2 overflow-y-auto h-[calc(100%-56px)]">
                <button
                  onClick={openCreateNote}
                  className={`w-full mb-3 flex items-center justify-center gap-2 py-2 bg-[#CD5C5C] hover:bg-[#CD5C5C]/80 text-white text-sm rounded-lg transition-all duration-300 ${
                    isListEntering ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add new note
                </button>
                <div className="space-y-2">
                  {notes.map((note, idx) => {
                    const isActive = selectedNote?.id === note.id && isDetailOpen;
                    return (
                      <button
                        key={note.id}
                        onClick={() => {
                          handleNoteClick(note);
                          if (window.innerWidth < 768) setIsListVisible(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-300 ${
                          isActive
                            ? 'border-[#CD5C5C] bg-[#CD5C5C]/5'
                            : 'border-gray-200 hover:bg-gray-50'
                        } ${isListEntering ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                        style={{ transitionDelay: `${Math.min(idx, 10) * 30}ms` }}
                      >
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{formatDate(note.created_at)}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-800 truncate">{note.title}</div>
                        {note.tags?.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {note.tags.map((tag: string, idx: number) => (
                              <span key={idx} className="px-2 py-0.5 bg-[#134686]/10 text-[#134686] text-[10px] rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right content area */}
            <div
              className={`flex-1 bg-white overflow-y-auto p-6 md:p-8 transition-all duration-300 min-w-0 ${
                isPaneEntering ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {isCreateNoteOpen ? (
                <div>
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Create Note</h2>
                    <button onClick={closeCreateNote}>
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Note title"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full text-xl font-semibold border-none outline-none mb-3"
                  />
                  <textarea
                    placeholder="Start writing..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full min-h-[200px] border-none outline-none text-sm text-gray-700 mb-4"
                  />

                  <div className="flex items-center gap-2 mb-4">
                    {newNoteTags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                      className="px-2 py-1 text-xs border rounded"
                    />
                  </div>

                  {/* Images Upload */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Images</label>
                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-[#134686]/10 hover:bg-[#134686]/20 text-[#134686] text-xs rounded-lg cursor-pointer transition-all">
                      <Upload className="w-4 h-4" />
                      Upload Images
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                              <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                            </div>
                            <button
                              onClick={() => handleRemoveImage(image.id)}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSaveNewNote}
                    className="px-4 py-2 bg-[#CD5C5C] text-white text-sm rounded-lg hover:bg-[#CD5C5C]/80"
                  >
                    <Save className="w-4 h-4 inline-block mr-1" />
                    Save Note
                  </button>
                </div>
              ) : (
                selectedNote && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsListVisible(!isListVisible)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          aria-label="Toggle notes list"
                        >
                          {isListVisible ? (
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                      <button
                        onClick={handleCloseDetail}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        aria-label="Close detail and return to cards"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <h1 className="text-3xl font-bold mb-3">{selectedNote.title}</h1>
                    <p className="text-sm text-gray-400 mb-2">{formatDate(selectedNote.created_at)}</p>
                    <div className="text-gray-700 whitespace-pre-wrap mb-4">{selectedNote.content}</div>
                    {selectedNote.images?.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {selectedNote.images.map((image: any, idx: number) => (
                          <div key={image.id || idx} className="relative">
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                              <img src={image.url} alt={image.name || `image-${idx}`} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
