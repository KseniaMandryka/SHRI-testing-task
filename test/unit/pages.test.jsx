import { wrapWithProviders, openCatalogPage } from "./utils"
import "@testing-library/jest-dom"

describe("Страницы", () => {

  it("В магазине должны быть главная страница", async () => {
    const { container } = wrapWithProviders()
    const homePage = container.querySelector(".Home")
    expect(homePage).toBeInTheDocument()
  })

  it("В магазине должны быть страница каталог", async () => {
    const { container } = await openCatalogPage()
    const catalogPage = container.querySelector(".Catalog")
    expect(catalogPage).toBeInTheDocument()
  })

  it("В магазине должны быть страница условий доставки", () => {
    const { history, container } = wrapWithProviders()
    history.push("/delivery")
    const deliveryPage = container.querySelector(".Delivery")
    expect(deliveryPage).toBeInTheDocument()
  })

  it("В магазине должна быть страница контактов", () => {
    const { container, history } = wrapWithProviders()
    history.push("/contacts")
    const contactsPage = container.querySelector(".Contacts")
    expect(contactsPage).toBeInTheDocument()
  })

})