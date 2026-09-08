import { Star, Quote } from 'lucide-react';

export function Testimonials({ testimonials = [] }) {
  const defaultTestimonials = [
    {
      id: 1,
      name: 'Maria S.',
      location: 'Miami, FL',
      rating: 5,
      content:
        'Sunshine was incredibly transparent about all fees upfront. No hidden charges, exactly what they promised. Got my funds quickly and the repayment process was simple.',
      loanAmount: 300,
    },
    {
      id: 2,
      name: 'James T.',
      location: 'Orlando, FL',
      rating: 5,
      content:
        "I needed help covering a car repair and Sunshine came through. The application was straightforward and I appreciated that they explained my rights as a borrower clearly.",
      loanAmount: 500,
    },
    {
      id: 3,
      name: 'Rosa M.',
      location: 'Tampa, FL',
      rating: 5,
      content:
        'Professional service from start to finish. The 60-day grace period policy shows they actually care about borrowers. Would use again if needed.',
      loanAmount: 200,
    },
  ];

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="section-label mb-4">Customer Stories</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#0A2540] md:text-4xl">
            Trusted by Floridians
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Real experiences from borrowers who chose Sunshine Micro Lending for their short-term needs.
          </p>
        </div>

        {/* Star Rating Summary */}
        <div className="mx-auto mb-10 flex max-w-xs flex-col items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 fill-[#22C55E] text-[#22C55E]" />
            ))}
          </div>
          <p className="text-sm font-semibold text-[#0A2540]">5.0 out of 5 stars</p>
          <p className="text-xs text-muted-foreground">Based on verified customer reviews</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((testimonial, index) => (
            <article
              key={testimonial.id || index}
              className="flex flex-col rounded-2xl border border-border bg-[#F8FAFC] p-6 transition-all duration-300 hover:border-[#00A6FB]/40 hover:shadow-card"
            >
              {/* Quote Icon */}
              <Quote className="mb-4 h-8 w-8 text-[#00A6FB]/20" />

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#22C55E] text-[#22C55E]" />
                ))}
              </div>

              {/* Content */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A2540] text-sm font-bold text-white">
                  {testimonial.name?.charAt(0) || 'C'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A2540]">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
                {testimonial.loanAmount && (
                  <div className="ml-auto">
                    <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-xs font-medium text-[#16A34A]">
                      ${testimonial.loanAmount}
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          * Customer experiences may vary. Individual results depend on personal financial situation.
        </p>
      </div>
    </section>
  );
}
