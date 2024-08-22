import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useTheme } from "@/components/theme-provider"

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { theme } = useTheme();

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return (
    <div className="pt-3"> 
      <BlockNoteView
        editor={editor}
        theme={ (theme === "dark" || theme === "system") ? "dark" : "light"}
        editable={editable}
        onChange={() => (
          onChange(JSON.stringify(editor.document, null, 2))
        )}
      />
    </div>
  );
};