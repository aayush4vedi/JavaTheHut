<<<<<<< HEAD
About
=======
# Kosh  :working title(vocapp)

## Objective:
Adaptive vocabulary builder + dictionary searcher: one stop solution for all your vocab needs.

## Implementation:
app for phone, browser-extension for laptop.

## Features(Front-End):
1. BE-newpage:Dashboard
    * Profile icon
    * Word of the day:
    * Meaning+ pronunciation
    * Sentence use
    * Infographic
    * Wanna give some personal touch to it ?:TBD
    * Wallpaper(full page/card’s) related to word of the day ?:TBD
    * Dictionary-search + add that word in ToLearn-table
    * Add an input word in ToLearn-table
    * Take a test(/game ?:TBD)
    * My vocabulary(chronological words learnt yet): as cool flashcards ?:TBD
    * Upcoming words((rearrange/delete/add)customisable ?:TBD)

2. BE-button
    * Dictionary-search + add it to ToLearn-table
    * Add an input word in ToLearn-table
    * Go to dashboard(redundant ?:TBD)

3. BE-in browser word-select
    * Doesn’t work on double-click a word(Triple tap/something better ?:TBD)
    * Shows an in-place( or at BE-button ?:TBD) box:
    * Meaning + pronunciation
    * Button: add to ToLearn-table

4. App
//TODO
5. User
    * @SignUp
        * (skippable)Pick which movies/tv/books have you read/seen :to choose vocab from
        * (skippable)which platform do you read on:(HN, quora, reddit,twitter, newspapers, other feed): (ask for handles ?:TBD)
        * (skippable)Ask to pick from listed domain/s. Eg: software+management/medical
        * (if skipped any/one; I have a set of words to mix up with the (if)selected domain /source)
    * User Profile
6. Auth
* DP+updateable
* Name
* Domain+updateable
* Add a new book/movie/TVS
* Reading platforms+updateable

# Entities

## Primary
* WordBank
* Static Words
* Dynamic Words

## Vocabulary: 3 parts
* Learnt Table(VocabTable[1,D-1])
* Today’s word(VocabTable[D])
* To-learn Table(VocabTable[D+1,n])
## User
* Name
* DP
* Domain
* Books
* Movies
* TVS
* Platforms
## Secondary
* Dashboard
* WordBank
* Vocabulary
* User
* BE-button
* Vocabulary
* WordBank
* BE-in browser
* WordBank

# Services
1. Auth service
Takes care of user login, logout, signup, profile & keeping atomicity across platforms

2. Dictionary service
Search a word: to show meaning, pronunciation, use, infogra-pic

3. Vocabulary Service
* Add new word to users_WordBank
* Fetches words from univeral_WordBank into users_WordBank according to priorities
* Arranges users_WordBank table into optimised table
4. Revision Service
    //TBD

# API EndPoints

| Name | API                | Comment          |
| -----| ------------------ | ---------------- |
| Search a word | POST `/app/{usr_id}/dict/{word}` |Send word to dictionary api|
|  |              GET `/app/{usr_id}/dict/{word}`  |RES = meaning+pro..of word |
|For words in vocab|`GET /app/{usr_id}/vocab/{day}`|RES= word for date|
||POST `/app/{usr_id}/vocab/{day}`|Inserts word in DB|
||PUT `/app/{usr_id}/vocab/{day}` | Edit any attribute of a word|
||DELETE `/app/{usr_id}/vocab/{day}` | Remove a word from vocab|
|User Profile|GET `/app/{user_id}/profile`| RES = user details|
||PUT `/app/{user_id}/profile|Update profile`|
|Auth|`/app/signin`||
||`/app/signup`||
||`/app/logout`||

# Flows:
* Dictionary

                                {raw_word}      |   
                                                |       
                            @nltk/polyglot :to categorise as noun, verb, adj
                                                |
                            {raw_word, POS}     |
                                     @Lemmatizer  : to get base word
                                                |
                                    {word}      |
                                                |
                        ———-[search in DB(wordset-dictionray)]—————————-——
                        |                                                 |
                    [Not found]                                         [found]
                        |             {word, meaning, synonym, sentence}  |        
            Go ‘@wordnik’ ??                                     @ Forvo/Cambridge/Google
                                {word, meaning, synonym, sentence, audio} |
                                                                    @Google/Bing
                                                     {word, meaning, synonym, sentence, pic} |
                                                                          |
                                                                    [Display result]
* Vocabulary

# Open Questions/Challenges
* Dictionary: is absolute or modified according to user?
* What if user wants to add a something personally relatable to a word for better remembering & want to see that later? #Recoding
* Table: have to be user specific? :YES
* User: if taken, can user_handles be used?
* Revision: tests/games for instant revision.Am I gonna do it?
* Table: WordBank- has to be 2 tables(prev, next) or date-wise sorted words will do?
* Dictionary Search: how to clean the word before searching(make it ‘dictionary headwords’)
    * Remove extra spaces
    * Plural -> singular
    * Other ways a word can be non-dictionary headword??
* VocabTable Update: a word gets added on day D.How to update words for [D+1,n] days and where to place the new word
    * 1word -> If priority==1(handy-picked word): add new word for day D+1, update all words at [D+2,n]
    * Bulk -> else(added through domain/movie/TVS/book): ??
* Dictionary API: Find the best API which gives everything I’ve been looking for
* DB: sql/nosql/graphQL?
* WordTable: how to manage day_number count & match word_of_the_days, prev, next days???
* What happens when days get over i.e D>n
* Support for :
    * non-english words? @SYSTRAN Translation API
    * Urban words/lingo: E.g.: asap  @Urban Dictionary API
    * Hashtags: Tagdef
* Adding pic(&audio) in dictionary search will increase latency

# Research

## 3rd party APIs:    
1. Dictionary Options: 
    * Link to articles: [link1](https://rapidapi.com/blog/dictionary-apis/) , [link2](https://medium.com/@martin.breuss/finding-a-useful-dictionary-api-52084a01503d)
* Oxford:
    * Features: 
        * Definition
        * Pronunciation
        * example sentences(not good)
        * grammatical information
        * word origins
    * Pricing:        
        * 1 – 10,000 requests - GBP 0.002 per request
        * 10,001 – 100,000 requests -GBP 0.001 per request
        * 100,000 + requests - GBP 0.0005 per request
* Merriam-Webster’s CollegiateDictionaryWithAudio
    * Features:
        * Definitions
        * Examples
        * Etymologies
        * Synonym and Usage paragraphs
        * Pronunciation symbols
        * Audio pronunciations
        * Verbal Illustrations(not what I want)
        * Spelling suggestions
    * Pricing:
        * Free for 1- 1000 queries per day per API key(NON-COMMERCIAL)
        * KEY: c6ef0ae4-a4ee-4b6e-b555-15a068a04d92
* WordsAPI
    * Features:
        * definitions,
        * syllables,
        * pronunciation,
        * synonyms,
        * rhymes,
        * usage frequency,
        * relationships between words.
    * Pricing:
        * Free up to 2,500 requests per day, plus $0.004 per extra request
        * $10 up to 25,000 requests per day, plus $0.003 per extra request
        * $89 up to 500,000 requests per day, plus $0.001 per extra request
* SYSTRAN Translation API
    * Features: SYSTRAN.io APIs are a collection of translation and natural language processing (NLP) APIs that allow:
        * multilingual dictionary lookups,
        * language entity recognition,
        * morphological analysis,
        * part of speech tagging,
        * And text extraction
    * Pricing: Free
* Urban Dictionary API: acronym support
    * Free
* TagDef: supports hashtag:
    * Features: hashtags used on Twitter, Pinterest, and Google+
    * Pricing: free
* https://www.datamuse.com/api/ : take a look ; free -> D3 of nouns, verbs etc
* https://github.com/wordset/wordset-dictionary : free open-source- meaning, synonym, sentence
* Wordnik.com: docs    This is probably the best deal here!!!!
    * Features:
        * Synonyms, antonyms, and other word relations
        * Real example sentences and links to their sources for more than 10,000,000 words
        * Audio pronunciations
        * A word-of-the-day API
        * A random-word API
    * Pricing:
        * $0/mo: 100 calls/hour
        * $10/mo: 1000 calls/hour
    * Won't send mail for API keys in case of free account :(


* Other Useful Dictionary APIs:
    * Language Scoring - What's the difficulty level of this article? Evaluate the difficulty level of a word, sentence, or paragraph and compare it with another.
    * Lemmatizer - "Dogs" to "dog", "abilities" to "ability". Get the root form of a word
    * MyMemory: will give you a machine translation (Google, Microsoft or our) only when a human translation is not available.
    * Similar Words - The service returns similar words to words that you enter. It can be helpful for finding new keywords, adding tags, etc. Of particular use is the ability to take as input multiple words - for example, "apple pear" returns fruits, but "apple microsoft" returns tech companies.
    * Spellcheck - Fix spelling mistakes with the opensource Spellcheck API. The dictionary is continually growing and becoming smarter.
    * Summarization -Index -Summary -Part of Speech - Summarize the content of a web page. Returns a summary, the parts of speech for each sentence, the extracted HTML, and the content make up of the page.
    * Visual Context Graph - Build a graph with words connected to other words. Diagram information for visualizing concepts or mind maps.
    * WikiSynonyms - This is a term synonym discovery service that exploits that structure of Wikipedia redirects to discover almost-equivalent terms.
    * Word Cloud - Generate great looking word clouds from text. Customize size, color and more.
    * Word Quiz - Vocabulary test with levels and exam-specific words (SAT, GMAT, etc). Customized word association quiz for game and e-learning software.
    * YandexTranslate - The API provides access to the Yandex online machine translation service
    * TCYonlineDictionary - TCYonlineDictionary for antonyms and synonyms
    * A JS wrapper for Oxford Dictionary API by Suraj Jain — this one is open source so everyone can contribute to make it even better!
    * OneLook: an aggregator of other dictionary providers, returns links

2. Dataset APIs:
* MMID Dataset:
    * Free
    * Multilingual
* LVIS
* cifar

3. Word to pic:
* Microsoft Azure Bing Image Search link : free for 1000 search per month
* Simple Googling??
* Pintrest etc?
4. Domain Related words
5. Words from Given Book, Movie, TVS
//couldn’t find any :(
6. Pronunciation:
* https://forvo.com/search/{word}/
* https://dictionary.cambridge.org/dictionary/english/{word}

<hr>

* Desired Features:
    * Games/weekly quizzes to increase vocab
    * Algorithmic way for word-of-the day in domain/career
    * Heavily dynamic word-bank
    * Ask user a list of words they want to learn, we'll take care of how to teach you
    * New words learnt:
    *    whose meaning was searched on google/my_app
    *    (if not)most occurring word in today's reading
    * Click on a word to show meaning/pronunciation etc
    * New tab dashboard to display:
    *    Suggested word of the day(+ with sentence usage etc)
    *    Date-wise sorted vocab learnt yet
    *    Ask user their to-learn words
    * Extend it for exams: SAT,GRE,TOEFL
    * Reading a new book?let us know & we'll add words from it to your vocab
    * Show info-graphics for better remembering
    * Link with kindle
    * UI should look like spotify/gaana/cure.fit/cred
    * Scrape(or find something that srcapes) daily/weekly reading sites(HN, quora, reddit,twitter, newspapers) to find trending(+meaningful) words & add them to word-bank


* Ideas from prev players:

    * [vocabulary_com](https://www.vocabulary.com/)
        * Ditch the flash cards and stop memorizing definitions. Vocabulary.com teaches you words by systematically exposing you to a wide array of question types and activities that will help you understand all the meanings and nuances of every word you’re learning.
        * Even after you’ve achieved mastery, we’ll continue to reinforce what you have learned to make sure that it all stays fresh in your memory.
        * See a word you’d like to know better? Click "Learn this Word" and add it to your learning program and we’ll prioritize those.
        * Vocabulary.com is a platform for lifelong learning, growing with you every step of the way. As you improve, the words that you learn will become more and more advanced. And, with our easy-to-use progress-monitoring tools, you can always look back to see how far you’ve come.
        * Vocabulary.com may seem simple on the outside, but behind the scenes we’re using sophisticated algorithms to help you learn over 15,000 words more effectively. How? We start with our massive pool of over 215,000 questions. Then, we use the science of learning to model how you learn (and forget) new words. By comparing your answers to the hundreds of millions of answers given by other Vocabulary.com users, we personalize your learning experience and choose the best question for you at just the right time.
        Studying for an exam like the SAT, GRE, or TOEFL? We have over 50,000 ready-to-learn vocabulary list
    * VoLT Vocabulary" App: (500k+ downloads)
        * is based on this concept is the best app for learning English Vocabulary and it helped me a lot. In this app difficult English words are linked with pictures and memory keys are developed to remember the meaning in fun and fast way. Also there are Synonyms, Antonyms, Usages and you can bookmark and revise the words which you do not know.
        * Kaafi sahi way of learning new words. #DekhnaPadega
        * Review:
              * Goods:
                * Every word is attached with a related pic/gifs/quotes & a memory key(breakdown of word to remember it:
                * E.g.:    Lassitude = lassi(drinking it make u lazy)+ attitude => laziness)
              * Bads:
                       - Sasta UI
                       - Static & limited set of words
             * User Reviews:
                       + nice way of presenting words, makes fun&easy to memorise
                       - Buggy build, doesn't opens, crashes; no user support by maker, he just built it & left

                             

    * Magoosh vocub app for gre, sat, tofel prep(5M+ downloads, multiple apps for diff exams)
    * Word Power Made Easy by Norman Lewis
    * Merriam-Webster's
    * WordUp app for Vocabulary(1M+ downloads)
         * Review:
              * Goods:
            * has top 20,000 most usefully sorted words(movies, TV).Learn only them!
            * Good UI
            * Cool about-app video on Playstore
              * Bads:
              * Asks for test to new user
    * http://knudge.me/
        * Amazing use of info-graphics
        * Review:
        * Good:
             * Has options to learn: vocabulary, idioms, phrases
            * Has cool games
        * Bads:
             * Unavoidable ads

             
* Research work:

    * As per various psychological researches, the best way to learn new words is to associate them with something you already know.(??)
    * ResearchPaper: Teaching the Critical Vocabulary of the Common Core by Marilee Sprenger(click on 'table of contents')
        * The 'How' of Vocabulary Teaching:
            * Begin with a story or explanation of the term.
            * Modeling how you use the word in your life or in conversation
            * Recoding: Have students put information into their own words
            * ask students to draw a picture or a graphic representation of the word.If they can't draw it, they really don't know it.
            * Play games with the words. Games are a brain-compatible strategy for reinforcing learning
    * Nice article
    * California State University ResearchPaper
        * nature of vocabulary acquisition, the vocabulary word gap, theory behind effective vocabulary strategies, and the effect of vocabulary instruction
>>>>>>> kosh/master
