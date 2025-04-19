
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
    content: `Parmi les nombreux témoignages du livre d'or, certains "poilus" ont choisi de s'exprimer en vers. Au-delà de simples remerciements, ces soldats ont transformé leur gratitude en poésie, révélant des talents littéraires insoupçonnés.

Ces poèmes, souvent écrits à la main avec un grand soin calligraphique, témoignent d'une volonté de s'élever au-dessus des souffrances de la guerre, comme on peut le voir dans les entrées [87] et [113].

La simplicité touchante de ces vers contraste parfois avec leur structure travaillée. L'entrée [110] utilise par exemple une forme classique pour exprimer la reconnaissance envers le personnel soignant. On note également dans l'entrée [114] une maîtrise impressionnante du rythme et des rimes.

Certains, comme dans l'entrée [165], empruntent même aux formes populaires avec des références culturelles de l'époque. La diversité des styles reflète la variété des origines et des niveaux d'éducation des soldats.

Ces expressions poétiques constituent un témoignage précieux sur l'état d'esprit des combattants, leur capacité de résilience et leur besoin d'exprimer par l'art leurs sentiments face à cette parenthèse de paix que représentait l'hôpital Rigot.`,
    entriesIds: [87, 110, 111, 113, 114, 116, 165]
  },
  {
    id: "evolution-langage",
    title: "L'évolution du langage : exemple du terme d'ambulance",
    content: `L'analyse des entrées du livre d'or révèle une évolution intéressante de la terminologie médicale militaire, notamment autour du terme "ambulance".

Au début du conflit, comme en témoignent les entrées [32] et [40], le mot "ambulance" fait référence à une structure médicale mobile suivant les troupes au front. On parle alors d'"ambulance de corps" ou d'"ambulance divisionnaire".

Progressivement, ce terme s'élargit pour désigner également le transport des blessés. Les entrées [72] et [99] évoquent ainsi le "service d'ambulance" qui achemine les soldats vers l'arrière.

À partir de 1916, comme le montrent les entrées [105], [108] et [114], le terme commence à être utilisé pour désigner les véhicules eux-mêmes. Les soldats mentionnent "l'ambulance automobile" ou simplement "l'ambulance" pour parler du véhicule sanitaire.

Cette évolution sémantique est particulièrement visible dans les entrées [122], [132] et [151], où la distinction entre structure médicale et véhicule devient floue. L'entrée [153] utilise même le terme dans les deux sens au sein du même témoignage.

Vers la fin de la guerre, comme l'illustrent les entrées [171], [173] et [180], l'usage moderne du terme comme véhicule sanitaire tend à s'imposer. Les entrées [177] et [184] montrent néanmoins que l'acception originale reste employée parallèlement.

Ce glissement sémantique témoigne de l'évolution rapide des pratiques médicales durant le conflit et de l'adaptation du langage à ces transformations.`,
    entriesIds: [32, 40, 72, 99, 100, 105, 108, 111, 113, 114, 117, 122, 132, 151, 153, 155, 156, 166, 171, 172, 173, 177, 179, 180, 184]
  },
  {
    id: "vie-famille",
    title: "Une vie de famille retrouvée",
    content: `Un thème récurrent dans le livre d'or est l'ambiance familiale que les blessés ont trouvée à l'hôpital Rigot. Ce sentiment de "famille retrouvée" apparaît comme un contrepoint essentiel à la déshumanisation du front.

Les entrées [85] et [92] évoquent explicitement cette atmosphère, avec des expressions comme "seconde famille" ou "foyer retrouvé". Ces métaphores familiales traduisent le besoin profond de relations humaines chaleureuses au milieu du chaos de la guerre.

L'entrée [93] développe particulièrement ce sentiment en détaillant les petites attentions quotidiennes qui ont recréé un environnement familial. De même, l'entrée [109] souligne l'importance des conversations et moments partagés qui dépassent le simple cadre médical.

La dimension humaine des soins est mise en avant dans l'entrée [112], où le soldat distingue clairement l'aspect technique du traitement et la chaleur humaine qui l'accompagne. Cette humanité est présentée comme un facteur déterminant dans le processus de guérison.

L'entrée [150] résume parfaitement ce sentiment général en évoquant "un îlot de paix et de douceur familiale" au milieu de la tourmente. Ces témoignages illustrent comment l'hôpital Rigot a su dépasser sa fonction médicale première pour offrir un véritable refuge émotionnel aux combattants traumatisés par l'expérience du front.`,
    entriesIds: [85, 92, 93, 109, 112, 150]
  }
];
