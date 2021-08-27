// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'test watching episode from the walking dead serie': browser => {
    browser
      .init()
      // test app run
      .waitForElementVisible('#app')

      // test searching the walking dead serie
      .assert.elementPresent('.search-box')
      .setValue('input[type=search]', 'the walking')
      .assert.visible('input[type=submit]')
      .click('input[type=submit]')

      // test the search is giving 3 results
      .waitForElementVisible('.movies-list',5000)
      .assert.elementCount('.movie',3)

      // test click on the first element to redirect to the detail view of the serie
      .waitForElementVisible('.movie-link:first-child .product-image',4000)
      .assert.visible('.movie-link:first-child .product-image')
      browser.execute(function() {
        document.querySelector('.movie-link:first-child .product-image').click()
      });
      browser.waitForElementVisible('.movie-detail',2000)
      .assert.containsText(".description-item h2",'THE WALKING DEAD')

      // test the serie having 2 season 
      .assert.elementCount('.collapsePanel',2)

      // openning the first season  finding 6 episodes
      browser.execute(function() {
        document.querySelector(".collapsePanel:first-child .vcp__header").click()
      });
      browser.assert.elementCount('.episode-box',6)
      
      // openning the episode 17 to watch it in a modal view 
      .assert.containsText(".episode-box:first-child h4",'Episode 17/22 : De retour')
      browser.execute(function() {
        document.querySelector(".episode-box:first-child").click()
      });
      browser.waitForElementVisible('.modal',2000)
      browser.waitForElementVisible('.shaka-video-container',1000)
      .end();
  },
}
