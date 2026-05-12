import ContactForm from "@/components/ContactForm";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const About = () => {
  return (
    <main className="pt-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
        {/* Two-column hero */}
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">About CineVerse</h1>
          </div>
          <div className="space-y-6">
            <div className="text-muted-foreground text-base leading-relaxed space-y-4">
              <p>
                Founded in 2019, CineVerse began as a passion project dedicated to exploring cinema
                beyond the mainstream. What started as weekend screenings and late-night discussions has
                evolved into a comprehensive platform for film criticism, analysis, and celebration.
              </p>
              <p>
                Our mission is to bridge the gap between academic film theory and accessible
                entertainment writing. We believe that every film—from blockbusters to obscure indie
                gems—deserves thoughtful consideration and context. Whether you're a casual moviegoer or
                a dedicated cinephile, you'll find perspectives that deepen your appreciation for the art
                of cinema.
              </p>
              <p>
                Based in Portland, Oregon, our team of writers and critics brings diverse backgrounds in
                film studies, journalism, and creative arts. We cover everything from festival premieres
                to retrospective analyses, always striving to find the story behind the story.
              </p>
            </div>
            <div className="text-muted-foreground space-y-1 text-sm">
              <p>
                <a href="mailto:hello@cineverse.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  hello@cineverse.com
                </a>
              </p>
              <p>(503) 555-2847</p>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 mb-16">
          <a href="#" aria-label="Instagram" className="text-foreground hover:opacity-60 transition-opacity">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" aria-label="Twitter" className="text-foreground hover:opacity-60 transition-opacity">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-foreground hover:opacity-60 transition-opacity">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Contact form */}
        <ContactForm />
      </div>
    </main>
  );
};

export default About;
