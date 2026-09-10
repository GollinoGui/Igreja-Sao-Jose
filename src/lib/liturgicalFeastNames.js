// Traduções (pt-BR) das solenidades e festas de data fixa do Calendário
// Romano Geral, chaveadas pelo `event_key` estável da LiturgicalCalendarAPI
// (https://litcal.johnromanodorazio.com — a API não tem locale pt nem
// calendário nacional do Brasil, então traduzimos aqui).
//
// Chaves ausentes deste dicionário são descartadas pelo script de geração
// (scripts/fetch-liturgical-calendar.mjs), que avisa no console quais
// `event_key` novos precisam de tradução.
//
// Algumas solenidades (São José, Finados) já são cadastradas manualmente em
// content.js com nota específica da paróquia; ficam aqui também para o caso
// de a paróquia decidir remover a entrada manual no futuro, mas o script de
// geração as exclui da lista automática para não duplicar cards.
export const LITURGICAL_FEAST_NAMES = {
  // Solenidades (grade 6)
  ImmaculateConception: "Imaculada Conceição de Nossa Senhora",
  MaryMotherOfGod: "Maria, Mãe de Deus",
  StJoseph: "Solenidade de São José",
  Annunciation: "Anunciação do Senhor",
  SacredHeart: "Sagrado Coração de Jesus",
  NativityJohnBaptist: "Natividade de São João Batista",
  StsPeterPaulAp: "São Pedro e São Paulo",
  Assumption: "Assunção de Nossa Senhora",
  AllSaints: "Todos os Santos",
  AllSouls: "Finados",
  ChristKing: "Cristo Rei",

  // Festas (grade 4)
  StStephenProtomartyr: "Santo Estêvão, Protomártir",
  StJohnEvangelist: "São João Evangelista",
  StMarkEvangelist: "São Marcos Evangelista",
  StThomasAp: "São Tomé Apóstolo",
  StJamesAp: "São Tiago Apóstolo",
  StLawrenceDeacon: "São Lourenço, Diácono e Mártir",
  StBartholomewAp: "São Bartolomeu Apóstolo",
  NativityVirginMary: "Natividade de Nossa Senhora",
  StMatthewEvangelist: "São Mateus, Apóstolo e Evangelista",
  StsArchangels: "São Miguel, São Gabriel e São Rafael, Arcanjos",
  StSimonStJudeAp: "São Simão e São Judas Tadeu, Apóstolos",
  StAndrewAp: "Santo André Apóstolo",
  Transfiguration: "Transfiguração do Senhor",
  ExaltationCross: "Exaltação da Santa Cruz",
  PresentationLord: "Apresentação do Senhor",
  StLukeEvangelist: "São Lucas Evangelista",
  ConversionStPaul: "Conversão de São Paulo Apóstolo",
  ChairStPeter: "Cátedra de São Pedro",
  Visitation: "Visitação de Nossa Senhora",
  HolyInnocents: "Santos Inocentes, Mártires",
  StsPhilipJames: "São Filipe e São Tiago, Apóstolos",
  StMatthiasAp: "São Matias Apóstolo",
};

// event_key que já existem como entrada manual em content.js
// (com nota/destaque específico da paróquia) — o gerador exclui essas
// chaves da lista automática para não duplicar cards.
export const MANUALLY_CURATED_KEYS = new Set(["StJoseph", "AllSouls"]);
