import { wrapWithProviders } from "./utils"
import { fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Общие правила", () => {
  it("в шапке отображаются ссылки на страницы магазина и на корзину", async () => {
    const { container } = wrapWithProviders()
    const navbar = container.querySelector(".navbar")
    expect(navbar).toHaveTextContent("Example store")
    expect(navbar).toHaveTextContent("Catalog")
    expect(navbar).toHaveTextContent("Delivery")
    expect(navbar).toHaveTextContent("Contacts")
    expect(navbar).toHaveTextContent("Cart")
  })

  it("название магазина в шапке - ссылка на главную страницу", async () => {
    const { history } = wrapWithProviders()
    const homeLink = screen.getByText("Example store")

    history.push("/catalog")
    await fireEvent.click(homeLink)
    const currentPathname = history.entries[2].pathname
    expect(currentPathname).toBe("/")
  })

  it("при выборе элемента из меню 'гамбургера' оно должно закрываться", async () => {
    const { container } = wrapWithProviders()
    const navBartoggle = container.querySelector(".navbar-toggler-icon")
    const menu = container.querySelector(".navbar-collapse")
    const deliveryLink = screen.getByText("Catalog")

    await fireEvent.click(navBartoggle)
    await fireEvent.click(deliveryLink)

    expect(menu.classList).toContain("collapse")
  })
})
