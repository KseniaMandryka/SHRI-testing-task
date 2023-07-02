import {wrapWithProviders, openPage, openCatalogPage } from "./utils"
import { detailsItem1 } from "./mockData"
import { fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"


describe("Каталог", () => {
  it("В каталоге должны отображаться товары, список которых приходит с сервера", async () => {
    const { container, history } = wrapWithProviders()
    await openPage({history, address: "/catalog"})
    const item = container.querySelector(".ProductItem")
    expect(item).toBeInTheDocument()

  })

  it("для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", async () => {
    const { container } = await openCatalogPage()
    const catalogPage = container.querySelector(".Catalog")
    const row = catalogPage.children[1]
    
    expect(row.children[0].querySelector("h5.card-title")).toHaveTextContent("Fantastic Tuna")
    expect(row.children[0].querySelector("p.ProductItem-Price")).toHaveTextContent(177)
    expect(row.children[0].querySelector("a.card-link").href).toBe(`http://localhost:3000/catalog/0`)
    
    expect(row.children[1].querySelector("h5.card-title")).toHaveTextContent("Incredible Chips")
    expect(row.children[1].querySelector("p.ProductItem-Price")).toHaveTextContent(121)
    expect(row.children[1].querySelector("a.card-link").href).toBe(`http://localhost:3000/catalog/1`)
  })

  it("Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом", async () => {
    const { history } = wrapWithProviders()
    await openPage({ history, address: "/catalog/0"})
    const addToCartButton = screen.getByText("Add to Cart")
    await fireEvent.click(addToCartButton)
    await openPage({ history, address: "/catalog"})
    const card = screen.getAllByTestId(0)[0]

    expect(card).toHaveTextContent("Item in cart")
  })
})

describe("Страница товара", () => {
  it("На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка * * 'добавить в корзину'", async() => {
    const { container, history } = wrapWithProviders()
    await openPage({history, address: "/catalog/0"})

    expect(container).toHaveTextContent("Fantastic Tuna")
    expect(container).toHaveTextContent("Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles")
    expect(container).toHaveTextContent(177)
    expect(container).toHaveTextContent("white")
    expect(container).toHaveTextContent("Wooden")
    expect(container).toHaveTextContent("Add to Cart")
    expect(container).not.toHaveTextContent("Item in cart")
  })

  it("Если товар уже добавлен в корзину, то на странице товара должно отображаться сообщение об этом", async () => {
    const { container, history } = wrapWithProviders()
    await openPage({ history, address: "/catalog/0"})
    const addToCart = screen.getByText("Add to Cart")
    await fireEvent.click(addToCart)
    expect(container).toHaveTextContent("Item in cart")
  })

  it("Повторное нажатие кнопки 'Add to cart' увеличивает количество товара", async () => {
    const { store, history } = wrapWithProviders()
    await openPage({ history, address: "/catalog/0"})

    const addToCartButton = screen.getByText("Add to Cart")
    await fireEvent.click(addToCartButton)
    await fireEvent.click(addToCartButton)

    const state = store.getState()
    const cartState = state.cart
    const count = cartState[detailsItem1.id]?.count
    expect(count).toBe(2)
  })
})
