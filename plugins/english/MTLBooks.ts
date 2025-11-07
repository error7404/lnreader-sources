import { CheerioAPI, load as parseHTML } from 'cheerio';
import { fetchApi } from '@libs/fetch';
import { Plugin } from '@/types/plugin';
import { Filters, FilterTypes } from '@libs/filterInputs';
import { NovelStatus } from '@libs/novelStatus';

class MTLBooks implements Plugin.PluginBase {
  id = 'mtlbooks';
  name = 'MTL Books';
  site = 'https://mtlbooks.com/';
  apiUrl = 'https://alpha.mtlbooks.com/api/v1/';
  cdnUrl = 'https://cdn.mtlbooks.com/poster/';
  icon = 'src/en/mtlbooks/icon.png';
  version = '1.0.0';

  async safeFetch(
    url: string,
    init: any | undefined = undefined,
  ): Promise<string> {
    const r = await fetchApi(url, init);
    if (!r.ok) throw new Error('Could not reach site (' + r.status + ')');
    const body = await r.text();

    return body;
  }

  async parseNovels(json: Result): Promise<Plugin.SourceNovel[]> {
    const novels: Plugin.SourceNovel[] = [];

    json.data.forEach((novel: Novel) => {
      const novelCover = this.cdnUrl + novel.thumbnail;
      const novelName = novel.name;
      const novelUrl = 'novel/' + novel.slug;
      const novelSummary = novel.description;

      novels.push({
        name: novelName,
        cover: novelCover,
        path: novelUrl,
        summary: novelSummary,
      });
    });

    return novels;
  }

  async popularNovels(
    page: number,
    { showLatestNovels, filters }: Plugin.PopularNovelsOptions,
  ): Promise<Plugin.NovelItem[]> {
    const url = new URL(this.apiUrl + 'search/' + page);
    url.searchParams.append('page', page.toString());

    for (const key in filters) {
      if (Array.isArray(filters[key].value)) {
        if (filters[key].value.length === 0) continue;
        url.searchParams.append(key, filters[key].value.toString());
      } else if (filters[key].value && filters[key].value !== '') {
        url.searchParams.append(key, filters[key].value as string);
      }
    }

    if (showLatestNovels) url.searchParams.set('order', 'recent');

    url.searchParams.append('source', 'all');

    try {
      const json = JSON.parse(
        await this.safeFetch(url.toString()),
      ) as ApiResponse;
      return this.parseNovels(json.result as Result);
    } catch (error) {
      return [];
    }
  }

  async searchNovels(
    searchTerm: string,
    page: number,
  ): Promise<Plugin.NovelItem[]> {
    const url = new URL(this.apiUrl + 'search/' + page);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('q', searchTerm);
    url.searchParams.append('source', 'all');
    const json = JSON.parse(
      await this.safeFetch(url.toString()),
    ) as ApiResponse;

    return this.parseNovels(json.result as Result);
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const response = JSON.parse(
      await this.safeFetch(
        this.apiUrl + novelPath.replace('novel/', 'novels/'),
      ),
    ) as ApiResponse;

    const novelInfo = response.result as Novel;

    const novelCover = this.cdnUrl + novelInfo.thumbnail;
    const novelName = novelInfo.name;
    const novelUrl = novelPath;
    const novelSummary = novelInfo.description;
    // const novelAuthor = novelInfo.author_id; // does not work on the website
    let novelStatus;
    switch (novelInfo.status) {
      case 'Ongoing':
        novelStatus = NovelStatus.Ongoing;
        break;
      case 'Completed':
        novelStatus = NovelStatus.Completed;
        break;
      case 'Hiatus':
        novelStatus = NovelStatus.OnHiatus;
        break;
      default:
        novelStatus = NovelStatus.Unknown;
        break;
    }

    const novel: Plugin.SourceNovel = {
      path: novelPath,
      name: novelName,
      cover: novelCover,
      status: novelStatus,
      summary: novelSummary,
    };

    let page = 1;
    const chapters: Plugin.ChapterItem[] = [];

    while (true) {
      const data = {
        'novel_slug': novelPath.replace('novel/', ''),
        'page': page,
        'order': 'ASC',
      };

      try {
        const chapterResponse = await this.safeFetch(
          this.apiUrl + 'chapters/list/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );

        const response = JSON.parse(chapterResponse) as ApiResponse;
        const chapterInfo = response.result as ChaptersResult;

        if (!chapterInfo.chapter_lists.length) {
          break; // Exit loop if no chapters are returned
        }

        for (const chapter of chapterInfo.chapter_lists) {
          const chapterName = chapter.chapter_title;
          const chapterUrl = novelPath + '/' + chapter.chapter_slug;
          const chapterNumber = chapter.chapter_number;

          const chapterItem: Plugin.ChapterItem = {
            name: chapterName,
            path: chapterUrl,
            chapterNumber: chapterNumber,
          };
          chapters.push(chapterItem);
        }

        page++;
      } catch (error) {
        break; // Exit loop if an error occurs
      }
    }
    novel.chapters = chapters;

    return novel;
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const parts = chapterPath.split('/');
    const novelSlug = parts[parts.length - 2];
    const chapterSlug = parts[parts.length - 1];

    const response = JSON.parse(
      await this.safeFetch(this.apiUrl + 'chapters/read/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'novel_slug': novelSlug,
          'chapter_slug': chapterSlug,
        }),
      }),
    );

    const chapterInfo = response.result as ChapterResult;

    return chapterInfo.chapter.content.replace(/\n ?/g, '<br>');
  }

  tags = [
    { label: 'Ability Steal', value: 'Ability Steal' },
    { label: 'AbilitySteal', value: 'AbilitySteal' },
    { label: 'Action', value: 'Action' },
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Alchemy', value: 'Alchemy' },
    { label: 'Aliens', value: 'Aliens' },
    { label: 'Alternate World', value: 'Alternate World' },
    { label: 'American Comics', value: 'American Comics' },
    { label: 'Amnesia', value: 'Amnesia' },
    { label: 'Ancient China', value: 'Ancient China' },
    { label: 'Ancient Times', value: 'Ancient Times' },
    { label: 'Angels', value: 'Angels' },
    { label: 'Antihero', value: 'Antihero' },
    { label: 'Antihero Protagonist', value: 'Antihero Protagonist' },
    { label: 'Apocalypse', value: 'Apocalypse' },
    { label: 'Appearance Changes', value: 'Appearance Changes' },
    {
      label: 'Appearance Different from Actual Age',
      value: 'Appearance Different from Actual Age',
    },
    { label: 'Artifact Crafting', value: 'Artifact Crafting' },
    { label: 'Artifacts', value: 'Artifacts' },
    { label: 'Aristocracy', value: 'Aristocracy' },
    { label: 'Arranged Marriage', value: 'Arranged Marriage' },
    { label: 'Army', value: 'Army' },
    { label: 'Army Building', value: 'Army Building' },
    {
      label: 'Average-looking Protagonist',
      value: 'Average-looking Protagonist',
    },
    { label: 'Based on a Movie', value: 'Based on a Movie' },
    { label: 'Based on a Video Game', value: 'Based on a Video Game' },
    { label: 'Based on an Anime', value: 'Based on an Anime' },
    { label: 'Battle Academy', value: 'Battle Academy' },
    { label: 'Battle Competition', value: 'Battle Competition' },
    { label: 'Beast Companions', value: 'Beast Companions' },
    { label: 'Beast Tamer', value: 'Beast Tamer' },
    { label: 'BeastTamer', value: 'Beasttaming' },
    { label: 'Beautiful Female Lead', value: 'Beautiful Female Lead' },
    { label: 'BeautifulFemaleLead', value: 'BeautifulFemaleLead' },
    { label: 'Betrayal', value: 'Betrayal' },
    { label: 'Black Belly', value: 'Black Belly' },
    { label: 'Black Clover', value: 'Black Clover' },
    { label: 'Bleach', value: 'Bleach' },
    { label: 'Bloodlines', value: 'Bloodlines' },
    {
      label: 'Boss-Subordinate Relationship',
      value: 'Boss-Subordinate Relationship',
    },
    { label: 'Broken Engagement', value: 'Broken Engagement' },
    { label: 'Business Management', value: 'Business Management' },
    { label: 'Businessmen', value: 'Businessmen' },
    { label: 'Buddhism', value: 'Buddhism' },
    { label: 'Calm Protagonist', value: 'Calm Protagonist' },
    { label: 'CalmProtagonist', value: 'CalmProtagonist' },
    { label: 'Carefree Protagonist', value: 'Carefree Protagonist' },
    { label: 'Caring Protagonist', value: 'Caring Protagonist' },
    { label: 'Card Games', value: 'Card Games' },
    { label: 'Charismatic Protagonist', value: 'Charismatic Protagonist' },
    { label: 'Chat Group', value: 'Chat Group' },
    { label: 'Chat Rooms', value: 'Chat Rooms' },
    { label: 'ChatGroup', value: 'ChatGroup' },
    { label: 'Cheats', value: 'Cheats' },
    { label: 'Child Protagonist', value: 'Child Protagonist' },
    { label: 'Childcare', value: 'Childcare' },
    { label: 'Childhood Friends', value: 'Childhood Friends' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Chinese Ancient Kingdom', value: 'Chinese Ancient Kingdom' },
    { label: 'Chinese Prehistoric', value: 'Chinese Prehistoric' },
    { label: 'Choice Selection', value: 'Choice Selection' },
    { label: 'ChoiceSelection', value: 'ChoiceSelection' },
    { label: 'City Building', value: 'City Building' },
    { label: 'Clan Building', value: 'Clan Building' },
    { label: 'Clan/Sect Development', value: 'Clan/Sect Development' },
    { label: 'Clever Protagonist', value: 'Clever Protagonist' },
    { label: 'CleverProtagonist', value: 'CleverProtagonist' },
    { label: 'Clingy Lover', value: 'Clingy Lover' },
    { label: 'Clones', value: 'Clones' },
    { label: 'College/University', value: 'College/University' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Comedic Undertone', value: 'Comedic Undertone' },
    {
      label: 'Complex Family Relationships',
      value: 'Complex Family Relationships',
    },
    { label: 'Conferred God', value: 'Conferred God' },
    { label: 'Cooking', value: 'Cooking' },
    { label: 'Cosmic Wars', value: 'Cosmic Wars' },
    { label: 'Crime', value: 'Crime' },
    { label: 'Cruel Characters', value: 'Cruel Characters' },
    { label: 'Cute Children', value: 'Cute Children' },
    { label: 'Cute Protagonist', value: 'Cute Protagonist' },
    { label: 'Cunning Protagonist', value: 'Cunning Protagonist' },
    { label: 'CunningProtagonist', value: 'CunningProtagonist' },
    { label: 'Dao Comprehension', value: 'Dao Comprehension' },
    { label: 'Daoism', value: 'Daoism' },
    { label: 'DC', value: 'DC' },
    { label: 'Death', value: 'Death' },
    { label: 'Death of Loved Ones', value: 'Death of Loved Ones' },
    { label: 'Dense Protagonist', value: 'Dense Protagonist' },
    { label: 'Depictions of Cruelty', value: 'Depictions of Cruelty' },
    { label: 'Detective Conan', value: 'Detective Conan' },
    { label: 'DetectiveConan', value: 'DetectiveConan' },
    { label: 'Detectives', value: 'Detectives' },
    { label: 'Determined Protagonist', value: 'Determined Protagonist' },
    { label: 'Devoted Love Interests', value: 'Devoted Love Interests' },
    { label: 'DevotedLoveInterests', value: 'DevotedLoveInterests' },
    { label: 'Discrimination', value: 'Discrimination' },
    { label: 'Doctors', value: 'Doctors' },
    { label: 'Douluo Dalu', value: 'Douluo Dalu' },
    { label: 'Douluo Dalu Fanfiction', value: 'Douluo Dalu Fanfiction' },
    { label: 'DouluoDalu', value: 'DouluoDalu' },
    { label: 'Dragon Ball', value: 'Dragon Ball' },
    { label: 'Dragonball', value: 'Dragonball' },
    { label: 'Dragons', value: 'Dragons' },
    {
      label: 'Demonic Cultivation Technique',
      value: 'Demonic Cultivation Technique',
    },
    { label: 'Demon Lord', value: 'Demon Lord' },
    { label: 'Demon Slayer', value: 'Demon Slayer' },
    { label: 'DemonSlayer', value: 'DemonSlayer' },
    { label: 'Demons', value: 'Demons' },
    { label: 'Detective Conan', value: 'Detective Conan' },
    { label: 'DetectiveConan', value: 'DetectiveConan' },
    { label: 'Dimensional Travel', value: 'Dimensional Travel' },
    { label: 'Disciple Training', value: 'Disciple Training' },
    { label: 'Doting Love Interests', value: 'Doting Love Interests' },
    { label: 'Doting Older Siblings', value: 'Doting Older Siblings' },
    { label: 'DotingLoveInterests', value: 'DotingLoveInterests' },
    { label: 'Dungeons', value: 'Dungeons' },
    { label: 'Eidetic Memory', value: 'Eidetic Memory' },
    { label: 'Elemental Magic', value: 'Elemental Magic' },
    { label: 'Elves', value: 'Elves' },
    { label: 'Enemies Become Allies', value: 'Enemies Become Allies' },
    { label: 'Enemies Become Lovers', value: 'Enemies Become Lovers' },
    { label: 'Empire', value: 'Empire' },
    { label: 'Empires', value: 'Empires' },
    {
      label: 'Emotionally Weak Protagonist',
      value: 'Emotionally Weak Protagonist',
    },
    { label: 'Evil Gods', value: 'Evil Gods' },
    { label: 'Evil Organizations', value: 'Evil Organizations' },
    { label: 'Evil Protagonist', value: 'Evil Protagonist' },
    { label: 'Evil Religions', value: 'Evil Religions' },
    { label: 'Evolution', value: 'Evolution' },
    { label: 'Eye Powers', value: 'Eye Powers' },
    { label: 'Fairy Tail', value: 'Fairy Tail' },
    { label: 'Fairytail', value: 'Fairytail' },
    { label: 'Faloo', value: 'Faloo' },
    { label: 'Familial Love', value: 'Familial Love' },
    { label: 'Family', value: 'Family' },
    { label: 'Family Business', value: 'Family Business' },
    { label: 'Family Conflict', value: 'Family Conflict' },
    { label: 'Fan-fiction', value: 'Fan-fiction' },
    { label: 'Fanfiction', value: 'Fanfiction' },
    { label: 'Fantasy', value: 'Fantasy' },
    { label: 'Fantasy Creatures', value: 'Fantasy Creatures' },
    { label: 'Fantasy World', value: 'Fantasy World' },
    { label: 'Fast Cultivation', value: 'Fast Cultivation' },
    { label: 'Fast Learner', value: 'Fast Learner' },
    { label: 'Fated Lovers', value: 'Fated Lovers' },
    { label: 'Fellatio', value: 'Fellatio' },
    { label: 'Female Protagonist', value: 'Female Protagonist' },
    { label: 'FemaleProtagonist', value: 'FemaleProtagonist' },
    { label: 'Famous Protagonist', value: 'Famous Protagonist' },
    { label: 'Fanqienovel', value: 'Fanqienovel' },
    { label: 'Faceslapping', value: 'Faceslapping' },
    { label: 'Fate/Stay Night', value: 'Fate/Stay Night' },
    { label: 'Firearms', value: 'Firearms' },
    { label: 'First-time Intercourse', value: 'First-time Intercourse' },
    { label: 'Food Wars!', value: 'Food Wars!' },
    { label: 'FoodWars!', value: 'FoodWars!' },
    { label: 'Futuristic Setting', value: 'Futuristic Setting' },
    { label: 'Game Elements', value: 'Game Elements' },
    { label: 'Game Ranking System', value: 'Game Ranking System' },
    { label: 'Gamers', value: 'Gamers' },
    { label: 'Gate to Another World', value: 'Gate to Another World' },
    { label: 'Gangs', value: 'Gangs' },
    { label: 'Genius', value: 'Genius' },
    { label: 'Genius Protagonist', value: 'Genius Protagonist' },
    { label: 'Gene Modification', value: 'Gene Modification' },
    { label: 'GeneModification', value: 'GeneModification' },
    { label: 'Ghosts', value: 'Ghosts' },
    { label: 'Gore', value: 'Gore' },
    { label: 'God Protagonist', value: 'God Protagonist' },
    { label: 'God Ability', value: 'God Ability' },
    { label: 'Gods', value: 'Gods' },
    { label: 'Guilds', value: 'Guilds' },
    { label: 'Hackers', value: 'Hackers' },
    { label: 'Handsome Male Lead', value: 'Handsome Male Lead' },
    { label: 'HandsomeMaleLead', value: 'HandsomeMaleLead' },
    { label: 'Harry Potter', value: 'Harry Potter' },
    { label: 'HarryPotter', value: 'HarryPotter' },
    { label: 'Harem', value: 'Harem' },
    { label: 'Harem-seeking Protagonist', value: 'Harem-seeking Protagonist' },
    { label: 'Hard-Working Protagonist', value: 'Hard-Working Protagonist' },
    { label: 'Heartwarming', value: 'Heartwarming' },
    { label: 'Heavenly Tribulation', value: 'Heavenly Tribulation' },
    { label: 'Hidden Abilities', value: 'Hidden Abilities' },
    { label: 'Hiding True Abilities', value: 'Hiding True Abilities' },
    { label: 'Hiding True Identity', value: 'Hiding True Identity' },
    { label: 'Historical', value: 'Historical' },
    { label: 'Historical Setting', value: 'Historical Setting' },
    { label: 'Hot-blooded Protagonist', value: 'Hot-blooded Protagonist' },
    { label: 'Honkai Impact', value: 'Honkai Impact' },
    { label: 'Hunters', value: 'Hunters' },
    { label: 'Hunter x Hunter', value: 'Hunter x Hunter' },
    { label: 'HunterXHunter', value: 'HunterXHunter' },
    { label: 'Isekai', value: 'Isekai' },
    { label: 'Immortals', value: 'Immortals' },
    { label: 'Imperial Harem', value: 'Imperial Harem' },
    { label: 'Improved Translation', value: 'Improved Translation' },
    { label: 'Industrialization', value: 'Industrialization' },
    { label: 'Inheritance', value: 'Inheritance' },
    { label: 'Inner Voice', value: 'Inner Voice' },
    { label: 'Interdimensional Travel', value: 'Interdimensional Travel' },
    { label: 'Jack of All Trades', value: 'Jack of All Trades' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Journey to the West', value: 'Journey to the West' },
    { label: 'Josei', value: 'Josei' },
    { label: 'Jujutsu Kaisen', value: 'Jujutsu Kaisen' },
    { label: 'Kingdom Building', value: 'Kingdom Building' },
    { label: 'KingdomBuilding', value: 'KingdomBuilding' },
    { label: 'Kingdoms', value: 'Kingdoms' },
    { label: 'Knights', value: 'Knights' },
    { label: 'Korean', value: 'Korean' },
    { label: 'Korean Novel', value: 'Korean Novel' },
    { label: 'Lack of Common Sense', value: 'Lack of Common Sense' },
    { label: 'Lazy Protagonist', value: 'Lazy Protagonist' },
    { label: 'Leadership', value: 'Leadership' },
    { label: 'Level System', value: 'Level System' },
    { label: 'Levelup', value: 'Levelup' },
    { label: 'Life Script', value: 'Life Script' },
    { label: 'Lightnovel', value: 'Lightnovel' },
    { label: 'Live Broadcast', value: 'Live Broadcast' },
    { label: 'Livebroadcast', value: 'Livebroadcast' },
    { label: 'Lord Ability', value: 'Lord Ability' },
    {
      label: 'Love Interest Falls in Love First',
      value: 'Love Interest Falls in Love First',
    },
    { label: 'Low-key Protagonist', value: 'Low-key Protagonist' },
    { label: 'Luck Plunder', value: 'Luck Plunder' },
    { label: 'Lucky Protagonist', value: 'Lucky Protagonist' },
    { label: 'Magic', value: 'Magic' },
    { label: 'Magic Beasts', value: 'Magic Beasts' },
    { label: 'Magic Formations', value: 'Magic Formations' },
    { label: 'Magical Space', value: 'Magical Space' },
    { label: 'Magical Technology', value: 'Magical Technology' },
    { label: 'Maids', value: 'Maids' },
    { label: 'Male Protagonist', value: 'Male Protagonist' },
    { label: 'Male Yandere', value: 'Male Yandere' },
    { label: 'MaleProtagonist', value: 'MaleProtagonist' },
    { label: 'Management', value: 'Management' },
    { label: 'Manipulative Characters', value: 'Manipulative Characters' },
    { label: 'Marriage', value: 'Marriage' },
    { label: 'Martial Spirits', value: 'Martial Spirits' },
    { label: 'Marvel', value: 'Marvel' },
    {
      label: 'Master-Disciple Relationship',
      value: 'Master-Disciple Relationship',
    },
    {
      label: 'Master-Servant Relationship',
      value: 'Master-Servant Relationship',
    },
    { label: 'Medical Knowledge', value: 'Medical Knowledge' },
    { label: 'Memory Reveal', value: 'Memory Reveal' },
    { label: 'Mercenaries', value: 'Mercenaries' },
    { label: 'Misunderstanding', value: 'Misunderstanding' },
    { label: 'Misunderstandings', value: 'Misunderstandings' },
    { label: 'Modern', value: 'Modern' },
    { label: 'Modern Day', value: 'Modern Day' },
    { label: 'Modern Knowledge', value: 'Modern Knowledge' },
    { label: 'ModernDay', value: 'ModernDay' },
    { label: 'Monsters', value: 'Monsters' },
    { label: 'Monster Tamer', value: 'Monster Tamer' },
    { label: 'Mood Shifts', value: 'Mood Shifts' },
    { label: 'Movies', value: 'Movies' },
    { label: 'Multiple Identities', value: 'Multiple Identities' },
    { label: 'Multiple POV', value: 'Multiple POV' },
    { label: 'Multiple Realms', value: 'Multiple Realms' },
    {
      label: 'Multiple Reincarnated Individuals',
      value: 'Multiple Reincarnated Individuals',
    },
    {
      label: 'Multiple Transported Individuals',
      value: 'Multiple Transported Individuals',
    },
    {
      label: 'Multi-Wife/Multi-Children Blessing System',
      value: 'Multi-Wife/Multi-Children Blessing System',
    },
    { label: 'Mutated Creatures', value: 'Mutated Creatures' },
    { label: 'Mutations', value: 'Mutations' },
    { label: 'Music', value: 'Music' },
    {
      label: 'Mysterious Family Background',
      value: 'Mysterious Family Background',
    },
    { label: 'Mysterious Past', value: 'Mysterious Past' },
    { label: 'Mystery', value: 'Mystery' },
    { label: 'Mystery Solving', value: 'Mystery Solving' },
    { label: 'Naive Protagonist', value: 'Naive Protagonist' },
    { label: 'Naruto', value: 'Naruto' },
    { label: 'Nationalism', value: 'Nationalism' },
    { label: 'Necromancer', value: 'Necromancer' },
    { label: 'Netori', value: 'Netori' },
    { label: 'Ninjas', value: 'Ninjas' },
    { label: 'Non-humanoid Protagonist', value: 'Non-humanoid Protagonist' },
    { label: 'Non-System Based Cheat', value: 'Non-System Based Cheat' },
    { label: 'Non-SystemBasedCheat', value: 'Non-SystemBasedCheat' },
    { label: 'Noromance', value: 'Noromance' },
    { label: 'Nobles', value: 'Nobles' },
    { label: 'Obsession', value: 'Obsession' },
    { label: 'Obsessive Love', value: 'Obsessive Love' },
    { label: 'One Piece', value: 'One Piece' },
    { label: 'One Punch Man', value: 'One Punch Man' },
    { label: 'OnePiece', value: 'OnePiece' },
    { label: 'Orphans', value: 'Orphans' },
    { label: 'Otaku', value: 'Otaku' },
    { label: 'Outer Space', value: 'Outer Space' },
    { label: 'Overpowered', value: 'Overpowered' },
    { label: 'Overpowered Protagonist', value: 'Overpowered Protagonist' },
    { label: 'Parallel Worlds', value: 'Parallel Worlds' },
    { label: 'Past Plays a Big Role', value: 'Past Plays a Big Role' },
    { label: 'Pill Concocting', value: 'Pill Concocting' },
    { label: 'Pirates', value: 'Pirates' },
    { label: 'Pets', value: 'Pets' },
    { label: 'Phoenixes', value: 'Phoenixes' },
    { label: 'Pokemon', value: 'Pokemon' },
    { label: 'Politics', value: 'Politics' },
    { label: 'Polygamy', value: 'Polygamy' },
    { label: 'Poor Protagonist', value: 'Poor Protagonist' },
    { label: 'Poor to Rich', value: 'Poor to Rich' },
    { label: 'PoortoRich', value: 'PoortoRich' },
    { label: 'Positive', value: 'Positive' },
    { label: 'Possession', value: 'Possession' },
    { label: 'Possessive Characters', value: 'Possessive Characters' },
    { label: 'Post-apocalyptic', value: 'Post-apocalyptic' },
    { label: 'Power Couple', value: 'Power Couple' },
    { label: 'Pregnancy', value: 'Pregnancy' },
    { label: 'Previous Life Talent', value: 'Previous Life Talent' },
    { label: 'Prince of Tennis', value: 'Prince of Tennis' },
    { label: 'PrinceofTennis', value: 'PrinceofTennis' },
    { label: 'Proactive Protagonist', value: 'Proactive Protagonist' },
    { label: 'Protagonist Hunting', value: 'Protagonist Hunting' },
    {
      label: 'Protagonist Strong from the Start',
      value: 'Protagonist Strong from the Start',
    },
    { label: 'Psychological', value: 'Psychological' },
    { label: 'PureLove', value: 'PureLove' },
    { label: 'R-18', value: 'R-18' },
    { label: 'R18', value: 'R18' },
    { label: 'Racism', value: 'Racism' },
    { label: 'Ranking List', value: 'Ranking List' },
    { label: 'Rapist to Lover', value: 'Rapist to Lover' },
    { label: 'Rebirth', value: 'Rebirth' },
    { label: 'Rebirthed Protagonist', value: 'Rebirthed Protagonist' },
    { label: 'Reincarnated as a Monster', value: 'Reincarnated as a Monster' },
    {
      label: 'Reincarnated in Another World',
      value: 'Reincarnated in Another World',
    },
    { label: 'Reincarnation', value: 'Reincarnation' },
    { label: 'Relaxed', value: 'Relaxed' },
    { label: 'Resurrection', value: 'Resurrection' },
    { label: 'Reverse Rape', value: 'Reverse Rape' },
    { label: 'Revenge', value: 'Revenge' },
    { label: 'Romance', value: 'Romance' },
    { label: 'Romantic Subplot', value: 'Romantic Subplot' },
    { label: 'Royalty', value: 'Royalty' },
    { label: 'Ruthless Protagonist', value: 'Ruthless Protagonist' },
    { label: 'School Life', value: 'School Life' },
    { label: 'Sci-fi', value: 'Sci-fi' },
    { label: 'Schemes And Conspiracies', value: 'Schemes And Conspiracies' },
    { label: 'Secret Identity', value: 'Secret Identity' },
    { label: 'Secret Organizations', value: 'Secret Organizations' },
    { label: 'Sect Development', value: 'Sect Development' },
    { label: 'Selfish Protagonist', value: 'Selfish Protagonist' },
    { label: 'Sentient Skills', value: 'Sentient Skills' },
    { label: 'SentientSkills', value: 'SentientSkills' },
    { label: 'Sex Slaves', value: 'Sex Slaves' },
    { label: 'Sharp-tongued Characters', value: 'Sharp-tongued Characters' },
    { label: 'Shoujo', value: 'Shoujo' },
    { label: 'Showbiz', value: 'Showbiz' },
    {
      label: 'Shrouding The Heavens Fanfiction',
      value: 'Shrouding The Heavens Fanfiction',
    },
    { label: 'Sign-In/Check-In', value: 'Sign-In/Check-In' },
    { label: 'Sign-InCheck-In', value: 'Sign-InCheck-In' },
    { label: 'SigninCheckin', value: 'SigninCheckin' },
    { label: 'Simulation', value: 'Simulation' },
    { label: 'Skill Assimilation', value: 'Skill Assimilation' },
    { label: 'Slice Of Life', value: 'Slice Of Life' },
    { label: 'Sliceoflife', value: 'Sliceoflife' },
    { label: 'Slow Growth at Start', value: 'Slow Growth at Start' },
    { label: 'Slow Romance', value: 'Slow Romance' },
    { label: 'Smart Couple', value: 'Smart Couple' },
    { label: 'Soul Power', value: 'Soul Power' },
    { label: 'Souls', value: 'Souls' },
    { label: 'Spatial Manipulation', value: 'Spatial Manipulation' },
    { label: 'Special Abilities', value: 'Special Abilities' },
    { label: 'Special Physique', value: 'Special Physique' },
    { label: 'Spiritual Qi Recovery Era', value: 'Spiritual Qi Recovery Era' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Storyteller', value: 'Storyteller' },
    { label: 'Strategic Battles', value: 'Strategic Battles' },
    { label: 'Strategist', value: 'Strategist' },
    { label: 'Store Owner', value: 'Store Owner' },
    {
      label: 'Strength-based Social Hierarchy',
      value: 'Strength-based Social Hierarchy',
    },
    { label: 'Strong Background', value: 'Strong Background' },
    { label: 'Strong Love Interests', value: 'Strong Love Interests' },
    { label: 'Strong Protagonist', value: 'Strong Protagonist' },
    { label: 'Strong to Stronger', value: 'Strong to Stronger' },
    { label: 'StrongtoStronger', value: 'StrongtoStronger' },
    {
      label: 'Student-Teacher Relationship',
      value: 'Student-Teacher Relationship',
    },
    { label: 'Sudden Strength Gain', value: 'Sudden Strength Gain' },
    { label: 'Sudden Wealth', value: 'Sudden Wealth' },
    { label: 'Summoning Magic', value: 'Summoning Magic' },
    { label: 'Super Technology', value: 'Super Technology' },
    { label: 'Superpowers', value: 'Superpowers' },
    { label: 'SuperTechnology', value: 'SuperTechnology' },
    { label: 'Survival', value: 'Survival' },
    { label: 'Survival Game', value: 'Survival Game' },
    { label: 'Sword And Magic', value: 'Sword And Magic' },
    { label: 'Sword Wielder', value: 'Sword Wielder' },
    { label: 'System', value: 'System' },
    { label: 'System...', value: 'System...' },
    { label: 'Talents', value: 'Talents' },
    { label: 'Teachers', value: 'Teachers' },
    { label: 'Technological Gap', value: 'Technological Gap' },
    { label: 'Threesome', value: 'Threesome' },
    { label: 'Time Manipulation', value: 'Time Manipulation' },
    { label: 'Time Skip', value: 'Time Skip' },
    { label: 'Time Travel', value: 'Time Travel' },
    {
      label: 'Transported into a Game World',
      value: 'Transported into a Game World',
    },
    {
      label: 'Transported to Another World',
      value: 'Transported to Another World',
    },
    { label: 'Transmigration', value: 'Transmigration' },
    { label: 'Transmigrated Protagonist', value: 'Transmigrated Protagonist' },
    { label: 'Tragic Past', value: 'Tragic Past' },
    { label: 'Tsundere', value: 'Tsundere' },
    { label: 'Twins', value: 'Twins' },
    {
      label: 'Underestimated Protagonist',
      value: 'Underestimated Protagonist',
    },
    {
      label: 'Unique Cultivation Technique',
      value: 'Unique Cultivation Technique',
    },
    { label: 'Unlimited Flow', value: 'Unlimited Flow' },
    { label: 'Urban', value: 'Urban' },
    { label: 'Vampire', value: 'Vampire' },
    { label: 'Vampires', value: 'Vampires' },
    { label: 'Videogame', value: 'Videogame' },
    { label: 'Villain', value: 'Villain' },
    { label: 'Villain Protagonist', value: 'Villain Protagonist' },
    { label: 'Virtual Reality', value: 'Virtual Reality' },
    { label: 'Wars', value: 'Wars' },
    { label: 'Weak to Strong', value: 'Weak to Strong' },
    { label: 'Weaktostrong', value: 'Weaktostrong' },
    { label: 'WeaktoStrong', value: 'WeaktoStrong' },
    { label: 'Wealthy Characters', value: 'Wealthy Characters' },
    { label: 'WebNovel', value: 'WebNovel' },
    { label: 'Witches', value: 'Witches' },
    { label: 'Wizards', value: 'Wizards' },
    { label: 'World Hopping', value: 'World Hopping' },
    { label: 'World Travel', value: 'World Travel' },
    { label: 'Writers', value: 'Writers' },
    { label: 'Yandere', value: 'Yandere' },
    { label: 'Younger Sisters', value: 'Younger Sisters' },
    { label: 'Zombies', value: 'Zombies' },
  ];

  filters = {
    q: {
      value: '',
      label: 'Search Title or Raw Title',
      type: FilterTypes.TextInput,
    },
    include_genres: {
      value: [],
      label: 'Genre',
      options: [
        { label: 'Action', value: 'Action' },
        { label: 'Adventure', value: 'Adventure' },
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Drama', value: 'Drama' },
        { label: 'Fantasy', value: 'Fantasy' },
        { label: 'Fan-Fiction', value: 'Fan-Fiction' },
        { label: 'Faloo', value: 'Faloo' },
        { label: 'Historical', value: 'Historical' },
        { label: 'Josei', value: 'Josei' },
        { label: 'Psychological', value: 'Psychological' },
        { label: 'Romance', value: 'Romance' },
        { label: 'School Life', value: 'School Life' },
        { label: 'Sci-fi', value: 'Sci-fi' },
        { label: 'Shoujo', value: 'Shoujo' },
        { label: 'Slice Of Life', value: 'Slice Of Life' },
        { label: 'Supernatural', value: 'Supernatural' },
        { label: 'Urban', value: 'Urban' },
        { label: 'Virtual Reality', value: 'Virtual Reality' },
        { label: 'VirtualReality', value: 'VirtualReality' },
        { label: 'Xianxia', value: 'Xianxia' },
        { label: 'Yaoi', value: 'Yaoi' },
        { label: 'Adult', value: 'Adult' },
        { label: 'Anime', value: 'Anime' },
        { label: 'Billionaire', value: 'Billionaire' },
        { label: 'Billionaires', value: 'Billionaires' },
        { label: 'BL', value: 'BL' },
        { label: 'CEO', value: 'CEO' },
        { label: 'Competitive Sports', value: 'Competitive Sports' },
        { label: 'Contemporary Romance', value: 'Contemporary Romance' },
        { label: 'Cooking', value: 'Cooking' },
        { label: 'Douluo', value: 'Douluo' },
        { label: 'Dragon Ball', value: 'Dragon Ball' },
        { label: 'Eastern Fantasy', value: 'Eastern Fantasy' },
        { label: 'Ecchi', value: 'Ecchi' },
        { label: 'Elf', value: 'Elf' },
        { label: 'Erciyuan', value: 'Erciyuan' },
        { label: 'Fantasy Romance', value: 'Fantasy Romance' },
        { label: 'Game', value: 'Game' },
        { label: 'GayRomance', value: 'GayRomance' },
        { label: 'Gender Bender', value: 'Gender Bender' },
        { label: 'Gender-Bender', value: 'Gender-Bender' },
        { label: 'Harem', value: 'Harem' },
        { label: 'Historical Romance', value: 'Historical Romance' },
        { label: 'History', value: 'History' },
        { label: 'Hogwarts', value: 'Hogwarts' },
        { label: 'Horror', value: 'Horror' },
        { label: 'Horror&', value: 'Horror&' },
        { label: 'Korean', value: 'Korean' },
        { label: 'LGBT', value: 'LGBT' },
        { label: 'LGBT+', value: 'LGBT+' },
        { label: 'Magic', value: 'Magic' },
        { label: 'Magical Realism', value: 'Magical Realism' },
        { label: 'Martial Arts', value: 'Martial Arts' },
        { label: 'Martial-Arts', value: 'Martial-Arts' },
        { label: 'Marvel', value: 'Marvel' },
        { label: 'Mature', value: 'Mature' },
        { label: 'Mecha', value: 'Mecha' },
        { label: 'Military', value: 'Military' },
        { label: 'Modern', value: 'Modern' },
        { label: 'Modern&', value: 'Modern&' },
        { label: 'Modern Life', value: 'Modern Life' },
        { label: 'Modern Romance', value: 'Modern Romance' },
        { label: 'ModernRomance', value: 'ModernRomance' },
        { label: 'Movies', value: 'Movies' },
        { label: 'Mystery', value: 'Mystery' },
        { label: 'NA', value: 'NA' },
        { label: 'Naruto', value: 'Naruto' },
        { label: 'Official Circles', value: 'Official Circles' },
        { label: 'One Piece', value: 'One Piece' },
        { label: 'Other', value: 'Other' },
        { label: 'Pokemon', value: 'Pokemon' },
        { label: 'Realism', value: 'Realism' },
        { label: 'Realistic', value: 'Realistic' },
        { label: 'Realistic Fiction', value: 'Realistic Fiction' },
        { label: 'RealisticFiction', value: 'RealisticFiction' },
        { label: 'Reincarnation', value: 'Reincarnation' },
        { label: 'Romantic', value: 'Romantic' },
        { label: 'School-Life', value: 'School-Life' },
        { label: 'Science Fiction', value: 'Science Fiction' },
        { label: 'Sci-Fi', value: 'Sci-Fi' },
        { label: 'Secret', value: 'Secret' },
        { label: 'Seinen', value: 'Seinen' },
        { label: 'Shoujo Ai', value: 'Shoujo Ai' },
        { label: 'Shoujo-Ai', value: 'Shoujo-Ai' },
        { label: 'Shounen', value: 'Shounen' },
        { label: 'Shounen Ai', value: 'Shounen Ai' },
        { label: 'Shounen-Ai', value: 'Shounen-Ai' },
        { label: 'Slice of life', value: 'Slice of life' },
        { label: 'Slice-Of-Life', value: 'Slice-Of-Life' },
        { label: 'SliceOfLife', value: 'SliceOfLife' },
        { label: 'Smut', value: 'Smut' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Suspense', value: 'Suspense' },
        { label: 'Suspense Thriller', value: 'Suspense Thriller' },
        { label: 'Teen', value: 'Teen' },
        { label: 'Terror', value: 'Terror' },
        { label: 'Tragedy', value: 'Tragedy' },
        { label: 'Two-dimensional', value: 'Two-dimensional' },
        { label: 'Urban Life', value: 'Urban Life' },
        { label: 'Urban-Life', value: 'Urban-Life' },
        { label: 'Urban Romance', value: 'Urban Romance' },
        { label: 'Video games', value: 'Video games' },
        { label: 'Video Games', value: 'Video Games' },
        { label: 'War', value: 'War' },
        { label: 'War&', value: 'War&' },
        { label: 'War&Military', value: 'War&Military' },
        { label: 'Wuxia', value: 'Wuxia' },
        { label: 'Wuxia Xianxia', value: 'Wuxia Xianxia' },
        { label: 'Xuanhuan', value: 'Xuanhuan' },
        { label: 'Yuri', value: 'Yuri' },
      ],
      type: FilterTypes.CheckboxGroup,
    },
    include_tags: {
      value: [],
      label: 'Include Tag',
      options: this.tags,
      type: FilterTypes.CheckboxGroup,
    },
    exclude_tags: {
      value: [],
      label: 'Exclude Tag',
      options: this.tags,
      type: FilterTypes.CheckboxGroup,
    },
    wordcount: {
      value: 'Unlimited',
      label: 'Word Count',
      options: [
        { label: 'Unlimited', value: 'Unlimited' },
        { label: '100k-300k', value: '100k-300k' },
        { label: '300k-500k', value: '300k-500k' },
        { label: '500k-800k', value: '500k-800k' },
        { label: '1M+', value: '1M+' },
      ],
      type: FilterTypes.Picker,
    },
    status: {
      value: '',
      label: 'Status',
      options: [
        { label: 'Any', value: '' },
        { label: 'Ongoing', value: 'Ongoing' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Hiatus', value: 'Hiatus' },
      ],
      type: FilterTypes.Picker,
    },
    sort: {
      value: 'ASC',
      label: 'Sort',
      options: [
        { label: 'Ascending', value: 'ASC' },
        { label: 'Descending', value: 'DESC' },
      ],
      type: FilterTypes.Picker,
    },
    order: {
      value: 'popular',
      label: 'Order By',
      options: [
        { label: 'Popular', value: 'popular' },
        { label: 'Newly Added', value: 'recent' },
        { label: 'Updated', value: 'updated' },
        { label: 'Chapters', value: 'chaptercount' },
        { label: 'Bookmarks', value: 'bookmarkcount' },
        { label: 'Word Count', value: 'wordcount' },
        { label: 'Views Today', value: 'dailyviews' },
        { label: 'Views Week', value: 'weeklyviews' },
        { label: 'Views Month', value: 'monthlyviews' },
        { label: 'Views All Time', value: 'views' },
      ],
      type: FilterTypes.Picker,
    },
  } satisfies Filters;
}

export interface ApiResponse {
  message: string;
  status: number;
  result: Result | Novel | ChaptersResult | ChapterDetail;
  version: string;
}

export interface Result {
  data: Novel[];
  pagination: Pagination;
}

export interface Novel {
  name: string;
  slug: string;
  alt_name: string[];
  description: string;
  status: string;
  thumbnail: string;
  author_id: number;
  rating: number;
  views: number;
  popularity: number;
  reviewcount: number;
  bookmarkcount: number;
  genres: string[];
  tags: string[];
  firstchapter: ChapterSummary;
  latestchapter: ChapterSummary;
  wordcount: number;
  weeklyviews: number;
  chaptercount: number;
  users: User;
}

export interface ChapterSummary {
  chapterid: number | null;
  chaptername: string;
  chapterslug: string;
  chapternumber: string;
}

export interface User {
  id: number;
  name: string;
  image: string | null;
}

export interface Pagination {
  currentPage: string;
  totalPages: number;
  totalItems: number;
}

export interface ChaptersResult {
  novel_slug: string;
  total_chapters: number;
  chapter_lists: ChapterListItem[];
  pagination: ChaptersPagination;
}

export interface ChapterListItem {
  chapter_number: number;
  chapter_title: string;
  chapter_slug: string;
}

export interface ChaptersPagination {
  page: number;
  limit: number;
  total: number;
}

export interface ChapterResult {
  novel_slug: string;
  chapter: ChapterDetail;
}

export interface ChapterDetail {
  chapter_number: number;
  chapter_title: string;
  chapter_slug: string;
  likes: number;
  content: string;
  next_chapter: AdjacentChapter | null;
  previous_chapter: AdjacentChapter | null;
}

export interface AdjacentChapter {
  chapter_number: number;
  chapter_title: string;
  chapter_slug: string;
}

export default new MTLBooks();
