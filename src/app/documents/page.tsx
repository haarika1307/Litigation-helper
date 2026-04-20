"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadCloud, FileText, Search, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import api from "@/lib/api";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data } = await api.get("/documents");
      setDocuments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      setLoading(true);
      await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchDocuments();
    } catch (err) {
      console.error("Upload failed", err);
      // fallback fetch
      setLoading(false);
    }
  };

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
      </div>

      <div 
        className={`w-full mt-4 p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'} hover:bg-slate-100`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
        <p className="text-lg font-medium text-slate-700 mb-1">Drag and drop your document here</p>
        <p className="text-sm text-slate-500 mb-4">Supported files: PDF, JPEG, PNG, DOCX</p>
        <label htmlFor="file-upload" className="cursor-pointer">
          <Button variant="outline" className="pointer-events-none">Browse Files</Button>
          <input id="file-upload" type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.docx" onChange={handleChange} />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 mt-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search documents..." className="pl-9 w-full" />
        </div>
      </div>

      <div className="rounded-md border bg-white mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Case</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                  {loading ? "Loading documents..." : "No documents uploaded yet."}
                </TableCell>
              </TableRow>
            )}
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  {doc.name}
                </TableCell>
                <TableCell>{doc.case_id ? `Case #${doc.case_id}` : "Unassigned"}</TableCell>
                <TableCell>{new Date(doc.uploaded_at).toLocaleDateString()}</TableCell>
                <TableCell>{doc.file_type || "Unknown"}</TableCell>
                <TableCell className="text-right flex items-center justify-end space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setPreviewDoc(doc)}>
                        <ExternalLink className="h-4 w-4 mr-2" /> Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>{previewDoc?.name}</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-y-auto bg-slate-100 rounded-md p-4">
                        {previewDoc?.file_type?.startsWith("image/") ? (
                           <img src={`http://127.0.0.1:8000/${previewDoc.file_path}`} alt="Preview" className="max-w-full h-auto mx-auto" />
                        ) : previewDoc?.file_type === "application/pdf" ? (
                           <div className="flex flex-col items-center justify-center h-full space-y-4">
                             <FileText className="h-16 w-16 text-red-500" />
                             <p>PDF Preview is limited. Full text extracted via OCR:</p>
                             <div className="w-full bg-white p-4 rounded text-sm text-left max-h-64 overflow-y-auto border whitespace-pre-wrap">
                               {previewDoc.extracted_text || "No text extracted"}
                             </div>
                           </div>
                        ) : (
                           <div className="flex flex-col flex-1 items-center justify-center p-12 text-center text-slate-500">
                             <FileText className="w-16 h-16 mb-4 text-slate-300" />
                             <p>Preview not available for this file type.</p>
                             <p className="mt-4 font-mono text-xs bg-slate-200 p-2 rounded text-left">
                               Extracted Text: {previewDoc?.extracted_text || "None"}
                             </p>
                           </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
