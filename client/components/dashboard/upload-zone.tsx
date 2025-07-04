import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UploadZoneProps {
  onUpload: (files: File[] | string) => void;
  isUploading?: boolean;
}

export function UploadZone({ onUpload, isUploading = false }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const files = Array.from(e.dataTransfer.files);
        onUpload(files);
      }
    },
    [onUpload],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      onUpload(files);
    }
  };

  const handleYouTubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (youtubeUrl.trim()) {
      onUpload(youtubeUrl);
      setYoutubeUrl("");
    }
  };

  const FileIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "image":
        return <Image className="h-8 w-8 text-green-500" />;
      case "video":
        return <Video className="h-8 w-8 text-blue-500" />;
      default:
        return <Upload className="h-8 w-8 text-primary" />;
    }
  };

  if (isUploading) {
    return (
      <div className="border-2 border-dashed border-primary/20 rounded-xl p-12 text-center bg-gradient-card">
        <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Processing your content...
        </h3>
        <p className="text-muted-foreground">
          Our AI is analyzing your content and generating flashcards
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Files
          </TabsTrigger>
          <TabsTrigger value="youtube" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            YouTube Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer hover:border-primary/50 hover:bg-gradient-card",
              dragActive
                ? "border-primary bg-gradient-card scale-105"
                : "border-border",
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.mp4,.mov,.avi"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <FileIcon type="pdf" />
                <FileIcon type="image" />
                <FileIcon type="video" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Drop your files here, or click to browse
                </h3>
                <p className="text-muted-foreground">
                  Support for PDF documents, images (PNG, JPG), and video files
                </p>
              </div>

              <GradientButton size="lg" className="mt-4">
                <Upload className="h-5 w-5 mr-2" />
                Choose Files
              </GradientButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-red-500" />
              <span>PDF documents</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image className="h-4 w-4 text-green-500" />
              <span>Images (PNG, JPG)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 text-blue-500" />
              <span>Video files</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="youtube" className="space-y-6">
          <form onSubmit={handleYouTubeSubmit} className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
              <Video className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Add YouTube Video
              </h3>
              <p className="text-muted-foreground mb-6">
                Paste a YouTube URL and we'll extract the content for flashcards
              </p>

              <div className="max-w-md mx-auto space-y-4">
                <Input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="text-center"
                />
                <GradientButton
                  type="submit"
                  size="lg"
                  disabled={!youtubeUrl.trim()}
                >
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Process Video
                </GradientButton>
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
