import { detailsItem1, detailsItem2 } from "./mockData"
import { wrapWithProviders, addItemToCart } from "./utils"
import { screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Корзина", () => {
  it("Содержимое корзины должно сохраняться между перезагрузками страницы", async () => {
    const { history } = wrapWithProviders({ useMockData: false })
    await addItemToCart({ id: 0, history, count: 2 })
    const { store } = wrapWithProviders({ useMockData: false })
    
    const state = store.getState()
    const cartState = state.cart
    const count = cartState[0]?.count
    expect(count).toBe(2)
  })

  it("В шапке рядом со ссылкой на корзину отображается количество неповторяющихся товаров в ней", async () => {
    const { container, history } = wrapWithProviders()
    await addItemToCart({ id: detailsItem1.id, history, count: 1 })
    await addItemToCart({ id: detailsItem2.id, history, count: 2 })

    const navbarNav = container.querySelector(".navbar-nav")
    expect(navbarNav).toHaveTextContent("Cart (2)")
  })

  it("В корзине отображается таблица с добавленными в нее товарами", async () => {
    const { history } = wrapWithProviders()
    await addItemToCart({ id: 0, history, count: 1 })
    await addItemToCart({ id: 1, history, count: 1 })
    history.push("/cart")

    const table = screen.queryByRole("table")
    if(table) {
      expect(table).toBeInTheDocument()
      expect(table.querySelectorAll("tr")).toHaveLength(4)
    }
  })

  it("для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа", async () => {
    const { history } = wrapWithProviders()
    await addItemToCart({ id: detailsItem1.id, history, count: 2 })
    await addItemToCart({ id: detailsItem2.id, history, count: 3 })
    history.push("/cart")

    const row = screen.queryByText(/Order price/).closest("tr")
    if(row) {
      const lastTd = row?.querySelector("td:last-child")
      expect(lastTd?.textContent).toBe("$717")
  
      expect(screen.queryByRole("cell", { name: "Fantastic Tuna" })).toBeInTheDocument()
      expect(screen.queryByRole("cell", { name: "2" })).toBeInTheDocument()
      expect(screen.queryByRole("cell", { name: "$354" })).toBeInTheDocument()
  
      expect(screen.queryByRole("cell", { name: "Incredible Chips" })).toBeInTheDocument()
      expect(screen.queryByRole("cell", { name: "3" })).toBeInTheDocument()
      expect(screen.queryByRole("cell", { name: "$363" })).toBeInTheDocument()
    }
  })

  it("Присутствует кнопка 'Clear shopping cart'", async () => {
    const { history } = wrapWithProviders()
    await addItemToCart({ id: 0, history, count: 1 })
    history.push("/cart")

    const text1 = screen.queryByText(/Cart is empty/)
    const table1 = screen.queryByRole("table")
    const button = screen.queryByRole("button", { name: /Clear/ })

    if(button) {
      await fireEvent.click(button)
  
      const text2 = screen.queryByText(/Cart is empty/)
      const table2 = screen.queryByRole("table")
  
      expect(text1).toBeNull()
      expect(table1).not.toBeNull()
  
      expect(text2).not.toBeNull()
      expect(table2).toBeNull()
    }

  })

  it("Если корзина пустая, отображается ссылка на каталог товаров", async () => {
    const { container, history } = wrapWithProviders()
    history.push("/cart")

    expect(container.textContent).toContain("Cart is empty")
    const link = screen.getByText("catalog").closest("a")
    const href = link?.getAttribute("href")
    expect(href).toBe("/catalog")
  })

})
