
const TermsAndCommunityPage = () => {
  return (
    <div className="p-8 bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8">Picgram Terms of Use & Community Rules</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Terms of Use</h2>
        <p className="mb-4">
          Welcome to Picgram! By using our platform, you agree to abide by the following terms:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>You must be at least 13 years old to use Picgram.</li>
          <li>Respect intellectual property rights when uploading content.</li>
          <li>Do not post illegal, harmful, or explicit content.</li>
          <li>Picgram reserves the right to modify these terms at any time.</li>
          <li>Violation of these terms may result in account suspension or termination.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Community Rules</h2>
        <p className="mb-4">
          Picgram is a community that thrives on creativity and respect. To ensure a positive experience for everyone, please follow these rules:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Be kind and respectful to others. Harassment and bullying are not tolerated.</li>
          <li>Avoid posting spam or irrelevant content.</li>
          <li>Report inappropriate content or behavior to our support team.</li>
          <li>Use Picgram to inspire, share, and connect positively.</li>
          <li>Stay authentic and genuine. Avoid impersonation or misleading information.</li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-600">
        <p>
          For more information, contact our support team at
          <a href="mailto:support@picgram.com" className="text-blue-600 underline ml-1">
            support@picgram.com
          </a>
        </p>
        <p>© {new Date().getFullYear()} Picgram. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsAndCommunityPage;
