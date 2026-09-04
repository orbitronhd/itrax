export interface SocialLink {
  platform: 'linkedin' | 'github';
  url: string;
}

export interface ExecomMember {
  id: string;
  name: string;
  role: string;
  watermark: string;
  photo: string;
  socials: SocialLink[];
  accent: 'cyan' | 'purple' | 'pink' | 'green' | 'orange' | 'amber' | 'red';
}

export interface ExecomGroup {
  name: string;
  members: ExecomMember[];
}

export const execomData: ExecomGroup[] = [
  {
    name: 'Faculty Incharge',
    members: [
      {
        id: 'card-bency',
        name: 'Ms Bency Wilson',
        role: 'Teacher Incharge',
        watermark: 'TEACHER',
        photo: new URL('../assets/execom/bency.webp', import.meta.url).href,
        socials: [],
        accent: 'cyan',
      },
    ],
  },
  {
    name: 'Core Committee',
    members: [
      {
        id: 'card-justin',
        name: 'Justin Joven Malakkaran',
        role: 'CHAIRMAN',
        watermark: 'CHAIRMAN',
        photo: new URL('../assets/execom/justin.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/justinjovenm' }],
        accent: 'cyan',
      },
      {
        id: 'card-lena',
        name: 'Lena Margret Shojo',
        role: 'SECRETARY',
        watermark: 'SECRETARY',
        photo: new URL('../assets/execom/lena.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/lena-margret-shojo' }],
        accent: 'cyan',
      },
      {
        id: 'card-madhav',
        name: 'Madhav Renil',
        role: 'TREASURER',
        watermark: 'TREASURER',
        photo: new URL('../assets/execom/madhav.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/madhav-renil-7315b8293' }],
        accent: 'cyan',
      },
      {
        id: 'card-sarang',
        name: 'Sarang S.',
        role: 'CONVENOR',
        watermark: 'CONVENOR',
        photo: new URL('../assets/execom/sarang.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/sarangsatish' }],
        accent: 'cyan',
      },
    ],
  },
  {
    name: 'Documentation',
    members: [
      {
        id: 'card-neha',
        name: 'Neha Rachel Biju',
        role: 'DOCUMENTATIONS LEAD',
        watermark: 'DOCS LEAD',
        photo: new URL('../assets/execom/neha.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/neha-rachel-biju-a88a33333' }],
        accent: 'purple',
      },
    ],
  },
  {
    name: 'Creative',
    members: [
      {
        id: 'card-divya',
        name: 'Divya Jayadevan',
        role: 'CREATIVE LEAD',
        watermark: 'CREATIVE',
        photo: new URL('../assets/execom/divya.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/divya-jayadevan' }],
        accent: 'pink',
      },
      {
        id: 'card-amina',
        name: 'Amina Asif',
        role: 'CREATIVE CO LEAD',
        watermark: 'CREATIVE',
        photo: new URL('../assets/execom/amina.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/amina-asif-a7ab19326' }],
        accent: 'pink',
      },
    ],
  },
  {
    name: 'Community',
    members: [
      {
        id: 'card-tahseen',
        name: 'Tahseen Zakir',
        role: 'COMMUNITY LEAD',
        watermark: 'COMMUNITY',
        photo: new URL('../assets/execom/tahseen.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/tahseen-zakir' }],
        accent: 'green',
      },
      {
        id: 'card-suzanne',
        name: 'Suzanne Abey Joji',
        role: 'COMMUNITY CO LEAD',
        watermark: 'COMMUNITY',
        photo: new URL('../assets/execom/suzanne.webp', import.meta.url).href,
        socials: [],
        accent: 'green',
      },
    ],
  },
  {
    name: 'Marketing',
    members: [
      {
        id: 'card-merin',
        name: 'Merin Rachel Boby',
        role: 'MARKETING LEAD',
        watermark: 'MARKETING',
        photo: new URL('../assets/execom/merin.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/merin-rachel-boby' }],
        accent: 'orange',
      },
    ],
  },
  {
    name: 'Technical',
    members: [
      {
        id: 'card-freddie',
        name: 'Freddie Scaria Jose',
        role: 'TECHNICAL LEAD',
        watermark: 'TECHNICAL',
        photo: new URL('../assets/execom/freddie.webp', import.meta.url).href,
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/freddie-scaria-11476b292' },
          { platform: 'github', url: 'https://github.com/froot2005' },
        ],
        accent: 'cyan',
      },
      {
        id: 'card-joe',
        name: 'Joe Lonney',
        role: 'TECHNICAL CO LEAD',
        watermark: 'TECHNICAL',
        photo: new URL('../assets/execom/joe.webp', import.meta.url).href,
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/joe-lonney' },
          { platform: 'github', url: 'https://github.com/joelonney' },
        ],
        accent: 'cyan',
      },
      {
        id: 'card-jonathan',
        name: 'Jonathan Jimson Chakramakal',
        role: 'WEBMASTER',
        watermark: 'WEBMASTER',
        photo: new URL('../assets/execom/jonathan.webp', import.meta.url).href,
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/jonathanjimson/' },
          { platform: 'github', url: 'https://github.com/orbitronhd' },
        ],
        accent: 'cyan',
      },
    ],
  },
  {
    name: 'Operation',
    members: [
      {
        id: 'card-steeve',
        name: 'Steeve Abram George',
        role: 'OPERATIONS LEAD',
        watermark: 'OPERATIONS',
        photo: new URL('../assets/execom/steeve.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/steeve-abram-george' }],
        accent: 'amber',
      },
      {
        id: 'card-nandana',
        name: 'Nandana S.',
        role: 'OPERATIONS CO LEAD',
        watermark: 'OPERATIONS',
        photo: new URL('../assets/execom/nandana.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/nandana-s123' }],
        accent: 'amber',
      },
      {
        id: 'card-aadi',
        name: 'Aadi Perumayan',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: new URL('../assets/execom/aadi.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/aadi-perumayan' }],
        accent: 'amber',
      },
      {
        id: 'card-mathew',
        name: 'Mathew Bijoy',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: new URL('../assets/execom/mathew.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/mathew-bijoy-b25327208' }],
        accent: 'amber',
      },
      {
        id: 'card-arjun',
        name: 'Arjun Raj Anies',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: new URL('../assets/execom/arjun.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/arjun-raj-anies-a63319324' }],
        accent: 'amber',
      },
      {
        id: 'card-mithra',
        name: 'Mithra Sreejith',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: new URL('../assets/execom/mithra.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/mithra-sreejith' }],
        accent: 'amber',
      },
      {
        id: 'card-gautham',
        name: 'Gautham Menon',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: new URL('../assets/execom/gautham.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/gautham-menon-74051b354' }],
        accent: 'amber',
      },
      {
        id: 'card-nathaniel',
        name: 'Nathaniel G Philip',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: new URL('../assets/execom/nathaniel.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/nathanielgphilip-' }],
        accent: 'amber',
      },
    ],
  },
  {
    name: 'Media',
    members: [
      {
        id: 'card-gokul',
        name: 'Gokul Sreejit',
        role: 'MEDIA LEAD',
        watermark: 'MEDIA LEAD',
        photo: new URL('../assets/execom/gokul.webp', import.meta.url).href,
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/gokulsreejit' }],
        accent: 'red',
      },
    ],
  },
];
