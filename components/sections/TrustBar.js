import { Shield, Clock, CheckCircle, Lock, Award, Users } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Shield,
    label: 'Florida Licensed',
    description: 'OFR Regulated',
  },
  {
    icon: Clock,
    label: 'Fast Decisions',
    description: 'Same Business Day',
  },
  {
    icon: CheckCircle,
    label: 'No Hidden Fees',
    description: '100% Transparent',
  },
  {
    icon: Lock,
    label: 'Secure & Private',
    description: 'Bank-Level Encryption',
  },
  {
    icon: Award,
    label: '60-Day Grace',
    description: 'No Extra Charges',
  },
  {
    icon: Users,
    label: 'One Loan Rule',
    description: 'Responsible Lending',
  },
];

export function TrustBar({ variant = 'light' }) {
  if (variant === 'dark') {
    return (
      <div className="border-t border-white/10 bg-[#0A2540]/50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                <item.icon className="h-5 w-5 text-[#22C55E]" />
                <span className="text-xs font-semibold text-white">{item.label}</span>
                <span className="text-xs text-white/50">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-border bg-[#F8FAFC] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00A6FB]/10">
                <item.icon className="h-4 w-4 text-[#00A6FB]" />
              </div>
              <span className="text-xs font-semibold text-[#0A2540]">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
