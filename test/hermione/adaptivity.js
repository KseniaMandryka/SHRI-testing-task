const { assert } = require("chai")

hermione.config.testTimeout(100500)
describe("Адаптивность", () => {
  const basename = "http://localhost:3000/hw/store"
  it("Вёрстка должна адаптироваться под ширину экрана", async function() {
    await this.browser.setWindowSize(450, 700)

    await this.browser.url(`${basename}/`)
    await this.browser.assertView("adaptive-home", ".Application", {
      compositeImage: true,
    })

    await this.browser.url(`${basename}/delivery`)
    await this.browser.assertView("adaptive-delivery", ".Application", {
      compositeImage: true,
    })

    await this.browser.url(`${basename}/contacts`)
    await this.browser.assertView("adaptive-contacts", ".Application", {
      compositeImage: true,
    })

    await this.browser.url(`${basename}/cart`)
    await this.browser.assertView("adaptive-cart", ".Application", {
      compositeImage: true,
    })
  })

  it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function() {
    await this.browser.setWindowSize(450, 860)
    await this.browser.url(`${basename}/`)

    const hamburger = await this.browser.$(".Application-Toggler")
    assert.equal(await hamburger.isDisplayed(), true)
  })
})