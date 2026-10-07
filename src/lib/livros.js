// Os 66 livros da Bíblia (nomes como na tradução Almeida), com uma explicação curta.
// Usado pelo quiz em /quiz. "AT" = Antigo Testamento, "NT" = Novo Testamento.

export const livros = [
  // ---------- Antigo Testamento ----------
  { nome: "Gênesis", t: "AT", resumo: "A criação do mundo, a queda do homem e as histórias de Abraão, Isaque, Jacó e José." },
  { nome: "Êxodo", t: "AT", resumo: "Deus liberta Israel da escravidão no Egito por meio de Moisés e entrega os Dez Mandamentos." },
  { nome: "Levítico", t: "AT", resumo: "Leis sobre santidade, sacrifícios e o serviço dos sacerdotes." },
  { nome: "Números", t: "AT", resumo: "Os 40 anos de Israel no deserto, com dois recenseamentos do povo." },
  { nome: "Deuteronômio", t: "AT", resumo: "Os últimos discursos de Moisés, relembrando a Lei antes da entrada em Canaã." },
  { nome: "Josué", t: "AT", resumo: "Josué lidera Israel na conquista da Terra Prometida." },
  { nome: "Juízes", t: "AT", resumo: "Ciclos de desobediência e libertação por líderes como Gideão, Débora e Sansão." },
  { nome: "Rute", t: "AT", resumo: "A lealdade de uma moabita que se torna bisavó do rei Davi." },
  { nome: "1 Samuel", t: "AT", resumo: "O profeta Samuel, o reinado de Saul e a unção do jovem Davi." },
  { nome: "2 Samuel", t: "AT", resumo: "O reinado de Davi: vitórias, pecado, arrependimento e consequências." },
  { nome: "1 Reis", t: "AT", resumo: "A sabedoria de Salomão, o Templo, a divisão do reino e o profeta Elias." },
  { nome: "2 Reis", t: "AT", resumo: "Os reis de Israel e Judá, o profeta Eliseu e o exílio na Babilônia." },
  { nome: "1 Crônicas", t: "AT", resumo: "Genealogias e a história de Davi vista pelo lado da adoração." },
  { nome: "2 Crônicas", t: "AT", resumo: "De Salomão ao exílio, destacando os reis de Judá e os avivamentos." },
  { nome: "Esdras", t: "AT", resumo: "O retorno do exílio e a reconstrução do Templo em Jerusalém." },
  { nome: "Neemias", t: "AT", resumo: "A reconstrução dos muros de Jerusalém com oração e trabalho." },
  { nome: "Ester", t: "AT", resumo: "Uma jovem judia que se torna rainha e salva seu povo da destruição." },
  { nome: "Jó", t: "AT", resumo: "Um homem justo que perde tudo e encontra Deus no meio do sofrimento." },
  { nome: "Salmos", t: "AT", resumo: "150 cânticos e orações de louvor, lamento, gratidão e confiança." },
  { nome: "Provérbios", t: "AT", resumo: "Ditos de sabedoria prática para o dia a dia, a maioria de Salomão." },
  { nome: "Eclesiastes", t: "AT", resumo: "Reflexões sobre o sentido da vida: tudo é passageiro sem Deus." },
  { nome: "Cânticos", t: "AT", resumo: "Também chamado Cantares: um poema sobre o amor entre noivo e noiva." },
  { nome: "Isaías", t: "AT", resumo: "Profecias de juízo e esperança, com anúncios claros do Messias." },
  { nome: "Jeremias", t: "AT", resumo: "O “profeta chorão” chama Judá ao arrependimento antes do exílio." },
  { nome: "Lamentações", t: "AT", resumo: "Poemas de dor pela destruição de Jerusalém, com fé na misericórdia de Deus." },
  { nome: "Ezequiel", t: "AT", resumo: "Visões do profeta no exílio, incluindo o vale de ossos secos." },
  { nome: "Daniel", t: "AT", resumo: "Fidelidade na Babilônia: a cova dos leões e visões sobre o futuro." },
  { nome: "Oseias", t: "AT", resumo: "O casamento do profeta retrata o amor fiel de Deus por um povo infiel." },
  { nome: "Joel", t: "AT", resumo: "Uma praga de gafanhotos e a promessa do derramar do Espírito." },
  { nome: "Amós", t: "AT", resumo: "Um pastor que denuncia a injustiça social e pede justiça verdadeira." },
  { nome: "Obadias", t: "AT", resumo: "O menor livro do Antigo Testamento: juízo sobre Edom." },
  { nome: "Jonas", t: "AT", resumo: "O profeta que fugiu de Deus, foi engolido por um grande peixe e pregou em Nínive." },
  { nome: "Miqueias", t: "AT", resumo: "Anuncia que o Messias nasceria em Belém e resume: praticar a justiça e amar a misericórdia." },
  { nome: "Naum", t: "AT", resumo: "Anuncia a queda de Nínive, capital da Assíria." },
  { nome: "Habacuque", t: "AT", resumo: "Um profeta que questiona Deus e aprende que “o justo viverá pela fé”." },
  { nome: "Sofonias", t: "AT", resumo: "O dia do Senhor e a alegria de Deus sobre o seu povo." },
  { nome: "Ageu", t: "AT", resumo: "Incentiva o povo a terminar a reconstrução do Templo." },
  { nome: "Zacarias", t: "AT", resumo: "Visões de restauração e a profecia do rei que entra montado num jumentinho." },
  { nome: "Malaquias", t: "AT", resumo: "O último livro do Antigo Testamento: chama o povo de volta à fidelidade." },

  // ---------- Novo Testamento ----------
  { nome: "Mateus", t: "NT", resumo: "A vida de Jesus como o Rei e Messias prometido, com o Sermão do Monte." },
  { nome: "Marcos", t: "NT", resumo: "O evangelho mais curto e dinâmico: Jesus como o servo que age." },
  { nome: "Lucas", t: "NT", resumo: "Um médico narra a vida de Jesus com atenção aos pobres e excluídos." },
  { nome: "João", t: "NT", resumo: "Jesus como o Filho de Deus: “Deus amou o mundo de tal maneira...”." },
  { nome: "Atos", t: "NT", resumo: "O Espírito Santo vem sobre os discípulos e a igreja se espalha pelo mundo." },
  { nome: "Romanos", t: "NT", resumo: "Carta de Paulo sobre a salvação pela graça, por meio da fé em Jesus." },
  { nome: "1 Coríntios", t: "NT", resumo: "Paulo corrige divisões na igreja e escreve o famoso capítulo do amor." },
  { nome: "2 Coríntios", t: "NT", resumo: "Paulo fala de consolo no sofrimento e do poder de Deus na fraqueza." },
  { nome: "Gálatas", t: "NT", resumo: "Liberdade em Cristo e o fruto do Espírito." },
  { nome: "Efésios", t: "NT", resumo: "Nossa identidade em Cristo, a unidade da igreja e a armadura de Deus." },
  { nome: "Filipenses", t: "NT", resumo: "A carta da alegria, escrita por Paulo na prisão." },
  { nome: "Colossenses", t: "NT", resumo: "Jesus está acima de tudo e é suficiente para a vida cristã." },
  { nome: "1 Tessalonicenses", t: "NT", resumo: "Encorajamento a uma igreja nova e a esperança da volta de Jesus." },
  { nome: "2 Tessalonicenses", t: "NT", resumo: "Esclarece dúvidas sobre a volta de Cristo e incentiva a perseverar." },
  { nome: "1 Timóteo", t: "NT", resumo: "Conselhos de Paulo a um jovem pastor sobre a liderança da igreja." },
  { nome: "2 Timóteo", t: "NT", resumo: "A última carta de Paulo: “Combati o bom combate, terminei a corrida”." },
  { nome: "Tito", t: "NT", resumo: "Orientações para organizar as igrejas da ilha de Creta." },
  { nome: "Filemom", t: "NT", resumo: "Paulo pede perdão e acolhimento para Onésimo, um escravo fugitivo." },
  { nome: "Hebreus", t: "NT", resumo: "Jesus é superior a tudo; inclui a “galeria dos heróis da fé”." },
  { nome: "Tiago", t: "NT", resumo: "Fé verdadeira se mostra em obras; cuidado com a língua." },
  { nome: "1 Pedro", t: "NT", resumo: "Esperança e firmeza para cristãos que enfrentam sofrimento." },
  { nome: "2 Pedro", t: "NT", resumo: "Alerta contra falsos mestres e lembrança da volta de Jesus." },
  { nome: "1 João", t: "NT", resumo: "Deus é amor; quem ama conhece a Deus." },
  { nome: "2 João", t: "NT", resumo: "Uma carta curta sobre andar na verdade e no amor." },
  { nome: "3 João", t: "NT", resumo: "Elogio à hospitalidade de Gaio e aos que servem com fidelidade." },
  { nome: "Judas", t: "NT", resumo: "Pede que os cristãos batalhem pela fé diante de falsos ensinos." },
  { nome: "Apocalipse", t: "NT", resumo: "Visões de João sobre a vitória final de Jesus e o novo céu e nova terra." },
];

// Primeira letra do nome, sem número e sem acento (ex.: "1 Samuel" → "S", "Êxodo" → "E")
export function letraDoLivro(nome) {
  return nome
    .replace(/^\d+\s*/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .charAt(0)
    .toUpperCase();
}

// Uma pergunta para cada letra que tem pelo menos um livro
export function perguntasPorLetra() {
  const grupos = new Map();
  for (const livro of livros) {
    const letra = letraDoLivro(livro.nome);
    if (!grupos.has(letra)) grupos.set(letra, []);
    grupos.get(letra).push(livro);
  }

  return [...grupos.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letra, lista]) => {
      const total = lista.length;
      // Até 4 livros: alternativas 1, 2, 3 e 4. Mais que isso: 4 números seguidos que incluem a resposta.
      let inicio = 1;
      if (total > 4) inicio = Math.max(1, total - (letra.charCodeAt(0) % 4));
      const opcoes = [0, 1, 2, 3].map((i) => inicio + i);
      return { letra, total, opcoes, livros: lista };
    });
}
