/***********************
 *  UTILITIES
 ***********************/
const LS_KEYS = {
    PROGRESS: "compassProgress",      // odpovědi pole [-2..2]
    ORDER: "compassOrder",            // pořadí indexů otázek
    RESULTS: "compassResults",        // finální skóre os {axis: value}
};

const byId = (id) => document.getElementById(id);
const t = (key, fallback) => {
    if (typeof translations === "object" &&
        translations[currentLang] &&
        translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    return fallback;
};
const shuffle = (arr) => arr.map((v)=>({v, i:Math.random()})).sort((a,b)=>a.i-b.i).map(o=>o.v);

const AXIS_LABELS = {
    economic: {
        left:  { cs: "Socialismus", en: "Socialism" },
        right: { cs: "Kapitalismus", en: "Capitalism" },
        desc: {
            cs: {
                left: "Myšlenka a hnutí, které se snaží liberálně kapitalistický soukromovlastnický hospodářský a společenský řád nahradit systémem založeným na vlastnictví prostředků produkce pracovníky. Cílem socialismu je dosažení ideálů rovnosti, spravedlnosti a mezilidské solidarity cestou sociální reformy nebo revolucí. Socialismus si obecně klade tyto cíle: změna majetkových a právních vztahů ve společnosti, změna struktury hospodářství, boj proti privilegiím a změna nebo kompletní zrušení státního zřízení.",
                right: "Ekonomický systém, v němž rozhodujícím výrobním faktorem je kapitál. Definice pojmu není jednoznačná a je zatížena mnoha historickými spory, většinou se tak označuje převažující dnešní systém tržní ekonomiky zapojený do mezinárodního obchodu a často se vztahuje i na společenský a politický systém."
            },
            en: {
                left: "An economic and political philosophy encompassing diverse economic and social systems characterised by social ownership of the means of production, as opposed to private ownership. It describes the economic, political, and social theories and movements associated with the implementation of such systems. Social ownership can take various forms, including public, community, collective, cooperative, or employee. As one of the main ideologies on the political spectrum, socialism is the standard left-wing ideology in most countries. Types of socialism vary based on the role of markets and planning in resource allocation, and the structure of management in organizations.",
                right: "An economic system based on the private ownership of the means of production and their use for the purpose of obtaining profit. This socioeconomic system has developed historically through several stages and is defined by a number of basic constituent elements: private property, profit motive, capital accumulation, competitive markets, commodification, wage labor, and an emphasis on innovation and economic growth. Capitalist economies tend to experience a business cycle of economic growth followed by recessions."
            }
        }
    },
    authority: {
        left:  { cs: "Libertarianismus", en: "Libertarianism" },
        right: { cs: "Autoritarismus", en: "Authoritarianism" },
        desc: {
            cs: {
                left: "Skupina politických ideologií, které vnímají osobní svobodu a autonomii jako svou ústřední hodnotu. Libertariánské směry sdílí skepsi k autoritám a státní moci, liší se ovšem ve svých názorech na adekvátní ekonomický systém. Pro klasifikaci různých libertariánských směrů ve vztahu k vlastnictví a kapitálu je proto používáno levo-pravé nebo socialisticko-kapitalistické rozlišování.",
                right: "Politický systém, který se vyznačuje silnou centralizovanou mocí, jež omezuje práva lidí zasahovat do politiky. Jednotlivé svobody jsou podřízeny státu a neexistuje ústavní odpovědnost vládců. Autoritářský systém se obvykle charakterizuje těmito rysy: omezený politický pluralismus, zakládání své legitimity na emocích, minimální sociální mobilizace a neformálně definovaná výkonná moc s často malými a měnícími se pravomocemi."
            },
            en: {
                left: "A political philosophy that holds freedom, personal sovereignty, and liberty as primary values. Many libertarians believe that the concept of freedom is in accord with the non-aggression principle, according to which each individual has the right to live as they choose, as long as they do not violate the rights of others by initiating force or fraud against them.",
                right: "A political system characterized by the rejection of political plurality, the use of strong central power to preserve the political status quo, and reductions in democracy, separation of powers, civil liberties, and the rule of law. Authoritarian regimes may be either autocratic or oligarchic and may be based upon the rule of a party or the military. States that have a blurred boundary between democracy and authoritarianism have sometimes been characterized as \"hybrid democracies\", \"hybrid regimes\" or \"competitive authoritarian\" states."
            }
        }
    },
    cultural: {
        left:  { cs: "Liberalismus", en: "Liberalism" },
        right: { cs: "Konzervatismus", en: "Conservatism" },
        desc: {
            cs: {
                left: "Politický směr nebo také filosofický pohled, který většinou prosazuje principy jako svoboda, demokracie, sekularismus, právní rovnost, podporu občanských a lidských práv. Základní hodnotou liberalismu je svoboda. Liberalismus vidí svobodu více individuálně. Je v protikladu k totalitarismu, například fašismu, komunismu či monarchismu, kde je nad svobodou jednotlivce nadřazena vládnoucí ideologie. To neznamená, že v liberálních státech neexistuje většinová ideologie, je však podřízena konsenzu. Od anarchismu se liberalismus odlišuje tím, že stát považuje za nutný k ochraně svobody. Liberalismus usiluje o maximální svobodu, a to jak osobní, tak i ekonomickou, náboženskou a politickou.",
                right: "Politická ideologie, jejíž charakteristikou je otevřená tendence bránit se změnám a podporovat tradiční normy. Těmi mohou v různých kontextech být: řád, autorita, tradice, vlast, rodina, náboženství, soukromé vlastnictví, hierarchizace společnosti a morálka. Podle některých teorií jsou protějškem konzervativců pokrokáři, rovnostáři a revolucionáři."
            },
            en: {
                left: "Liberalism is a political and moral philosophy based on the rights of the individual, liberty, consent of the governed, political equality, the right to private property, and equality before the law. Liberals espouse various and sometimes conflicting views depending on their understanding of these principles but generally support private property, market economies, individual rights (including civil rights and human rights), liberal democracy, secularism, rule of law, economic and political freedom, freedom of speech, freedom of the press, freedom of assembly, and freedom of religion. Liberalism is frequently cited as the dominant ideology of modern history.",
                right: "Conservatism is a cultural, social, and political philosophy and ideology that seeks to promote and preserve traditional institutions, customs, and values. The central tenets of conservatism may vary in relation to the culture and civilization in which it appears. In Western culture, depending on the particular nation, conservatives seek to promote and preserve a range of institutions, such as the nuclear family, organized religion, the military, the nation-state, property rights, rule of law, aristocracy, and monarchy."
            }
        }
    },
    identity: {
        left:  { cs: "Nacionalismus", en: "Nationalism" },
        right: { cs: "Kosmopolitismus", en: "Cosmopolitanism" },
        desc: {
            cs: {
                left: "Myšlenkové tendence, ideologie a politika zdůrazňující význam národa, tedy sounáležitost skupiny lidí, kteří obvykle sdílejí společný původ, historii, jazyk, kulturu a území. Z nacionalismu vychází myšlenka národních států, na které je do značné míry založeno dnešní uspořádání států světa. Z tohoto pojetí také vychází názvosloví používající pojmy národní a mezinárodní. Pod vlivem nacistického vypjatého nacionalismu se tento výraz začal používat také v negativním smyslu pro ideologii šovinismu, přesvědčení o výjimečnosti vlastního národa. Tento význam většinou nemívá odpovídající český výraz národovectví. Příbuzným pojmem je patriotismus, česky vlastenectví, který zdůrazňuje vlast, tedy rodiště či zemi rodičů.",
                right: "Politická ideologie, která prosazuje, aby všichni lidé patřili do jedné komunity na základě sdílené morálky. Tato ideologie je často spojována s koncepty globálního občanství a přesvědčením, že všichni jednotlivci mají povinnosti a zodpovědnosti vůči sobě navzájem, bez ohledu na jejich národnost, etnický původ nebo geografickou polohu. Kosmopolitismus podporuje myšlenku, že politické, kulturní a ekonomické hranice by neměly bránit vzájemnému respektu a porozumění mezi různými kulturami a společnostmi."
            },
            en: {
                left: "An idea or movement that holds that the nation should be congruent with the state. As a movement, it presupposes the existence and tends to promote the interests of a particular nation, especially with the aim of gaining and maintaining its sovereignty over its perceived homeland to create a nation-state. It holds that each nation should govern itself, free from outside interference, that a nation is a natural and ideal basis for a polity, and that the nation is the only rightful source of political power. It further aims to build and maintain a single national identity, based on a combination of shared social characteristics such as culture, ethnicity, geographic location, language, politics, religion, traditions and belief in a shared singular history, and to promote national unity or solidarity.",
                right: "The idea that all human beings are members of a single community. Its adherents are known as cosmopolitan or cosmopolite. Cosmopolitanism is both prescriptive and aspirational, believing humans can and should be \"world citizens\" in a \"universal community\". The idea encompasses different dimensions and avenues of community, such as promoting universal moral standards, establishing global political structures, or developing a platform for mutual cultural expression and tolerance."
            }
        }
    },
    social: {
        left:  { cs: "Individualismus", en: "Individualism" },
        right: { cs: "Kolektivismus", en: "Collectivism" },
        desc: {
            cs: {
                left: "Morální, politický nebo společenský názor a postoj, který na první místo klade jedince, jeho nezávislost a soběstačnost. Svobodu obvykle chápe jako co nejmenší omezování druhými a společností. Individualisté jsou přesvědčeni, že každý jednotlivec má právo prosazovat své individuální zájmy a cíle a starat se především sám o sebe.",
                right: "Označení pro postoje, postupy a ideologie, které vidí jednotlivého člověka především jako součást nějakého celku a jeho zájmy tedy zásadně podřizují zájmům tohoto celku. Ten může mít rozsah rodiny až velkých sociálních skupin typu národu nebo etnika."
            },
            en: {
                left: "The moral stance, political philosophy, ideology, and social outlook that emphasizes the intrinsic worth of the individual. Individualists promote realizing one's goals and desires, valuing independence and self-reliance, and advocating that the interests of the individual should gain precedence over the state or a social group, while opposing external interference upon one's own interests by society or institutions such as the government. Individualism makes the individual its focus, and so starts \"with the fundamental premise that the human individual is of primary importance in the struggle for liberation\"",
                right: "An ethics perspective, a cultural characteristic, philosophical position, and/or social and psychological outlook based on people being a group. It is often defined in contrast to individualism which centres individual above the collective group. In collectivism, the core unit is the collective group. Individuals are seen as fundamentally connected through relationships and through being a part of a group. In this context, groups are defined as networks of interpersonal relationships. The collectivist orientation emphasizes collective identity and collective agency, and values tend to prioritize the collective more than the individual."
            }
        }
    },
    foreign: {
        left:  { cs: "Izolacionismus", en: "Isolationism" },
        right: { cs: "Internacionalismus", en: "Internationalism" },
        desc: {
            cs: {
                left: "Politická doktrína upřednostňující domácí politiku před zahraniční. Obvykle kombinuje snahu minimálně se angažovat v zahraničí (odmítá vojenské a často i politické intervence ve věcech, které se přímo netýkají vlastního státu) a ekonomický protekcionismus.",
                right: "Politický směr, který prosazuje větší politickou nebo hospodářskou spolupráci mezi státy a národy. Je spojován s jinými politickými hnutími a ideologiemi, ale může také představovat doktrínu, systém názorů nebo hnutí samo o sobě. Zastánci internacionalismu se označují jako internacionalisté a obecně věří, že lidé by se měli sjednocovat napříč národními, politickými, kulturními, rasovými nebo třídními hranicemi, aby prosazovali své společné zájmy, nebo že vlády by měly spolupracovat, protože jejich společné dlouhodobé zájmy jsou důležitější než krátkodobé spory. Internacionalismus má několik výkladů a významů, ale obvykle se vyznačuje odporem k nacionalismu a izolacionismu, podporou mezinárodních institucí, jako je OSN, a kosmopolitním pohledem, který podporuje a respektuje odlišné kultury a zvyky."
            },
            en: {
                left: "A term used to refer to a political philosophy advocating a foreign policy that opposes involvement in the political affairs, and especially the wars, of other countries. Thus, isolationism fundamentally advocates neutrality and opposes entanglement in military alliances and mutual defense pacts. In its purest form, isolationism opposes all commitments to foreign countries, including treaties and trade agreements.\"Isolationism\" should be interpreted more broadly as \"a foreign policy grand strategy of military and political non-interference in international affairs and in the internal affairs of sovereign states, associated with trade and economic protectionism and cultural and religious isolation, as well as with the inability to be in permanent military alliances, with the preservation, however, some opportunities to participate in temporary military alliances that meet the current interests of the state and in permanent international organizations of a non-military nature.",
                right: "A political principle that advocates greater political or economic cooperation among states and nations. It is associated with other political movements and ideologies, but can also reflect a doctrine, belief system, or movement in itself. Supporters of internationalism are known as internationalists and generally believe that humans should unite across national, political, cultural, racial, or class boundaries to advance their common interests, or that governments should cooperate because their mutual long-term interests are of greater importance than their short-term disputes. Internationalism has several interpretations and meanings, but is usually characterized by opposition to ultranationalism and isolationism; support for international institutions such as the United Nations; and a cosmopolitan outlook that promotes and respects other cultures and customs."
            }
        }
    },
    ecology: {
        left:  { cs: "Environmentalismus", en: "Environmentalism" },
        right: { cs: "Anti-environmentalismus", en: "Anti-environmentalism" },
        desc: {
            cs: {
                left: "Politické a etické hnutí, které obhajuje zachování, obnovu a/nebo zlepšení přírodního prostředí, někdy je také zmiňován jako hnutí pro kontrolu znečištění či ochranu diverzity rostlin a živočichů. Environmentalismus usiluje o změnu společenských, politických a ekonomických mechanismů, které životní prostředí poškozují. Je to směr, který se zabývá ochranou a zachováním nepoškozeného životního prostředí.",
                right: "Politická ideologie, která se staví proti ochraně životního prostředí a zpochybňuje vědecký konsensus ohledně naléhavosti řešení změny klimatu. Tato ideologie často dává přednost ekonomickému růstu, průmyslovému rozvoji a osobním svobodám před ochranou životního prostředí. Anti-environmentalisté obvykle argumentují, že environmentální předpisy jsou zbytečné, příliš restriktivní nebo dokonce škodlivé pro ekonomickou prosperitu. Často zlehčují závažnost environmentálních problémů nebo popírají lidskou roli v klimatické změně."
            },
            en: {
                left: "A broad philosophy, ideology, and social movement about supporting life, habitats, and surroundings. Environmentalism advocates the preservation, restoration and improvement of the natural environment and critical earth system elements or processes such as the climate, and may be referred to as a movement to control pollution or protect plant and animal diversity. For this reason, concepts such as a land ethics, environmental ethics, biodiversity, ecology, and the biophilia hypothesis figure predominantly. The environmentalist movement encompasses various approaches to addressing environmental issues, including free market environmentalism, evangelical environmentalism, and the environmental conservation movement.",
                right: "A set of ideas and actions that oppose environmentalism as a whole or specific environmental policies or environmental initiatives. Criticism of environmentalism can come both from outside the movement and from within, as it represents a variety of ideas and political positions. Outside oppositions can take the form of an organized countermovement, aimed at both environmentalist ideas and environmental policies and regulations, national or international. Opponents may include workers in industries threatened by environmental policies, companies that support them, and anti-environmentalist think tanks."
            }
        }
    },
    hierarchy: {
        left:  { cs: "Populismus", en: "Populism" },
        right: { cs: "Elitismus", en: "Elitism" },
        desc: {
            cs: {
                left: "(Nikoli politický oportunismus) Politický přístup spočívající ve snaze oslovit běžného člověka, který se domnívá, že vládnoucí skupiny nehájí či přehlíží jeho zájmy. Populismus využívá dva základní termíny – lid a elitu. Pomocí těchto označení dělí společnost na dvě stejnorodé části. Lid je charakterizován jako zcela dobrý a politika by měla být vyjádřením jeho obecné vůle. Elita je naopak inherentně zlá a zkorumpovaná. Elita sleduje jen své vlastní zájmy, nenaslouchá lidu a naopak jej připravuje o jeho práva. Pojem lid má v sobě zahrnovat obyčejné lidi, elita na druhou stranu představuje dosud vládnoucí vrstvu. Tu se populisté snaží zdiskreditovat, svrhnout a nastoupit na její místo, ale podle svého názoru v lepší podobě a na rozdíl od elity naslouchajíce lidu a jeho vůli. Přestože lid i elita mají stejné zájmy a hodnoty, liší se ve svých morálních zásadách. Lid i elita tak stojí proti sobě.",
                right: "Názor, který považuje některé skupiny lidí za elity. Díky jejich schopnostem, bohatství, speciálnímu tréninku nebo dalším vlastnostem je upřednostňuje před ostatními, což může být diskriminace. Také říká, že by jejich názor měl být brán vážněji a mají lepší schopnost vládnout. Elitismus může také nést méně racionální a arogantní smysl pro ty, jež touží po majetku, lepším společenském postavení, uznání apod. Díky častému používání negativního významu, byl vytěsněn původní a zbyl pouze pejorativní význam přehlížení „neelitních“, obyčejných lidí a arogance. V politickém a společenském smyslu jsou elity viděny jako osoby zastávající zvláštní autoritativní pozice či privilegia, vzdálená od většiny lidí, kteří nedosahují jimi definovaných kvalit."
            },
            en: {
                left: "(Not political opportunism) A political approach consisting of efforts to appeal to the common person who believes that the ruling groups do not defend or overlook their interests. Populism employs two core terms – the people and the elite. Using these labels, it divides society into two homogeneous parts. The people are portrayed as entirely good, and politics should be the expression of their general will. The elite, on the other hand, are inherently evil and corrupt. The elite pursue only their own interests, do not listen to the people, and instead deprive them of their rights. The notion of the people is meant to include ordinary citizens, while the elite represents the currently ruling stratum. Populists seek to discredit, overthrow, and replace this stratum, but in their view, in a better form and – unlike the elite – by listening to the people and their will. Although the people and the elite share the same interests and values, they differ in their moral principles. Thus, the people and the elite stand in opposition to each other.",
                right: "The notion that individuals who form an elite—a select group with desirable qualities such as intellect, wealth, power, fame, physical attractiveness, notability, special skills, experience, lineage—are more likely to be constructive to society and deserve greater influence or authority. The term elitism may be used to describe a situation in which power is concentrated in the hands of a limited number of people."
            }
        }
    },
    religion: {
        left:  { cs: "Sekularismus", en: "Secularism" },
        right: { cs: "Klerikalismus", en: "Clericalism" },
        desc: {
            cs: {
                left: "Zásada, že státní moc, státní instituce a stát sám mají být nezávislé na náboženství a náboženském uvažování. Sekularismus se významně uplatnil především v mnoha zemích Západu, kde v současnosti převládá, i když se jeho přesný obsah v jednotlivých zemích liší a stále se vyvíjí. Praktikuje se však i v mnoha státech Asie a Afriky. Prakticky politický sekularismus znamená oddělení vládních institucí a osob pověřených zastupováním státu od náboženských institucí a náboženských hodnostářů a souvisí zejména s rozvojem konceptu sekulárních, tj. nábožensky neutrálních států.",
                right: "Politický směr, jehož motivací je reprezentace církevních názorů a jejich prosazování ve státní politice, nebo směr upřednostňující v rámci církve duchovní na úkor laiků. Jako klerikální se označují strany, které jsou přímo napojeny na hierarchii některé církve, jíž podřizují svou politiku, a u nichž se ve vysokých stranických funkcích vyskytují kazatelé a kněží."
            },
            en: {
                left: "The principle of seeking to conduct human affairs based on naturalistic considerations, uninvolved with religion. It is most commonly thought of as the separation of religion from civil affairs and the state and may be broadened to a similar position seeking to remove or to minimize the role of religion in any public sphere. Secularism may encapsulate anti-clericalism, atheism, naturalism, non-sectarianism, neutrality on topics of religion, or antireligion. Secularism is not necessarily antithetical to religion, but may be compatible with it. As a philosophy, secularism seeks to interpret life based on principles derived solely from the material world, without recourse to religion. It shifts the focus from religion towards \"temporal\" and material concerns.",
                right: "A political approach motivated by the representation of church views and their promotion within state policy, or a current that prioritises clergy over lay members within the church. Parties described as clerical are those directly connected to the hierarchy of a particular church, subordinating their politics to it, and in which preachers and priests occupy high party offices."
            }
        }
    },
    change: {
        left:  { cs: "Reformismus", en: "Reformism" },
        right: { cs: "Revolucionismus", en: "Revolutionism" },
        desc: {
            cs: {
                left: "Obecný termín označující politický směr nebo postoj usilující o dosažení spravedlivé společnosti prostřednictvím postupných reforem, nikoli revolucí. Nejčastěji se používá v kontextu dělnického hnutí, kde odmítá revoluční třídní boj a prosazuje spolupráci tříd s cílem přeměnit kapitalismus na společnost blahobytu.",
                right: "Politický směr nebo postoj, který prosazuje zásadní a rychlou proměnu společenského, hospodářského či politického řádu, obvykle prostřednictvím revoluce. Revolucionismus předpokládá, že současný systém je natolik nespravedlivý či neudržitelný, že jej nelze opravit, ale je třeba jej nahradit novým. Revolucionismus může být spojen jak s násilnými, tak s nenásilnými prostředky, avšak vždy klade důraz na zásadní přetvoření společnosti."
            },
            en: {
                left: "A political tendency advocating the reform of an existing system or institution – often a political or religious establishment – as opposed to its abolition and replacement via revolution.",
                right: "A political orientation or stance that advocates for fundamental and rapid transformation of the social, economic, or political order, usually through revolution. Revolutionism assumes that the current system is so unjust or unsustainable that it cannot be repaired and must instead be replaced with a new one. Revolutionism can involve both violent and non-violent means, but always stresses the necessity of profound societal change."
            }
        }
    },
    politic: {
        left:  { cs: "Pragmatismus", en: "Pragmatism" },
        right: { cs: "Idealismus", en: "Idealism" },
        desc: {
            cs: {
                left: "Politický směr či postoj, který klade důraz na praktickou účinnost a dosažitelnost řešení před ideologickou čistotou nebo věrností principům. Pragmatismus upřednostňuje kompromis, empiricky ověřené výsledky a postupné kroky, které přinášejí konkrétní zlepšení, i když neodpovídají dokonalé vizi.",
                right: "Politický směr či postoj, který staví do popředí hodnoty, principy a morální ideály, i když jejich prosazení může být složité nebo krátkodobě nepraktické. Idealismus zdůrazňuje, že politika má směřovat k naplnění vyšších cílů, jako je spravedlnost, lidská práva či etické normy, i za cenu obětování kompromisů nebo okamžité efektivity."
            },
            en: {
                left: "A political approach or stance that emphasizes practical effectiveness and feasibility of solutions over ideological purity or strict adherence to principles. Pragmatism favors compromise, empirically tested outcomes, and incremental steps that bring tangible improvements, even if they fall short of an ideal vision.",
                right: "A political approach or stance that prioritizes values, principles, and moral ideals, even when their implementation may be difficult or temporarily impractical. Idealism stresses that politics should aim at fulfilling higher goals such as justice, human rights, or ethical standards, even at the cost of compromising short-term effectiveness or pragmatism."
            }
        }
    },
    source: {
        left:  { cs: "Centralismus", en: "Centralism" },
        right: { cs: "Lokalismus", en: "Localism" },
        desc: {
            cs: {
                left: "Politický směr nebo postoj, který zdůrazňuje soustředění rozhodovacích pravomocí a správy na ústřední (národní) úrovni, aby se zajistila jednotnost, rovnost standardů a koordinace napříč celým státem.",
                right: "Politický směr nebo postoj, který upřednostňuje přenesení rozhodovacích pravomocí a odpovědnosti na místní nebo regionální úroveň, aby se politika mohla přizpůsobit specifickým potřebám a identitám jednotlivých komunit."
            },
            en: {
                left: "A political approach or stance that emphasizes the concentration of decision-making powers and governance at the central (national) level in order to ensure uniformity, equal standards, and coordination across the entire state.",
                right: "A political approach or stance that favors devolving decision-making powers and responsibilities to local or regional levels, allowing policies to be tailored to the specific needs and identities of individual communities."
            }
        }
    }
};

const AXIS_ORDER = [
    "economic", "authority", "cultural", "identity",
    "social", "foreign", "ecology", "hierarchy",
    "religion", "change", "politic", "source"
];

/***********************
 *  12-AXIS TEST
 ***********************/
let testState = {
    questions: [],
    order: [],
    answers: [],
    current: 0
};

if (byId("startBtn")) {
    // Načtení otázek
    fetch("questions.json")
        .then(r => r.json())
        .then(data => initTest(data));

    byId("resetBtn").addEventListener("click", () => {
        localStorage.removeItem(LS_KEYS.PROGRESS);
        localStorage.removeItem(LS_KEYS.ORDER);
        byId("questionText").textContent = t("progress_cleared", "Postup byl smazán. Klikněte na „Začít test“.");
        byId("answers").style.display = "none";
        byId("startBtn").style.display = "inline-block";
    });
}

if (byId("resetBtn")) {
    byId("resetBtn").onclick = () => {
        // smaž uložené položky
        localStorage.removeItem(LS_KEYS.PROGRESS);
        localStorage.removeItem(LS_KEYS.ORDER);
        localStorage.removeItem(LS_KEYS.RESULTS);

        // pokud máme otázky načtené, znovu inicializuj pořadí a resetuj stav
        if (testState.questions && testState.questions.length) {
            initTest(testState.questions); // to vytvoří nový order a nastaví testState správně
        } else {
            // nic načteno -> jen reset UI
            testState.order = [];
            testState.answers = [];
            testState.current = 0;
        }

        // UI reset
        if (byId("questionText")) byId("questionText").textContent = t("progress_cleared", "Postup byl smazán. Klikněte na „Začít test“.");
        if (byId("answers")) byId("answers").style.display = "none";
        if (byId("progress")) byId("progress").textContent = "";
        if (byId("startBtn")) byId("startBtn").style.display = "inline-block";
    };
}



function initTest(allQuestions){
    testState.questions = allQuestions;

    // obnova pořadí a odpovědí
    const savedOrder = JSON.parse(localStorage.getItem(LS_KEYS.ORDER));
    const savedAns = JSON.parse(localStorage.getItem(LS_KEYS.PROGRESS));

    if (savedOrder && Array.isArray(savedOrder) && savedOrder.length === allQuestions.length) {
        testState.order = savedOrder;
    } else {
        testState.order = [...allQuestions.keys()];
        testState.order = shuffle(testState.order);
        localStorage.setItem(LS_KEYS.ORDER, JSON.stringify(testState.order));
    }

    testState.answers = Array.isArray(savedAns) ? savedAns : [];
    testState.current = testState.answers.length;

    byId("startBtn").addEventListener("click", () => {
        byId("startBtn").style.display = "none";
        byId("answers").style.display = "flex";
        showQuestion();
    });

    // Pokud už odpovídáno, rovnou ukážeme tlačítka a otázku
    if (testState.current > 0 && testState.current < testState.order.length) {
        byId("startBtn").style.display = "none";
        byId("answers").style.display = "flex";
        showQuestion();
    }

    if (testState.current === 0 && byId("questionText")) {
        byId("questionText").textContent = t("click_to_start", "Klikněte na „Začít test“");
    }
}

function showQuestion() {
    if (testState.current < testState.order.length) {
        const qIdx = testState.order[testState.current];
        const q = testState.questions[qIdx];
        byId("questionText").textContent = q.text[currentLang] || q.text["cs"];
        byId("progress").textContent =
            (currentLang === "cs"
                ? `Otázka ${testState.current+1} z ${testState.order.length}`
                : `Question ${testState.current+1} of ${testState.order.length}`);

        const answersDiv = byId("answers");
        answersDiv.innerHTML = "";

        const options = [
            { val:  3, i18n: "agree_strongest",  cls: "btn-strong-yes" },
            { val:  2, i18n: "agree_strong",     cls: "btn-yes" },
            { val:  1, i18n: "agree_mild",       cls: "btn-weak-yes" },
            { val:  0, i18n: "neutral",          cls: "btn-neutral" },
            { val: -1, i18n: "disagree_mild",    cls: "btn-weak-no" },
            { val: -2, i18n: "disagree",         cls: "btn-no" },
            { val: -3, i18n: "disagree_strongest", cls: "btn-strong-no" }
        ];

        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = `btn full-width ${opt.cls}`;
            btn.setAttribute("data-i18n", opt.i18n);
            btn.onclick = () => answer(opt.val);
            answersDiv.appendChild(btn);
        });

        // Přidáme tlačítko zpět (jen pokud nejsme na první otázce)
        if (testState.current > 0) {
            const backBtn = document.createElement("button");
            backBtn.className = "btn back";
            backBtn.textContent = currentLang === "cs" ? "← Zpět" : "← Back";
            backBtn.onclick = () => goBack();
            answersDiv.appendChild(backBtn);
        }

        applyLang(); // znovu přeložit tlačítka
    } else {
        finishQuiz();
    }
}

function goBack() {
    if (testState.current > 0) {
        testState.current--;
        testState.answers.splice(testState.current, 1); // smažeme poslední odpověď
        localStorage.setItem(LS_KEYS.PROGRESS, JSON.stringify(testState.answers));
        showQuestion();
    }
}

function answer(val) {
    testState.answers[testState.current] = val;
    localStorage.setItem(LS_KEYS.PROGRESS, JSON.stringify(testState.answers));
    testState.current++;
    showQuestion();
}

function finishQuiz(){
    // spočti skóre na osách
    const scores = {};
    for (let i = 0; i < testState.answers.length; i++){
        const qIdx = testState.order[i];
        const q = testState.questions[qIdx];
        const a = testState.answers[i] ?? 0;
        for (const axis in q.effect){
            if (!scores[axis]) scores[axis] = 0;
            scores[axis] += q.effect[axis] * a; // effect je směr (+1/-1), a je -2..2
        }
    }


    // ulož výsledky a přesměruj
    localStorage.setItem(LS_KEYS.RESULTS, JSON.stringify(scores));
    // po dokončení můžeme smazat průběh (necháme ale pořadí pro případ zobrazení)
    localStorage.removeItem(LS_KEYS.PROGRESS);
    localStorage.removeItem(LS_KEYS.ORDER);

    window.location.href = "results.html";
}

function renderResults() {
    let scores = {};
    try {
        scores = JSON.parse(localStorage.getItem(LS_KEYS.RESULTS)) || {};
    } catch(e) {
        scores = {};
    }

    const lang = localStorage.getItem("lang") || "cs";

    const container = byId("bars");
    if (!container) return;

    // uložíme stav otevřených menu podle indexu
    const openStates = {};
    container.querySelectorAll("details").forEach((det, i) => {
        if (det.open) openStates[i] = true;
    });

    container.innerHTML = "";

    if (scores && Object.keys(scores).length) {
        AXIS_ORDER.forEach((axis, index) => {
            const val = scores[axis] || 0;
            const percent = Math.round((val / 96) * 100);

            const wrapper = document.createElement("div");

            const axisDef = AXIS_LABELS[axis];
            const label = document.createElement("div");
            label.className = "axis-label";        // ← PŘIDÁNO
            label.innerHTML = `
                <span>${axisDef.left[lang]}</span>
                <span>${axisDef.right[lang]}</span>
                `;

            label.innerHTML = `
                <span>${axisDef.left[lang]}</span>
                <span>${axisDef.right[lang]}</span>
            `;

            const bar = document.createElement("div");
            bar.className = "axis-bar";            // ← PŘIDÁNO

            const baseline = document.createElement("div");
            baseline.className = "midline";        // ← PŘIDÁNO

            const fill = document.createElement("div");
            fill.className = "fill";               // ← PŘIDÁNO
            fill.style.width = Math.abs(percent) + "%";
            fill.style.left = percent >= 0 ? "50%" : (50 - Math.abs(percent)) + "%";

            bar.appendChild(fill);
            bar.appendChild(baseline);
            wrapper.appendChild(label);
            wrapper.appendChild(bar);

            if (axisDef && axisDef.desc) {
                const details = document.createElement("details");
                const summary = document.createElement("summary");
                summary.textContent = lang === "cs" ? "Zobrazit popis" : "Show description";
                details.appendChild(summary);

                const shell = document.createElement("div");
                shell.className = "collapsible";     // ← PŘIDÁNO

                const inner = document.createElement("div");
                inner.innerHTML = `
                    <div style="margin-bottom:8px;">
                    <b>${axisDef.left[lang]}:</b><br>
                    ${axisDef.desc[lang].left}
                    </div>
                    <div>
                        <b>${axisDef.right[lang]}:</b><br>
                        ${axisDef.desc[lang].right}
                    </div>
                    `;
                shell.appendChild(inner);
                details.appendChild(shell);

                if (openStates[index]) details.open = true;
                wrapper.appendChild(details);
            }

            container.appendChild(wrapper);
        });
    } else {
        const container = byId("bars");
        if (container) {
            container.innerHTML = `<div class="notice">${t("results_not","Zatím nemáte uložené výsledky. <a href='test.html'>Vyplnit test</a>.")}</div>`;
        }
    }
}


/***********************
 *  RESULTS PAGE – BARY
 **********************/
if (byId("bars")) {
    renderResults();
}

document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById("clearAll");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            localStorage.removeItem(LS_KEYS.RESULTS);
            localStorage.removeItem(LS_KEYS.PROGRESS);
            localStorage.removeItem(LS_KEYS.ORDER);

            const bars = document.getElementById("bars");
            if (bars) {
                bars.innerHTML = `<div class="notice">${t("results_cleared",
                    "Výsledky byly smazány. <a href='test.html'>Znovu vyplnit test</a>.")}</div>`;
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const currentURL = window.location.href.toLowerCase();

    document.querySelectorAll("nav .navlinks a[href]").forEach(a => {
        const link = a.getAttribute("href").toLowerCase();
        if (currentURL.includes(link)) {
            a.classList.add("active");
        } else {
            a.classList.remove("active");
        }
    });
});