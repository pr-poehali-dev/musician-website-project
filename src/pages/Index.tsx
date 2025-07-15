import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import AdminPanel from "@/components/AdminPanel";

interface Track {
  id: number;
  title: string;
  duration: string;
  price: string;
  genre: string;
  platforms: string[];
}

const Index = () => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      title: "Midnight Echoes",
      duration: "3:45",
      price: "$2.99",
      genre: "Electronic",
      platforms: ["Spotify", "Apple Music", "Bandcamp"]
    },
    {
      id: 2,
      title: "Urban Symphony",
      duration: "4:12",
      price: "$2.99",
      genre: "Hip-Hop",
      platforms: ["Spotify", "SoundCloud", "YouTube Music"]
    },
    {
      id: 3,
      title: "Silent Waters",
      duration: "5:30",
      price: "$3.99",
      genre: "Ambient",
      platforms: ["Bandcamp", "Apple Music", "Tidal"]
    }
  ]);

  const handleAddTrack = (newTrack: Track) => {
    setTracks(prev => [...prev, newTrack]);
  };

  const handleDeleteTrack = (id: number) => {
    setTracks(prev => prev.filter(track => track.id !== id));
  };

  const upcomingEvents = [
    {
      date: "25 июля",
      venue: "Клуб 16 тонн",
      city: "Москва",
      type: "Концерт"
    },
    {
      date: "15 августа",
      venue: "Aurora Concert Hall",
      city: "Санкт-Петербург",
      type: "Релиз-концерт"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">MUSICIAN</div>
          <div className="hidden md:flex space-x-8">
            <a href="#tracks" className="text-gray-600 hover:text-gray-900 transition-colors">Треки</a>
            <a href="#events" className="text-gray-600 hover:text-gray-900 transition-colors">События</a>
            <a href="#press" className="text-gray-600 hover:text-gray-900 transition-colors">Пресса</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Связаться</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Профессиональная<br />
              музыка для<br />
              современного мира
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Создаю электронную и экспериментальную музыку, которая находит отклик у слушателей по всему миру. Каждый трек — это путешествие в уникальное звуковое пространство.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
                Слушать треки
              </Button>
              <Button variant="outline" size="lg">
                Скачать пресс-кит
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/img/119186b9-1072-48a1-a9a7-0a38117e24be.jpg" 
              alt="Музыкант в студии"
              className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Последние треки</h2>
            <p className="text-xl text-gray-600">Доступно для покупки и стриминга</p>
          </div>
          
          <div className="grid gap-6">
            {tracks.map((track) => (
              <Card key={track.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Button variant="outline" size="sm" className="rounded-full w-12 h-12">
                        <Icon name="Play" size={20} />
                      </Button>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{track.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <span>{track.duration}</span>
                          <Badge variant="secondary">{track.genre}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{track.price}</div>
                        <div className="text-sm text-gray-600">Цифровой трек</div>
                      </div>
                      <Button className="bg-gray-900 hover:bg-gray-800">
                        Купить
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Доступно на:</div>
                    <div className="flex gap-2">
                      {track.platforms.map((platform) => (
                        <Badge key={platform} variant="outline">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Предстоящие события</h2>
            <p className="text-xl text-gray-600">Живые выступления и релизы</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-gray-900">{event.type}</Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{event.date}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.venue}</h3>
                  <p className="text-gray-600 mb-4">{event.city}</p>
                  <Button variant="outline" className="w-full">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section id="press" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">В прессе</h2>
            <p className="text-xl text-gray-600">Последние публикации и интервью</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-sm text-gray-600 mb-2">Rolling Stone Russia</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  "Новый альбом переосмысливает границы электронной музыки"
                </h3>
                <Button variant="outline" size="sm">
                  Читать статью
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-sm text-gray-600 mb-2">Афиша Daily</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  "Интервью: о творческом процессе и будущем музыки"
                </h3>
                <Button variant="outline" size="sm">
                  Читать интервью
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-sm text-gray-600 mb-2">The Village</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  "10 молодых музыкантов, которые изменят индустрию"
                </h3>
                <Button variant="outline" size="sm">
                  Читать рейтинг
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Связаться</h2>
          <p className="text-xl text-gray-600 mb-12">
            По вопросам сотрудничества, выступлений и лицензирования
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Icon name="Mail" size={24} className="mx-auto mb-4 text-gray-600" />
              <div className="font-semibold text-gray-900">Email</div>
              <div className="text-gray-600">contact@musician.com</div>
            </div>
            <div className="text-center">
              <Icon name="Phone" size={24} className="mx-auto mb-4 text-gray-600" />
              <div className="font-semibold text-gray-900">Телефон</div>
              <div className="text-gray-600">+7 (999) 123-45-67</div>
            </div>
            <div className="text-center">
              <Icon name="MapPin" size={24} className="mx-auto mb-4 text-gray-600" />
              <div className="font-semibold text-gray-900">Местоположение</div>
              <div className="text-gray-600">Москва, Россия</div>
            </div>
          </div>
          
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
            Написать сообщение
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-6">MUSICIAN</div>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Icon name="Youtube" size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Icon name="Music" size={24} />
            </a>
          </div>
          <div className="text-gray-400">
            © 2025 Musician. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Админ-панель */}
      <AdminPanel 
        tracks={tracks}
        onAddTrack={handleAddTrack}
        onDeleteTrack={handleDeleteTrack}
      />
    </div>
  );
};

export default Index;