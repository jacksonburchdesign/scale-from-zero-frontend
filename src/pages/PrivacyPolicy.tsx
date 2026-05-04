export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-extrabold text-zinc-50 mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-zinc-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to ScaleFromZero. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> first name, last name, GitHub username, avatar image.</li>
              <li><strong>Contact Data:</strong> email address.</li>
              <li><strong>Technical Data:</strong> internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              <li><strong>Usage Data:</strong> information about how you use our website, products and services, including your connected GitHub repositories and commit history.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. GitHub Integration and Vertex AI</h2>
            <p>
              ScaleFromZero uses GitHub OAuth to verify your identity and access your commit history. By connecting your GitHub account, you grant us permission to read your commit metadata. We process this metadata using Google's Vertex AI to generate public-facing changelog entries. We do not store your source code, only the commit messages and metadata necessary to generate the changelog.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
