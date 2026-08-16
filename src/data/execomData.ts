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
        photo: '/src/assets/execom/bency.png',
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
        photo: '/src/assets/execom/justin.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/justinjovenm' }],
        accent: 'cyan',
      },
      {
        id: 'card-lena',
        name: 'Lena Margret Shojo',
        role: 'SECRETARY',
        watermark: 'SECRETARY',
        photo: '/src/assets/execom/lena.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/lena-margret-shojo' }],
        accent: 'cyan',
      },
      {
        id: 'card-madhav',
        name: 'Madhav Renil',
        role: 'TREASURER',
        watermark: 'TREASURER',
        photo: '/src/assets/execom/madhav.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/madhav-renil-7315b8293' }],
        accent: 'cyan',
      },
      {
        id: 'card-sarang',
        name: 'Sarang S.',
        role: 'CONVENOR',
        watermark: 'CONVENOR',
        photo: '/src/assets/execom/sarang.png',
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
        photo: '/src/assets/execom/neha.png',
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
        photo: '/src/assets/execom/divya.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/divya-jayadevan' }],
        accent: 'pink',
      },
      {
        id: 'card-amina',
        name: 'Amina Asif',
        role: 'CREATIVE CO LEAD',
        watermark: 'CREATIVE',
        photo: '/src/assets/execom/amina.png',
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
        photo: '/src/assets/execom/tahseen.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/tahseen-zakir' }],
        accent: 'green',
      },
      {
        id: 'card-suzanne',
        name: 'Suzanne Abey Joji',
        role: 'COMMUNITY CO LEAD',
        watermark: 'COMMUNITY',
        photo: '/src/assets/execom/suzanne.png',
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
        photo: '/src/assets/execom/merin.png',
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
        photo: '/src/assets/execom/freddie.png',
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
        photo: '/src/assets/execom/joe.png',
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
        photo: '/src/assets/execom/jonathan.png',
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
        photo: '/src/assets/execom/steeve.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/steeve-abram-george' }],
        accent: 'amber',
      },
      {
        id: 'card-nandana',
        name: 'Nandana S.',
        role: 'OPERATIONS CO LEAD',
        watermark: 'OPERATIONS',
        photo: '/src/assets/execom/nandana.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/nandana-s123' }],
        accent: 'amber',
      },
      {
        id: 'card-aadi',
        name: 'Aadi Perumayan',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: '/src/assets/execom/aadi.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/aadi-perumayan' }],
        accent: 'amber',
      },
      {
        id: 'card-mathew',
        name: 'Mathew Bijoy',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: '/src/assets/execom/mathew.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/mathew-bijoy-b25327208' }],
        accent: 'amber',
      },
      {
        id: 'card-arjun',
        name: 'Arjun Raj Anies',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: '/src/assets/execom/arjun.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/arjun-raj-anies-a63319324' }],
        accent: 'amber',
      },
      {
        id: 'card-mithra',
        name: 'Mithra Sreejith',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: '/src/assets/execom/mithra.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/mithra-sreejith' }],
        accent: 'amber',
      },
      {
        id: 'card-gautham',
        name: 'Gautham Menon',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: '/src/assets/execom/gautham.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/gautham-menon-74051b354' }],
        accent: 'amber',
      },
      {
        id: 'card-nathaniel',
        name: 'Nathaniel G Philip',
        role: 'OPERATIONS',
        watermark: 'OPERATIONS',
        photo: '/src/assets/execom/nathaniel.png',
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
        photo: '/src/assets/execom/gokul.png',
        socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/gokulsreejit' }],
        accent: 'red',
      },
    ],
  },
];
