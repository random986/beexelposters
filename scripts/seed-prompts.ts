
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Common logic placeholders (reused across templates)
const COMMON_LOGIC = `
---------------------------------------
SYSTEM LOGIC:
---------------------------------------
1. THEME DETECTION:
Strictly adhere to the context of the {THEME} theme.
If specific keywords appear in Title/Inputs, adapt the mood accordingly.

2. MAIN HERO (foreground) RULES:
- Determine the correct number of subjects based on the title/context:
  a) Specific Team/Group Name or "Team" -> Full Team/Group Lineup (5-11 people).
  b) "Duel", "Vs", "Match", "Debate" -> Two main subjects facing each other.
  c) "Panel", "Summit", "Board" -> 3-5 mixed professionals/subjects.
  d) "Talk", "Keynote", "Solo" -> One iconic subject/speaker.
  e) Default: One iconic subject representing the theme.

3. SUBJECT SELECTION:
- Match subject appearance to {THEME}.
- Ensure realistic gear/attire, professional pose, and premium look.
- If a real-world famous person is implied or named, use them.

4. TYPOGRAPHY AUTOMATION:
If user typography is empty:
- Auto-generate powerful, high-impact lines based on {TITLE}.
- Include: Main headline, Supporting tagline, Date/Time, CTA, Hashtags.
`

const TEMPLATES = [
    {
        name: 'corporate',
        description: 'Business, Conferences, Summits',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Corporate / Business
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a premium corporate/business promotional poster for "{TITLE}".

Poster Context:
This is a professional business/corporate poster. 
Tone must be credible, authoritative, clean, and modern.

Visual Style & Mood:
- Executive, minimal, premium
- Trust-focused and professional
- Suitable for boardrooms, LinkedIn, conferences, or company branding

Hero Visual (Foreground):
- Professional business figures (diverse, well-dressed executives) OR
- Abstract business concepts (growth arrows, city skyline, data grids, minimal icons)
- Confident posture, neutral expressions
- Auto-select number of speakers/professionals based on Title logic (Panel/Debate/Solo).

Background:
- Clean gradients, subtle textures, cityscape silhouettes, or abstract corporate patterns
- Plenty of negative space for readability

Lighting & Colors:
- Neutral or corporate palette (deep blue, charcoal, white, gold accents)
- Soft, even lighting
- Clean contrast, no harsh effects

Typography:
If user provides typography:
- Use exact typography text: {TYPOGRAPHY}

If empty:
- Auto-generate:
  - Strong corporate headline from "{TITLE}"
  - Supporting professional tagline
  - Optional date/location line
  - Optional CTA (Register / Learn More / Join Us)

Branding:
- Reserved space for company logo
- Footer area for partners or certifications

Technical:
- Aspect ratio 4:5 (1080×1350)
- Print & social media ready
- Clear safe margins
`
    },
    {
        name: 'sport',
        description: 'Sports, Tournaments, Matches',
        template: `
You are a professional visual designer.

Generate a complete poster prompt based on the user's inputs below.

USER INPUT:

- Title: {TITLE}

- Poster Type: {VISUAL_STYLE}

- Sport Type: {SPORT}

- Typography Text: {TYPOGRAPHY}

---------------------------------------

SYSTEM LOGIC:

---------------------------------------

1. SPORT DETECTION:

If Poster Type or Title contains keywords related to sports:

"sport", "sports", "event olahraga", "pertandingan", "tournament", "league",

"kejuaraan", "match", "cup", "liga", "mabar", "sparring", "tim", etc.,

→ Activate SPORTS MODE.

2. MAIN HERO (foreground) RULES:

If SPORTS MODE is active:

   - Determine the correct number of athletes based on the title:

     a) If title includes a specific sport team, league, or club name:

        → Use a *full team lineup* (5–11 athletes depending on the sport).

     b) If title includes words like “duel”, “final”, “vs”, “laga”, “match”, “pertandingan”:

        → Use *two main athletes* facing each other.

     c) If title includes “turnamen”, “tournament”, “open”, “cup”, “championship”:

        → Use *3–5 mixed athletes* representing various styles/poses.

     d) If title includes generic hobby or friendly event like “mabar”, “fun match”:

        → Use *2–4 casual-yet-athletic players*.

     e) Otherwise:

        → Use *one iconic athlete* representing the sport.

3. ATHLETE SELECTION:

- Match athlete appearance to the {SPORT}.

- If a real-world famous athlete exists and is universal:

    Automatically select the most iconic athlete(s), for example:

    - Badminton → Viktor Axelsen, Tai Tzu Ying, Anthony Ginting

    - Football → Lionel Messi, Cristiano Ronaldo

    - Basketball → Stephen Curry, LeBron James

    - Tennis → Novak Djokovic, Iga Świątek

    - Running → Usain Bolt

    - Swimming → Caeleb Dressel, Katie Ledecky

- Ensure realistic gear, professional pose, and premium look.

4. TYPOGRAPHY AUTOMATION:

If the user leaves typography empty:

- Auto-generate powerful, high-impact lines based on {TITLE} and {SPORT}

- Include:

    - Main headline

    - Supporting tagline

    - Optional date/time slot

    - Optional CTA

    - Optional hashtags

---------------------------------------

FINAL POSTER PROMPT TO OUTPUT:

---------------------------------------

Create a premium, high-energy sports promotional poster for "{TITLE}".

Poster Context:

This is a {SPORT} Event.  

Automatically set creative direction, intensity, and mood to fit the theme.

Camera & Composition:

- Cinematic dynamic angle

- Shallow depth-of-field

- Ultra-sharp hero subject(s)

- High-speed clarity for sports motion

Hero Visual (Foreground):

- Auto-select the correct number of athletes based on the Title logic

- Athletes must match the {SPORT}

- If relevant, use famous global athletes

- Include authentic sport accessories (racket, ball, shoes, jersey, etc.)

- Energetic poses: smashing, sprinting, dribbling, serving, team huddle, etc.

- Add subtle motion blur, sweat particles, stadium lights, or action trails

Background:

- Automatically adjust to suit sport type and event tone

- Stadium lights, arena atmosphere, motion energy, gradient bursts, etc.

- Maintain clean negative space for readable text

Lighting & Colors:

- High-contrast dramatic lighting

- Professional sports advertising palette

- Strong highlights, crisp shadows, energetic tones

Typography:

If provided by user:

- Use user text: {TYPOGRAPHY}

If empty:

- Auto-generate:

    - Powerful headline inspired by "{TITLE}"

    - Sport-themed tagline

    - Optional date & venue line

    - Optional CTA (Join Now / Register / Watch Live)

    - Hashtags relevant to sport and event

Branding:

- Reserved area for sponsor logos or team logo

- Optional watermark area at bottom

Technical Requirements:

- Aspect ratio 4:5 (1080×1350)
- Print & digital optimized
`
    },
    {
        name: 'party',
        description: 'Club, Concert, Festival',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Party / Celebration
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a vibrant party/celebration poster for "{TITLE}".

Mood:
- Fun, energetic, youthful
- Social, lively, exciting

Hero Visual:
- People dancing, laughing, celebrating OR festive abstract visuals
- Confetti, lights, balloons, neon accents
- Auto-select subjects (DJ, Performer, or energetic crowd).

Background:
- Colorful gradients or party lighting
- Club, rooftop, or festive environment

Colors & Lighting:
- Bright, saturated colors
- Neon highlights, glow effects

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Bold, playful fonts
- Auto-generate fun headline + date + venue + RSVP CTA

Technical:
- 4:5 aspect ratio
- Optimized for social sharing
`
    },
    {
        name: 'event',
        description: 'Event / Conference',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Event / Conference
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a professional event/conference poster for "{TITLE}".

Tone:
- Informative, organized, modern

Hero Visual:
- Speakers, audience silhouette, stage lighting
- Abstract conference visuals (mic, stage, network icons)

Background:
- Clean gradients
- Minimal distractions

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Clear hierarchy
- Auto-generate agenda-style text

Branding:
- Organizer & sponsor areas

Aspect:
- 4:5 poster, print-ready
`
    },
    {
        name: 'wedding',
        description: 'Wedding / Engagement',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Wedding / Engagement
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create an elegant wedding/engagement poster for "{TITLE}".

Mood:
- Romantic, emotional, timeless

Hero Visual:
- Couple portraits OR symbolic elements (rings, florals)

Background:
- Soft textures, floral patterns

Colors:
- Warm neutrals, blush, gold, ivory

Typography:
- Script + serif combination
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Auto-generate date, names, venue

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'education',
        description: 'Education / Training',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Education / Training
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create an education/training promotional poster for "{TITLE}".

Mood:
- Informative, aspirational, clean

Hero Visual:
- Students learning, tech tools, classrooms

Background:
- Minimal academic patterns

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Clear, readable
- Auto-generate course highlights and CTA

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'real-estate',
        description: 'Real Estate / Property',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Real Estate / Property
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a premium real estate/property poster for "{TITLE}".

Hero Visual:
- High-end building exterior/interior
- Wide architectural perspective

Mood:
- Trustworthy, luxury-focused

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Strong headline + property details CTA

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'church',
        description: 'Church / Religious',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Church / Religious
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a respectful, uplifting church/religious poster for "{TITLE}".

Mood:
- Peaceful, reverent, hopeful

Hero Visual:
- Worship scenes, church architecture, symbolic light

Background:
- Soft textures, light leaks, clean space

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Calm, inspirational
- Auto-generate scripture-style tagline if empty

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'fitness',
        description: 'Fitness / Health',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Fitness / Health
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a motivational fitness/health poster for "{TITLE}".

Hero Visual:
- Athletic bodies, training action
- Clean health-oriented aesthetic

Mood:
- Energetic, disciplined, inspirational

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Strong motivational lines + CTA

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'food',
        description: 'Food / Restaurant',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Food / Restaurant
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a mouth-watering food/restaurant poster for "{TITLE}".

Hero Visual:
- High-detail food photography
- Steam, textures, garnish detail

Mood:
- Warm, appetizing

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Bold food headline + offer CTA

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'tech',
        description: 'Technology / Startup',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Technology / Startup
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a futuristic tech/startup poster for "{TITLE}".

Hero Visual:
- Devices, interfaces, abstract tech elements

Mood:
- Innovative, clean, forward-looking

Colors:
- Dark mode, neon accents

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Modern sans-serif hierarchy

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'fashion',
        description: 'Fashion / Beauty',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Fashion / Beauty
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a high-fashion beauty poster for "{TITLE}".

Hero Visual:
- Styled models, confident poses

Mood:
- Editorial, luxury, aesthetic-driven

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Elegant fashion typography

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'music',
        description: 'Music / Entertainment',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: Music / Entertainment
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a bold music/entertainment poster for "{TITLE}".

Hero Visual:
- Artist performance, crowd energy

Mood:
- Loud, vibrant, expressive

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Strong display fonts

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'national-celebration',
        description: 'National Celebrations (Kenya)',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: National Celebrations (Kenya)
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a national celebration poster for "{TITLE}" in a Kenyan context.

Hero Visual:
- Kenyan flag elements
- Cultural landmarks or people

Colors:
- Kenyan national colors (black, red, green, white)

Mood:
- Proud, patriotic, celebratory

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Bold national messaging

Technical:
- Aspect ratio 4:5
`
    },
    {
        name: 'african-culture',
        description: 'African Culture',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: African Culture
- Typography Text: {TYPOGRAPHY}

---------------------------------------
BASE PROMPT
---------------------------------------

Create a rich African culture poster for "{TITLE}".

Hero Visual:
- African traditional attire, patterns, dance, heritage symbols

Background:
- Tribal textures, earth tones

Colors:
- Warm browns, golds, reds, blacks

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Bold, culturally inspired fonts

Technical:
- Aspect ratio 4:5
`
    },
    // Fallback/General Template
    {
        name: 'general',
        description: 'General Purpose / Default',
        template: `
You are a professional visual designer.
Generate a complete poster prompt based on the user's inputs below.

USER INPUT:
- Title: {TITLE}
- Poster Type: {VISUAL_STYLE}
- Typography Text: {TYPOGRAPHY}

${COMMON_LOGIC}

---------------------------------------
FINAL POSTER PROMPT TO OUTPUT:
---------------------------------------
Create a premium, high-quality promotional poster for: *{TITLE}*

Poster Context:
This is a {VISUAL_STYLE} Event/Flyer.
Automatically set creative direction, intensity, and mood to fit the theme.

Camera & Composition:
- Professional angles suitable for the genre.
- Clean composition with focus on the main message/subject.

Hero Visual (Foreground):
- Auto-select subjects based on Title/Context.
- Professional appearance.
- Poses relevant to the activity.

Background:
- Styled to match the theme (Corporate -> Office; Party -> Lights; etc.).
- Maintain clean negative space for readable text.

Lighting & Colors:
- Professional lighting setup.
- Color palette suitable for {VISUAL_STYLE}.

Typography:
If provided by user:
- Use user text: {TYPOGRAPHY}

If empty:
- Auto-generate headline and messaging

Branding:
- Reserved area for logos.

Technical Requirements:
- Aspect ratio 4:5 (1080x1350)
- Social-media ready resolution.
`
    }
]

async function main() {
    console.log('Seeding PromptTemplates...')

    for (const t of TEMPLATES) {
        await prisma.promptTemplate.upsert({
            where: { name: t.name },
            update: {
                description: t.description,
                template: t.template,
                isActive: true
            },
            create: {
                name: t.name,
                description: t.description,
                template: t.template,
                isActive: true
            }
        })
        console.log(`- Upserted template: ${t.name}`)
    }

    console.log('Done.')
}

main()
    .catch((e) => {
        console.error(e)
        // process.exit(1) // Avoid Hard Exit for debugging
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
