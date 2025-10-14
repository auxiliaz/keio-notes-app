'use client';

import { useState } from 'react';
import { ArrowLeft, X, Plus, Save, MoreVertical, Upload } from 'lucide-react';
import Link from 'next/link';

export default function CreateNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [folder, setFolder] = useState('My Notes');
  const [images, setImages] = useState<Array<{ id: string; url: string; name: string }>>([]);

  // === Handle Tag ===
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // === Handle Image Upload ===
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


  const handleSave = () => {
    const newNote = {
      id: Math.random().toString(36).substr(2, 9),
      title: title || 'Untitled Note',
      content,
      tags,
      folder,
      images,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // ambil notes lama dari localStorage
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = [...existingNotes, newNote];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    alert('✅ Note saved successfully!');
    // Reset form
    setTitle('');
    setContent('');
    setTags([]);
    setImages([]);
  };

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
            <h1 className="text-xl font-bold text-gray-800">Create New Note</h1>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40"
            >
              <option>My Notes</option>
              <option>To-do list</option>
              <option>Projects</option>
              <option>Journal</option>
              <option>Reading List</option>
            </select>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#CD5C5C] hover:bg-[#CD5C5C]/80 text-white text-sm font-medium rounded-lg transition-all"
            >
              <Save className="w-4 h-4" />
              Save Note
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Title */}
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 border-none outline-none mb-6"
          />

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1 bg-[#134686]/10 text-[#134686] text-sm rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-[#134686]/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Content */}
          <textarea
            placeholder="Start writing your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[300px] text-gray-700 leading-relaxed border-none outline-none resize-none text-base mb-6"
          />

          {/* Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Images</label>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#134686]/10 hover:bg-[#134686]/20 text-[#134686] text-sm rounded-lg cursor-pointer transition-all">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-xs text-gray-500 mt-2 truncate">{image.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-[#134686]/5 border border-[#134686]/20 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#134686] mb-2">💡 Writing Tips</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Use tags to organize and find your notes easily</li>
            <li>• Upload multiple images to enrich your notes with visuals</li>
            <li>• Press Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline</li>
            <li>• Auto-save is enabled — your work is safe!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
