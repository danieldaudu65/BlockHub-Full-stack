import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import React, { useEffect, useState } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {

    const [activeStyles, setActiveStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
    });



    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
            }),
            Heading.configure({ levels: [1, 2, 3] }),
            Underline,
            TextStyle,
            Color,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;

        const update = () => {
            setActiveStyles({
                bold: editor.isActive('bold'),
                italic: editor.isActive('italic'),
                underline: editor.isActive('underline'),
            });
        };

        editor.on('selectionUpdate', update);
        editor.on('transaction', update);

        return () => {
            editor.off('selectionUpdate', update);
            editor.off('transaction', update);
        };
    }, [editor]);


    // useEffect(() => {
    //     if (editor && value !== editor.getHTML()) {
    //         editor.commands.setContent(value);
    //     }
    // }, [value, editor]);

    if (!editor) return null;

    return (
        <div className="border border-[#232323] rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="border border-white/30 rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="bg-[#000000] border-b border-white/30 pb-3 p-2 flex flex-wrap gap-2">
                    {/* Text Styles */}
                    {['bold', 'italic', 'underline'].map((style) => {
                        const isActive =
                            (style === 'bold' && activeStyles.bold) ||
                            (style === 'italic' && activeStyles.italic) ||
                            (style === 'underline' && activeStyles.underline);
                        return (
                            <button
                                key={style}
                                onClick={() => {
                                    if (style === 'bold') editor.chain().focus().toggleBold().run();
                                    else if (style === 'italic') editor.chain().focus().toggleItalic().run();
                                    else if (style === 'underline') editor.chain().focus().toggleUnderline().run();
                                }}
                                className={`px-2 py-1 border border-white/30 rounded text-white text-sm w-8 transition ${isActive ? 'bg-green-600' : 'bg-black hover:bg-gray-700'
                                    }`}
                                title={style.charAt(0).toUpperCase() + style.slice(1)}
                            >
                                {style.charAt(0).toUpperCase()}
                            </button>
                        );
                    })}

                    {/* Headings */}
                    {[1, 2, 3].map((level) => {
                        const isActive = editor.isActive('heading', { level });
                        return (
                            <button
                                key={level}
                                onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run()}
                                className={`px-2 border border-white/30 py-1 rounded text-white text-sm w-8 transition ${isActive ? 'bg-green-600' : 'bg-black hover:bg-gray-700'
                                    }`}
                                title={`Heading ${level}`}
                            >
                                H{level}
                            </button>
                        );
                    })}

                    {/* Lists */}
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`px-2 py-1 border border-white/30 rounded text-white text-sm w-20 transition ${editor.isActive('bulletList') ? 'bg-green-600' : 'bg-black hover:bg-gray-700'
                            }`}
                        title="Bullet List"
                    >
                        • List
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`px-2 py-1 border border-white/30 rounded text-white text-sm w-20 transition ${editor.isActive('orderedList') ? 'bg-green-600' : 'bg-black hover:bg-gray-700'
                            }`}
                        title="Ordered List"
                    >
                        1. List
                    </button>

                    {/* Blockquote & Code */}
                    <button
                        type="button"
                        onClick={() => {
                            editor
                                .chain()
                                .focus()
                                .clearNodes() // important
                                .toggleBlockquote()
                                .run();
                        }} className={`px-2 py-1 border border-white/30 rounded text-white text-sm w-8 transition ${editor.isActive('blockquote') ? 'bg-green-600' : 'bg-black hover:bg-gray-700'
                            }`}
                        title="Blockquote"
                    >
                        ❝
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            editor
                                .chain()
                                .focus()
                                .clearNodes() // important
                                .toggleCodeBlock()
                                .run();
                        }} className={`px-2 py-1 border border-white/30 rounded text-white text-sm w-12 transition ${editor.isActive('codeBlock') ? 'bg-green-600' : 'bg-black hover:bg-gray-700'
                            }`}
                        title="Code Block"
                    >
                        {'</>'}
                    </button>

                    <div className="flex items-center gap-1">
                        {/* Label */}
                        <span className="text-white text-xs">Color</span>

                        {/* Color Picker */}
                        <div
                            className="relative w-10 h-10 rounded cursor-pointer border border-white/30 overflow-hidden flex items-center justify-center"
                            style={{ backgroundColor: editor.getAttributes('textStyle').color || '#ffffff' }}
                        >
                            <input
                                type="color"
                                value={editor.getAttributes('textStyle').color || '#ffffff'}
                                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Editor Area */}
                <EditorContent
                    editor={editor}
                    className="p-3 text-white bg-[#030303] min-h-[250px] max-h-[600px] overflow-auto rounded-b"
                    style={{ outline: 'none' }}
                />

                <style >{`
  /* Remove focus outline from TipTap editor contenteditable div */
  .ProseMirror:focus {
    outline: none;
    box-shadow: none;
  }
`}</style>
                <style>{`
  .ProseMirror ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }

  .ProseMirror ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }

  .ProseMirror li {
    margin: 0.25rem 0;
  }
`}</style>
                <style>{`
  .ProseMirror pre {
    background: #111;
    padding: 1rem;
    border-radius: 8px;
    font-family: monospace;
  }

  .ProseMirror blockquote {
    border-left: 3px solid #22c55e;
    padding-left: 1rem;
    opacity: 0.8;
  }
`}</style>
            </div>


            {/* Editor Area */}


        </div>


    );
};