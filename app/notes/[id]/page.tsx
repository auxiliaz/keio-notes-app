'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, Share2, MoreVertical, X, Plus } from 'lucide-react';
import Link from 'next/link';

export default function NoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;

  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  // Ambil data note dari localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const foundNote = savedNotes.find((n: any) => n.id === Number(noteId));

    if (foundNote) {
      setNote(foundNote);
      setTags(foundNote.tags || []);
    } else {
      setError('Note not found.');
    }
  }, [noteId]);

  // Tambah tag baru
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Hapus tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Simpan perubahan ke localStorage
  const handleSave = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = savedNotes.map((n: any) =>
      n.id === note.id ? { ...note, tags } : n
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setIsEditing(false);
  };

  // Hapus note dari localStorage
  const handleDelete = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = savedNotes.filter((n: any) => n.id !== note.id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    router.push('/dashboard');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-sm">
        {error}
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen bg-[#FFFAF2]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>My Notes</span>
              <span>&gt;</span>
              <span className="text-gray-700 font-medium">{note.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#CD5C5C] hover:bg-[#CD5C5C]/80 text-white text-sm font-medium rounded-lg transition-all"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#134686] hover:bg-[#134686]/90 text-white text-sm rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="w-full text-3xl font-bold text-gray-900 border-none outline-none mb-6"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{note.title}</h1>
          )}

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="mb-8">
            {isEditing ? (
              <textarea
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                className="w-full min-h-[300px] text-gray-700 leading-relaxed border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40 resize-none"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{note.content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
