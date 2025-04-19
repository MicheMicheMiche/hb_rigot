
// Analysis panel data

export interface AnalysisData {
  id: string;
  title: string;
  content: string;
  entriesIds: number[];
}

export const analysisData: AnalysisData[] = [
  {
    id: "poilus-poetes",
    title: "Des poilus poètes",
    content: `Au sein du carnet, l'on retrouve plusieurs témoignages rédigés sous la forme de poèmes. Certains des auteurs y expriment, avec élégance, la gratitude qu'ils expriment envers le personnel de l'hôpital [110] [165], d'autres disent leur ferveur patriotique [87], leur solidarité envers leurs frères d'armes [111] ou encore ce qu'ils ont connu au front, comme à Verdun [113] [114].
- Ces poèmes témoignent à la fois d'une écriture intime, personnelle, et d'une forme de mise en scène patriotique et galvanisante. Le livre d'or est un espace d'expression libre dans lequel les poilus peuvent écrire la tête reposée, après s'être éloignés des combats pendant quelques temps.

- Durant la Grande Guerre, la poésie est essentiellement publiée dans deux types de médias. D'une part les grandes œuvres, éditées (Blaise Cendrars, Guillaume Apollinaire), et d'autre part les revues de tranchées, plutôt satiriques ou crues. Ces poèmes écrits dans des livres d'or d'hôpitaux sont donc particulièrement intéressants.

- L'existence de ces témoignages poétiques montre bien que, loin d'être l'apanage de l'élite culturelle française, la poésie était aussi un exutoire pour les soldats de tous grades, soucieux d'inscrire leur présence ou de féliciter les sacrifices de leurs camarades dans la mémoire collective.

- On notera en particulier les poèmes d'Emile Cavasse, dont un dédié à un caporal fraîchement cité à l'ordre de son Bataillon [111], ou encore celui destiné à la sœur Julie [110].`,
    entriesIds: [87, 110, 111, 113, 114, 116, 165]
  },
  {
    id: "evolution-langage",
    title: "L'évolution du langage",
    content: `Les témoignages du carnet forment un observatoire linguistique exceptionnel. Ils rendent visible la transition progressive du français militaire et populaire, qui lie l'héritage de la langue de la Belle Epoque et sa modernisation lexicale et stylistique. Plusieurs exemples :

- Si la majorité des auteurs désignent bien leur lieu de repos comme étant un « hôpital » (officiellement, hôpital bénévole), certains préfèrent le terme d' « ambulance » [32] [40] [72] [99] [100] [105] [108] [111] [113] [114] [117] [122] [132] [151] [153] [155] [156] [166] [171] [172] [173] [177] [179] [180] [184], un terme hérité de la guerre de 1870 - qui désigne un hôpital de campagne - et dont l'usage se raréfie déjà.


- Plusieurs poilus désignent leur régiment comme était un régiment « d'infanterie de ligne » [92] [100] [124] [152] [153] [197], ce qui renvoie à l'infanterie de ligne de l'époque napoléonienne. Or, depuis la fin du XIXe siècle, les régiments sont sobrement renommés « Régiments d'Infanterie ». Dans l'imaginaire collectif de certains poilus, cette appellation perdure cependant : la « ligne » est synonyme de bravoure, de discipline, et d'héroïsme face au feu nourri de l'ennemi. Selon l'historien André Loez, un certain nombre de poilus sont en effet instruits à l'école républicaine sur la mémoire des batailles napoléoniennes. Sorte d'appropriation symbolique et mythifiée de la part des auteurs de ces témoignages.


- Certains des mots employés ont aujourd'hui complètement disparu du registre courant, comme « tringlot » [111] (argot des fantassins des troupes de marine ou coloniales), "artiflot" [111] (artilleur), ou alors sont issus du lexique spécifique des poilus dans les tranchées, comme « marmite » [111] (un obus) ou un « grognard » [111] (un vétéran). Certaines expressions, très couramment employées dans les témoignages, ont aujourd'hui disparu, comme les « bons soins » qu'un médecin ou une infirmière prodigue à un malade ([5] [6] [14] [22] [30] [51] [85] [145] ...).


- D'une façon générale, on entrevoit dans ces témoignages deux générations distinctes qui s'expriment. L'une, plus âgée, qui conserve un style plus ampoulé et multiplie les adjectifs emphatiques (« irréprochable" [1], « admirable » [63], ...). L'autre, plus jeune, préfère des formules plus courtes ou l'argot de tranchée.

- Autre observation amusante : il semble qu'à plusieurs reprises dans le carnet, des lettres successives se ressemblent fortement, ne variant qu'à la marge sur certaines expressions. Par exemple : [45] et [46] qui commençent de la même manière, [48] et [49] structurés similairement, [77] et [78] qui sont quasiment identiques, [151] et [154] qui partagent les mêmes formules, ou encore [162], [163] et [164] qui sont pratiquement identiques. Les auteurs qui ont copié en partie le message précédent étaient peut-être peu inspirés par la page blanche, ou bien ne maîtrisaient pas suffisamment le français pour produire une écriture personnelle et spontanée.`,
    entriesIds: [1, 5, 6, 14, 22, 30, 32, 40, 45, 46, 48, 49, 51, 63, 72, 77, 78, 85, 92, 99, 100, 105, 108, 111, 113, 114, 117, 122, 124, 132, 145, 151, 152, 153, 154, 155, 156, 162, 163, 164, 166, 171, 172, 173, 177, 179, 180, 184, 197]
  },
  {
    id: "vie-famille",
    title: "Une vie de famille retrouvée",
    content: `Certains des témoignages insistent sur la parenthèse quasi familiale qu'a constitué leur séjour à l'hôpital bénévole Rigot.

- Ce qui marque en premier lieu, c'est l'esprit d'une « douce vie de famille » [150] qui règne à l'HB Rigot. On s'y retrouve comme "en famille », l'on reçoit une affection « quasi paternelle », comme « pupille » [85]. On y « retrouve un peu de la douceur familiale », ainsi qu'une « discipline vraiment paternelle (qui) fait oublier les heures tragiques vécues sur le champ de bataille », et où l'on guérit « en nous croyant au sein de nos familles » [93]. Le dévouement du personnel est à même de « remplacer nos familles depuis si longtemps absentes » [92], dans cette "maison de famille où nous oublions que nous sommes soldats" [109].

- Il se marque une distinction nette entre les établissements hospitaliers classiques et les hôpitaux bénévoles administrés par des particuliers. On note l'opposition imagée entre les hôpitaux militaires (« casernes de la douleur ») [93] et l'hôpital bénévole (« une fraîche et bienfaisante oasis ») [85], lieu où l'on peut « s'y livrer à ses délassements favoris », et où chacun peut « croire et penser librement, sans que le moindre obstacle l'en vienne empêcher » [93].

- "Bons soins semblables à ceux qu'une maman donnerait à ses enfants » [150], « gaufrettes » [70], la « Sœur Julie qui nous a fait passer d'agréables soirées » [97], les « bons petits plats » [144] de la « distinguée cordon bleu » [109] : autant de marques d'attentions particulières de l'ensemble du personnel envers les malades.

- Un passage à l'HB Rigot qui aura marqué de nombreux blessés : « je garderai un souvenir ineffaçable du temps passé en ce lieu et au milieu de si bons amis. » [112]`,
    entriesIds: [70, 85, 92, 93, 97, 109, 112, 144, 150]
  }
];
