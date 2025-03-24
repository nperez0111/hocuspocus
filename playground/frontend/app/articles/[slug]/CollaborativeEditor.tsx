"use client";

import type { HocuspocusProvider } from "@hocuspocus/provider";
import { Collaboration } from "@tiptap/extension-collaboration";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

const CollaborativeEditor = (props: {
	slug: string;
	provider: HocuspocusProvider;
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				history: false,
			}),
			Collaboration.configure({
				document: props.provider.document,
			}),
		],
		immediatelyRender: false,
		content: `<p>Hello World! 🌎${props.slug}</p>`,
	});

	return <EditorContent editor={editor} />;
};

export default CollaborativeEditor;
