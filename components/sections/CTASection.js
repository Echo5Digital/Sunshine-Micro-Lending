import Link from 'next/link';
import { ArrowRight, Shield, Clock } from 'lucide-react';

export function CTASection({
  heading = 'Ready to Apply?',
  subheading = 'Get started with a fast, transparent loan application. No obligation until you accept.',
  primaryCTA = { label: 'Apply Now', href: '/apply' },
  secondaryCTA = { label: 'Learn More', href: '/how-it-works' },
  variant = 'gradient',
}) {
  const isGradient = variant === 'gradient';

  return (
    <section
      className={
        isGradient
          ? 'relative overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0d3060] to-[#00A6FB] py-14 sm:py-20'
          : 'bg-[#F8FAFC] py-14 sm:py-20'
      }
    >
      {/* Background pattern */}
      {isGradient && (
        <div
          className="absolute inset-0 opacity-5 bg-mesh-pattern"
          aria-hidden="true"
        />
      )}

      <div className="container relative mx-auto px-4 text-center">
        {/* Badge */}
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
            isGradient ? 'bg-white/10 text-white' : 'bg-[#00A6FB]/10 text-[#00A6FB]'
          }`}
        >
          <Shield className="h-3.5 w-3.5" />
          Florida Licensed Lender
        </div>

        {/* Heading */}
        <h2
          className={`mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl ${
            isGradient ? 'text-white' : 'text-[#0A2540]'
          }`}
        >
          {heading}
        </h2>

        {/* Subheading */}
        <p
          className={`mx-auto mb-8 max-w-2xl text-base leading-relaxed sm:text-lg ${
            isGradient ? 'text-white/80' : 'text-muted-foreground'
          }`}
        >
          {subheading}
        </p>

        {/* Trust indicators */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {[
            { icon: Clock, text: 'Quick Decision' },
            { icon: Shield, text: 'No Hidden Fees' },
            { icon: Shield, text: 'Up to $500' },
          ].map((item) => (
            <div
              key={item.text}
              className={`flex items-center gap-2 text-sm ${
                isGradient ? 'text-white/80' : 'text-muted-foreground'
              }`}
            >
              <item.icon className={`h-4 w-4 ${isGradient ? 'text-[#22C55E]' : 'text-[#00A6FB]'}`} />
              {item.text}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={primaryCTA.href}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4 sm:text-base ${
              isGradient
                ? 'bg-white text-[#0A2540] hover:bg-[#F8FAFC]'
                : 'bg-[#00A6FB] text-white hover:bg-[#0097e8]'
            }`}
          >
            {primaryCTA.label}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors sm:w-auto sm:px-8 sm:py-4 sm:text-base ${
                isGradient
                  ? 'text-white/90 hover:text-white'
                  : 'text-[#0A2540] hover:text-[#00A6FB]'
              }`}
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>

        {/* Legal note */}
        <p
          className={`mt-8 text-xs ${isGradient ? 'text-white/50' : 'text-muted-foreground/70'}`}
        >
          Maximum loan: $500. Fee: 10% + $5 verification. Florida residents only.
          One active loan at a time.{' '}
          <Link
            href="/rates-fees"
            className={
              isGradient ? 'text-white/70 hover:text-white underline' : 'underline hover:text-[#00A6FB]'
            }
          >
            See full rates.
          </Link>
        </p>
      </div>
    </section>
  );
}
