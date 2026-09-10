// Conteúdo institucional fixo da Paróquia São José de Orlândia-SP.
// Dados de contato "ao vivo" vêm do Supabase (tabela contact_info);
// os valores abaixo servem de fallback caso o banco ainda não tenha
// sido populado, e são reaproveitados em textos que não mudam (história,
// sacramentos, datas do calendário).

export const PARISH = {
  name: "Paróquia São José",
  city: "Orlândia, SP",
  diocese: "Diocese de Franca",
};

export const CONTACT_FALLBACK = {
  phone: "(16) 3826-1315",
  whatsapp_url: "https://wa.me/5516992412269",
  address: "Praça São José, s/n, Centro, Orlândia-SP, CEP 14620-000",
  email: "pqsjorlandia@gmail.com",
  office_hours:
    "Segunda a sexta, 8h às 18h; sábado, 8h às 11h30; domingo fechado",
  instagram_url: "https://www.instagram.com/matrizsaojoseorl/",
};

export const MASS_SCHEDULE_FALLBACK = [
  { id: "f1", day_label: "Terça a Sexta", time: "19h", note: null },
  { id: "f2", day_label: "Sábado", time: "18h30", note: null },
  { id: "f3", day_label: "Domingo", time: "9h30", note: null },
  { id: "f4", day_label: "Domingo", time: "19h", note: null },
];

export const HISTORY_MILESTONES = [
  {
    year: "1893",
    title: "Início da construção",
    text: "A construção da igreja começou em 15 de novembro de 1893, no mesmo local onde havia uma antiga capela de madeira, erguida com pedras de grês (arenito) extraídas localmente.",
  },
  {
    year: "1899",
    title: "Inauguração",
    text: "A Igreja Matriz foi inaugurada em 12 de setembro de 1899, com pinturas internas do artista italiano Ângelo Lazarini.",
  },
  {
    year: "1926",
    title: "Escola Paroquial São Luís",
    text: "Nomeada em 12 de outubro de 1926, foi reformada em 2014 e hoje abriga eventos e reuniões da comunidade.",
  },
  {
    year: "1937",
    title: "Casa Paroquial",
    text: "Inaugurada em 1937, segue como referência da vida administrativa e pastoral da paróquia.",
  },
  {
    year: "1999",
    title: "Torre Monumento",
    text: "Erguida ao completar 100 anos de paróquia, com 44 metros de altura, dedicada a Rex regum e Dominus dominatum (Cristo Rei). Abriga três sinos de aço fundido — 850kg, 650kg e 400kg —, um conjunto de três que muitos fiéis associam à Santíssima Trindade.",
  },
  {
    year: "2004",
    title: "Memorial Vocacional das Águas",
    text: 'Idealizado pelo Pe. Olinto Cremonese na Campanha da Fraternidade de 2004 ("Água, fonte de vida"), reúne o Batistério ao ar livre, o Poço de Jacó, a Roda d\'Água, a Estrela e o Globo, dispostos em torno da Igreja Matriz.',
  },
];

// Os sete sacramentos. `whatsapp: true` indica que o item aciona o CTA de
// WhatsApp para a secretaria; os demais acontecem no fluxo normal das
// missas/celebrações e não exigem agendamento. `image` é opcional — quando
// preenchida (import local de src/assets/images ou URL), o cartão do
// SacramentsCoverflow usa a foto como fundo em vez do ícone sobre fundo
// claro; deixe `null` até haver uma foto real do sacramento.
export const SACRAMENTS = [
  {
    key: "batismo",
    name: "Batismo",
    description:
      'Celebrado em nome do Pai, do Filho e do Espírito Santo, o Batismo acolhe a criança (ou o adulto) na família da Igreja.',
    whatsapp: true,
    image: null,
  },
  {
    key: "crisma",
    name: "Confirmação (Crisma)",
    description:
      "Fortalece com os dons do Espírito Santo os batizados que já participam da catequese paroquial.",
    whatsapp: true,
    image: null,
  },
  {
    key: "eucaristia",
    name: "Eucaristia",
    description:
      "Celebrada em todas as missas da paróquia — não exige agendamento prévio.",
    whatsapp: false,
    image: null,
  },
  {
    key: "confissao",
    name: "Confissão",
    description:
      "Disponível antes das missas ou em horário combinado com um dos padres da paróquia.",
    whatsapp: false,
    image: null,
  },
  {
    key: "uncao",
    name: "Unção dos Enfermos",
    description:
      "Para quem enfrenta doença grave ou fragilidade pela idade — atendimento também em domicílio ou hospital.",
    whatsapp: true,
    image: null,
  },
  {
    key: "ordem",
    name: "Ordem",
    description:
      "Discernimento vocacional para o diaconato e o sacerdócio, acompanhado junto à Diocese de Franca.",
    whatsapp: true,
    image: null,
  },
  {
    key: "matrimonio",
    name: "Matrimônio",
    description:
      "Casamento na Igreja, com preparação de noivos conduzida pela equipe paroquial.",
    whatsapp: true,
    image: null,
  },
];

// Fotos-placeholder da galeria diagonal da Home (seção entre a leitura do
// dia e os sacramentos). Aleatórias de propósito — trocar pelas fotos reais
// da paróquia assim que o site for aprovado pelo cliente, via o futuro
// painel admin.
export const GALLERY_PHOTOS = [
  { id: "g1", url: "https://picsum.photos/seed/paroquia-1/640/480", alt: "" },
  { id: "g2", url: "https://picsum.photos/seed/paroquia-2/640/480", alt: "" },
  { id: "g3", url: "https://picsum.photos/seed/paroquia-3/640/480", alt: "" },
  { id: "g4", url: "https://picsum.photos/seed/paroquia-4/640/480", alt: "" },
  { id: "g5", url: "https://picsum.photos/seed/paroquia-5/640/480", alt: "" },
  { id: "g6", url: "https://picsum.photos/seed/paroquia-6/640/480", alt: "" },
];

// Outros serviços pastorais frequentes que não são sacramentos, mas seguem
// o mesmo fluxo de agendamento via secretaria.
export const OTHER_SERVICES = [
  {
    key: "missa-setimo-dia",
    name: "Missa de 7º dia",
    description:
      "Celebração em memória de um ente querido, sete dias após o falecimento.",
    whatsapp: true,
  },
  {
    key: "intencao-missa",
    name: "Intenção de missa",
    description:
      "Oferecer uma missa por uma intenção especial — ação de graças, saúde, ou em memória de alguém.",
    whatsapp: true,
  },
];

// Datas cadastradas manualmente: eventos específicos da paróquia/diocese/
// Igreja no Brasil que nenhuma API de calendário litúrgico cobre (padroeiro
// local, padroeira do Brasil, aniversário de eleição do papa), mais Natal e
// Páscoa, sempre exibidos por serem os mais conhecidos do público.
//
// `movable: true` sinaliza que a data varia a cada ano; nesse caso
// `month`/`day` ficam nulos e a data é calculada em tempo real a partir da
// Páscoa (ver src/lib/liturgicalCalendar.js).
//
// As demais solenidades e festas de data fixa do Calendário Romano Geral
// (Todos os Santos, Assunção, apóstolos, etc.) vêm de
// src/data/liturgicalFeasts.generated.json, gerado a partir da
// LiturgicalCalendarAPI (ver scripts/fetch-liturgical-calendar.mjs) e
// mesclado automaticamente pelo componente ImportantDates.
export const IMPORTANT_DATES = [
  {
    key: "sao-jose",
    label: "Solenidade de São José",
    month: 3,
    day: 19,
    highlight: true,
    note: "Padroeiro da paróquia",
  },
  { key: "natal", label: "Natal do Senhor", month: 12, day: 25 },
  { key: "pascoa", label: "Páscoa", movable: "easterSunday" },
  { key: "corpus-christi", label: "Corpus Christi", movable: "corpusChristi" },
  {
    key: "aparecida",
    label: "Nossa Senhora Aparecida",
    month: 10,
    day: 12,
    note: "Padroeira do Brasil",
  },
  {
    key: "papa-leao-xiv",
    label: "Eleição do Papa Leão XIV",
    month: 5,
    day: 8,
    note: "Aniversário de eleição do papa",
  },
];
