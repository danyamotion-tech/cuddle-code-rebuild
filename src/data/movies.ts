export interface Movie {
  id: number;
  slug: string;
  title: string;
  year: number;
  genre: string;
  director: string;
  writers: string[];
  cast: string[];
  cinematography: string;
  runtime: string;
  rating: number;
  releaseDate: string;
  distributor: string;
  posterDescription: string;
  review: string;
  galleryDescriptions: string[];
  relatedSlugs: string[];
  artworkUrl?: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    slug: "the-midnight-archive",
    title: "The Midnight Archive",
    year: 2024,
    genre: "Mystery/Thriller",
    director: "Elena Marsh",
    writers: ["Elena Marsh", "Sophie Chen"],
    cast: ["Marcus Webb", "Diana Foster", "Harold Chen", "Isabelle Dubois"],
    cinematography: "James Wei",
    runtime: "127 minutes",
    rating: 4.5,
    releaseDate: "March 15, 2024",
    distributor: "Apex Films",
    posterDescription: "Noir-style poster with dramatic shadows",
    review: `Elena Marsh's 'The Midnight Archive' is a mesmerizing dive into noir tradition that feels both reverential and refreshingly modern. The film follows librarian Thomas Crane, whose discovery of a forgotten manuscript leads him down a labyrinthine trail of Cold War espionage, literary forgery, and personal obsession.\n\nWhat elevates this beyond standard thriller territory is Marsh's patient, atmospheric approach. She understands that mystery thrives in shadows and silence, and cinematographer James Wei's work here is extraordinary—each frame looks like it could hang in a gallery, all deep blacks and amber highlights that recall both classic noir and contemporary art photography.\n\nThe screenplay, co-written by Marsh and debut writer Sophie Chen, intelligently weaves together multiple timelines without feeling overly complex. We move between 1950s Prague, 1980s Berlin, and present-day New York with clarity and purpose, each era rendered with meticulous period detail.\n\nLead actor Marcus Webb delivers a career-defining performance as Crane, playing him as an unlikely hero—intellectual, obsessive, and increasingly unmoored from reality as the investigation deepens. His chemistry with co-star Diana Foster, who plays a mysterious antiquarian bookseller, crackles with tension and ambiguity.\n\nIf there's a weakness, it's that the film's deliberate pace may test patience for viewers seeking conventional thriller beats. But for those willing to submit to its rhythm, 'The Midnight Archive' offers rich rewards: a meditation on truth, memory, and the stories we tell ourselves. In an era of franchise filmmaking, Marsh has crafted something rare—an original, adult thriller that trusts its audience's intelligence and rewards careful attention.`,
    galleryDescriptions: [
      "Marcus Webb examining ancient manuscript under lamplight",
      "Diana Foster in dimly lit bookshop",
      "Noir-style rain-soaked cobblestone street",
      "Split screen showing 1950s Prague and modern New York",
    ],
    relatedSlugs: ["borrowed-time", "echo-park", "neon-hearts"],
  },
  {
    id: 2,
    slug: "borrowed-time",
    title: "Borrowed Time",
    year: 2023,
    genre: "Science Fiction",
    director: "Kai Nakamura",
    writers: ["Kai Nakamura"],
    cast: ["Lena Torres", "David Park", "Amira Hassan"],
    cinematography: "Oscar Lindqvist",
    runtime: "142 minutes",
    rating: 4,
    releaseDate: "September 8, 2023",
    distributor: "Meridian Studios",
    posterDescription: "Minimalist poster with suspended clock",
    review: `Kai Nakamura's 'Borrowed Time' is an ambitious time-travel drama that prioritizes emotional depth over spectacle. Lena Torres anchors the film with a nuanced performance as Dr. Maya Chen, a quantum physicist who discovers she can borrow minutes from her future self—but at a cost she doesn't fully understand until it's too late. The concept is clever, the execution thoughtful, and the implications deeply moving.

Oscar Lindqvist's cinematography deserves particular praise. He renders time displacement through subtle visual cues rather than flashy effects—a slight color shift, a barely perceptible change in depth of field—that create an unsettling sense of temporal vertigo. The laboratory sequences, bathed in cold blue light that gradually warms as Maya's experiments progress, are some of the most visually arresting sci-fi imagery in recent memory.

The supporting cast elevates the material considerably. David Park brings quiet gravitas to the role of Maya's research partner, whose skepticism masks genuine concern, while Amira Hassan delivers a heartbreaking turn as Maya's daughter, who begins to notice the gaps in her mother's timeline before anyone else does. Their scenes together carry an emotional weight that grounds the film's headier concepts.

While the pacing stumbles in the second act—a subplot involving a rival research team feels grafted on from a less interesting movie—the film recovers spectacularly with a devastating finale that recontextualizes everything before it. Nakamura trusts his audience to piece together the temporal puzzle without hand-holding, and the final shot, held for an agonizing two minutes of near-silence, ranks among the year's most powerful cinematic moments. A thinking person's sci-fi film that earns its tears.`,
    galleryDescriptions: [
      "Lena Torres staring at fractured clock mechanism",
      "Time laboratory with blue-tinged lighting",
      "Two versions of the same person meeting",
      "Final scene in empty observatory",
    ],
    relatedSlugs: ["the-midnight-archive", "signal-lost", "curved-space"],
  },
  {
    id: 3,
    slug: "echo-park",
    title: "Echo Park",
    year: 2024,
    genre: "Drama",
    director: "Maria Santos",
    writers: ["Maria Santos", "James Liu"],
    cast: ["Rosa Diaz", "Tommy Chen", "Elena Varga"],
    cinematography: "Patricia Moore",
    runtime: "118 minutes",
    rating: 4,
    releaseDate: "January 20, 2024",
    distributor: "Indie Vision",
    posterDescription: "Intimate character portrait with sunset tones",
    review: `Maria Santos delivers an intimate portrait of community and belonging in 'Echo Park.' Set over one sweltering Los Angeles summer, the film weaves together the stories of three neighbors whose lives intersect in unexpected ways—a grandmother fighting gentrification, a young musician searching for his sound, and a recently arrived immigrant navigating an unfamiliar city.

Rosa Diaz is revelatory as Abuela Carmen, a woman who has watched her neighborhood transform over five decades and now faces the prospect of losing her home to developers. Diaz plays Carmen with fierce dignity and unexpected humor, refusing to let the character become a symbol rather than a person. Her confrontation with a real estate agent in the film's climactic scene is acted with such raw authenticity that it feels less like performance and more like witnessing.

Patricia Moore's cinematography captures Los Angeles with the warmth and specificity of someone who truly knows these streets. She finds beauty in the ordinary—morning light hitting a chain-link fence, the shadow patterns of palm trees on cracked sidewalks—and her handheld work during the block party sequence pulses with communal joy. The film's color palette shifts subtly across its runtime, from the bleached-out whites of summer heat to the golden warmth of connection and community.

Santos and co-writer James Liu avoid the trap of sentimentality by giving each character genuine flaws and contradictions. Tommy Chen's aspiring musician is talented but selfish; Elena Varga's newcomer is resilient but not always kind. These are people you come to love precisely because the film respects them enough to show their full complexity. The result is a love letter to a neighborhood in transition that never pretends change is simple.`,
    galleryDescriptions: [
      "Rosa Diaz sitting on porch at golden hour",
      "Neighborhood block party scene",
      "Empty park bench at dusk",
      "Community mural being painted",
    ],
    relatedSlugs: ["the-midnight-archive", "vertical-dreams", "between-the-lines"],
  },
  {
    id: 4,
    slug: "neon-hearts",
    title: "Neon Hearts",
    year: 2023,
    genre: "Romance",
    director: "Yuki Tanaka",
    writers: ["Yuki Tanaka"],
    cast: ["Jin Park", "Sofia Laurent", "Marcus Bell"],
    cinematography: "Nadia Petrova",
    runtime: "105 minutes",
    rating: 3.5,
    releaseDate: "February 14, 2023",
    distributor: "Lumière Films",
    posterDescription: "Vibrant cityscape with neon signs",
    review: `'Neon Hearts' pulses with the electric energy of Tokyo at night. Yuki Tanaka crafts a love story that's as visually intoxicating as it is emotionally resonant, following two strangers—a Korean-American photographer and a French cellist—who keep finding each other across the city's neon-lit landscape over the course of a single week.

Jin Park and Sofia Laurent have undeniable chemistry, but what makes their pairing special is how Tanaka allows their connection to develop through silences and shared glances rather than grand declarations. Their first encounter in a crowded Shibuya ramen shop unfolds almost entirely without dialogue, communicating volumes through Nadia Petrova's intimate close-ups and the ambient symphony of the city around them.

Petrova's cinematography transforms Tokyo into a character unto itself—a maze of reflected light and rain-slicked surfaces that seems to conspire to bring the lovers together. Her use of neon as emotional shorthand is inspired: warm ambers and reds during moments of connection, cool blues and purples during separation. The film's centerpiece sequence, a wordless chase through the Kabukichō district set to a propulsive electronic score, is pure cinema at its most exhilarating.

The film's greatest strength is its refusal to sentimentalize. These are flawed, complicated people making messy choices—he's running from a failed engagement, she's hiding from a career crisis—and the film loves them not in spite of their imperfections but because of them. The bittersweet ending will divide audiences, but it's the only honest conclusion to a story that has been unflinching in its emotional honesty from the first frame.`,
    galleryDescriptions: [
      "Couple reflected in rain-soaked Tokyo street",
      "Neon bar interior with warm amber lighting",
      "Dawn breaking over Shibuya crossing",
      "Two figures on opposite sides of a window",
    ],
    relatedSlugs: ["echo-park", "the-balcony", "glass-houses"],
  },
  {
    id: 5,
    slug: "the-last-frontier",
    title: "The Last Frontier",
    year: 2024,
    genre: "Western",
    director: "Samuel Brooks",
    writers: ["Samuel Brooks", "Helen Tate"],
    cast: ["Robert Flanagan", "Maya Redhawk", "Vincent Cole"],
    cinematography: "Derek Owens",
    runtime: "156 minutes",
    rating: 4.5,
    releaseDate: "May 3, 2024",
    distributor: "Canyon Pictures",
    posterDescription: "Wide landscape with lone figure",
    review: `Samuel Brooks reinvents the Western with 'The Last Frontier,' a sprawling epic that confronts the genre's problematic history while honoring its visual grandeur. Set in 1890s Montana during the final years of the open frontier, the film follows a disillusioned marshal who must escort a group of Crow Nation families to safety as corporate mining interests close in on their ancestral lands.

Robert Flanagan brings weathered authenticity to Marshal James Cade, a man haunted by the violence he's perpetrated in the name of "civilization." But the real revelation is Maya Redhawk's performance as Running Deer, a Crow interpreter and healer who becomes the moral center of the story. Redhawk, herself of Indigenous heritage, brings a dignity and quiet power to the role that reframes the entire Western genre around an Indigenous perspective without ever feeling didactic.

Derek Owens' cinematography captures the American West with breathtaking scope. His wide shots of the Montana landscape—endless grass seas rippling under cathedral skies—recall the painterly grandeur of John Ford while serving a very different narrative purpose. Here, the landscape is not a backdrop for conquest but a living presence that predates and will outlast every human drama played across it. The film's signature shot, a slow zoom from an extreme wide of the prairie to a tight close-up of a single wildflower, encapsulates its entire philosophy in thirty wordless seconds.

The screenplay, co-written by Brooks and Helen Tate, weaves together multiple perspectives without losing narrative momentum across its 156-minute runtime. Vincent Cole provides welcome complexity as a mining company foreman who is neither villain nor hero but a man trapped by the economics of empire. The film's climax—a tense standoff that resolves not through gunfire but through an act of radical empathy—is both surprising and inevitable, the mark of storytelling at its finest.`,
    galleryDescriptions: [
      "Lone rider silhouetted against Montana sunset",
      "Frontier town main street in morning fog",
      "Close-up of weathered hands holding a letter",
      "Wide shot of endless prairie",
    ],
    relatedSlugs: ["momentum", "the-midnight-archive", "factory-floor"],
  },
  {
    id: 6,
    slug: "wavelength",
    title: "Wavelength",
    year: 2023,
    genre: "Documentary",
    director: "Alex Rivera",
    writers: ["Alex Rivera"],
    cast: [],
    cinematography: "Alex Rivera",
    runtime: "94 minutes",
    rating: 4,
    releaseDate: "April 12, 2023",
    distributor: "DocuStar",
    posterDescription: "Abstract sound waves visual",
    review: `'Wavelength' is a hypnotic exploration of sound, silence, and the spaces between. Director Alex Rivera follows three deaf musicians—a drummer in Berlin, a electronic producer in Detroit, and a traditional instrumentalist in Osaka—as they navigate the world of experimental music, challenging our assumptions about hearing and artistic expression.

Rivera's approach is immersive rather than explanatory. Rather than interviewing his subjects about their experiences, he places us inside them. The film's groundbreaking sound design, created in collaboration with deaf sound artist Christine Sun Kim, layers sub-bass frequencies, bone-conducted vibrations, and modified audio spectrums to approximate how each musician perceives sound. The effect is disorienting and revelatory—you emerge from the theater hearing the world differently.

The documentary's most powerful sequence follows Kenji, the Osaka-based koto player, as he performs in a centuries-old temple. Rivera removes all conventional audio and replaces it with a visualization of the vibrations traveling through the wooden floor, up through Kenji's bare feet, and into his body. It's a moment of pure cinema that communicates more about the nature of music than any lecture could.

What prevents 'Wavelength' from being merely a technical exercise is Rivera's genuine affection for his subjects and their artistry. These are not people defined by disability but artists pushing the boundaries of their medium. The film's final sequence—a collaborative performance bringing all three musicians together for the first time—builds to a crescendo of visual and tactile beauty that left this reviewer unexpectedly moved. A profoundly important meditation on perception and creativity.`,
    galleryDescriptions: [
      "Musician feeling vibrations on studio floor",
      "Sound wave visualization in dark room",
      "Concert performance with visual interpreters",
      "Hands reading braille musical notation",
    ],
    relatedSlugs: ["clean-lines", "overhang", "aperture"],
  },
  {
    id: 7,
    slug: "vertical-dreams",
    title: "Vertical Dreams",
    year: 2024,
    genre: "Drama",
    director: "Chen Wei",
    writers: ["Chen Wei", "Li Ming"],
    cast: ["Zhang Hao", "Wu Lin", "Mei Xiang"],
    cinematography: "Park Sung-ho",
    runtime: "131 minutes",
    rating: 3.5,
    releaseDate: "June 14, 2024",
    distributor: "Pacific Arts",
    posterDescription: "Towering city buildings",
    review: `Chen Wei's 'Vertical Dreams' examines the human cost of rapid urbanization through the lens of three families living in a soon-to-be-demolished apartment tower in Shanghai. Spanning from the building's construction in the 1980s to its scheduled demolition in 2024, the film uses a single structure to tell the story of a nation's transformation.

The film's vertical framing is both literal and metaphorical. Park Sung-ho's camera frequently tilts upward through the building's stairwell, connecting the lives on different floors while emphasizing the aspirational trajectory that drives each character. These are people striving upward while the ground shifts beneath them—a metaphor that Chen handles with subtlety and grace.

Zhang Hao delivers a quietly devastating performance as Old Liu, a building superintendent who's spent forty years tending a home that's about to disappear. His relationship with the building is almost conjugal—he knows every creaking pipe, every temperamental elevator button—and watching him prepare for its demolition carries the weight of a love story's final act. The scene where he methodically polishes the lobby tiles one last time is heartbreaking in its simplicity.

The supporting cast is uniformly excellent. Wu Lin brings nervous energy to a young tech worker on the top floor whose startup dreams clash with his parents' expectations, while Mei Xiang is luminous as a retired teacher on the ground floor who has been secretly documenting the building's history. Chen weaves their stories together without forcing connections, allowing the building itself to serve as the binding element. The result is a film that mourns progress while acknowledging its necessity—a balance few filmmakers achieve.`,
    galleryDescriptions: [
      "View looking up through apartment stairwell",
      "Family dinner in cramped apartment",
      "Children playing on building rooftop",
      "Demolition notice posted on wall",
    ],
    relatedSlugs: ["echo-park", "the-tenant", "five-stories"],
  },
  {
    id: 8,
    slug: "between-the-lines",
    title: "Between the Lines",
    year: 2023,
    genre: "Indie Drama",
    director: "Rachel Stone",
    writers: ["Rachel Stone"],
    cast: ["Olivia Hart", "Michael Chen", "Sarah Brooks"],
    cinematography: "Tom Wilkinson",
    runtime: "97 minutes",
    rating: 3.5,
    releaseDate: "October 6, 2023",
    distributor: "A24",
    posterDescription: "Typography and geometric patterns",
    review: `Rachel Stone's debut feature 'Between the Lines' is a literary meditation disguised as a relationship drama, and it announces a filmmaker of uncommon intelligence and sensitivity. Distributed by A24, the film has the studio's signature blend of indie sensibility and precise craftsmanship, but Stone's voice is entirely her own.

Olivia Hart plays Clara, a proofreader at a small literary press whose obsessive attention to textual detail begins to bleed into her personal relationships. She corrects her boyfriend's grammar mid-argument, rewrites her mother's text messages in her head, and begins to see typos in the world itself—a crooked street sign becomes a misplaced modifier, a stammered apology an incomplete sentence. Hart navigates this potentially precious conceit with remarkable naturalism, making Clara's condition feel less like a quirk and more like a genuine way of experiencing the world.

Tom Wilkinson's cinematography is deliberately restrained, favoring medium shots and natural light that create a sense of documentary intimacy. The film's visual language mirrors its thematic concerns—everything is about framing, about what's included and excluded from the frame, about the gap between what's captured and what's meant.

Stone's screenplay is witty and precise, filled with wordplay that never feels forced. A dinner party scene where Clara mentally edits each guest's conversation in real-time is both hilarious and deeply sad, revealing the loneliness of a mind that can't stop analyzing. Michael Chen brings easy charm to the boyfriend role, making his growing frustration feel earned rather than manufactured. The film is slight by design—it's a chamber piece about language, connection, and the gaps between what we say and what we mean—but it lingers in the memory like a beautifully constructed sentence.`,
    galleryDescriptions: [
      "Olivia Hart surrounded by manuscript pages",
      "Close-up of red editing marks on paper",
      "Two people talking in bookstore aisle",
      "Typewriter on desk by window",
    ],
    relatedSlugs: ["echo-park", "glass-houses", "the-balcony"],
  },
  {
    id: 9,
    slug: "the-tenant",
    title: "The Tenant",
    year: 2024,
    genre: "Psychological Thriller",
    director: "Hugo Larsen",
    writers: ["Hugo Larsen", "Mia Svensson"],
    cast: ["Karl Engström", "Birgit Holm", "Anders Voss"],
    cinematography: "Lise Bergman",
    runtime: "113 minutes",
    rating: 4,
    releaseDate: "August 9, 2024",
    distributor: "Nordic Films",
    posterDescription: "Multi-story apartment building",
    review: `Hugo Larsen channels Polanski and Hitchcock in 'The Tenant,' a claustrophobic psychological thriller that ranks among the finest Nordic genre films in recent memory. Set in a crumbling Stockholm apartment building during the endless darkness of a Scandinavian winter, the film transforms domestic space into a landscape of creeping dread.

Karl Engström is magnetic as Erik, a mild-mannered translator who moves into a vacant apartment after the previous tenant's mysterious death. Initially, the building's eccentricities—strange sounds through the walls, neighbors who seem to know his schedule—register as mere urban oddities. But as Erik begins investigating his predecessor's fate, the line between curiosity and obsession, between paranoia and genuine threat, dissolves completely.

Lise Bergman's cinematography is a masterclass in creating unease from the mundane. Her camera lingers on ordinary objects—a doorknob, a mailbox, a peephole—until they become charged with menace. The building's narrow corridors and low ceilings create a constant sense of compression, and Bergman's use of shallow focus keeps the edges of every frame slightly blurred, as if the world is literally closing in on Erik.

Co-writer Mia Svensson brings a structural ingenuity to the screenplay that rewards multiple viewings. Dialogue that seems throwaway on first encounter reveals itself as carefully planted clues, and the film's visual motifs—mirrors, doors, windows—accumulate meaning like a poem. Birgit Holm and Anders Voss are perfectly cast as neighbors whose surface friendliness conceals something unreadable. The final revelation is both shocking and, in retrospect, inevitable—the hallmark of a perfectly constructed thriller that demands immediate rewatching.`,
    galleryDescriptions: [
      "Shadowy apartment corridor",
      "Figure watching through peephole",
      "Overhead shot of spiral staircase",
      "Empty apartment with single chair",
    ],
    relatedSlugs: ["the-midnight-archive", "spiral", "glass-houses"],
  },
  {
    id: 10,
    slug: "momentum",
    title: "Momentum",
    year: 2023,
    genre: "Action",
    director: "Jade Kimura",
    writers: ["Jade Kimura", "Tony Reeves"],
    cast: ["Leo Huang", "Priya Sharma", "Jake Morrison"],
    cinematography: "Vincent Zhao",
    runtime: "108 minutes",
    rating: 3.5,
    releaseDate: "July 21, 2023",
    distributor: "Thunder Pictures",
    posterDescription: "Dynamic motion blur",
    review: `Jade Kimura proves that action cinema can be both visceral and intelligent with 'Momentum,' a film that treats the human body as its primary special effect. In an era of CGI-saturated blockbusters, Kimura's commitment to practical stunts and real physical performance feels almost radical—and the results are genuinely jaw-dropping.

Leo Huang stars as Kai, a former competitive parkour athlete working as a bicycle courier in Hong Kong who gets caught in a web of corporate espionage after unknowingly delivering a package containing stolen biometric data. Huang, who performed all his own stunts after six months of intensive training, brings both athletic grace and emotional vulnerability to a role that could easily have been one-dimensional.

The action sequences are the film's calling card, and they deserve their reputation. Kimura uses long takes—the centerpiece rooftop chase runs an unbroken four minutes and thirty seconds—to create a sense of real physical danger that no amount of CGI can replicate. You can hear Huang's ragged breathing, see the genuine fear in his eyes during a twenty-foot leap, and feel every impact. Co-cinematographer Vincent Zhao keeps the camera fluid but grounded, refusing the shaky-cam chaos that plagues most contemporary action films.

What elevates 'Momentum' beyond pure spectacle is Kimura's attention to the quieter moments between set pieces. Priya Sharma brings warmth and intelligence to Kai's ally, a data analyst who provides brains to complement his brawn, and their developing friendship feels genuine rather than obligatory. The film is not deep—its corporate conspiracy plot is serviceable rather than revelatory—but it's executed with such skill, energy, and obvious love for the craft of physical filmmaking that it transcends its genre entirely.`,
    galleryDescriptions: [
      "Parkour sequence across rooftops",
      "Motion-blurred chase through market",
      "Leo Huang in mid-leap between buildings",
      "Night chase scene with city lights",
    ],
    relatedSlugs: ["the-last-frontier", "signal-lost", "the-midnight-archive"],
  },
  {
    id: 11,
    slug: "glass-houses",
    title: "Glass Houses",
    year: 2024,
    genre: "Drama",
    director: "Amara Osei",
    writers: ["Amara Osei"],
    cast: ["Kesha Williams", "Thomas Reed", "Grace Liu"],
    cinematography: "Raj Patel",
    runtime: "122 minutes",
    rating: 4,
    releaseDate: "April 5, 2024",
    distributor: "Clearview Studios",
    posterDescription: "Reflective modern architecture",
    review: `'Glass Houses' is Amara Osei's searing examination of wealth, privacy, and the illusion of transparency—a domestic drama that doubles as a sharp critique of Silicon Valley's "nothing to hide" philosophy. Set almost entirely within a ultra-modern glass home perched in the Hollywood Hills, the film uses architecture as both setting and metaphor with devastating precision.

The Sterling family appears to have it all: tech mogul David (Thomas Reed) has built his fortune on a social media platform that champions radical transparency, and his family's glass house is the physical manifestation of his ideology. But when wife Nina (Kesha Williams) discovers a series of encrypted files on David's personal server, the cracks in their transparent life begin to spider across every surface.

Raj Patel's cinematography is the film's secret weapon. He uses the home's glass walls to create frames within frames, reflections that multiply and distort, and a perpetual sense that someone is always watching from the darkness beyond the glass. A brilliant recurring shot places the camera outside the house at night, looking in at the family illuminated like specimens in a vitrine—beautiful, visible, and utterly exposed.

Williams gives a fearless, awards-worthy performance as Nina, a former investigative journalist who traded her career for comfort and now must reclaim her instincts. The scene where she methodically searches David's office while maintaining a perfectly composed video call with their daughter's school is a virtuoso display of controlled tension. Grace Liu adds dimension as the family's au pair, whose outside perspective provides the audience's entry point into this hermetically sealed world. Osei's film argues, with elegant fury, that visibility isn't the same as truth—and that the most dangerous walls are the ones you can see right through.`,
    galleryDescriptions: [
      "Glass house glowing at night on hillside",
      "Reflections of family in transparent walls",
      "Aerial view of modernist architecture",
      "Interior showing multiple reflections",
    ],
    relatedSlugs: ["the-tenant", "vertical-dreams", "neon-hearts"],
  },
  {
    id: 12,
    slug: "spiral",
    title: "Spiral",
    year: 2023,
    genre: "Horror",
    director: "Dana Volkov",
    writers: ["Dana Volkov", "Peter Crane"],
    cast: ["Nina Reeves", "Jason Moore", "Tilda Eriksson"],
    cinematography: "Marco Di Luca",
    runtime: "99 minutes",
    rating: 3.5,
    releaseDate: "October 27, 2023",
    distributor: "Dread Films",
    posterDescription: "Hypnotic spiral staircase",
    review: `Dana Volkov's 'Spiral' is an art-house horror film that burrows under your skin and stays there—a work of sustained, geometric dread that reimagines what the genre can achieve. This is not horror through shock but through the slow, inexorable accumulation of wrongness, and it's far more effective for it.

Nina Reeves stars as Vera, an architect specializing in historical restoration who inherits a sprawling Victorian mansion from an aunt she barely knew. The house is magnificent but disorienting, and at its center lies an impossible spiral staircase that seems to descend far deeper than the building's foundation should allow. As Vera explores the staircase, she discovers that each revolution downward corresponds to a layer of her family's buried history—secrets that perhaps should have stayed buried.

Volkov builds dread through geometry and sound rather than jump scares. The spiral motif recurs obsessively throughout the film—in wallpaper patterns, in the grain of wooden furniture, in the fingerprint Vera leaves on a dusty banister—creating a visual grammar of inescapable descent. The sound design by Annika Ström is extraordinary: a persistent, barely audible tone that shifts frequency as Vera goes deeper, creating a physical sensation of unease that viewers report feeling in their inner ears.

Marco Di Luca's vertigo-inducing cinematography is the real star. His overhead shots of the staircase, filmed with a slowly rotating camera, create a dizzying sense of infinite regression that's both beautiful and deeply unsettling. Jason Moore and Tilda Eriksson provide strong support as Vera's increasingly alarmed colleagues, but this is ultimately Reeves' film—her performance charts a precise trajectory from professional curiosity through obsession to something more primal and terrifying. The final descent is a sequence you won't soon forget, and won't soon want to repeat.`,
    galleryDescriptions: [
      "View down infinite spiral staircase",
      "Victorian mansion exterior at twilight",
      "Architect's blueprints with impossible geometry",
      "Figure ascending stairs into darkness",
    ],
    relatedSlugs: ["the-tenant", "the-midnight-archive", "the-balcony"],
  },
  {
    id: 13,
    slug: "the-balcony",
    title: "The Balcony",
    year: 2024,
    genre: "Foreign Drama",
    director: "Léa Moreau",
    writers: ["Léa Moreau"],
    cast: ["Juliette Blanc", "Antoine Dumas", "Margaux Renard"],
    cinematography: "Philippe Beaumont",
    runtime: "115 minutes",
    rating: 4,
    releaseDate: "February 2, 2024",
    distributor: "Cinéma Français",
    posterDescription: "European apartment facade",
    review: `Léa Moreau's 'The Balcony' is a masterclass in restrained storytelling—a film that finds the infinite within the intimate, proving that the greatest dramas can unfold in the smallest spaces. Set entirely within view of a fifth-floor Parisian apartment balcony, the film observes the changing seasons through the eyes of Madame Lefort, a recently widowed retired literature professor.

Juliette Blanc is magnificent in the role, delivering a performance of extraordinary economy. She conveys oceans of emotion with the smallest gesture—the way she pauses before stepping onto the balcony each morning, as if gathering courage to face another day; the almost imperceptible smile when she hears children playing in the courtyard below; the ritualistic precision with which she arranges her husband's empty chair beside hers. It's a performance that reveals more with each viewing, like a great novel that yields new depths upon rereading.

Philippe Beaumont's camera never leaves the apartment, yet the film feels expansive. Through the balcony's iron railing, we see the neighborhood change—new shops opening, old ones closing, trees cycling through their seasonal wardrobe. Beaumont frames the Parisian rooftops as a living canvas that shifts with the light, from the pale silver of winter dawn to the golden honeyed glow of summer evenings. The film's visual restriction becomes its greatest strength, focusing our attention so completely that every detail becomes significant.

Antoine Dumas and Margaux Renard make strong impressions in smaller roles as Madame Lefort's adult children, whose well-meaning visits illuminate the generational divide between those who understand solitude and those who fear it. Moreau's screenplay, adapted from her own short story collection, captures the rhythms of a life lived in reflection—not with sentimentality but with the clear-eyed compassion of someone who understands that grief and gratitude can coexist in the same breath. The film's final image, held as the screen slowly fades, is among the most quietly devastating endings in recent cinema.`,
    galleryDescriptions: [
      "Parisian balcony overlooking morning rooftops",
      "Widow sitting with coffee at sunrise",
      "Rain falling on iron balcony railing",
      "View of autumn leaves from apartment",
    ],
    relatedSlugs: ["echo-park", "between-the-lines", "five-stories"],
  },
  {
    id: 14,
    slug: "signal-lost",
    title: "Signal Lost",
    year: 2023,
    genre: "Sci-Fi",
    director: "Omar Hassan",
    writers: ["Omar Hassan", "Julia West"],
    cast: ["Daniel Okafor", "Yuki Sato", "Elena Popov"],
    cinematography: "Ingrid Solheim",
    runtime: "138 minutes",
    rating: 4,
    releaseDate: "November 17, 2023",
    distributor: "Quantum Films",
    posterDescription: "Communications tower",
    review: `'Signal Lost' is hard science fiction at its finest—a film that takes the vastness of space seriously and finds terror not in alien creatures but in the limits of human comprehension. Omar Hassan crafts a tense, cerebral thriller set aboard the Meridian Array, a deep-space communications station orbiting Neptune, where a skeleton crew of three begins receiving messages from a source that, according to every known model of the universe, shouldn't exist.

Daniel Okafor grounds the film with a commanding performance as Chief Engineer Solomon Adeyemi, a practical man of science forced to confront phenomena that resist rational explanation. Okafor brings a quiet intensity to the role that makes Solomon's gradual unraveling all the more disturbing—this is not a man prone to hysteria, which makes his growing fear genuinely contagious.

Ingrid Solheim's cinematography transforms the station into a character in its own right. Her cold, precise framing emphasizes the geometric isolation of human life against the infinite void, and her use of practical lighting—the flicker of monitors, the pulse of warning indicators—creates an atmosphere of perpetual twilight that mirrors the crew's deteriorating psychological state. A brilliant visual motif tracks the increasing disarray of Solomon's previously immaculate workspace, charting his mental state through environmental detail.

The screenplay, co-written by Hassan and Julia West, resists the temptation to explain its central mystery. The signals—visualized as haunting patterns of light and sound—are allowed to remain genuinely alien, genuinely Other, and the film's power lies in this refusal to domesticate the unknown. Yuki Sato and Elena Popov provide excellent support as Solomon's increasingly fractured crewmates, and the film's sound design deserves special mention—the silence of space has never felt so oppressive, making every creak and hum of the station feel like a message from the void.`,
    galleryDescriptions: [
      "Communications array against starfield",
      "Control room with flickering monitors",
      "Astronaut floating in station corridor",
      "Signal waveform on dark screen",
    ],
    relatedSlugs: ["borrowed-time", "curved-space", "wavelength"],
  },
  {
    id: 15,
    slug: "overhang",
    title: "Overhang",
    year: 2024,
    genre: "Architectural Doc",
    director: "Petra Novak",
    writers: ["Petra Novak"],
    cast: [],
    cinematography: "Petra Novak",
    runtime: "88 minutes",
    rating: 3.5,
    releaseDate: "March 22, 2024",
    distributor: "ArchiFilm",
    posterDescription: "Brutalist architecture",
    review: `Petra Novak's 'Overhang' is a love letter to brutalist architecture that will convert even the most dedicated skeptics. In an era when concrete housing estates are routinely demolished to make way for luxury developments, Novak makes a passionate, visually stunning case for their preservation—not as monuments to architectural theory but as living communities with stories worth telling.

Through breathtaking drone photography that reveals the geometric beauty of brutalist design from angles most people never experience, Novak transforms buildings commonly dismissed as eyesores into objects of genuine aesthetic wonder. Her camera glides along concrete balconies, ascends through stairwells, and hovers above rooftop gardens, finding patterns, textures, and compositions that recall abstract art. The sequence photographing London's Barbican Centre at dawn, its concrete surfaces blushing pink in the first light, is among the most beautiful architectural footage ever committed to film.

But 'Overhang' is more than an aesthetic exercise. Novak's intimate interviews with long-term residents—a retired teacher in Belgrade's Blok 23, a young family in Marseille's Unité d'Habitation, an elderly couple in London's Trellick Tower—reveal the warmth and community that thrives within these concrete structures. Their stories challenge the lazy narrative that brutalism equals bleakness, showing instead buildings designed with utopian social ambitions: communal spaces, integrated services, and a democratic approach to housing that treated beauty as a right, not a privilege.

The documentary argues persuasively that the drive to demolish brutalist housing is less about aesthetics than about economics—these buildings sit on valuable land, and their destruction serves developers far more than residents. Novak makes this case without preaching, letting the contrast between the buildings' dignified geometry and the generic glass towers replacing them speak for itself. Beautiful and politically engaged filmmaking that changes how you see the built world.`,
    galleryDescriptions: [
      "Concrete balconies in geometric pattern",
      "Resident tending garden on brutalist terrace",
      "Drone shot of housing complex",
      "Light and shadow on concrete facade",
    ],
    relatedSlugs: ["clean-lines", "vertical-dreams", "factory-floor"],
  },
  {
    id: 16,
    slug: "curved-space",
    title: "Curved Space",
    year: 2023,
    genre: "Experimental",
    director: "Ines Delacroix",
    writers: ["Ines Delacroix"],
    cast: ["Performance Collective VOID"],
    cinematography: "Takeshi Mori",
    runtime: "76 minutes",
    rating: 3.5,
    releaseDate: "May 19, 2023",
    distributor: "Avant-Garde Films",
    posterDescription: "Abstract sculptural forms",
    review: `'Curved Space' defies conventional categorization, and that's precisely the point. Ines Delacroix's experimental film exists at the intersection of dance, architecture, and quantum physics—three disciplines that, in Delacroix's vision, are merely different languages for describing the same fundamental truths about the nature of reality.

Performance Collective VOID—six dancers who trained for eighteen months in both contemporary dance and architectural theory—move through impossible spaces rendered by Takeshi Mori's innovative cinematography. The sets, designed by architect Zaha Hadid's protégé Rima Khalil, are physical constructions that defy Euclidean geometry: staircases that lead back to their starting point, rooms that are simultaneously inside and outside, corridors that curve through dimensions the eye cannot fully process.

Mori's camera work is itself a kind of choreography. He developed a custom rig that allows the camera to rotate on three axes simultaneously, creating a viewing experience where up and down, left and right, become fluid concepts. The effect is initially disorienting but gradually becomes liberating—you learn to surrender spatial orientation and experience the film as pure movement and form. The central sequence, in which a single dancer appears to fold through a Möbius strip of concrete and light, is a genuine breakthrough in cinematic technique.

It's not for everyone—there's no traditional narrative, no dialogue, and the 76-minute runtime unfolds at its own unhurried pace. But for those attuned to its wavelength, 'Curved Space' is a transcendent cinematic experience that expands the possibilities of the medium. Delacroix has created something genuinely new: a film that doesn't just depict alternative geometries but makes you feel them in your body. Leave your expectations at the door and let the space curve around you.`,
    galleryDescriptions: [
      "Dancers in curved architectural space",
      "Abstract light patterns on white walls",
      "Figure dissolving into geometric shapes",
      "Möbius strip-like set design",
    ],
    relatedSlugs: ["wavelength", "aperture", "the-wave"],
  },
  {
    id: 17,
    slug: "factory-floor",
    title: "Factory Floor",
    year: 2024,
    genre: "Drama",
    director: "Viktor Kozlov",
    writers: ["Viktor Kozlov"],
    cast: ["Sergei Petrov", "Anya Volkov", "Dmitri Sokolov"],
    cinematography: "Ilya Federov",
    runtime: "145 minutes",
    rating: 4,
    releaseDate: "September 6, 2024",
    distributor: "Eastern Light",
    posterDescription: "Industrial building exterior",
    review: `Viktor Kozlov returns to his working-class roots with 'Factory Floor,' a sprawling ensemble drama set in a failing automobile factory in post-Soviet Russia that ranks among the most ambitious films of the year. Spanning from 1991 to 2011, the film tracks the fates of factory workers as their world transforms around them—from the chaotic optimism of the early capitalist era through the oligarch years to the uncertain present.

Sergei Petrov anchors the ensemble as Nikolai, a master mechanic whose identity is inextricable from his work. Petrov ages across two decades with remarkable subtlety, conveying the slow erosion of dignity that comes from watching your life's expertise become obsolete. His performance in the film's central scene—quietly teaching his grandson to use a lathe he knows will be scrapped within months—distills the entire film's themes into five wordless minutes of devastating tenderness.

Ilya Federov's cinematography finds unexpected beauty in industrial spaces. The factory floor itself becomes a cathedral of sorts—shafts of dusty light falling through high windows, the rhythmic dance of assembly line machinery, the vast emptiness of abandoned production halls. Federov's palette shifts across the decades, from the oversaturated colors of the 1990s to the bleached-out grays of economic decline, charting the factory's decline through light itself.

Kozlov's direction is patient and empathetic, allowing scenes to breathe in a way that recalls the great humanist filmmakers—Ozu, Kiarostami, the Dardenne brothers. Anya Volkov is heartbreaking as Nikolai's wife, whose pragmatism keeps the family afloat while quietly breaking her heart, and Dmitri Sokolov brings fierce energy to the role of a young union organizer who discovers that fighting for workers' rights in the new Russia requires a different kind of courage. This is epic filmmaking in the Tolstoyan tradition—sweeping in scope but intimate in its attention to individual lives, and absolutely essential viewing.`,
    galleryDescriptions: [
      "Workers on factory assembly line",
      "Empty factory floor with shafts of light",
      "Workers gathered during break",
      "Factory exterior in winter snow",
    ],
    relatedSlugs: ["the-last-frontier", "vertical-dreams", "overhang"],
  },
  {
    id: 18,
    slug: "aperture",
    title: "Aperture",
    year: 2023,
    genre: "Art Film",
    director: "Naomi Blackwood",
    writers: ["Naomi Blackwood"],
    cast: ["Iris Chen", "Alexander Frost"],
    cinematography: "Naomi Blackwood",
    runtime: "82 minutes",
    rating: 3.5,
    releaseDate: "June 30, 2023",
    distributor: "Gallery Films",
    posterDescription: "Circular architectural opening",
    review: `Naomi Blackwood's 'Aperture' is a meditation on seeing and being seen—a film that uses the mechanics of photography as a metaphor for the human desire to find meaning in the world's visual chaos. At 82 minutes, it's lean and focused, wasting not a single frame in its exploration of obsession, beauty, and the thin line between artistic vision and madness.

Iris Chen plays Mei, a street photographer experiencing a creative crisis who stumbles upon an abandoned industrial building with a perfectly circular window. Something about the aperture—its proportions, the quality of light it admits, the way it frames the world beyond—captivates her completely. She begins photographing through it obsessively, convinced that this particular circle of vision reveals something fundamental about the nature of seeing itself.

Blackwood, who also serves as cinematographer, made the radical decision to shoot the entire film through circular frames—a technique that initially feels gimmicky but gradually becomes hypnotic. The circular format eliminates peripheral vision, focusing the viewer's attention with the same intensity that grips Mei. As the film progresses, the circles become smaller, more claustrophobic, mirroring Mei's narrowing focus and growing disconnection from the wider world.

Alexander Frost provides crucial grounding as Mei's partner, whose increasing alarm at her obsession provides the film's emotional backbone. Their scenes together—him in the rectangular world of daily life, her retreating into circles—create a visual metaphor for the distance that artistic obsession can create between people. It's an acquired taste—the deliberate pacing and circular format will test some viewers' patience—but for those who surrender to its rhythm, 'Aperture' offers a genuinely unique cinematic experience and a profound meditation on why we look at the things we look at.`,
    galleryDescriptions: [
      "Circular window framing city skyline",
      "Photographer setting up shot in ruins",
      "Multiple circular apertures in concrete wall",
      "Light streaming through round opening",
    ],
    relatedSlugs: ["curved-space", "wavelength", "clean-lines"],
  },
  {
    id: 19,
    slug: "five-stories",
    title: "Five Stories",
    year: 2024,
    genre: "Anthology",
    director: "Various",
    writers: ["Multiple Writers"],
    cast: ["Ensemble Cast"],
    cinematography: "Various",
    runtime: "152 minutes",
    rating: 3.5,
    releaseDate: "July 19, 2024",
    distributor: "Mosaic Films",
    posterDescription: "Modern building with number five",
    review: `'Five Stories' is an ambitious anthology film set across five floors of a single apartment building, each floor hosting a different genre and a different directorial vision. The result is a cinematic layer cake that's uneven—as anthologies inevitably are—but whose best moments are extraordinary, and whose structural ambition alone makes it essential viewing for anyone interested in the possibilities of collaborative filmmaking.

The ground-floor comedy, directed by Mia Chen, follows a feuding couple attempting to host a dinner party while their apartment floods from the upstairs bathroom. It's broad and physical, establishing the building's geography and introducing characters who will recur throughout. The second-floor romance, helmed by Brazilian director Luca Morais, is a tender story of two elderly neighbors who begin a tentative courtship after decades of hallway pleasantries—it's slight but charming, anchored by two warm performances.

The third floor is where the film catches fire. Director Yoko Shimizu delivers a genuinely terrifying horror segment about a translator working alone at night who begins receiving threatening messages from inside the building's walls. Shimizu's use of sound—the specific acoustic properties of each room, the way voices carry through old pipes—creates an atmosphere of claustrophobic dread that rivals the best standalone horror films. It's twelve minutes of pure, refined terror.

The fourth-floor thriller, by veteran director Hans Brecker, is a taut Hitchcockian piece about a woman who witnesses something she shouldn't through her kitchen window—competent but the least distinctive segment. The film saves its best for last: Amara Keita's fifth-floor drama, which revisits every character from the previous four stories in a single devastating morning, revealing connections and consequences that transform everything you've watched. The interconnected structure rewards patient viewing, and the final shot—a slow pull back from the building revealing it as one structure among thousands—is a quietly profound statement about the stories unfolding behind every window you'll ever pass.`,
    galleryDescriptions: [
      "Cross-section view of apartment building",
      "Different colored lights in five windows",
      "Staircase connecting all five floors",
      "Building facade with number 5",
    ],
    relatedSlugs: ["vertical-dreams", "the-tenant", "the-balcony"],
  },
  {
    id: 20,
    slug: "the-wave",
    title: "The Wave",
    year: 2023,
    genre: "Drama",
    director: "Sofie Andersen",
    writers: ["Sofie Andersen", "Morten Hagen"],
    cast: ["Erik Lindgren", "Astrid Johannsen", "Henrik Skov"],
    cinematography: "Lars Thomsen",
    runtime: "119 minutes",
    rating: 4,
    releaseDate: "August 11, 2023",
    distributor: "Scandinavian Films",
    posterDescription: "Undulating building facade",
    review: `Sofie Andersen's 'The Wave' uses architecture as a lens through which to examine something far larger: the way communities respond to change, and how the spaces we inhabit shape—and are shaped by—our collective anxieties and aspirations. Set in a small Danish coastal town, the film follows an architect whose radical, wave-inspired community center design becomes a lightning rod for the town's deepest divisions.

Erik Lindgren is superb as Thomas, an idealistic architect who returns to his hometown with plans for a building whose undulating facade mirrors the North Sea waves visible from every window. For Thomas, the design is a celebration of the town's maritime identity; for many residents, it's an unwelcome disruption—too modern, too expensive, too much. Lindgren plays Thomas as a man whose artistic vision blinds him to the human cost of his ambition, and his gradual awakening to the community's legitimate concerns is the film's emotional spine.

Lars Thomsen's cinematography is the film's greatest asset. He photographs the Danish coastline with a painter's eye for light and weather, and his compositions frequently rhyme the proposed building's curves with the natural undulations of sand dunes, wave crests, and cloud formations—a visual argument for the building's organic rightness that operates below conscious awareness. The scenes at the town hall meetings, lit by harsh fluorescent overhead lighting, create a visual contrast with the soft natural light of the coastal exteriors that mirrors the tension between institutional rigidity and artistic freedom.

Andersen's screenplay, co-written with Morten Hagen, is sharp and compassionate, giving every perspective—the traditionalist baker, the ambitious mayor, the skeptical fisherman, the supportive teacher—genuine weight and dignity. Astrid Johannsen is a standout as Thomas's wife, whose support for his vision slowly erodes as she witnesses its cost to their friendships and standing in the community. Henrik Skov brings gravel-voiced authority to the town's most vocal opponent, whose resistance stems not from closed-mindedness but from a lifetime of watching outsiders' grand plans leave small towns worse off. A film about how the spaces we build shape the people we become—and vice versa.`,
    galleryDescriptions: [
      "Undulating building facade at sunset",
      "Town meeting in community hall",
      "Architect studying building model",
      "Waves crashing on Danish coastline",
    ],
    relatedSlugs: ["glass-houses", "overhang", "curved-space"],
  },
  {
    id: 21,
    slug: "clean-lines",
    title: "Clean Lines",
    year: 2024,
    genre: "Documentary",
    director: "James Whitfield",
    writers: ["James Whitfield"],
    cast: [],
    cinematography: "James Whitfield",
    runtime: "91 minutes",
    rating: 3.5,
    releaseDate: "November 1, 2024",
    distributor: "Monochrome Films",
    posterDescription: "Minimalist monochrome composition",
    review: `'Clean Lines' is a visually stunning documentary about the minimalist design movement that manages the considerable feat of being itself a work of minimalist art—spare, precise, and deeply satisfying. James Whitfield traces the movement's evolution from Japanese wabi-sabi aesthetics through the Bauhaus revolution to contemporary Scandinavian design, arguing that the impulse toward simplification is not a modern invention but a fundamental human need.

Whitfield, who also serves as his own cinematographer, composes each frame with the care of a gallery exhibition. His camera lingers on the negative space in a Japanese tearoom, the precise angle of a Bauhaus chair, the serene emptiness of a Scandinavian living room, finding beauty not in abundance but in the deliberate absence of excess. The film's own editing reflects its subject—cuts are minimal, transitions are clean, and the score by ambient composer Nils Frahm uses silence as deliberately as sound.

The documentary's most compelling sequences explore the philosophical underpinnings of minimalism. An interview with a Kyoto temple gardener who has spent thirty years perfecting a single rock garden is intercut with footage of a Copenhagen industrial designer obsessing over the radius of a chair leg's curve, drawing a line between two practices separated by centuries and continents but united by the conviction that perfection lies in reduction.

Where 'Clean Lines' transcends mere design documentary is in its willingness to interrogate minimalism's contradictions. Whitfield acknowledges that the "less is more" aesthetic has been co-opted by luxury brands and tech companies as a marker of wealth rather than simplicity, and a provocative late segment questions whether minimalism is truly democratic or merely another form of privilege—the luxury of having so much that you can afford to display so little. The documentary argues, ultimately, that true minimalism is not about absence but about the courage to find meaning in restraint—and in doing so, makes a quiet case for paying attention to the things that matter most.`,
    galleryDescriptions: [
      "Minimalist white interior space",
      "Japanese zen garden in morning light",
      "Single object on vast white surface",
      "Clean geometric lines of modern building",
    ],
    relatedSlugs: ["wavelength", "aperture", "overhang"],
  },
];

export function getMovieBySlug(slug: string): Movie | undefined {
  return movies.find((m) => m.slug === slug);
}

export function getRelatedMovies(slugs: string[]): Movie[] {
  return slugs.map((s) => movies.find((m) => m.slug === s)).filter(Boolean) as Movie[];
}

export function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
}
