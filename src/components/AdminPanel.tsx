import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Track {
  id: number;
  title: string;
  duration: string;
  price: string;
  genre: string;
  platforms: string[];
  file?: File;
  description?: string;
}

interface AdminPanelProps {
  tracks: Track[];
  onAddTrack: (track: Track) => void;
  onDeleteTrack: (id: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ tracks, onAddTrack, onDeleteTrack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    genre: "",
    description: "",
    platforms: [] as string[],
    file: null as File | null
  });

  const availablePlatforms = ["Spotify", "Apple Music", "Bandcamp", "SoundCloud", "YouTube Music", "Tidal"];
  const genres = ["Electronic", "Hip-Hop", "Ambient", "Jazz", "Rock", "Pop", "Classical", "Experimental"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setFormData(prev => ({ ...prev, file }));
      
      // Получаем длительность трека
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        setFormData(prev => ({ ...prev, duration }));
      });
    }
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.file || !formData.price) {
      alert("Заполните обязательные поля: название, файл и цена");
      return;
    }

    const newTrack: Track = {
      id: Date.now(),
      title: formData.title,
      duration: formData.duration || "0:00",
      price: formData.price,
      genre: formData.genre || "Неизвестно",
      platforms: formData.platforms,
      file: formData.file,
      description: formData.description
    };

    onAddTrack(newTrack);
    
    // Сброс формы
    setFormData({
      title: "",
      price: "",
      genre: "",
      description: "",
      platforms: [],
      file: null,
      duration: ""
    });
    
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full w-16 h-16"
          >
            <Icon name="Plus" size={24} />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Добавить новый трек</DialogTitle>
            <DialogDescription>
              Загрузите MP3 файл и заполните информацию о треке
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Загрузка файла */}
            <div className="space-y-2">
              <Label htmlFor="file" className="text-base font-semibold">
                Аудиофайл *
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="file"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label htmlFor="file" className="cursor-pointer">
                  {formData.file ? (
                    <div className="text-green-600">
                      <Icon name="Check" size={48} className="mx-auto mb-2" />
                      <div className="font-medium">{formData.file.name}</div>
                      <div className="text-sm text-gray-500">
                        {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Icon name="Upload" size={48} className="mx-auto mb-2" />
                      <div className="font-medium">Нажмите для выбора файла</div>
                      <div className="text-sm">MP3, WAV, FLAC до 100MB</div>
                    </div>
                  )}
                </Label>
              </div>
            </div>

            {/* Основная информация */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название трека *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Введите название трека"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Цена *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="$2.99"
                  required
                />
              </div>
            </div>

            {/* Жанр */}
            <div className="space-y-2">
              <Label>Жанр</Label>
              <Select 
                value={formData.genre} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, genre: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите жанр" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Описание */}
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Краткое описание трека..."
                rows={3}
              />
            </div>

            {/* Платформы */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Платформы для продажи</Label>
              <div className="grid grid-cols-2 gap-3">
                {availablePlatforms.map(platform => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={formData.platforms.includes(platform)}
                      onCheckedChange={(checked) => 
                        handlePlatformChange(platform, checked as boolean)
                      }
                    />
                    <Label htmlFor={platform} className="text-sm font-normal">
                      {platform}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex-1">
                <Icon name="Save" size={16} className="mr-2" />
                Добавить трек
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Отмена
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Список треков для управления */}
      {tracks.length > 0 && (
        <Card className="fixed bottom-24 right-6 w-80 max-h-96 overflow-y-auto shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Управление треками</CardTitle>
            <CardDescription>
              {tracks.length} {tracks.length === 1 ? 'трек' : 'треков'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tracks.map(track => (
              <div key={track.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{track.title}</div>
                  <div className="text-sm text-gray-500">
                    {track.genre} • {track.price}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {track.platforms.slice(0, 2).map(platform => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                    {track.platforms.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{track.platforms.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTrack(track.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPanel;