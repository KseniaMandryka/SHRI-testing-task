describe("Страница товара", async function () {
  const basename = "http://localhost:3000/hw/store/catalog"
  it("Отображается кнопка 'Add to Cart'", async function () {
    await this.browser.url((`${basename}`))
    await this.browser.$(".ProductItem-DetailsLink").click()
    await this.browser.$(".ProductDetails-AddToCart").click()
    await this.browser.assertView("plain", ".ProductDetails-AddToCart", {
      compositeImage: true
    })
  })
})