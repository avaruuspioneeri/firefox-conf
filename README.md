
# Firefox-konffi paskavammaisuuden korjaamiseksi

Firefox on ihan kelvollinen selain, kunhan sen pahimpia yksityisyys- ja tietoturvaongelmia vähän paikkailee. Tämä on omaan käyttöön kasattu konffi, mutta jos joku muukin kokee tästä olevan hyötyä, niin siitä vaan.

Konffin tarkoituksena on pakottaa HTTPS-yhteydet käyttöön, pitää Firefoxin seurannan- ja tietojenkalastelun suojaukset päällä, ottaa käyttöön täydellinen evästesuojaus ja tehdä muutamia muita järkeviä yksityisyysparannuksia.

Tarkoituksena ei ole tehdä Firefoxista mitään Tor-selaimen korviketta. Tor on ihan eri käyttötarkoitukseen, eikä tätä ole tarkoitettu anonymiteetin saavuttamiseen. Haluan vain käyttää tavallista selainta ilman, että se vuotaa tietoja joka suuntaan aivan turhaan.

## Asennus

1. Päivitä Firefox uusimpaan versioon. Vanhoilla versioilla ei kannata lähteä säätämään.
2. Avaa Firefoxissa `about:support`. Etsi **Sovelluksen perustiedot** -kohdasta profiilikansio ja paina **Avaa kansio** tai **Näytä Finderissa**.
3. Sulje kaikki Firefox-ikkunat. Ota samalla varmuuskopio profiilistasi ja erityisesti mahdollisesta olemassa olevasta `user.js`-tiedostosta. Halutessasi voit ohittaa tämän vaiheen ja uhkapelata, mutta ei kannata.
4. Kopioi tämän projektin `user.js` profiilikansioon. Jos siellä on jo vastaava tiedosto, älä vain ylikirjoita sitä, vaan yhdistä asetukset ja selvitä mahdolliset päällekkäisyydet.
5. Käynnistä Firefox uudelleen. Voit tarkistaa asetusten aktivoitumisen avaamalla `about:config` ja etsimällä esimerkiksi `dom.security.https_only_mode`. Arvon pitäisi olla `true`.

Asetukset vaikuttavat ainoastaan siihen Firefox-profiiliin, johon tiedosto asennetaan. Jos käytössäsi on useita profiileja, asenna konffi erikseen jokaiseen haluamaasi profiiliin.

Huomaa myös, että yrityksen tai muun organisaation hallinnoimassa Firefox-asennuksessa hallintakäytännöt voivat ajaa näiden asetusten yli. Lisäksi osa asetuksista voi muuttua tai lakata toimimasta Firefoxin päivitysten yhteydessä. Tämä ei ole mikään ikuisesti toimiva taikakonffi, mutta pyrin päivittämään tätä päivitysten mukaan reaaliajassa.

## Mitä tämä tekee?

| Osa-alue | Muutokset | Seuraukset |
| --- | --- | --- |
| Yhteydet | HTTPS-Only Mode ja aktiivisen sekasisällön esto | HTTP-yhteyksiä ei käytetä huomaamatta. Vanhat sivustot voivat vaatia poikkeuksia, ja osa upotetuista toiminnoista voi hajota. |
| Huijaukset ja haittaohjelmat | Safe Browsing ja laajennusten estolista pidetään käytössä | Firefoxin suojaus tietojenkalastelua ja haitallisia latauksia vastaan säilyy käytössä. Suojauspalvelut tekevät kuitenkin verkkopyyntöjä, ja latausten mainetarkistuksiin voi liittyä tietojen lähettämistä palveluntarjoajalle. |
| Seuranta | Seurannan esto ja kolmannen osapuolen evästeiden eristäminen sivustokohtaisesti | Sivustot eivät pääse yhtä helposti seuraamaan toimintaasi eri verkkotunnusten välillä. Jotkin kirjautumis-, maksu- ja upotetut palvelut voivat vaatia poikkeuksia. |
| Yksityisyyssignaalit | Global Privacy Control ja tunnettujen seuranta­parametrien poistaminen | Sivustoille ilmoitetaan, ettei seurantaa haluta. Kaikki sivustot eivät tietenkään välitä tästä. Parametrien poistaminen voi myös rikkoa joitakin linkkejä. |
| Verkkotunnukset | Kansainvälisten verkkotunnusten näyttäminen punycode-muodossa | Samannäköisiä erikoismerkkejä sisältävät huijausdomainit ovat helpommin havaittavissa, vaikka osoitteet muuttuvatkin rumemmiksi lukea. |
| Firefoxin tiedonkeruu | Telemetrian ja tutkimusten vähentäminen | Firefox lähettää vähemmän ylimääräistä tietoa. Päivitys- ja Safe Browsing -pyyntöjä tämä ei kuitenkaan poista. |

Tämä ei tee selaimesta haavoittumatonta. Suojauslistat eivät tunne kaikkia uhkia, seurannan esto ei estä kaikkea sormenjälkitunnistusta eikä HTTPS tee huijaussivustosta luotettavaa.

Kyse on riskien vähentämisestä, ei mistään maagisesta tietoturvakuplasta.

## Jos jokin sivusto hajoaa

Jos jokin sivusto ei toimi, älä ensimmäisenä ala poistamaan kaikkia suojauksia käytöstä.

1. Tarkista ensin, että olet oikealla verkkosivustolla ja että osoite on luotettava.
2. Jos Firefoxin tehostettu seurannan suojaus rikkoo sivuston toiminnallisuuden, voit poistaa suojauksen väliaikaisesti kyseiseltä sivustolta osoiterivin kilpikuvakkeesta.
3. Jos sivusto tukee ainoastaan HTTP:tä, Firefoxin HTTPS-Only Mode -varoituksesta voi jatkaa sivustolle tai lisätä sille poikkeuksen. Muista kuitenkin, että HTTP-yhteys ei ole salattu. Älä siis syötä sinne mitään arkaluonteista.
4. Palauta suojaukset käyttöön heti, kun niitä ei enää tarvitse poistaa.

Jos haluat muuttaa asetuksia pysyvämmin, sulje Firefox ja muokkaa `user.js`-tiedostoa. Poista tai muuta haluamasi `user_pref(...)`-rivi.

Yksi tärkeä yksityiskohta: Firefox lukee `user.js`-tiedoston asetukset uudelleen jokaisen käynnistyksen yhteydessä. Tämän vuoksi `about:config`-sivulla tai Firefoxin asetuksissa tehty muutos ei välttämättä säily uudelleenkäynnistyksen yli, jos sama asetus määritellään edelleen tiedostossa.

Eli jos haluat muuttaa jotain pysyvästi, muuta myös itse tiedostoa. Muuten Firefox vain palauttaa asetuksen seuraavalla käynnistyskerralla.

## Poistaminen

Jos konffi alkaa vituttaa tai haluat palata alkuperäisiin asetuksiin, toimi seuraavasti:

1. Sulje Firefox.
2. Poista profiilikansion `user.js`-tiedosto tai poista siitä ne `user_pref(...)`-rivit, joita et enää halua käyttää. Jos yhdistit asetukset olemassa olevaan tiedostoon, älä poista samalla muita käyttämiäsi asetuksia.
3. Käynnistä Firefox ja avaa `about:config`.
4. Etsi poistamasi asetukset yksitellen ja paina niiden kohdalla **Palauta**.

Huomaa, että pelkkä `user.js`-tiedoston poistaminen ei palauta asetuksia alkuperäisiin arvoihinsa. Firefox on jo tallentanut lukemansa asetukset profiiliin, joten ne pitää palauttaa erikseen.

**Palauta** asettaa arvoksi Firefoxin nykyisen oletusarvon. Se ei siis välttämättä palauta mahdollista aiempaa itse määrittelemääsi arvoa.

Vaihtoehtoisesti voit palauttaa ennen asennusta ottamasi profiilivarmuuskopion. Tämä on yleensä helpoin tapa, jos haluat takaisin täsmälleen aiempaan tilanteeseen. Muista kuitenkin, että varmuuskopion palauttaminen voi samalla ylikirjoittaa uudempia kirjanmerkkejä ja muita profiilitietoja.

## Muutama asia, jotka kannattaa silti tehdä itse

Mikään `user.js` ei korvaa normaaleja tietoturvakäytäntöjä. Selaimen asetuksia voi säätää maailman tappiin asti, mutta jos käyttäjä itse asentaa jokaisen vastaan tulevan selainlaajennuksen ja käyttää samaa salasanaa kaikkialla, lopputulos on edelleen aika paska.

- **Pidä ohjelmistot ajan tasalla.** Päivitä Firefox, käyttöjärjestelmä ja selainlaajennukset. Asenna laajennuksia vain luotettavista lähteistä ja tarkista niiden käyttöoikeudet.
- **Käytä järkeviä salasanoja.** Yksilölliset salasanat, salasananhallintaohjelma ja monivaiheinen tunnistautuminen ovat edelleen hyvä idea. Bitwardenia ja Ente Authia suosittelen näihin.
- **Älä ohita varoituksia.** Varmenne- ja latausvaroitukset ovat olemassa syystä. HTTPS kertoo yhteyden olevan salattu kyseiseen verkkotunnukseen, ei sitä, että verkkosivusto olisi jotenkin automaattisesti luotettava.
- **Erota eri käyttötarkoitukset.** Jos käsittelet arkaluonteisia asioita, erillinen Firefox-profiili on ihan järkevä ratkaisu.
- **Älä kuvittele olevasi anonyymi.** Tämä konffi ei tarjoa anonymiteettiä, VPN-yhteyttä eikä Torin kaltaista suojaa. IP-osoitteesi ja selaimesi ominaisuudet voivat edelleen paljastua verkkosivustoille. WebRTC on jätetty käyttöön yhteensopivuuden vuoksi, ja se voi paljastaa verkkotietoja.

Firefoxin tehostetun seurannan suojauksen **Tiukka**-tila tarjoaa valmiiksi ylläpidetyn suojakokonaisuuden. Tämä konffi ei kuitenkaan ole sama asia kuin kyseisen tilan valitseminen, eikä sen asentaminen takaa, että Firefoxin käyttöliittymässä näkyy Tiukka-vaihtoehto aktiivisena.

Siinäpä se. Tarkoituksena on käyttää Firefoxia hieman yksityisemmin ja turvallisemmin ilman, että jokainen verkkosivusto muuttuu käyttökelvottomaksi tai selaamisesta tulee jatkuvaa asetusten kanssa tappelemista.
