describe('Testing Pagination object', function () {
var Obj = new Pagination("data.json", 10);

  it('Pagination should exist', function () {
    expect(Obj).toBeDefined();//asercja czy instnieje objekt Pagination
  });

  it('Should be 10 articles per page', function () {
    expect(10).toEqual(10);
  });
  //asercja sprawdza czy dane zostały załadowane


  //asercja sprawdza ile jest artykułów

  // sprawdza range - ilosc podstron z artykułami - przekazujemy to w konstruktorze jako drugi atrybut

  //sprawdza zachowanie podstron i artykułów po przycisnieciu guzika paginacji
  //np jesli guzik ma numer 10 to powinno wyswietlic 10 podstron poczynając od 10 - 19
});
