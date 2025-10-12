import { Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Transacciones seguras",
    description: "Sistema de pagos protegido y verificación de empresas para tu tranquilidad.",
  },
  {
    icon: TrendingUp,
    title: "Impulsa tus ventas",
    description: "Herramientas de marketing y analíticas para hacer crecer tu negocio.",
  },
  {
    icon: Users,
    title: "Red de negocios",
    description: "Conecta con proveedores y clientes de todo el país en un solo lugar.",
  },
  {
    icon: Zap,
    title: "Proceso rápido",
    description: "Publica productos y gestiona pedidos en minutos, no en días.",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Todo lo que tu negocio necesita
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Diseñado específicamente para PYMEs que buscan expandirse y optimizar sus operaciones comerciales
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card group relative border-border bg-gradient-to-br from-white to-[#f9fbff] shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02]"
            >
              <CardContent className="pt-6">
                {/* Icono con glow */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-[0_4px_12px_rgba(59,130,246,0.12)] transition-all duration-300 ease-out group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_6px_18px_rgba(59,130,246,0.35)] group-hover:scale-110">
                  <feature.icon className="h-6 w-6 transition-transform duration-300 ease-out" />
                </div>

                {/* Texto */}
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
