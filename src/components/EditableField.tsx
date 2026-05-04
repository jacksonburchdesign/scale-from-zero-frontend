import { useState, useRef, useEffect } from 'react';
import { PencilSimple, Check } from '@phosphor-icons/react';

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => Promise<void>;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  inputClassName?: string;
}

export default function EditableField({ 
  value, 
  onSave, 
  placeholder = 'Click to edit...', 
  multiline = false,
  className = '',
  inputClassName = ''
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (currentValue !== value) {
      setIsSaving(true);
      try {
        await onSave(currentValue);
      } catch (error) {
        console.error("Failed to save field", error);
      } finally {
        setIsSaving(false);
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="relative group w-full flex flex-col gap-2">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSaving}
            className={`w-full bg-zinc-950 border border-purple-500/50 rounded-lg p-3 text-zinc-50 focus:outline-none focus:border-purple-500 min-h-[120px] resize-y ${inputClassName}`}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSaving}
            className={`w-full bg-zinc-950 border border-purple-500/50 rounded-lg px-3 py-2 text-zinc-50 focus:outline-none focus:border-purple-500 ${inputClassName}`}
            placeholder={placeholder}
          />
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setCurrentValue(value);
              setIsEditing(false);
            }}
            disabled={isSaving}
            className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-zinc-50 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 border-2 border-zinc-50 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Check weight="bold" />
            )}
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative group inline-block w-full cursor-pointer rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-900/50 transition-colors p-2 -ml-2 ${className}`}
      onClick={() => setIsEditing(true)}
    >
      <div className={`pr-8 ${!value ? 'text-zinc-600 italic' : ''}`}>
        {value || placeholder}
      </div>
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-zinc-300">
        <PencilSimple size={16} />
      </div>
    </div>
  );
}
