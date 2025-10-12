import { UserPlus, Search, Handshake } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Regístrate gratis",
    description: "Crea tu cuenta empresarial en menos de 5 minutos y accede a todo el marketplace.",
    step: "01",
  },
  {
    icon: Search,
    title: "Explora o publica",
    description: "Encuentra productos de proveedores verificados o publica tus propios productos.",
    step: "02",
  },
  {
    icon: Handshake,
    title: "Conecta y crece",
    description: "Genera transacciones seguras y construye relaciones comerciales duraderas.",
    step: "03",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Empieza en 3 pasos simples
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            No necesitas experiencia técnica. Te guiamos en cada paso del proceso.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <step.icon className="h-10 w-10" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-10 hidden h-px w-full bg-gradient-to-r from-primary/50 to-transparent md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
