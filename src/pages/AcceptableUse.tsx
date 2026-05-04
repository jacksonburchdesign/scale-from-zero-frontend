export default function AcceptableUse() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-extrabold text-zinc-50 mb-6 tracking-tight">Acceptable Use Policy</h1>
        <p className="text-zinc-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <p>
              This Acceptable Use Policy outlines the acceptable use of ScaleFromZero's services. We reserve the right to modify this policy at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Prohibited Content</h2>
            <p className="mb-4">You may not use ScaleFromZero to publish, generate, or transmit any content that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Is unlawful, defamatory, or fraudulent.</li>
              <li>Infringes on any third party's intellectual property rights.</li>
              <li>Contains malicious code, viruses, or any other software intended to disrupt or damage systems.</li>
              <li>Violates the terms of service of our integration partners (e.g., GitHub).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Abuse of AI Generation</h2>
            <p>
              ScaleFromZero provides automated changelog generation via Vertex AI. You agree not to manipulate or exploit this system to generate spam, misleading information, or excessive requests that unreasonably burden our infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Enforcement</h2>
            <p>
              We reserve the right, but do not assume the obligation, to investigate any violation of this policy or misuse of the service. We may immediately suspend or terminate your access without notice if we determine you have violated this Acceptable Use Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
