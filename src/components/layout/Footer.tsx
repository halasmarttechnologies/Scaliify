export function Footer() {
  return (
    <footer className="w-full bg-black text-white py-16 px-4 md:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <div className="font-bold text-3xl mb-4 text-white">Scaliify</div>
          <p className="text-gray-400 leading-relaxed text-sm">
            Your one-stop shop for all things HR related. Technology, processes, management, and strategy.
          </p>
        </div>
        <div className="flex flex-wrap gap-16 text-sm text-gray-300">
          {/* TODO: Add real footer links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-base">Company</h4>
            <a href="#" className="hover:text-[#81D8D0] transition-colors">About Us</a>
            <a href="#" className="hover:text-[#81D8D0] transition-colors">Careers</a>
            <a href="#" className="hover:text-[#81D8D0] transition-colors">Contact</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-base">Legal</h4>
            <a href="#" className="hover:text-[#81D8D0] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#81D8D0] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Scaliify. All rights reserved.
      </div>
    </footer>
  );
}
