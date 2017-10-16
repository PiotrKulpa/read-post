describe("Cookies test before set", function() {
  var cookies;


  beforeEach(function() {
    document.cookie = '';
    cookies = new Cookies();
  });

  it("Cookies exist", function() {
    expect(cookies).toBeDefined();
    //demonstrates use of custom matcher
  });

  it("Cookies method exist", function() {
    expect(cookies.showCookie).toBeDefined();
    //demonstrates use of custom matcher
  });

  it("Cookies method exist", function() {
    expect(cookies.setCookie).toBeDefined();
    //demonstrates use of custom matcher
  });

  it("document.cookie should be empty", function() {
    expect(document.cookie).toEqual('');
    //demonstrates use of custom matcher
  });

  it("setCookie should be undefined", function() {
    expect(cookies.setCookie()).toBe(undefined);
    //demonstrates use of custom matcher
  });
});



describe("Cookies test afteer set", function() {
  var cookies;


  beforeEach(function() {
    //document.cookie = "visited=yes; expires=Thu, 01 Jan 2018 00:00:00 UTC; path=/;";
    cookies = new Cookies();
    cookies.setCookie('visited', 'yes', 356);
    cookies.showCookie('visited');
  });

  it("Cookies exist", function() {
    expect(cookies).toBeDefined();
    //demonstrates use of custom matcher
  });

  it("Cookies method exist", function() {
    expect(cookies.showCookie).toBeDefined();
    //demonstrates use of custom matcher
  });

  it("Cookies method exist", function() {
    expect(cookies.setCookie).toBeDefined();
    //demonstrates use of custom matcher
  });

  it("document.cookie should not be empty", function() {
    expect(document.cookie.length).not.toBeNull();
    //demonstrates use of custom matcher
  });

  describe("A spy Cookies object", function() {


  beforeEach(function() {
    cookies = new Cookies();

    spyOn(cookies, 'setCookie');
    spyOn(cookies, 'showCookie');
    cookies.setCookie('visited', 'yes', 356);
    cookies.showCookie('visited');

  });

  it("tracks that the spy was called", function() {
    expect(cookies.setCookie).toHaveBeenCalled();
  });

  it("tracks that the spy was called", function() {
    expect(cookies.showCookie).toHaveBeenCalled();
  });

  it("tracks all the arguments of its calls", function() {
    expect(cookies.setCookie).toHaveBeenCalledWith('visited', 'yes', 356);
  });

  it("tracks all the arguments of its calls", function() {
    expect(cookies.showCookie).toHaveBeenCalledWith('visited');
  });



});


});
