'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  NotebookPen, Search, Plus, MoreHorizontal, Settings, CheckSquare,
  Briefcase, BookOpen, PenLine, X, Calendar, ChevronLeft,
  ChevronRight, Menu, Save, Upload, LogOut, Trash2
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
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
    setIsDetailOpen(false);
    setSelectedNote(null);
    setIsCreateNoteOpen(true);
    setIsListVisible(true);
    setIsPaneEntering(true);
    setIsListEntering(true);
    // Trigger animation end
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsPaneEntering(false);
        setIsListEntering(false);
      }, 100);
    });
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

  const handleDeleteNote = (id: number) => {
    const confirmDelete = window.confirm('Delete this note? This action cannot be undone.');
    if (!confirmDelete) return;
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
    if (selectedNote?.id === id) {
      setIsDetailOpen(false);
      setSelectedNote(null);
      setIsListVisible(true);
    }
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
    router.push('/register');
  };

  const folders = [
    { id: 1, name: 'My Notes', icon: NotebookPen, active: true, path: '/dashboard' },
    { id: 2, name: 'To-do list', icon: CheckSquare, active: false, path: '/todo' },
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
              onClick={() => folder.path && router.push(folder.path)}
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
      <div className="flex-1 flex flex-col overflow-hidden">  
        {!(isDetailOpen || isCreateNoteOpen) ? (
          <div className="flex-1 bg-white overflow-y-auto p-6">
            <div className="flex items-start sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  {!isSidebarOpen && (
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="p-2 -ml-2 rounded-md hover:bg-gray-100"
                      aria-label="Open sidebar"
                    >
                      <Menu className="w-5 h-5 text-gray-700" />
                    </button>
                  )}
                  <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
                </div>
              </div>
              <button
                onClick={openCreateNote}
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#CD5C5C] hover:bg-[#CD5C5C]/80 text-white text-sm rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Add new note
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {notes.map((note) => {
                const hasImages = note.images?.length > 0;
                return (
                  <div
                    key={note.id}
                    onClick={() => handleNoteClick(note)}
                    className={`relative bg-white rounded-lg border border-gray-200 cursor-pointer transition-all hover:shadow-lg hover:border-[#CD5C5C] group ${
                      hasImages ? 'overflow-hidden p-0' : 'p-3 hover:bg-[#CD5C5C]/5'
                    }`}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}
                      className={`absolute ${hasImages ? 'top-2 right-2' : 'top-2 right-2'} p-1 rounded-md text-red-600 bg-white/90 backdrop-blur-sm hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity z-10`}
                      aria-label="Delete note"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    
                    {hasImages ? (
                      // Pinterest-style card with image
                      <>
                        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                          <img 
                            src={note.images[0].url} 
                            alt={note.images[0].name || note.title} 
                            className="w-full h-full object-cover"
                          />
                          {note.images.length > 1 && (
                            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] rounded-full">
                              +{note.images.length - 1}
                            </div>
                          )}
                        </div>
                        <div className="p-2.5">
                          <h3 className="text-sm font-bold text-gray-900 mb-1.5 line-clamp-2">{note.title}</h3>
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{note.content}</p>
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex flex-wrap gap-1">
                              {note.tags.slice(0, 1).map((tag: string, idx: number) => (
                                <span key={idx} className="px-1.5 py-0.5 bg-[#134686]/10 text-[#134686] text-[10px] rounded">
                                  {tag}
                                </span>
                              ))}
                              {note.tags.length > 1 && (
                                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded">
                                  +{note.tags.length - 1}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400">{formatDate(note.created_at)}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Text-only card
                      <>
                        <div className="flex items-center justify-between mb-2 text-[10px] text-gray-400">
                          <span>{formatDate(note.created_at)}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1.5">{note.title}</h3>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-3">{note.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {note.tags.slice(0, 2).map((tag: string, idx: number) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-[#134686]/10 text-[#134686] text-[10px] rounded">
                              {tag}
                            </span>
                          ))}
                          {note.tags.length > 2 && (
                            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded">
                              +{note.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden min-w-0">
            {isDetailOpen && (
              <div
                className={`
                  h-full shrink-0 bg-white ${isListVisible ? 'border-r border-gray-200' : ''}
                  transition-[width,opacity] duration-500 ease-in-out overflow-hidden
                  ${isListVisible ? 'w-[300px] opacity-100' : 'w-0 opacity-0'}
                `}
              >
              <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 transition-all duration-500 ${
                isListEntering ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
              }`}>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">My Notes</h3>
                  <p className="text-xs text-gray-500">{notes.length} notes</p>
                </div>
              </div>
              <div className="p-2 overflow-y-auto h-[calc(100%-56px)]">
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
                        className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-500 ${
                          isActive
                            ? 'border-[#CD5C5C] bg-[#CD5C5C]/5'
                            : 'border-gray-200 hover:bg-gray-50'
                        } ${isListEntering ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}`}
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
            )}
            <div
              className={`flex-1 bg-white overflow-y-auto p-6 md:p-8 transition-all duration-500 min-w-0 ${
                isPaneEntering ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
              }`}
            >
              {isCreateNoteOpen ? (
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-end mb-8">
                    <button onClick={closeCreateNote} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Untitled"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full text-4xl font-bold border-none outline-none mb-6 placeholder-gray-300"
                  />

                  {/* Metadata Section */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    {/* Last Modified */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-500">Last Modified</span>
                      <span className="text-sm text-gray-700">{new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    {/* Tags - Inline */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">Tags</span>
                      {newNoteTags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveTag(tag)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded-md transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                      <input
                        type="text"
                        placeholder="Add new tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                        className="px-3 py-1 text-xs border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#CD5C5C]/40 min-w-[120px]"
                      />
                    </div>
                  </div>

                  {/* Formatting Toolbar */}
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-between gap-1 text-gray-600">
                      <div className="flex items-center gap-1">
                        <select className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                          <option>Encode Sans</option>
                        </select>
                        <select className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 ml-2">
                          <option>16</option>
                        </select>
                        <div className="w-px h-6 bg-gray-300 mx-2"></div>
                        <button className="p-1.5 hover:bg-gray-100 rounded" title="Bold">
                          <span className="font-bold text-sm">B</span>
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded" title="Italic">
                          <span className="italic text-sm">I</span>
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded" title="Underline">
                          <span className="underline text-sm">U</span>
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-2"></div>
                        <label className="p-1.5 hover:bg-gray-100 rounded cursor-pointer" title="Upload Image">
                          <Upload className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <button
                        onClick={handleSaveNewNote}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#CD5C5C] hover:bg-[#CD5C5C]/90 text-white text-sm rounded transition-all"
                        title="Save Note"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <textarea
                    placeholder="Start writing your note..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full min-h-[400px] border-none outline-none text-base text-gray-700 leading-relaxed resize-none"
                  />

                  {/* Images Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {images.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                          </div>
                          <button
                            onClick={() => handleRemoveImage(image.id)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteNote(selectedNote.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                          aria-label="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCloseDetail}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          aria-label="Close detail and return to cards"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
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
