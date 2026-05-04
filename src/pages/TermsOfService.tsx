export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-extrabold text-zinc-50 mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-zinc-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ScaleFromZero, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p>
              ScaleFromZero is a portfolio and changelog generation platform for software builders. We utilize third-party integrations (such as GitHub) and AI services (such as Google Vertex AI) to parse commit metadata and generate public-facing updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Obligations</h2>
            <p className="mb-4">As a user of the service, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information when creating an account.</li>
              <li>Maintain the security of your account credentials.</li>
              <li>Only connect repositories that you have the legal right and authorization to access and share.</li>
              <li>Not use the service for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>
              The materials contained in this website, including the underlying code, design, and generated changelogs (excluding your original commit data), are protected by applicable copyright and trademark law. You retain all ownership rights to your original code and commit messages on GitHub.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
