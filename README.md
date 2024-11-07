<h1 align="center">Nutritivne informacije raznih proizvoda</h1>

### Opis skupa podataka

Ovaj skup podataka sadrži nutritivne informacije o raznim prehrambenim proizvodima, uključujući voće, povrće, žitarice, meso, mliječne proizvode i prerađene namirnice. Skup podataka pruža detaljne informacije o kalorijama, mastima, proteinima, vitaminima i mineralima, te može poslužiti istraživačima, nutricionistima i ljubiteljima zdravog načina života kao referenca za analizu prehrambenih vrijednosti različitih namirnica.

<br>

## Početak rada

Prvo je potrebno pokrenuti Docker kontejner:

```bash
docker compose up
```

Nakon toga je moguće pokrenuti `dobij_json.bat` i/ili `dobij_csv.bat`. Čime će se stvoriti nove datoteke `naziv_skupa.json` i `naziv_skupa.csv`.
<br><br>
Isto tako, moguće je pregledati podatke skupa na: <a href="http://localhost:3000" target="_blank">`http://localhost:3000`</a>

<br>

## Metapodaci

- **Naziv skupa podataka**: Nutritivne informacije različitih proizvoda
- **Naziv autora**: Marko Pavlaković
- **Verzija skupa podataka**: 1.0
- **Jezik**: Engleski
- **Opis atributa**:
  - `id`: Jedinstveni identifikator za svaki unos (UUID)
  - `item_name`: Naziv namirnice (npr. "Jabuka", "Kruh", "Piletina")
  - `brand`: Marka proizvoda (ako je primjenjivo)
  - `serving_size`: Veličina porcije (npr. "100g")
  - `calories`: Ukupne kalorije po porciji
  - `total_fat`: Ukupna količina masti po porciji
  - `saturated_fat`: Količina zasićenih masti po porciji
  - `trans_fat`: Količina trans masti po porciji
  - `cholesterol`: Količina kolesterola po porciji
  - `sodium`: Količina natrija po porciji
  - `total_carbohydrates`: Ukupni ugljikohidrati po porciji (s podacima o dijetalnim vlaknima i šećerima)
  - `protein`: Količina proteina po porciji
  - `vitamins_and_minerals`: Postotak preporučenog dnevnog unosa vitamina i minerala
  - `allergens`: Informacije o alergenima (npr. "orasi", "mlijeko")
- **Izvor skupa podataka**: Ovaj skup podataka je prikupljen iz javnih prehrambenih baza podataka i istraživačkih radova
- **Datum prikupljanja podataka**: Listopad 2024.
- **Format podataka**: JSON, CSV
- **Zadnja izmjena**: Listopad 2024.

<br>
<br>

<p align="center">
  <a rel="license" href="https://creativecommons.org/publicdomain/zero/1.0/">
  <img alt="Creative Commons License" style="border-width:0; width: 125px;" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/cc-zero.png" />
</a><br />
Nutritivne informacije različitih proizvoda © 2024 by Marko Pavlaković licenciran je pod
<a rel="license" href="https://creativecommons.org/publicdomain/zero/1.0/?ref=chooser-v1">
  CC0 1.0
</a>
</p>
