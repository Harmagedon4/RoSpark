import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Globe, Clock, Star, Target, Sparkles, Loader2 } from 'lucide-react'; // Importer Loader2 pour l'icône de chargement
import { useToast } from '@/hooks/use-toast';
import { Analytics } from "@vercel/analytics/react"
import heroBackground from '@/assets/hero-background.jpg';

const API_BASE_URL = 'https://ro-spark-api.vercel.app/api'; // Définir l'URL de base de votre API

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    activity: '',
    socialMedia: ''
  });
  const [isLoading, setIsLoading] = useState(false); // Nouveau state pour gérer l'état de chargement

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Activer l'état de chargement au début de la soumission

    try {
      // 1. Vérifier si l'email existe déjà
      const checkEmailResponse = await fetch(`${API_BASE_URL}/clients/${formData.email}`);
      const checkEmailData = await checkEmailResponse.json();

      if (checkEmailResponse.ok) {
        // Si le statut est OK (200), cela signifie que le client existe déjà
        toast({
          title: "Inscription impossible",
          description: "Cette adresse email est déjà enregistrée. Vous ne pouvez pas vous inscrire à nouveau.",
          variant: "destructive",
        });
        return; // Arrêter l'exécution si l'email existe
      } else if (checkEmailResponse.status === 404) {
        // Si le statut est 404 (Not Found), cela signifie que l'email n'existe pas,
        // nous pouvons donc procéder à l'enregistrement.
        console.log("Email non trouvé, création du nouveau client...");
      } else {
        // Gérer d'autres erreurs éventuelles lors de la vérification de l'email
        toast({
          title: "Erreur lors de la vérification de l'email",
          description: checkEmailData.message || "Une erreur inattendue est survenue.",
          variant: "destructive",
        });
        return;
      }

      // 2. Si l'email n'existe pas, procéder à l'enregistrement
      const createClientResponse = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_complet: formData.fullName,
          email: formData.email,
          numero: formData.whatsapp,
          domaine: formData.activity,
          reseau: formData.socialMedia
        }),
      });

      const createClientData = await createClientResponse.json();

      if (createClientResponse.ok) {
        toast({
          title: "Demande soumise avec succès !",
          description: "Un coordonnateur vous contactera bientôt pour votre portfolio gratuit. Vérifiez votre email pour confirmer l'inscription.",
        });

        // Réinitialiser le formulaire
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          activity: '',
          socialMedia: ''
        });
      } else {
        // Gérer les erreurs de création de client (ex: validation des données)
        toast({
          title: "Erreur lors de l'enregistrement",
          description: createClientData.message || "Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error("Erreur de soumission du formulaire :", error);
      toast({
        title: "Erreur réseau",
        description: "Impossible de se connecter au serveur. Veuillez vérifier votre connexion.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false); // Désactiver l'état de chargement à la fin (succès ou échec)
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Section Héro */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 30, 90, 0.8), rgba(0, 30, 90, 0.6)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white z-10">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-accent text-accent-foreground px-6 py-2 text-lg animate-float">
              <Sparkles className="mr-2 h-5 w-5" />
              <img src="/logo 2.png" alt="Logo RoSpark" width={64} height={64} />
              &nbsp;&nbsp;
              Nouvelle Initiative
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              RoSpark
              <span className="block text-accent">Faites briller votre présence en ligne</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
              RoSpark est une agence de marketing digital béninoise innovante, spécialisée dans la visibilité en ligne, 
              la création de contenu, et l'accompagnement numérique pour entrepreneurs, créatifs, artistes et petites entreprises.
            </p>
            <p className="text-lg md:text-xl mb-12 text-accent font-medium">
              "Donner aux jeunes créateurs africains les moyens de briller grâce à l'excellence numérique."
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-glow transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Obtenez Votre Portfolio Gratuit
            </Button>
          </div>
        </div>
      </section>

      {/* Section Lancement du Projet */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-primary text-primary-foreground px-4 py-2">
              <Target className="mr-2 h-4 w-4" />
              Initiative Audacieuse
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              5 000 Portfolios Gratuits pour les Jeunes Africains
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Dans le cadre de sa mission d'accélération de l'adoption numérique, RoSpark lance 
              5 000 portfolios professionnels gratuits pour les jeunes talents, freelances, 
              créatifs et porteurs de projets du Bénin et de l'Afrique francophone.
            </p>
          </div>
        </div>
      </section>

      {/* Section Partenariat */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Partenariat Stratégique avec Alwaysdata
            </h2>
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
              Grâce à un partenariat solide avec l'entreprise tech française Alwaysdata, 
              RoSpark assure un hébergement web gratuit et de qualité pour tous les bénéficiaires de portfolios.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16">
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-accent-foreground">RS</span>
              </div>
              <span className="text-2xl font-bold">RoSpark</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-0.5 bg-accent"></div>
              <div className="mx-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="w-8 h-0.5 bg-accent"></div>
            </div>
            
            <div className="flex items-center space-x-4 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">AD</span>
              </div>
              <span className="text-2xl font-bold">Alwaysdata</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi Gratuit */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Pourquoi Cette Offre Est-Elle Totalement Gratuite ?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center shadow-primary hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <Target className="h-16 w-16 text-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4 text-primary">Aucun Frais de Création</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Un portfolio professionnel coûte habituellement entre 15 000 et 30 000 FCFA – 
                  entièrement pris en charge par RoSpark.
                </p>
                <Badge className="mt-4 bg-accent text-accent-foreground">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  100% Gratuit
                </Badge>
              </CardContent>
            </Card>

            <Card className="p-8 text-center shadow-primary hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <Globe className="h-16 w-16 text-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4 text-primary">Aucun Frais d'Hébergement Annuel</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Les frais d'hébergement souvent exigés par d'autres prestataires 
                  sont supprimés grâce à Alwaysdata.
                </p>
                <Badge className="mt-4 bg-accent text-accent-foreground">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Hébergement Offert
                </Badge>
              </CardContent>
            </Card>

            <Card className="p-8 text-center shadow-primary hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <Clock className="h-16 w-16 text-accent mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4 text-primary">Durée Illimitée</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Contrairement aux plans d'hébergement classiques de 1 an, 
                  ces portfolios sont accessibles en permanence.
                </p>
                <Badge className="mt-4 bg-accent text-accent-foreground">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  À Vie
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Formulaire d'Inscription */}
      <section id="registration" className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Obtenez Votre Portfolio Gratuit Aujourd'hui
              </h2>
              <p className="text-xl opacity-90">
                Rejoignez le mouvement #RoSpark5000 et montrez votre talent au monde entier.
              </p>
            </div>
            
            <Card className="p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Nom Complet *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full"
                    placeholder="Votre nom complet"
                    disabled={isLoading} // Désactiver le champ pendant le chargement
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Adresse Email *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full"
                    placeholder="votre@email.com"
                    disabled={isLoading} // Désactiver le champ pendant le chargement
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Numéro WhatsApp *
                  </label>
                  <Input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className="w-full"
                    placeholder="+229 XX XX XX XX"
                    disabled={isLoading} // Désactiver le champ pendant le chargement
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Votre Activité / Domaine *
                  </label>
                  <Textarea
                    required
                    value={formData.activity}
                    onChange={(e) => handleInputChange('activity', e.target.value)}
                    className="w-full"
                    placeholder="Décrivez votre activité professionnelle ou créative"
                    rows={4}
                    disabled={isLoading} // Désactiver le champ pendant le chargement
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Lien Réseau Social (optionnel)
                  </label>
                  <Input
                    type="url"
                    value={formData.socialMedia}
                    onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                    className="w-full"
                    placeholder="https://instagram.com/votre-profil"
                    disabled={isLoading} // Désactiver le champ pendant le chargement
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 text-lg shadow-glow transition-all duration-300 hover:scale-105"
                  disabled={isLoading} // Désactiver le bouton pendant le chargement
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Soumission en cours...
                    </>
                  ) : (
                    "Soumettre Ma Demande"
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Appel à l'Action Final */}
      <section className="py-20 bg-accent text-accent-foreground text-center">
        <div className="container mx-auto px-4">
          <Star className="h-16 w-16 mx-auto mb-6 animate-float" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Le Futur Est Numérique, Et Il Commence Avec Vous
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Rejoignez le mouvement #RoSpark5000 et montrez votre talent au monde entier. 
            Le futur est numérique, et il commence avec vous.
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-current text-current hover:bg-current hover:text-accent font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Je Veux Mon Portfolio
          </Button>
        </div>
      </section>

      {/* Pied de Page */}
      <footer className="py-12 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <span className="text-2xl font-bold">RoSpark</span>
            <p className="mt-2 opacity-80">Donner aux créateurs africains les moyens de briller grâce à l'excellence numérique</p>
          </div>
          <p className="opacity-70">
            © 2025 RoSpark. Tous droits réservés. | En partenariat avec Alwaysdata
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;