// Apenas dados associados ao perfil fornecido. Ver docs/VALIDACAO_DADOS.md.
export const school = {
  name: "Escola Meus Primeiros Passos",
  instagram: "https://www.instagram.com/escola_meus_primeiros_passos/",
  location: "Gravatá, Pernambuco",
  stages: ["Educação Infantil", "Ensino Fundamental · 1º ao 5º ano"],
  positioning: "Aprender com amor e propósito.",
  // Endereço em diretórios públicos; ver divergência de rua no mapa em docs/VALIDACAO_DADOS.md.
  address: "Rua São Sebastião, 59 · Boa Vista · Gravatá — PE",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Escola%20Meus%20Primeiros%20Passos%20Gravata%20PE",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Escola%20Meus%20Primeiros%20Passos%20Gravata%20PE&z=16&output=embed",
  phone: null,
  email: null,
  proposal: "Proposta de experiência digital · apresentação independente",
};
export const discoveries = [
  {
    id: "imaginar",
    title: "Imaginar",
    subtitle: "Um mundo cabe em uma história.",
    text: "Entre palavras, cores e possibilidades, a imaginação abre caminhos para novas descobertas.",
    color: "pink",
    art: "book",
  },
  {
    id: "explorar",
    title: "Explorar",
    subtitle: "Toda pergunta é um começo.",
    text: "Observar, experimentar e se encantar com as pequenas coisas: há tanto para descobrir ao nosso redor.",
    color: "sage",
    art: "plant",
  },
  {
    id: "conviver",
    title: "Conviver",
    subtitle: "Crescer também é estar junto.",
    text: "Compartilhar experiências e construir memórias dá um significado especial a cada novo passo.",
    color: "yellow",
    art: "boat",
  },
] as const;
export const questions = [
  {
    question: "Quais etapas de ensino a escola apresenta?",
    answer:
      "O perfil público da escola apresenta Educação Infantil e Ensino Fundamental até o 5º ano. Consulte a equipe pelo Instagram para informações sobre turmas e disponibilidade.",
  },
  {
    question: "Como conhecer melhor a escola?",
    answer:
      "No Instagram da Escola Meus Primeiros Passos você pode acompanhar as publicações e conversar diretamente com a equipe sobre uma visita.",
  },
  {
    question: "O que posso explorar no Portal do Professor?",
    answer:
      "Esta proposta inclui um ambiente de demonstração com turmas, alunos, notas, frequência e atividades fictícias. Você pode navegar e experimentar os recursos sem criar uma conta.",
  },
];

// Fotografias verificadas no embed público do perfil exato. Inventário em public/assets/school.
export const schoolPhotos = [
  { id: 'corrida-em-familia', title: 'Passos que a gente dá junto', alt: 'Criança e adulto correndo em um caminho arborizado na Corrida do Dia dos Pais.', event: 'Corrida do Dia dos Pais', source: 'https://www.instagram.com/p/DcHT8nZCUxI/', width: 1200, height: 1126 },
  { id: 'semana-maluca-sorrisos', title: 'A imaginação ganhou vida', alt: 'Colagem publicada pela escola com crianças e seus cabelos criativos na Semana Maluca.', event: 'Semana Maluca', source: 'https://www.instagram.com/p/DeeZjW_IN4A/', width: 899, height: 1200 },
  { id: 'abraco-em-familia', title: 'Memórias cheias de carinho', alt: 'Pai abraçando uma criança durante o encontro da comunidade escolar.', event: 'Corrida do Dia dos Pais', source: 'https://www.instagram.com/p/DcHT8nZCUxI/', width: 1200, height: 1126 },
  { id: 'semana-maluca-criacoes', title: 'Criar é uma aventura', alt: 'Colagem oficial de crianças e criações coloridas da Semana Maluca.', event: 'Semana Maluca', source: 'https://www.instagram.com/p/DeeZjW_IN4A/', width: 899, height: 1200 },
  { id: 'semana-maluca-mochilas', title: 'Ideias fora da mochila', alt: 'Mochilas decoradas e crianças em uma colagem oficial da Semana Maluca.', event: 'Semana Maluca', source: 'https://www.instagram.com/p/DeeZjW_IN4A/', width: 899, height: 1200 },
  { id: 'comunidade-reunida', title: 'Juntos, vamos mais longe', alt: 'Famílias reunidas ao ar livre durante a Corrida do Dia dos Pais da escola.', event: 'Corrida do Dia dos Pais', source: 'https://www.instagram.com/p/DcHT8nZCUxI/', width: 1200, height: 1126 },
] as const;
export const schoolEditorial = {
  community: 'A Corrida do Dia dos Pais reuniu crianças e famílias em uma manhã de movimento e convivência. Passos compartilhados, memórias que ficam.',
  intro: 'Da Educação Infantil ao 5º ano, uma história que começa em Gravatá e se enche de possibilidades.',
  about: 'Aprender com amor e propósito é o convite da Escola Meus Primeiros Passos. Uma escola para conhecer de perto, uma história para construir juntos.',
  discoveries: [
    { title: 'Imaginar', subtitle: 'Criatividade de cabelo em pé.', text: 'Cores, cabelos criativos e ideias que saíram da rotina. A Semana Maluca reuniu experiências para guardar na memória.', photo: 'semana-maluca-imaginacao', alt: 'Criança com um grande laço rosa no cabelo, em recorte da colagem da Semana Maluca.', source: 'https://www.instagram.com/p/DeeZjW_IN4A/' },
    { title: 'Explorar', subtitle: 'Toda pergunta é um começo.', text: 'A publicação “Cor Azul”, do Infantil I, é um convite para acompanhar as descobertas da turma. Veja o registro original no perfil da escola.', photo: 'infantil-cor-azul', alt: 'Capa azul da publicação Cor Azul, identificada como Infantil I, do perfil da escola.', source: 'https://www.instagram.com/p/DJ6myLjgebw/' },
    { title: 'Conviver', subtitle: 'O melhor caminho é junto.', text: 'Na Corrida do Dia dos Pais, crianças e famílias compartilharam uma manhã de movimento, encontros e alegria.', photo: 'corrida-em-familia', alt: 'Criança e adulto participam da Corrida do Dia dos Pais.', source: 'https://www.instagram.com/p/DcHT8nZCUxI/' },
  ],
};
