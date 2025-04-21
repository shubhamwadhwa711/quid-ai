// components/custom-editor.js
"use client"; // Required only in App Router.

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";
import { FormatPainter } from "ckeditor5-premium-features";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

function CustomEditor(props) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        licenseKey:
          "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDYyMzAzOTksImp0aSI6IjIzZGEzODY2LTJiMjYtNDc2My1hNzZjLWExMGY0MDFkOGYwMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjAwZTAwZDBkIn0.EA87cunVF9MCQFNwD2BU32y1C_IjAo2T1a6KHGIPwOswZdQH8J54w4CkdR4a0lx0wQSbOS6onPZNZSq75rBPFA", // Or 'GPL'.
        plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
        toolbar: ["undo", "redo", "|", "bold", "italic", "|", "formatPainter"],
        // initialData : {props?.initialData!}
      }}
    />
  );
}

export default CustomEditor;
