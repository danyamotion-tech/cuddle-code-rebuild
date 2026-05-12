import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">Work</Link>
          <Link to="/about" className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
