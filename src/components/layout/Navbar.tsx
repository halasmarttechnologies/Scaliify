export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-6 px-4 md:px-8 bg-white border-b border-border/40 sticky top-0 z-50">
      <div className="font-bold text-2xl text-black">Scaliify</div>
      {/* TODO: Implement Navigation Menu */}
      <div className="hidden md:flex gap-8 text-sm font-medium text-black">
        <a href="#services" className="hover:text-[#81D8D0] transition-colors">Services</a>
        <a href="#companies" className="hover:text-[#81D8D0] transition-colors">Clients</a>
        <a href="#software" className="hover:text-[#81D8D0] transition-colors">Software</a>
      </div>
      <div>
        <button className="bg-black text-white px-5 py-2.5 rounded-md hover:bg-[#81D8D0] hover:text-black transition-colors text-sm font-semibold">
          Get Started
        </button>
      </div>
    </nav>
  );
}
